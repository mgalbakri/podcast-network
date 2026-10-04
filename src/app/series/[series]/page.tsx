import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllSeries, getEpisodes, getInterest, getSeries, isLive, siteUrl } from '@/lib/content';
import { toTrack } from '@/lib/tracks';
import { SeriesCover } from '@/components/SeriesCover';
import { Tracklist } from '@/components/Tracklist';
import { PlayButton } from '@/components/player/PlayButton';
import { Swatch } from '@/components/SiteChrome';
import { CopyFeed } from '@/components/CopyFeed';

type Params = { params: Promise<{ series: string }> };

export function generateStaticParams() {
  return getAllSeries().map((s) => ({ series: s.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const s = getSeries((await params).series);
  if (!s) return {};
  return {
    title: s.title,
    description: s.tagline,
    alternates: { types: { 'application/rss+xml': `/series/${s.slug}/feed.xml` } },
    openGraph: { title: s.title, description: s.tagline, images: [`/covers/${s.slug}.png`] },
  };
}

export default async function SeriesPage({ params }: Params) {
  const s = getSeries((await params).series);
  if (!s) notFound();
  const eps = getEpisodes(s.slug);
  const first = eps.find(isLive);
  const firstTrack = first ? toTrack(first) : null;
  const live = eps.filter(isLive).length;

  return (
    <div className="pt-10 sm:pt-14">
      <div className="grid gap-8 md:grid-cols-[17rem_minmax(0,1fr)] md:gap-12">
        <SeriesCover series={s} className="w-56 rounded-sm ring-1 ring-line md:w-full" />
        <div>
          <h1 className="text-[clamp(2.8rem,7vw,5.5rem)] font-bold leading-[0.92] tracking-[-0.035em]">{s.title}</h1>
          <p className="mt-4 max-w-[52ch] text-xl leading-snug">{s.tagline}</p>
          <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">
            {s.interests.map((slug) => {
              const i = getInterest(slug);
              return i ? (
                <li key={slug}>
                  <Link href={`/interests/${slug}`} className="flex items-center gap-2 text-slate hover:text-ink">
                    <Swatch hue={i.hue} />
                    {i.name}
                  </Link>
                </li>
              ) : null;
            })}
          </ul>
          {firstTrack && first && (
            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
              <PlayButton track={firstTrack} />
              <span className="text-slate">
                Start with episode {first.number}. {live} of {eps.length} episodes ready to play.
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="prose-room mt-12">
        <p>{s.description}</p>
      </div>

      <section aria-labelledby="episodes" className="mt-14">
        <h2 id="episodes" className="mb-5 text-3xl font-bold tracking-tight">
          Episodes
        </h2>
        <Tracklist episodes={eps} />
      </section>

      <section aria-labelledby="cast" className="mt-16 grid gap-10 md:grid-cols-2">
        <div>
          <h2 id="cast" className="mb-4 text-2xl font-bold tracking-tight">
            Cast
          </h2>
          <dl className="divide-y divide-line border-y border-line">
            {s.cast.map((p) => (
              <div key={p.name} className="grid grid-cols-[11rem_minmax(0,1fr)] gap-4 py-2.5">
                <dt className="font-semibold">{p.name}</dt>
                <dd className="text-slate">{p.role}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div>
          <h2 className="mb-4 text-2xl font-bold tracking-tight">Experts</h2>
          <dl className="divide-y divide-line border-y border-line">
            {s.experts.map((p) => (
              <div key={p.name} className="grid grid-cols-[11rem_minmax(0,1fr)] gap-4 py-2.5">
                <dt className="font-semibold">{p.name}</dt>
                <dd className="text-slate">{p.role}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section aria-labelledby="credits" className="mt-16 grid gap-10 md:grid-cols-2">
        {s.source && (
          <div>
            <h2 id="credits" className="mb-3 text-2xl font-bold tracking-tight">
              Source
            </h2>
            <p className="max-w-[60ch] font-serif leading-relaxed">
              Adapted from <em>{s.source.title}</em> by {s.source.author}, {s.source.institution}, {s.source.year}, licensed{' '}
              <a href={s.source.licenseUrl} className="link">
                {s.source.license}
              </a>
              .{' '}
              {s.source.code && (
                <>
                  The experiments&apos; code is at{' '}
                  <a href={s.source.code} className="link">
                    {s.source.code.replace('https://', '')}
                  </a>
                  .
                </>
              )}
            </p>
            {s.disclaimer && <p className="mt-3 max-w-[60ch] text-sm text-slate">{s.disclaimer}</p>}
          </div>
        )}
        <div>
          <h2 className="mb-3 text-2xl font-bold tracking-tight">Listen in a podcast app</h2>
          <p className="mb-3 max-w-[56ch] text-slate">
            Copy the feed address and add it in Apple Podcasts, Overcast, Pocket Casts or any app that accepts a feed URL.
          </p>
          <CopyFeed url={`${siteUrl()}/series/${s.slug}/feed.xml`} />
        </div>
      </section>
    </div>
  );
}
