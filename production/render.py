"""Voice an episode script and publish it to the site.

usage (from the repo root):
    python3 production/render.py content/series/<series>/episodes/NN-<slug>.md

What it does:
  1. voices every spoken line with Kokoro (cached per line in production/cache/, so re-runs are fast),
  2. mixes in the synthesized theme, beds and effects from sound.py,
  3. writes media/<series>/NN-<slug>.mp3 (64 kbps mono, -16 LUFS, ID3 chapters),
  4. updates the episode's frontmatter: status, published, audio, duration, chapters,
  5. regenerates the waveform peaks (scripts/make-peaks.py).
Then commit and push; the Vercel build uploads the MP3 to Blob.
"""
import hashlib, os, re, subprocess, sys, time
import numpy as np
import soundfile as sf
from scipy.signal import fftconvolve
from kokoro_onnx import Kokoro
import sound as S

SR = S.SR
HERE = os.path.dirname(os.path.abspath(__file__))
CACHE = os.path.join(HERE, 'cache')
os.makedirs(CACHE, exist_ok=True)

VOICES = {  # speaker: (voice, speed, lang, effect)
    'MIRIAM': ('af_heart', 0.92, 'en-us', None),
    'DEV': ('am_michael', 1.04, 'en-us', None),
    'LUCÍA': ('af_bella', 1.0, 'en-us', None),
    'THE THESIS': ('bm_george', 0.92, 'en-gb', 'hall'),
    'NORA': ('af_sky', 1.0, 'en-us', 'nora'),
    'THE ARCHIVIST': ('bf_emma', 0.94, 'en-gb', 'archive'),
    'THE AUDITOR': ('bm_lewis', 0.98, 'en-gb', None),
    'DR. LINDQVIST': ('bf_isabella', 0.97, 'en-gb', 'tape'),
    'PROF. ADEYEMI': ('am_onyx', 0.95, 'en-us', 'tape'),
    'DR. VENKATARAMAN': ('af_kore', 1.0, 'en-us', 'call'),
    'CAPT. AL-HARBI': ('am_fenrir', 0.94, 'en-us', 'tape'),
    'DR. PARK': ('af_jessica', 0.98, 'en-us', 'tape'),
    'DR. MARCHETTI': ('bf_alice', 0.96, 'en-gb', 'tape'),
}
UNIT_VOICES = ['am_echo', 'am_eric', 'am_liam', 'am_puck']
LISTENER_VOICES = ['af_nova', 'am_adam', 'af_river', 'am_santa']

REPL = [
    (r'github\.com/JFernando4/plasticity-via-reinit', 'github dot com, slash, J Fernando 4, slash, plasticity via re-init'),
    (r'\bCC BY 4\.0\b', 'C C BY four point oh'), (r'\bCC BY\b', 'C C BY'),
    (r'\bReLUs?\b', lambda m: 'ray-loo' + ('s' if m.group(0).endswith('s') else '')),
    (r'\bReDo\b', 'Ree-doo'), (r'\bSGDW\b', 'S G D W'), (r'\bSGD\b', 'S G D'), (r'\bAdamW\b', 'Adam W'),
    (r'\bMNIST\b', 'em-nist'), (r'\bCIFAR\b', 'see-far'), (r'\bResNet', 'Rez-net'), (r'\bSWR\b', 'S W R'),
    (r'\bCoLLAs\b', 'Collas'), (r'\bPhD\b', 'P H D'), (r'\bPDF\b', 'P D F'), (r'\bGELU\b', 'jell-oo'),
    (r'\bSiLU\b', 'sigh-loo'), (r'\bCReLU\b', 'see-ray-loo'), (r'\bTanh\b', 'tanch'), (r'\bL2\b', 'L two'),
    (r'\bDr\.', 'Doctor'), (r'\bProf\.', 'Professor'), (r'\bCapt\.', 'Captain'), (r'\bet al\.', 'and colleagues'),
    (r'\be\.g\.', 'for example'), (r'\bi\.e\.', 'that is'), (r'\bvs\.?', 'versus'), (r'§§?\s*', 'section '),
    (r'©', 'copyright'), (r'×', ' times '), (r'≈', ' about '), (r'≤', ' at most '), (r'≥', ' at least '),
    (r'(\d)\s*[–-]\s*(\d)', r'\1 to \2'), (r'—', ', '), (r'–', ', '), (r'θ', 'theta'), (r'α', 'alpha'),
    (r'β', 'beta'), (r'λ', 'lambda'), (r'σ', 'sigma'), (r'ρ', 'rho'), (r'τ', 'tau'), (r'μ', 'mu'), (r'ε', 'epsilon'),
    (r'δ', 'delta'), (r'κ', 'kappa'), (r'η', 'eta'), (r'γ', 'gamma'), (r'ℓ', 'L'), (r'∇', 'gradient '),
    (r'\bIV\b', 'four'), (r'\bIII\b', 'three'), (r'\bII\b', 'two'),
]


