import Link from 'next/link';
import { episodeHref, getSeries, type Episode } from '@/lib/content';
import { toTrack } from '@/lib/tracks';
import { minutes } from '@/lib/format';
import { PlayButton } from './player/PlayButton';

/** Numbered episode list. Numbers are real: episodes are a sequence within their show. */
export function Tracklist({ episodes, showSeries = false }: { episodes: Episode[]; showSeries?: boolean }) {
  return (
    <ol className="border-t border-ink">
      {episodes.map((e) => {
        const track = toTrack(e);
        const series = showSeries ? getSeries(e.series) : undefined;
        return (
          <li key={`${e.series}/${e.slug}`} className="grid grid-cols-[2.5rem_minmax(0,1fr)_auto] items-start gap-x-4 border-b border-line py-5 sm:grid-cols-[3.5rem_minmax(0,1fr)_auto]">
            <span className="pt-0.5 text-2xl font-semibold tabular-nums text-slate sm:text-3xl">{e.number}</span>
            <div className="min-w-0">
              <h3 className="text-xl font-semibold leading-tight tracking-tight sm:text-2xl">
                <Link href={episodeHref(e)} className="hover:text-signal">
                  {e.title}
                </Link>
              </h3>
              {series && (
                <p className="mt-0.5 text-sm text-slate">
                  <Link href={`/series/${series.slug}`} className="hover:text-ink">
                    {series.title}
                  </Link>
                </p>
              )}
              <p className="mt-1.5 max-w-[62ch] font-serif text-[0.98rem] leading-relaxed text-ink/85">{e.summary}</p>
              <p className="mt-2 text-sm text-slate">
                {track ? minutes(e.duration) : `Transcript available. Audio in production, ${minutes(undefined, e.estimatedMinutes)}.`}
              </p>
            </div>
            <div className="pt-1">{track && <PlayButton track={track} size="sm" />}</div>
          </li>
        );
      })}
    </ol>
  );
}
