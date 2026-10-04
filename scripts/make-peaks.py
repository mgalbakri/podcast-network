"""Compute waveform peaks for every MP3 in media/ -> public/peaks/<series>/<episode>.json.
Run after adding audio:  npm run peaks   (needs ffmpeg and numpy)"""
import json, pathlib, subprocess, numpy as np
ROOT = pathlib.Path(__file__).resolve().parent.parent
BINS = 1200
for mp3 in sorted((ROOT / 'media').glob('*/*.mp3')):
    out = ROOT / 'public' / 'peaks' / mp3.parent.name / (mp3.stem + '.json')
    if out.exists() and out.stat().st_mtime > mp3.stat().st_mtime:
        continue
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', str(mp3), '-ac', '1', '-ar', '8000', '-f', 's16le', '-'],
                         capture_output=True, check=True).stdout
    x = np.abs(np.frombuffer(raw, np.int16).astype(np.float32)) / 32768
    chunks = np.array_split(x, BINS)
    peaks = np.array([np.sqrt(np.mean(c ** 2)) if len(c) else 0 for c in chunks])
    lo, hi = np.percentile(peaks, 8), np.percentile(peaks, 99.5)
    peaks = np.clip((peaks - lo) / ((hi - lo) or 1), 0.06, 1)
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(json.dumps([round(float(p), 3) for p in peaks]))
    print('peaks:', out.relative_to(ROOT))
