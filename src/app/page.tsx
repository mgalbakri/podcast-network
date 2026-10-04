import Link from 'next/link';
import { episodeHref, getAllSeries, getEpisodes, getFeatured, getSeries } from '@/lib/content';
import { loadBars, toTrack } from '@/lib/tracks';
import { longDate, minutes } from '@/lib/format';
import { PlayButton } from '@/components/player/PlayButton';
import { Waveform } from '@/components/player/Waveform';
import { InterestRows } from '@/components/InterestRows';
import { SeriesCover } from '@/components/SeriesCover';

export default function Home() {
  const featured = getFeatured();
  const track = featured ? toTrack(featured) : null;
  const series = featured ? getSeries(featured.series) : undefined;
  const bars = featured ? loadBars(featured, 220) : [];

  return (
    <>
      {featured && track && series ? (
        <section aria-labelledby="featured" className="pb-16 pt-10 sm:pt-16">
          <p className="text-[0.95rem] text-slate">
            New from{' '}
            <Link href={`/series/${series.slug}`} className="text-ink hover:text-signal">
              {series.title}
            </Link>
            , episode {featured.number}
          </p>
          <h1 id="featured" className="mt-2 max-w-[14ch] text-[clamp(3rem,9vw,7.5rem)] font-bold leading-[0.92] tracking-[-0.035em]">
            <Link href={episodeHref(featured)} className="hover:text-signal">
              {featured.title}
            </Link>
          </h1>
          <p className="mt-6 max-w-[60ch] font-serif text-lg leading-relaxed sm:text-xl">{featured.summary}</p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <PlayButton track={track} />
            <span className="text-slate">
              {minutes(featured.duration)}. Published {longDate(featured.published)}.
            </span>
            <Link href={`${episodeHref(featured)}#transcript`} className="link">
              Read the transcript
            </Link>
          </div>
          {bars.length > 0 && (
            <div className="mt-10">
              <Waveform track={track} bars={bars} height={150} />
              <p className="mt-2 text-sm text-slate">Click anywhere on the waveform to listen from that moment. The marks above it are chapters.</p>
            </div>
          )}
        </section>
      ) : (
        <section className="pb-16 pt-16">
          <h1 className="max-w-[16ch] text-[clamp(3rem,9vw,7rem)] font-bold leading-[0.92] tracking-[-0.035em]">
            The Listening Room
          </h1>
          <p className="mt-6 max-w-[56ch] font-serif text-xl">Documentary podcasts you can browse by interest, listen to, and read along with.</p>
        </section>
      )}

      <section aria-labelledby="browse" className="py-10">
        <h2 id="browse" className="mb-5 text-3xl font-bold tracking-tight sm:text-4xl">
          Browse by interest
        </h2>
        <InterestRows />
      </section>

      <section aria-labelledby="shows" className="py-10">
        <h2 id="shows" className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl">
          Shows
        </h2>
        <ul className="grid gap-10 sm:grid-cols-2">
          {getAllSeries().map((s) => {
            const eps = getEpisodes(s.slug);
            const live = eps.filter((e) => e.status === 'published').length;
            return (
              <li key={s.slug}>
                <Link href={`/series/${s.slug}`} className="group grid grid-cols-[8.5rem_minmax(0,1fr)] gap-5">
                  <SeriesCover series={s} className="w-full rounded-sm ring-1 ring-line" />
                  <span>
                    <span className="block text-2xl font-semibold tracking-tight group-hover:text-signal">{s.title}</span>
                    <span className="mt-1.5 block font-serif leading-relaxed text-ink/85">{s.tagline}</span>
                    <span className="mt-2 block text-sm text-slate">
                      {eps.length} episodes, {live} ready to play
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
}
