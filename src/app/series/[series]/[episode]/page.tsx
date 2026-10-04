import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { episodeHref, getAllEpisodes, getEpisode, getEpisodes, getInterest, getSeries } from '@/lib/content';
import { loadBars, toTrack } from '@/lib/tracks';
import { parseTranscript, renderNotes, splitBody } from '@/lib/transcript';
import { longDate, minutes } from '@/lib/format';
import { PlayButton, ChapterList } from '@/components/player/PlayButton';
import { Waveform } from '@/components/player/Waveform';
import { Swatch } from '@/components/SiteChrome';

type Params = { params: Promise<{ series: string; episode: string }> };

export function generateStaticParams() {
  return getAllEpisodes().map((e) => ({ series: e.series, episode: e.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const p = await params;
  const e = getEpisode(p.series, p.episode);
  const s = getSeries(p.series);
  if (!e || !s) return {};
  return {
    title: `${e.title}, ${s.title} episode ${e.number}`,
    description: e.summary,
    openGraph: { title: e.title, description: e.summary, images: [`/covers/${s.slug}.png`], type: 'article' },
  };
}

const CUE: Record<string, string> = { MUSIC: 'Music', SFX: 'Sound', TAPE: 'Tape', AMBIENCE: 'Ambience', BEAT: 'Pause' };

export default async function EpisodePage({ params }: Params) {
  const p = await params;
  const e = getEpisode(p.series, p.episode);
  const s = getSeries(p.series);
  if (!e || !s) notFound();
  const track = toTrack(e);
  const bars = loadBars(e, 260);
  const { script, notes } = splitBody(e.body);
  const blocks = parseTranscript(script);
  const notesHtml = notes ? await renderNotes(notes) : '';
  const siblings = getEpisodes(s.slug);
  const prev = siblings.find((x) => x.number === e.number - 1);
  const next = siblings.find((x) => x.number === e.number + 1);

  return (
    <article className="pt-10 sm:pt-14">
      <p className="text-[0.95rem] text-slate">
        <Link href={`/series/${s.slug}`} className="text-ink hover:text-signal">
          {s.title}
        </Link>
        , episode {e.number} of {siblings.length}
      </p>
      <h1 className="mt-2 max-w-[16ch] text-[clamp(2.8rem,8vw,6.25rem)] font-bold leading-[0.92] tracking-[-0.035em]">{e.title}</h1>
      <p className="mt-6 max-w-[60ch] font-serif text-lg leading-relaxed sm:text-xl">{e.summary}</p>

      <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm">
        {e.interests.map((slug) => {
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

      {track ? (
        <section aria-label="Listen" className="mt-9">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <PlayButton track={track} />
            <span className="text-slate">
              {minutes(e.duration)}. Published {longDate(e.published)}.
            </span>
          </div>
          {bars.length > 0 && (
            <div className="mt-9">
              <Waveform track={track} bars={bars} height={110} />
            </div>
          )}
          {e.chapters.length > 0 && (
            <div className="mt-10 max-w-2xl">
              <h2 className="mb-3 text-xl font-bold tracking-tight">Chapters</h2>
              <ChapterList track={track} />
            </div>
          )}
        </section>
      ) : (
        <p className="mt-8 max-w-[60ch] border-l-2 border-line pl-4 text-slate">
          The audio for this episode is in production ({minutes(undefined, e.estimatedMinutes)}). The full transcript and show notes are ready below.
        </p>
      )}

      <nav aria-label="On this page" className="mt-14 flex gap-6 border-b border-line pb-3 text-[0.95rem]">
        <a href="#transcript" className="font-semibold hover:text-signal">
          Transcript
        </a>
        {notesHtml && (
          <a href="#notes" className="font-semibold hover:text-signal">
            Show notes
          </a>
        )}
      </nav>

      <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,1fr)_15rem]">
        <section id="transcript" aria-labelledby="transcript-h" className="min-w-0 scroll-mt-6">
          <h2 id="transcript-h" className="text-3xl font-bold tracking-tight">
            Transcript
          </h2>
          {e.coverage && <p className="mt-2 max-w-[68ch] text-sm text-slate">{e.coverage}</p>}
          <div className="mt-6 max-w-[78ch]">
            {blocks.map((b, i) => {
              if (b.kind === 'segment')
                return b.level === 3 ? (
                  <h3 key={i} id={b.id} className="mt-12 scroll-mt-6 border-t border-ink pt-4 text-2xl font-bold tracking-tight">
                    {b.title}
                  </h3>
                ) : (
                  <h4 key={i} id={b.id} className="mt-8 scroll-mt-6 text-lg font-semibold">
                    {b.title}
                  </h4>
                );
              if (b.kind === 'cue')
                return (
                  <p key={i} className="my-3 font-serif text-[0.92rem] italic text-slate sm:ml-[10.75rem]">
                    {CUE[b.type] ?? b.type}
                    {b.text ? `: ${b.text}` : ''}
                  </p>
                );
              return (
                <div key={i} className="transcript-line">
                  <span className="pt-0.5 text-[0.95rem] font-semibold">{b.speaker}</span>
                  <p className="font-serif text-[1.03rem] leading-[1.7]" dangerouslySetInnerHTML={{ __html: b.html }} />
                </div>
              );
            })}
          </div>
        </section>
        <aside className="hidden lg:block">
          <div className="sticky top-6">
            <h2 className="mb-2 text-sm font-semibold text-slate">Segments</h2>
            <ol className="space-y-1.5 text-[0.93rem]">
              {blocks
                .filter((b) => b.kind === 'segment' && b.level === 3)
                .map((b) => (
                  <li key={(b as { id: string }).id}>
                    <a href={`#${(b as { id: string }).id}`} className="hover:text-signal">
                      {(b as { title: string }).title}
                    </a>
                  </li>
                ))}
              {notesHtml && (
                <li>
                  <a href="#notes" className="hover:text-signal">
                    Show notes
                  </a>
                </li>
              )}
            </ol>
          </div>
        </aside>
      </div>

      {notesHtml && (
        <section id="notes" aria-labelledby="notes-h" className="mt-20 scroll-mt-6">
          <h2 id="notes-h" className="border-t border-ink pt-4 text-3xl font-bold tracking-tight">
            Show notes
          </h2>
          <div className="prose-room mt-4 max-w-[80ch]" dangerouslySetInnerHTML={{ __html: notesHtml }} />
        </section>
      )}

      <nav aria-label="More episodes" className="mt-20 grid gap-6 border-t border-ink pt-6 sm:grid-cols-2">
        {prev ? (
          <Link href={episodeHref(prev)} className="group">
            <span className="block text-sm text-slate">Previous, episode {prev.number}</span>
            <span className="text-xl font-semibold group-hover:text-signal">{prev.title}</span>
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link href={episodeHref(next)} className="group sm:text-right">
            <span className="block text-sm text-slate">Next, episode {next.number}</span>
            <span className="text-xl font-semibold group-hover:text-signal">{next.title}</span>
          </Link>
        )}
      </nav>
    </article>
  );
}
