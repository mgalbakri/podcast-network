import fs from 'node:fs';
import path from 'node:path';
import type { Track } from '@/components/player/PlayerProvider';
import { episodeHref, getSeries, isLive, type Episode } from './content';

export function toTrack(e: Episode): Track | null {
  if (!isLive(e) || !e.audio) return null;
  return {
    id: `${e.series}/${e.slug}`,
    title: e.title,
    seriesTitle: getSeries(e.series)?.title ?? e.series,
    number: e.number,
    href: episodeHref(e),
    url: e.audio.url,
    duration: e.duration ?? 0,
    chapters: e.chapters,
  };
}

/** Read an episode's peaks file and downsample to n bars (max per bucket keeps transients). */
export function loadBars(e: Episode, n: number): number[] {
  if (!e.peaks) return [];
  try {
    const raw = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', e.peaks), 'utf8')) as number[];
    const out: number[] = [];
    for (let i = 0; i < n; i++) {
      const a = Math.floor((i * raw.length) / n);
      const b = Math.max(a + 1, Math.floor(((i + 1) * raw.length) / n));
      let m = 0;
      for (let j = a; j < b; j++) m += raw[j];
      out.push(Math.round(Math.pow(m / (b - a), 1.6) * 1000) / 1000);
    }
    return out;
  } catch {
    return [];
  }
}