def clean(text):
    text = re.sub(r'\*+', '', text).replace('_', ' ')
    text = re.sub(r'\[([^\]]+)\]\([^)]+\)', r'\1', text)
    for a, b in REPL:
        text = re.sub(a, b, text)
    return re.sub(r'\s+', ' ', text).strip()


def chunks(text, limit=280):
    sents = re.split(r'(?<=[.!?])\s+(?=[A-Z"“(])', text)
    out, cur = [], ''
    for s in sents:
        if cur and len(cur) + len(s) > limit:
            out.append(cur); cur = s
        else:
            cur = (cur + ' ' + s).strip()
    if cur: out.append(cur)
    final = []
    for c in out:  # very long sentences: split on commas/semicolons
        while len(c) > 420:
            cut = max(c.rfind(', ', 0, 380), c.rfind('; ', 0, 380))
            if cut < 100: cut = c.rfind(' ', 0, 380)
            final.append(c[:cut + 1]); c = c[cut + 1:].strip()
        final.append(c)
    return [c for c in final if re.search(r'[A-Za-z0-9]', c)]


def parse(path):
    raw = open(path, encoding='utf-8').read().split('### Show Notes')[0]
    ev = []
    for line in raw.split('\n'):
        l = line.strip()
        if not l: continue
        if l.startswith('### '): ev.append(('h3', l[4:].strip()))
        elif l.startswith('#### '): ev.append(('h4', l[5:].strip()))
        elif l.startswith('## '): ev.append(('title', l[3:].strip()))
        elif re.match(r'^\*\[(\w+)', l):
            m = re.match(r'^\*\[([A-Z]+)[:\]]?\s*(.*?)\]?\*?$', l)
            ev.append(('cue', m.group(1), m.group(2) if m else ''))
        else:
            m = re.match(r'^\*\*([^*]+?):\*\*\s*(.*)$', l)
            if m: ev.append(('say', m.group(1).strip(), m.group(2)))
    return ev


def voice_for(spk):
    if spk in VOICES: return VOICES[spk]
    if spk.startswith('UNIT'):
        n = int(re.sub(r'\D', '', spk) or 0)
        return (UNIT_VOICES[n % len(UNIT_VOICES)], 1.05, 'en-us', 'unit')
    if 'LISTENER' in spk or 'CALLER' in spk:
        return (LISTENER_VOICES[hash(spk) % len(LISTENER_VOICES)], 1.0, 'en-us', 'call')
    for k in VOICES:
        if k.split()[-1] in spk: return VOICES[k]
    return ('am_adam', 1.0, 'en-us', 'tape')


_k = None
def tts(text, voice, speed, lang):
    global _k
    key = hashlib.sha1(f'{voice}|{speed}|{lang}|{text}'.encode()).hexdigest()
    fp = os.path.join(CACHE, key + '.npy')
    if os.path.exists(fp): return np.load(fp)
    if _k is None:
        _k = Kokoro(os.path.join(HERE, 'models/kokoro-v1.0.onnx'), os.path.join(HERE, 'models/voices-v1.0.bin'))
    a, sr = _k.create(text, voice=voice, speed=speed, lang=lang)
    a = a.astype(np.float32)
    idx = np.where(np.abs(a) > 0.01)[0]
    if len(idx): a = a[max(0, idx[0] - 240): idx[-1] + 1200]
    np.save(fp, a)
    return a


def reverb(x, rt, wet):
    n = int(rt * SR)
    ir = S.rng.standard_normal(n) * np.exp(-np.arange(n) / SR * 6.9 / rt)
    ir = S.lp(ir, 5000); ir /= np.sqrt(np.sum(ir ** 2))
    y = np.concatenate([x, np.zeros(n)])
    w = fftconvolve(x, ir)[:len(y)]
    w = np.pad(w, (0, len(y) - len(w)))
    return (1 - wet) * y + wet * w * 0.5


