'use client';

import { useRef, useState } from 'react';
import { usePlayer, type Track } from './PlayerProvider';
import { clock } from '@/lib/format';

type Props = {
  track: Track;
  bars: number[]; // 0..1, already downsampled on the server
  height?: number;
  showChapters?: boolean;
  label?: string;
};

/**
 * The episode's real waveform as a scrubber. Played portion in ink, the rest in line grey,
 * a red playhead while this episode is the active track, chapter notches along the top.
 */
export function Waveform({ track, bars, height = 120, showChapters = true, label }: Props) {
  const p = usePlayer();
  const ref = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState<number | null>(null);
  const active = p.track?.id === track.id;
  const dur = (active && p.duration) || track.duration;
  const progress = active && dur ? Math.min(1, p.time / dur) : 0;

  const W = bars.length * 4;
  const H = 100;
  const path = bars
    .map((v, i) => {
      const h = Math.max(2, v * H);
      return `M${i * 4 + 0.6} ${(H - h) / 2}h2.6v${h}h-2.6z`;
    })
    .join('');

  const frac = (clientX: number) => {
    const r = ref.current!.getBoundingClientRect();
    return Math.min(1, Math.max(0, (clientX - r.left) / r.width));
  };
  const goTo = (f: number) => {
    const t = f * dur;
    if (active) {
      p.seek(t);
      if (!p.playing) p.toggle();
    } else p.play(track, t);
  };

  const onKey = (e: React.KeyboardEvent) => {
    const cur = active ? p.time : 0;
    const step = e.key === 'PageUp' || e.key === 'PageDown' ? 60 : 10;
    if (e.key === 'ArrowRight' || e.key === 'PageUp') goTo(Math.min(dur, cur + step) / dur);
    else if (e.key === 'ArrowLeft' || e.key === 'PageDown') goTo(Math.max(0, cur - step) / dur);
    else if (e.key === 'Home') goTo(0);
    else if (e.key === ' ' || e.key === 'Enter') {
      if (active) p.toggle();
      else p.play(track);
    } else return;
    e.preventDefault();
  };

  return (
    <div className="select-none">
      {showChapters && track.chapters.length > 1 && (
        <div className="relative mb-1.5 h-3" aria-hidden="true">
          {track.chapters.map((c) => (
            <span
              key={c.start}
              title={c.title}
              className="absolute top-0 h-3 w-0.5 -translate-x-1/2 rounded-full bg-slate/70"
              style={{ left: `${(c.start / dur) * 100}%` }}
            />
          ))}
        </div>
      )}
      <div
        ref={ref}
        role="slider"
        tabIndex={0}
        aria-label={label ?? `${track.title} waveform. Click to play from that point.`}
        aria-valuemin={0}
        aria-valuemax={Math.round(dur)}
        aria-valuenow={Math.round(active ? p.time : 0)}
        aria-valuetext={`${clock(active ? p.time : 0)} of ${clock(dur)}`}
        onKeyDown={onKey}
        onPointerMove={(e) => setHover(frac(e.clientX))}
        onPointerLeave={() => setHover(null)}
        onClick={(e) => goTo(frac(e.clientX))}
        className="group relative cursor-pointer"
        style={{ height }}
      >
        <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="absolute inset-0 size-full">
          <defs>
            <clipPath id={`played-${track.id.replace(/\W/g, '')}`}>
              <rect x="0" y="0" width={W * progress} height={H} />
            </clipPath>
          </defs>
          <path d={path} className="fill-slate/35" />
          <path d={path} className="fill-ink" clipPath={`url(#played-${track.id.replace(/\W/g, '')})`} />
        </svg>
        {active && (
          <span className="absolute inset-y-0 w-0.5 bg-onair" style={{ left: `${progress * 100}%` }} aria-hidden="true" />
        )}
        {hover !== null && (
          <span
            className="pointer-events-none absolute -top-7 -translate-x-1/2 rounded bg-ink px-1.5 py-0.5 text-xs tabular-nums text-room"
            style={{ left: `${hover * 100}%` }}
            aria-hidden="true"
          >
            {clock(hover * dur)}
          </span>
        )}
      </div>
    </div>
  );
}
