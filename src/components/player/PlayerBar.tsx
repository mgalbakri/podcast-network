'use client';

import Link from 'next/link';
import { usePlayer } from './PlayerProvider';
import { BackIcon, ForwardIcon, PauseIcon, PlayIcon } from './icons';
import { clock } from '@/lib/format';

export function OnAirLamp({ on, className = '' }: { on: boolean; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block size-2.5 shrink-0 rounded-full transition-[background-color,box-shadow] duration-300 ${
        on ? 'bg-onair shadow-[0_0_0_4px_color-mix(in_oklab,var(--color-onair)_22%,transparent)]' : 'bg-line'
      } ${className}`}
    />
  );
}

export function PlayerBar() {
  const p = usePlayer();
  if (!p.track) return null;
  const t = p.track;
  const dur = p.duration || t.duration;
  const chapter = [...t.chapters].reverse().find((c) => c.start <= p.time + 0.5);

  return (
    <div
      role="region"
      aria-label="Audio player"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-panel/95 backdrop-blur supports-[backdrop-filter]:bg-panel/85 animate-[rise_.35s_ease-out]"
    >
      <style>{`@keyframes rise{from{transform:translateY(100%)}to{transform:none}}`}</style>
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-2.5 sm:gap-5 sm:px-6">
        <button
          type="button"
          onClick={p.toggle}
          aria-label={p.playing ? 'Pause' : 'Play'}
          className="grid size-11 shrink-0 place-items-center rounded-full bg-onair text-white hover:brightness-110"
        >
          {p.playing ? <PauseIcon className="size-5" /> : <PlayIcon className="size-5 translate-x-px" />}
        </button>
        <button type="button" onClick={() => p.skip(-15)} aria-label="Back 15 seconds" className="hidden text-slate hover:text-ink sm:block">
          <BackIcon className="size-6" />
        </button>
        <button type="button" onClick={() => p.skip(30)} aria-label="Forward 30 seconds" className="hidden text-slate hover:text-ink sm:block">
          <ForwardIcon className="size-6" />
        </button>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 text-sm">
            <OnAirLamp on={p.playing} />
            <span className="sr-only">{p.playing ? 'On air:' : 'Paused:'}</span>
            <Link href={t.href} className="truncate font-semibold hover:underline">
              {t.title}
            </Link>
            <span className="hidden truncate text-slate md:inline">
              {t.seriesTitle}, episode {t.number}
              {chapter ? `. ${chapter.title}` : ''}
            </span>
          </div>
          <div className="mt-1 flex items-center gap-3">
            <span className="w-14 shrink-0 text-xs tabular-nums text-slate">{clock(p.time)}</span>
            <input
              type="range"
              min={0}
              max={Math.max(1, Math.floor(dur))}
              step={1}
              value={Math.floor(p.time)}
              onChange={(e) => p.seek(Number(e.target.value))}
              aria-label="Seek"
              aria-valuetext={`${clock(p.time)} of ${clock(dur)}`}
              className="h-1.5 w-full cursor-pointer accent-[var(--color-onair)]"
            />
            <span className="w-14 shrink-0 text-right text-xs tabular-nums text-slate">-{clock(dur - p.time)}</span>
          </div>
        </div>

        <button
          type="button"
          onClick={p.cycleRate}
          aria-label={`Playback speed ${p.rate} times`}
          className="w-12 shrink-0 rounded border border-line py-1 text-sm tabular-nums hover:border-ink"
        >
          {p.rate}×
        </button>
      </div>
    </div>
  );
}
