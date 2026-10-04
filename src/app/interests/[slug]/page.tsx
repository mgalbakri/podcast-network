import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getByInterest, getInterest, getInterests } from '@/lib/content';
import { Tracklist } from '@/components/Tracklist';
import { SeriesCover } from '@/components/SeriesCover';
import { Swatch } from '@/components/SiteChrome';

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getInterests().map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const i = getInterest((await params).slug);
  return i ? { title: i.name, description: i.blurb } : {};
}

export default async function InterestPage({ params }: Params) {
  const interest = getInterest((await params).slug);
  if (!interest) notFound();
  const { series, episodes } = getByInterest(interest.slug);

  return (
    <div className="pt-10 sm:pt-14">
      <p className="text-[0.95rem]">
        <Link href="/interests" className="text-slate hover:text-ink">
          All interests
        </Link>
      </p>
      <h1 className="mt-2 flex items-center gap-4 text-[clamp(2.6rem,7vw,5rem)] font-bold leading-[0.95] tracking-[-0.03em]">
        <Swatch hue={interest.hue} />
        {interest.name}
      </h1>
      <p className="mt-4 max-w-[56ch] font-serif text-lg text-ink/85">{interest.blurb}</p>

      {series.length === 0 && episodes.length === 0 ? (
        <p className="mt-12 max-w-[56ch] border-t border-ink pt-6 text-lg">
          Nothing here yet. Shows about {interest.name.toLowerCase()} will appear here as they are published.{' '}
          <Link href="/interests" className="link">
            Browse other interests
          </Link>
          .
        </p>
      ) : (
        <>
          {series.length > 0 && (
            <section aria-labelledby="shows" className="mt-12">
              <h2 id="shows" className="mb-5 text-2xl font-bold tracking-tight">
                Shows
              </h2>
              <ul className="grid gap-8 sm:grid-cols-2">
                {series.map((s) => (
                  <li key={s.slug}>
                    <Link href={`/series/${s.slug}`} className="group grid grid-cols-[6.5rem_minmax(0,1fr)] gap-4">
                      <SeriesCover series={s} className="w-full rounded-sm ring-1 ring-line" />
                      <span>
                        <span className="block text-xl font-semibold group-hover:text-signal">{s.title}</span>
                        <span className="mt-1 block font-serif text-[0.97rem] leading-relaxed text-ink/85">{s.tagline}</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
          {episodes.length > 0 && (
            <section aria-labelledby="episodes" className="mt-14">
              <h2 id="episodes" className="mb-5 text-2xl font-bold tracking-tight">
                Episodes about {interest.name.toLowerCase()}
              </h2>
              <Tracklist episodes={episodes} showSeries />
            </section>
          )}
        </>
      )}
    </div>
  );
}
