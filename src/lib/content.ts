import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const ROOT = process.cwd();
const CONTENT = path.join(ROOT, 'content');

export type Interest = { slug: string; name: string; blurb: string; hue: string };

export type Person = { name: string; role: string };

export type Series = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  interests: string[];
  language: string;
  author: string;
  owner: { name: string; email: string };
  explicit: boolean;
  category: string;
  subcategory?: string;
  palette: { base: string; accent: string; light: string };
  cast: Person[];
  experts: Person[];
  source?: {
    title: string;
    author: string;
    institution: string;
    year: number;
    license: string;
    licenseUrl: string;
    code?: string;
  };
  disclaimer?: string;
};

export type Chapter = { start: number; title: string };

export type Episode = {
  series: string;
  number: number;
  title: string;
  slug: string;
  summary: string;
  coverage: string;
  interests: string[];
  estimatedMinutes: number;
  status: 'published' | 'in-production';
  published?: string;
  audio?: { url: string; bytes: number };
  duration?: number;
  chapters: Chapter[];
  peaks?: string;
  body: string;
};

function readJson<T>(file: string, fallback: T): T {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8')) as T;
  } catch {
    return fallback;
  }
}

let cache: { interests: Interest[]; series: Series[]; episodes: Episode[] } | null = null;

function load() {
  if (cache) return cache;
  const interests = readJson<Interest[]>(path.join(CONTENT, 'interests.json'), []);
  const manifest = readJson<Record<string, { url: string; bytes: number }>>(
    path.join(CONTENT, 'audio-manifest.json'),
    {},
  );
  const seriesDir = path.join(CONTENT, 'series');
  const series: Series[] = [];
  const episodes: Episode[] = [];
  for (const slug of fs.existsSync(seriesDir) ? fs.readdirSync(seriesDir).sort() : []) {
    const dir = path.join(seriesDir, slug);
    if (!fs.statSync(dir).isDirectory()) continue;
    const s = readJson<Series | null>(path.join(dir, 'series.json'), null);
    if (!s) continue;
    series.push({ ...s, slug });
    const epDir = path.join(dir, 'episodes');
    for (const file of fs.existsSync(epDir) ? fs.readdirSync(epDir).sort() : []) {
      if (!file.endsWith('.md')) continue;
      const { data, content } = matter(fs.readFileSync(path.join(epDir, file), 'utf8'));
      const epSlug: string = data.slug ?? file.replace(/\.md$/, '');
      const audio = data.audio ? manifest[`${slug}/${data.audio}`] : undefined;
      const peaksFile = path.join(ROOT, 'public', 'peaks', slug, `${epSlug}.json`);
      const live = data.status === 'published' && !!audio;
      episodes.push({
        series: slug,
        number: Number(data.number),
        title: String(data.title),
        slug: epSlug,
        summary: String(data.summary ?? ''),
        coverage: String(data.coverage ?? ''),
        interests: data.interests ?? [],
        estimatedMinutes: Number(data.estimatedMinutes ?? 0),
        status: live ? 'published' : 'in-production',
        published: data.published ? String(data.published) : undefined,
        audio: live ? audio : undefined,
        duration: data.duration ? Number(data.duration) : undefined,
        chapters: (data.chapters ?? []) as Chapter[],
        peaks: fs.existsSync(peaksFile) ? `/peaks/${slug}/${epSlug}.json` : undefined,
        body: content,
      });
    }
  }
  episodes.sort((a, b) => a.series.localeCompare(b.series) || a.number - b.number);
  cache = { interests, series, episodes };
  return cache;
}

export const getInterests = () => load().interests;
export const getInterest = (slug: string) => load().interests.find((i) => i.slug === slug);
export const getAllSeries = () => load().series;
export const getSeries = (slug: string) => load().series.find((s) => s.slug === slug);
export const getAllEpisodes = () => load().episodes;
export const getEpisodes = (series: string) => load().episodes.filter((e) => e.series === series);
export const getEpisode = (series: string, slug: string) =>
  load().episodes.find((e) => e.series === series && e.slug === slug);

export const isLive = (e: Episode) => e.status === 'published' && !!e.audio;

/** Most recently published episode across the network. */
export function getFeatured(): Episode | undefined {
  const live = load().episodes.filter(isLive);
  return live.sort((a, b) => (b.published ?? '').localeCompare(a.published ?? '') || b.number - a.number)[0];
}

/** Series and episodes tagged with an interest (an episode counts if it or its series carries the tag). */
export function getByInterest(slug: string) {
  const { series, episodes } = load();
  const s = series.filter((x) => x.interests.includes(slug));
  const e = episodes.filter((x) => x.interests.includes(slug));
  return { series: s, episodes: e };
}

export function episodeHref(e: Pick<Episode, 'series' | 'slug'>) {
  return `/series/${e.series}/${e.slug}`;
}

export function siteUrl() {
  const fromEnv =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : '');
  return (fromEnv || 'http://localhost:3000').replace(/\/$/, '');
}
