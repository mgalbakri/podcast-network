'use client';

import { useEffect, useState } from 'react';
import { usePlayer, type Track } from './PlayerProvider';
import { PauseIcon, PlayIcon } from './icons';
import { clock } from '@/lib/format';

export function PlayButton({ track, size = 'lg' }: { track: Track; size?: 'lg' | 'sm' }) {
  const p = usePlayer();
  const active = p.track?.id === track.id;
  const playing = active && p.playing;
  const [saved, setSaved] = useState(0);

  useEffect(() => {
    try {
      setSaved(Number(localStorage.getItem(`tlr:pos:${track.id}`) ?? 0) || 0);
    } catch {
      /* storage unavailable */
    }
  }, [track.id, p.playing]);

  const onClick = () => (active ? p.toggle() : p.play(track));
  const resumeAt = active ? p.time : saved;
  const label = playing ? 'Pause' : resumeAt > 30 ? `Resume at ${clock(resumeAt)}` : 'Play episode';

  if (size === 'sm') {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-label={`${playing ? 'Pause' : 'Play'} ${track.title}`}
        className="grid size-10 shrink-0 place-items-center rounded-full border border-ink/80 hover:border-onair hover:bg-onair hover:text-white aria-pressed:border-onair aria-pressed:bg-onair aria-pressed:text-white"
        aria-pressed={playing}
      >
        {playing ? <PauseIcon className="size-4" /> : <PlayIcon className="size-4 translate-x-px" />}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-3 rounded-full bg-onair py-3 pl-4 pr-6 text-lg font-semibold text-white hover:brightness-110"
    >
      {playing ? <PauseIcon className="size-6" /> : <PlayIcon className="size-6 translate-x-px" />}
      {label}
    </button>
  );
}

export function ChapterList({ track }: { track: Track }) {
  const p = usePlayer();
  const active = p.track?.id === track.id;
  const current = active ? [...track.chapters].reverse().find((c) => c.start <= p.time + 0.5) : undefined;
  return (
    <ol className="divide-y divide-line border-y border-line">
      {track.chapters.map((c) => {
        const on = current?.start === c.start;
        return (
          <li key={c.start}>
            <button
              type="button"
              onClick={() => (active ? (p.seek(c.start), !p.playing && p.toggle()) : p.play(track, c.start))}
              className="flex w-full items-baseline gap-4 py-2.5 text-left hover:text-signal"
              aria-current={on ? 'true' : undefined}
            >
              <span className="w-14 shrink-0 text-sm tabular-nums text-slate">{clock(c.start)}</span>
              <span className={on ? 'font-semibold' : ''}>{c.title}</span>
              {on && <span className="ml-auto size-2 shrink-0 self-center rounded-full bg-onair" aria-hidden="true" />}
            </button>
          </li>
        );
      })}
    </ol>
  );
}
