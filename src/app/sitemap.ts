import type { MetadataRoute } from 'next';
import { episodeHref, getAllEpisodes, getAllSeries, getInterests, siteUrl } from '@/lib/content';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  return [
    { url: `${base}/` },
    { url: `${base}/interests` },
    { url: `${base}/series` },
    { url: `${base}/about` },
    ...getInterests().map((i) => ({ url: `${base}/interests/${i.slug}` })),
    ...getAllSeries().map((s) => ({ url: `${base}/series/${s.slug}` })),
    ...getAllEpisodes().map((e) => ({ url: `${base}${episodeHref(e)}`, lastModified: e.published })),
  ];
}
