import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllSeries, getEpisodes, getInterest } from '@/lib/content';
import { SeriesCover } from '@/components/SeriesCover';

export const metadata: Metadata = { title: 'Shows', description: 'Every show on The Listening Room.' };

export default function SeriesIndex() {
  return (
    <div className="pt-10 sm:pt-14">
      <h1 className="mb-10 text-[clamp(2.6rem,7vw,5rem)] font-bold leading-[0.95] tracking-[-0.03em]">Shows</h1>
      <ul className="border-t border-ink">
        {getAllSeries().map((s) => {
          const eps = getEpisodes(s.slug);
          return (
            <li key={s.slug} className="border-b border-line py-8">
              <Link href={`/series/${s.slug}`} className="group grid gap-6 sm:grid-cols-[12rem_minmax(0,1fr)]">
                <SeriesCover series={s} className="w-40 rounded-sm ring-1 ring-line sm:w-full" />
                <span>
                  <span className="block text-3xl font-bold tracking-tight group-hover:text-signal">{s.title}</span>
                  <span className="mt-2 block max-w-[60ch] font-serif text-lg leading-relaxed text-ink/85">{s.tagline}</span>
                  <span className="mt-3 block text-sm text-slate">
                    {eps.length} episodes. {s.interests.map((i) => getInterest(i)?.name).filter(Boolean).join(', ')}.
                  </span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
