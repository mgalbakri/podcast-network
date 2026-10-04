"""Synthesized music beds and sound effects for STILL LEARNING (all original, generated in code)."""
import numpy as np
from scipy.signal import butter, sosfilt

SR = 24000
rng = np.random.default_rng(7)


def t(d):
    return np.arange(int(d * SR)) / SR


def lp(x, f, order=4):
    return sosfilt(butter(order, f, 'low', fs=SR, output='sos'), x)


def hp(x, f, order=2):
    return sosfilt(butter(order, f, 'high', fs=SR, output='sos'), x)


def bp(x, lo, hi, order=4):
    return sosfilt(butter(order, [lo, hi], 'band', fs=SR, output='sos'), x)


def env_adsr(n, a=0.01, r=0.3):
    e = np.ones(n)
    na, nr = int(a * SR), int(r * SR)
    if na: e[:na] = np.linspace(0, 1, na)
    if nr: e[-nr:] *= np.linspace(1, 0, nr)
    return e


def fade(x, fin=0.5, fout=1.0):
    x = x.copy()
    ni, no = min(len(x), int(fin * SR)), min(len(x), int(fout * SR))
    if ni: x[:ni] *= np.linspace(0, 1, ni)
    if no: x[-no:] *= np.linspace(1, 0, no)
    return x


def norm(x, peak=0.9):
    m = np.max(np.abs(x)) or 1
    return x / m * peak


def hz(note):
    return 440 * 2 ** ((note - 69) / 12)


def piano(note, dur, vel=1.0):
    tt = t(dur)
    f = hz(note)
    x = sum((1 / (k ** 1.6)) * np.sin(2 * np.pi * f * k * tt * (1 + 0.0004 * k * k)) * np.exp(-tt * (1.2 + 0.9 * k))
            for k in range(1, 8))
    x *= np.minimum(1, tt / 0.005)
    return vel * x * env_adsr(len(tt), 0.002, 0.15)


def cello(note, dur, vel=1.0):
    tt = t(dur)
    f = hz(note)
    vib = 1 + 0.004 * np.sin(2 * np.pi * 5.2 * tt)
    ph = 2 * np.pi * np.cumsum(f * vib) / SR
    x = sum(((-1) ** (k + 1)) / k * np.sin(k * ph) for k in range(1, 14))
    x = lp(x, 900)
    return vel * x * env_adsr(len(tt), 0.18, 0.35)


def place(canvas, x, start):
    s = int(start * SR)
    e = min(len(canvas), s + len(x))
    canvas[s:e] += x[:e - s]