def effect(x, kind, faint=False):
    if kind == 'tape': x = reverb(S.hp(x, 90), 0.25, 0.18)
    elif kind == 'call': x = S.bp(x, 280, 3800) * 1.4
    elif kind == 'archive': x = reverb(x, 0.6, 0.22)
    elif kind == 'hall': x = reverb(x, 0.9, 0.15)
    elif kind == 'nora': x = reverb(x, 0.5, 0.2)
    elif kind == 'unit': x = S.bp(x, 200, 5000) * (1 + 0.15 * np.sin(2 * np.pi * 60 * np.arange(len(x)) / SR))
    if faint: x = reverb(x, 1.2, 0.45) * 0.5
    return x


def level(x, target=0.075):
    r = np.sqrt(np.mean(x ** 2)) or 1
    return x * (target / r)


def render(script, out_mp3, title, log=print, album='The Listening Room', artist='The Listening Room', comment=''):
    ev = parse(script)
    says = [e for e in ev if e[0] == 'say']
    total_chars = sum(len(clean(e[2])) for e in says)
    log(f'{len(ev)} events, {len(says)} lines, {total_chars} chars')
    # ---- pass 1: speech ----
    t0, done = time.time(), 0
    speech = []
    for e in says:
        spk, text = e[1], e[2]
        faint = bool(re.match(r'^\((?:[^)]*\b(faint|far|distant|whisper)\b)[^)]*\)', text, re.I))
        text = re.sub(r'^\([^)]*\)\s*', '', text)
        voice, speed, lang, fx = voice_for(spk)
        parts = []
        for c in chunks(clean(text)):
            parts.append(tts(c, voice, speed, lang)); parts.append(np.zeros(int(0.12 * SR), np.float32))
            done += len(c)
        a = level(np.concatenate(parts) if parts else np.zeros(SR // 4))
        speech.append(effect(a, fx, faint))
        el = time.time() - t0
        log(f'speech {done}/{total_chars} chars, {el:.0f}s elapsed')
    # ---- pass 2: timeline ----
    est = sum(len(s) for s in speech) / SR + 600
    L = np.zeros(int(est * SR)); R = np.zeros(int(est * SR))
    cur, si, chapters, music_gain = 0.0, 0, [], 0.55

    def put(x, at, g=1.0, wide=False):
        s = int(at * SR); e = s + len(x)
        L[s:e] += x * g
        d = int(0.012 * SR) if wide else 0
        R[s + d:e + d] += x * g

    def bed(src, at, intro, dur, under=0.11):
        x = src[:int(dur * SR)].copy()
        g = np.full(len(x), under)
        ni, nr = int(intro * SR), int(1.5 * SR)
        g[:ni] = 1.0
        g[ni:ni + nr] = np.linspace(1.0, under, len(g[ni:ni + nr]))
        x = S.fade(x * g, 0.3, 4.0)
        put(x * music_gain, at, wide=True)

    th, ex = S.theme(40.0), S.explainer_bed(30.0)
    last_spk = None
    for e in ev:
        kind = e[0]
        if kind == 'title':
            continue
        if kind == 'h3':
            if cur > 0: cur += 1.0
            chapters.append((cur, e[1])); continue
        if kind == 'h4':
            cur += 0.5; continue
        if kind == 'cue':
            typ, desc = e[1], e[2].lower()
            if typ == 'BEAT': cur += 0.9
            elif typ == 'TAPE': put(S.tape_in(), cur); cur += 0.35
            elif typ == 'AMBIENCE':
                a = S.server_ambience(16) if 'server' in desc else S.archive_ambience(12) if ('archive' in desc or 'page' in desc) else S.archive_ambience(10)
                put(a * 0.35, cur, wide=True); cur += 2.0
            elif typ == 'SFX':
                x = S.sfx_for(desc); put(x * 0.8, cur, wide=True); cur += min(len(x) / SR, 1.6) + 0.15
            elif typ == 'MUSIC':
                if 'fade' in desc and 'under' in desc: continue
                if 'piano note' in desc:
                    put(S.sustained_piano() * music_gain, cur, wide=True); cur += 2.5
                elif 'theme' in desc and any(w in desc for w in ['sting', 'swell', 'resolve', 'cut']):
                    n = 9.0 if ('resolve' in desc or 'swell' in desc) else 5.0
                    put(S.fade(th[:int(n * SR)], 0.2, 2.0) * music_gain, cur, wide=True); cur += n
                elif 'theme' in desc or 'lift' in desc:
                    bed(th, cur, 5.0, 38.0); cur += 4.5
                elif 'bed' in desc or 'explainer' in desc:
                    bed(ex, cur, 2.4, 28.0); cur += 2.2
                    if 'twinkle' in desc: put(S.chime() * 0.5, cur - 1.0, wide=True)
                else:
                    put(S.fade(th[:int(5 * SR)], 0.2, 2.0) * music_gain, cur, wide=True); cur += 5
            continue
        if kind == 'say':
            if last_spk is not None: cur += 0.32 if e[1] != last_spk else 0.2
            x = speech[si]; si += 1
            put(x, cur); cur += len(x) / SR - 0.05
            last_spk = e[1]
    end = cur + 3.0
    L, R = L[:int(end * SR)], R[:int(end * SR)]
    mix = np.stack([L, R], 1)
    mix /= max(1.0, np.max(np.abs(mix)) / 0.95)
    wav = out_mp3.replace('.mp3', '.wav')
    sf.write(wav, mix.astype(np.float32), SR, subtype='FLOAT')
    meta = out_mp3.replace('.mp3', '.ffmeta')
    with open(meta, 'w') as f:
        f.write(';FFMETADATA1\n')
        f.write(f'title={title}\nartist={artist}\nalbum={album}\ngenre=Podcast\n')
        if comment:
            f.write(f'comment={comment}\n')
        for i, (st, name) in enumerate(chapters):
            en = chapters[i + 1][0] if i + 1 < len(chapters) else end
            f.write(f'[CHAPTER]\nTIMEBASE=1/1000\nSTART={int(st*1000)}\nEND={int(en*1000)}\ntitle={name}\n')
    subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', wav, '-i', meta, '-map_metadata', '1', '-map', '0:a',
                    '-af', 'loudnorm=I=-16:TP=-1.5:LRA=11', '-ar', '44100', '-ac', '1', '-b:a', '64k',
                    '-id3v2_version', '3', out_mp3], check=True)
    os.remove(wav); os.remove(meta)
    log(f'done: {out_mp3}, {end/60:.1f} min, {len(chapters)} chapters')
    return chapters, end


