// Runs before every build (npm "prebuild").
// Publishes each MP3 in media/<series>/ and writes content/audio-manifest.json,
// which the site reads to find each episode's audio URL and size.
//
// - With BLOB_READ_WRITE_TOKEN (set automatically on Vercel once a Blob store is
//   connected to the project): uploads to Vercel Blob, skipping files already there.
// - Without it (local dev, or before Blob is connected): copies the files to
//   public/audio/ so the site still works, served as static files.
import { readdir, stat, mkdir, copyFile, writeFile } from 'node:fs/promises';
import { createReadStream } from 'node:fs';
import path from 'node:path';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const mediaDir = path.join(root, 'media');
const manifestPath = path.join(root, 'content', 'audio-manifest.json');
const token = process.env.BLOB_READ_WRITE_TOKEN;

async function listMp3s() {
  const out = [];
  let seriesDirs = [];
  try { seriesDirs = await readdir(mediaDir, { withFileTypes: true }); } catch { return out; }
  for (const d of seriesDirs) {
    if (!d.isDirectory()) continue;
    for (const f of await readdir(path.join(mediaDir, d.name))) {
      if (f.toLowerCase().endsWith('.mp3')) out.push({ series: d.name, file: f, full: path.join(mediaDir, d.name, f) });
    }
  }
  return out;
}

const files = await listMp3s();
const manifest = {};

if (token) {
  const { put, head } = await import('@vercel/blob');
  for (const f of files) {
    const pathname = `audio/${f.series}/${f.file}`;
    const { size } = await stat(f.full);
    let url;
    try {
      const existing = await head(pathname, { token });
      if (existing.size === size) url = existing.url;
    } catch { /* not uploaded yet */ }
    if (!url) {
      const res = await put(pathname, createReadStream(f.full), {
        access: 'public', token, contentType: 'audio/mpeg',
        addRandomSuffix: false, allowOverwrite: true, multipart: true,
      });
      url = res.url;
      console.log(`uploaded ${pathname}`);
    } else {
      console.log(`already in Blob: ${pathname}`);
    }
    manifest[`${f.series}/${f.file}`] = { url, bytes: size };
  }
} else {
  for (const f of files) {
    const dest = path.join(root, 'public', 'audio', f.series, f.file);
    await mkdir(path.dirname(dest), { recursive: true });
    await copyFile(f.full, dest);
    const { size } = await stat(f.full);
    manifest[`${f.series}/${f.file}`] = { url: `/audio/${f.series}/${f.file}`, bytes: size };
  }
  if (files.length) console.log(`no BLOB_READ_WRITE_TOKEN: served ${files.length} file(s) from public/audio`);
}

await writeFile(manifestPath, JSON.stringify(manifest, null, 2) + '\n');
console.log(`audio manifest: ${Object.keys(manifest).length} file(s)`);