def theme(dur=24.0):
    """'Still Learning' theme: low cello pulse in D minor, slow sparse piano."""
    out = np.zeros(int(dur * SR) + SR)
    bpm = 66
    beat = 60 / bpm
    prog = [(38, [62, 65, 69]), (34, [62, 65, 70]), (41, [60, 65, 69]), (36, [60, 64, 67])]  # Dm Bb F C
    melody = [74, None, 72, 69, None, 70, 69, 65, 67, None, 69, None, 72, 74, 76, None]
    b = 0
    while b * beat < dur:
        bar = (b // 4) % 4
        root, chord = prog[bar]
        place(out, cello(root, beat * 0.95, 0.55 if b % 2 == 0 else 0.35), b * beat)
        if b % 4 == 0:
            for i, n in enumerate(chord):
                place(out, piano(n - 12, beat * 4, 0.12), b * beat + 0.02 * i)
        m = melody[b % len(melody)]
        if m and b % 2 == 0:
            place(out, piano(m, beat * 2.5, 0.35), b * beat)
        b += 1
    out = out[:int(dur * SR)]
    pad = lp(rng.standard_normal(len(out)), 300) * 0.02
    return norm(out + pad, 0.8)


def pluck(note, dur, vel=1.0):
    f = hz(note)
    N = int(SR / f)
    buf = rng.uniform(-1, 1, N)
    n = int(dur * SR)
    out = np.empty(n)
    for i in range(n):
        out[i] = buf[i % N]
        buf[i % N] = 0.5 * (buf[i % N] + buf[(i + 1) % N]) * 0.996
    return vel * lp(out, 1800) * env_adsr(n, 0.002, 0.05)


def explainer_bed(dur=12.0):
    """Plucked bass walking line + light brushed percussion, 100 bpm."""
    out = np.zeros(int(dur * SR) + SR)
    beat = 60 / 100
    line = [38, 45, 41, 43, 34, 41, 38, 40, 36, 43, 40, 41, 33, 40, 37, 38]
    cache = {}
    b = 0
    while b * beat < dur:
        n = line[b % len(line)]
        if n not in cache:
            cache[n] = pluck(n, beat * 0.9)
        place(out, cache[n] * 0.7, b * beat)
        hat = hp(rng.standard_normal(int(0.05 * SR)), 6000) * np.exp(-t(0.05) * 90) * 0.15
        place(out, hat, b * beat + beat / 2)
        if b % 2 == 0:
            k = np.sin(2 * np.pi * 55 * t(0.18) * np.exp(-t(0.18) * 8)) * np.exp(-t(0.18) * 22) * 0.35
            place(out, k, b * beat)
        else:
            sn = bp(rng.standard_normal(int(0.12 * SR)), 1500, 5000) * np.exp(-t(0.12) * 35) * 0.12
            place(out, sn, b * beat)
        if b % 8 == 4:
            place(out, piano(74, 1.2, 0.18), b * beat)
            place(out, piano(81, 1.2, 0.12), b * beat + 0.05)
        b += 1
    return norm(out[:int(dur * SR)], 0.8)


def sustained_piano():
    return norm(piano(62, 5.0) + 0.5 * piano(50, 5.0), 0.7)


# ---------- SFX ----------

def bell():
    tt = t(2.2)
    partials = [(1, 1.0), (2.76, 0.5), (5.40, 0.3), (8.93, 0.15)]
    x = sum(a * np.sin(2 * np.pi * 880 * p * tt) * np.exp(-tt * (1.8 + p)) for p, a in partials)
    return norm(x * np.minimum(1, tt / 0.002), 0.7)


def chime():
    tt = t(1.6)
    x = np.sin(2 * np.pi * 1318.5 * tt) * np.exp(-tt * 3) + 0.6 * np.sin(2 * np.pi * 1975.5 * (tt - 0.08).clip(0)) * np.exp(-(tt - 0.08).clip(0) * 3) * (tt > 0.08)
    return norm(x, 0.5)


def fading_rise():
    tt = t(3.0)
    f = 220 * 2 ** (tt * 0.9)
    ph = 2 * np.pi * np.cumsum(f) / SR
    bright = np.exp(-tt * 1.4)
    x = np.sin(ph) + bright * (0.6 * np.sin(2 * ph) + 0.4 * np.sin(3 * ph) + 0.25 * np.sin(5 * ph))
    x *= np.minimum(1, tt / 0.3) * np.linspace(1, 0.15, len(tt))
    return norm(fade(x, 0.2, 0.8), 0.5)


def click_hum():
    c = hp(rng.standard_normal(int(0.02 * SR)), 2000) * np.exp(-t(0.02) * 200)
    tt = t(1.4)
    h = (np.sin(2 * np.pi * 110 * tt) + 0.4 * np.sin(2 * np.pi * 220 * tt) + 0.2 * np.sin(2 * np.pi * 330 * tt))
    h *= np.minimum(1, tt / 0.15) * np.exp(-tt * 1.2) * 0.4
    x = np.zeros(len(tt))
    x[:len(c)] += c
    return norm(x + h, 0.6)


def latch():
    thud = np.sin(2 * np.pi * 70 * t(0.4)) * np.exp(-t(0.4) * 14)
    clk = hp(rng.standard_normal(int(0.03 * SR)), 1500) * np.exp(-t(0.03) * 150) * 0.6
    x = np.zeros(int(0.6 * SR))
    x[:len(thud)] += thud
    x[int(0.04 * SR):int(0.04 * SR) + len(clk)] += clk
    return norm(x, 0.7)


def electronic_chord():
    tt = t(2.5)
    x = sum(np.sin(2 * np.pi * hz(n) * tt) + 0.3 * np.sin(4 * np.pi * hz(n) * tt) for n in [62, 66, 69, 74])
    return norm(fade(x, 0.25, 1.4), 0.45)


def shuffle():
    x = np.zeros(int(1.3 * SR))
    for i in range(18):
        s = int((0.05 + i * 0.06 + rng.uniform(0, 0.02)) * SR)
        burst = bp(rng.standard_normal(int(0.04 * SR)), 2000, 8000) * np.exp(-t(0.04) * 70)
        x[s:s + len(burst)] += burst * rng.uniform(0.4, 1)
    return norm(x, 0.45)


def coin():
    tt = t(2.0)
    wob = 1 + 0.5 * np.sin(2 * np.pi * (4 + 10 * tt) * tt)
    x = np.sin(2 * np.pi * 3400 * tt) * wob * np.exp(-tt * 1.5) + 0.5 * np.sin(2 * np.pi * 5100 * tt) * np.exp(-tt * 3)
    return norm(x, 0.35)


def cups():
    x = np.zeros(int(1.6 * SR))
    for i in range(3):
        tt = t(0.35)
        c = (np.sin(2 * np.pi * 2600 * tt) + 0.6 * np.sin(2 * np.pi * 4100 * tt)) * np.exp(-tt * 25)
        thump = np.sin(2 * np.pi * 180 * tt) * np.exp(-tt * 30)
        s = int((0.1 + i * 0.45) * SR)
        x[s:s + len(tt)] += 0.4 * c + thump
    return norm(x, 0.5)


def tape_in():
    x = hp(rng.standard_normal(int(0.25 * SR)), 300) * 0.02
    clk = hp(rng.standard_normal(int(0.015 * SR)), 1000) * np.exp(-t(0.015) * 300) * 0.3
    x[:len(clk)] += clk
    return x


def server_ambience(dur):
    n = int(dur * SR)
    fanv = lp(rng.standard_normal(n), 600) * 0.25
    tt = t(dur)
    hum = 0.08 * np.sin(2 * np.pi * 120 * tt) + 0.03 * np.sin(2 * np.pi * 240 * tt)
    return norm(fade(fanv + hum, 1.5, 3), 0.5)


def archive_ambience(dur):
    n = int(dur * SR)
    room = lp(rng.standard_normal(n), 400) * 0.1
    for s in [1.0, 4.5, 8.0]:
        if s + 0.5 < dur:
            nb = int(0.45 * SR)
            pg = bp(rng.standard_normal(nb), 800, 6000) * np.sin(np.linspace(0, np.pi, nb)) ** 2 * 0.5
            room[int(s * SR):int(s * SR) + nb] += pg
    return norm(fade(room, 1.0, 2.5), 0.4)


SFX_MAP = [
    ("ledger bell", bell), ("bell", bell), ("chime", chime), ("rising tone", fading_rise), ("thins", fading_rise),
    ("click and hum", click_hum), ("latch", latch), ("electronic chord", electronic_chord), ("chord", electronic_chord),
    ("shuffl", shuffle), ("card", shuffle), ("coin", coin), ("cup", cups),
]


def sfx_for(desc):
    d = desc.lower()
    for key, fn in SFX_MAP:
        if key in d:
            return fn()
    return chime() * 0.6