def publish(episode_md, log=print):
    import datetime, json, tempfile, yaml
    root = os.path.dirname(HERE)
    ep_path = os.path.abspath(episode_md)
    series_slug = os.path.basename(os.path.dirname(os.path.dirname(ep_path)))
    series = json.load(open(os.path.join(root, 'content', 'series', series_slug, 'series.json')))
    raw = open(ep_path, encoding='utf-8').read()
    _, fm_text, body = raw.split('---\n', 2)
    fm = yaml.safe_load(fm_text)
    slug = fm['slug']
    out_mp3 = os.path.join(root, 'media', series_slug, f'{slug}.mp3')
    os.makedirs(os.path.dirname(out_mp3), exist_ok=True)
    with tempfile.NamedTemporaryFile('w', suffix='.md', delete=False, encoding='utf-8') as tmp:
        tmp.write(body)
    comment = ''
    if series.get('source'):
        src = series['source']
        comment = f"Adapted from {src['author']} ({src['year']}), {src['license']}. Voices are synthetic; all characters are fictional."
    chapters, end = render(tmp.name, out_mp3, f"{series['title']} — Episode {fm['number']}: {fm['title']}", log=log,
                           album=series['title'], artist='The Listening Room', comment=comment)
    os.remove(tmp.name)
    dur = float(subprocess.check_output(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', out_mp3]))
    fm.update({
        'status': 'published',
        'published': fm.get('published') or datetime.date.today().isoformat(),
        'audio': os.path.basename(out_mp3),
        'duration': round(dur),
        'chapters': [{'start': round(st, 1), 'title': name} for st, name in chapters],
    })
    with open(ep_path, 'w', encoding='utf-8') as f:
        f.write('---\n' + yaml.safe_dump(fm, sort_keys=False, allow_unicode=True, width=1000) + '---\n' + body)
    subprocess.run([sys.executable, os.path.join(root, 'scripts', 'make-peaks.py')], check=True)
    log(f'published {series_slug}/{slug}: {round(dur/60)} min, {len(chapters)} chapters. Commit and push to deploy.')


if __name__ == '__main__':
    if len(sys.argv) == 2:
        publish(sys.argv[1], log=lambda m: print(m, flush=True))
    else:  # low-level: render.py <script.md> <out.mp3> "<title>"
        os.makedirs(os.path.dirname(os.path.abspath(sys.argv[2])), exist_ok=True)
        render(sys.argv[1], sys.argv[2], sys.argv[3], log=lambda m: print(m, flush=True))
