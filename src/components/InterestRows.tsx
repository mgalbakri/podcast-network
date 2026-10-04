import Link from 'next/link';
import { getByInterest, getInterests } from '@/lib/content';
import { Swatch } from './SiteChrome';

const plural = (n: number, one: string, many: string) => `${n} ${n === 1 ? one : many}`;

/** Interests as large typographic rows, ones with something to hear listed first. */
export function InterestRows() {
  const rows = getInterests()
    .map((i) => ({ ...i, ...getByInterest(i.slug) }))
    .sort((a, b) => Number(b.episodes.length > 0) - Number(a.episodes.length > 0));
  return (
    <ul className="border-t border-ink">
      {rows.map((i) => {
        const empty = i.episodes.length === 0 && i.series.length === 0;
        return (
          <li key={i.slug} className="border-b border-line">
            <Link
              href={`/interests/${i.slug}`}
              className="group grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-6 gap-y-1 py-4 sm:grid-cols-[minmax(0,22rem)_minmax(0,1fr)_auto]"
            >
              <span className="flex items-center gap-3">
                <Swatch hue={i.hue} />
                <span className={`text-2xl font-semibold tracking-tight group-hover:text-signal ${empty ? 'text-slate' : ''}`}>
                  {i.name}
                </span>
              </span>
              <span className="col-span-2 row-start-2 font-serif text-[0.97rem] text-slate sm:col-span-1 sm:row-start-auto">{i.blurb}</span>
              <span className="text-right text-sm tabular-nums text-slate">
                {empty
                  ? 'Nothing here yet'
                  : `${plural(i.series.length, 'show', 'shows')}, ${plural(i.episodes.length, 'episode', 'episodes')}`}
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
