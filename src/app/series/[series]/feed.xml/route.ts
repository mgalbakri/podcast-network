import { episodeHref, getAllSeries, getEpisodes, getSeries, isLive, siteUrl } from '@/lib/content';
import { rfc822 } from '@/lib/format';

export const dynamic = 'force-static';

export function generateStaticParams() {
  return getAllSeries().map((s) => ({ series: s.slug }));
}

const x = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');

const hms = (sec = 0) =>
  [Math.floor(sec / 3600), Math.floor((sec % 3600) / 60), Math.floor(sec % 60)].map((n) => String(n).padStart(2, '0')).join(':');

/** Podcast RSS 2.0 feed with Apple Podcasts tags. Only episodes with published audio are included. */
export async function GET(_req: Request, ctx: { params: Promise<{ series: string }> }) {
  const s = getSeries((await ctx.params).series);
  if (!s) return new Response('Not found', { status: 404 });
  const base = siteUrl();
  const abs = (u: string) => (u.startsWith('http') ? u : `${base}${u}`);
  const cover = `${base}/covers/${s.slug}.png`;
  const items = getEpisodes(s.slug)
    .filter(isLive)
    .sort((a, b) => b.number - a.number)
    .map((e) => {
      const link = `${base}${episodeHref(e)}`;
      const chapters = e.chapters.length
        ? `\n\nChapters:\n${e.chapters.map((c) => `${hms(c.start)} ${c.title}`).join('\n')}`
        : '';
      return `    <item>
      <title>${x(e.title)}</title>
      <itunes:title>${x(e.title)}</itunes:title>
      <itunes:episode>${e.number}</itunes:episode>
      <itunes:episodeType>full</itunes:episodeType>
      <guid isPermaLink="false">${x(`${s.slug}/${e.slug}`)}</guid>
      <link>${x(link)}</link>
      <description>${x(`${e.summary}\n\nFull transcript and show notes: ${link}${chapters}`)}</description>
      <itunes:summary>${x(e.summary)}</itunes:summary>
      <pubDate>${rfc822(e.published)}</pubDate>
      <enclosure url="${x(abs(e.audio!.url))}" length="${e.audio!.bytes}" type="audio/mpeg"/>
      <itunes:duration>${hms(e.duration)}</itunes:duration>
      <itunes:image href="${x(cover)}"/>
      <itunes:explicit>${s.explicit ? 'true' : 'false'}</itunes:explicit>
    </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${x(s.title)}</title>
    <link>${x(`${base}/series/${s.slug}`)}</link>
    <atom:link href="${x(`${base}/series/${s.slug}/feed.xml`)}" rel="self" type="application/rss+xml"/>
    <language>${x(s.language)}</language>
    <description>${x(s.description)}</description>
    <itunes:summary>${x(s.description)}</itunes:summary>
    <itunes:subtitle>${x(s.tagline)}</itunes:subtitle>
    <itunes:author>${x(s.author)}</itunes:author>
    <itunes:owner><itunes:name>${x(s.owner.name)}</itunes:name><itunes:email>${x(s.owner.email)}</itunes:email></itunes:owner>
    <itunes:image href="${x(cover)}"/>
    <image><url>${x(cover)}</url><title>${x(s.title)}</title><link>${x(`${base}/series/${s.slug}`)}</link></image>
    <itunes:category text="${x(s.category)}">${s.subcategory ? `<itunes:category text="${x(s.subcategory)}"/>` : ''}</itunes:category>
    <itunes:explicit>${s.explicit ? 'true' : 'false'}</itunes:explicit>
    <itunes:type>serial</itunes:type>
    ${s.source ? `<copyright>${x(`Adapted from work by ${s.source.author} (${s.source.year}), ${s.source.license}`)}</copyright>` : ''}
${items}
  </channel>
</rss>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
}
