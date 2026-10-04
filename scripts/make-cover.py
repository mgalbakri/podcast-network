"""Render a series cover as a 3000x3000 PNG for podcast apps and link previews.
Matches src/components/SeriesCover.tsx.   usage: python3 scripts/make-cover.py <series-slug>
Needs: pip install pillow fonttools brotli"""
import io, json, pathlib, sys
from fontTools.ttLib import TTFont
from PIL import Image, ImageDraw, ImageFont

ROOT = pathlib.Path(__file__).resolve().parent.parent
FONT = ROOT / 'node_modules/@fontsource-variable/bricolage-grotesque/files/bricolage-grotesque-latin-wght-normal.woff2'


def font(size, weight):
    tt = TTFont(str(FONT)); tt.flavor = None
    buf = io.BytesIO(); tt.save(buf); buf.seek(0)
    f = ImageFont.truetype(buf, size)
    try:
        f.set_variation_by_axes([weight])
    except Exception:
        pass
    return f


def hex2rgb(h):
    h = h.lstrip('#'); return tuple(int(h[i:i + 2], 16) for i in (0, 2, 4))


def main(slug):
    s = json.loads((ROOT / 'content/series' / slug / 'series.json').read_text())
    base, accent, light = (hex2rgb(s['palette'][k]) for k in ('base', 'accent', 'light'))
    S = 3000; k = S / 300
    im = Image.new('RGB', (S, S), base)
    d = ImageDraw.Draw(im)
    # signal line + deterministic waveform (same generator as the React cover)
    seed = 7
    for c in slug:
        seed = (seed * 31 + ord(c)) & 0xFFFFFFFF
    def rnd():
        nonlocal seed
        seed = (seed * 1664525 + 1013904223) & 0xFFFFFFFF
        return seed / 2 ** 32
    import math
    dim = tuple(int(b + (l - b) * 0.35) for b, l in zip(base, light))
    d.line([(24 * k, 205 * k), (96 * k, 205 * k)], fill=dim, width=int(2 * k))
    for i in range(34):
        env = math.sin(i / 33 * math.pi) ** 0.8
        h = 6 + env * (14 + rnd() * 70)
        x = (100 + i * 5) * k
        d.rounded_rectangle([x, (205 - h / 2) * k, x + 3 * k, (205 + h / 2) * k], radius=1.5 * k, fill=light)
    d.line([(270 * k, 205 * k), (276 * k, 205 * k)], fill=dim, width=int(2 * k))
    d.ellipse([(255 * k, 31 * k), (269 * k, 45 * k)], fill=accent)
    title = font(int(52 * k), 700)
    for i, w in enumerate(s['title'].split(' ')):
        d.text((22 * k, (70 + i * 52) * k), w, font=title, fill=light, anchor='ls')
    small = font(int(14 * k), 450)
    d.text((24 * k, 276 * k), 'The Listening Room', font=small, fill=tuple(int(b + (l - b) * 0.7) for b, l in zip(base, light)), anchor='ls')
    out = ROOT / 'public/covers' / f'{slug}.png'
    out.parent.mkdir(parents=True, exist_ok=True)
    im.save(out, optimize=True)
    print('cover:', out.relative_to(ROOT), out.stat().st_size // 1024, 'KB')


if __name__ == '__main__':
    main(sys.argv[1] if len(sys.argv) > 1 else 'still-learning')
