import type { Series } from '@/lib/content';

/**
 * Generated cover art: the series title set large on its base colour, with a single
 * horizontal "signal" line that breaks into a waveform. Same design as public/covers/*.png.
 */
export function SeriesCover({ series, className = '' }: { series: Series; className?: string }) {
  const { base, accent, light } = series.palette;
  const words = series.title.split(' ');
  // deterministic waveform from the title
  let seed = [...series.slug].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7);
  const rnd = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 2 ** 32);
  const bars = Array.from({ length: 34 }, (_, i) => {
    const env = Math.sin((i / 33) * Math.PI) ** 0.8;
    return 6 + env * (14 + rnd() * 70);
  });
  return (
    <svg viewBox="0 0 300 300" role="img" aria-label={`${series.title} cover`} className={className}>
      <rect width="300" height="300" fill={base} />
      <line x1="24" y1="205" x2="96" y2="205" stroke={light} strokeOpacity="0.35" strokeWidth="2" />
      {bars.map((h, i) => (
        <rect key={i} x={100 + i * 5} y={205 - h / 2} width="3" height={h} rx="1.5" fill={light} fillOpacity={0.85} />
      ))}
      <line x1="270" y1="205" x2="276" y2="205" stroke={light} strokeOpacity="0.35" strokeWidth="2" />
      <circle cx="262" cy="38" r="7" fill={accent} />
      {words.map((w, i) => (
        <text
          key={w}
          x="22"
          y={70 + i * 52}
          fill={light}
          fontFamily="'Bricolage Grotesque Variable', sans-serif"
          fontWeight="700"
          fontSize="52"
          letterSpacing="-2"
        >
          {w}
        </text>
      ))}
      <text x="24" y="276" fill={light} fillOpacity="0.7" fontFamily="'Bricolage Grotesque Variable', sans-serif" fontSize="14">
        The Listening Room
      </text>
    </svg>
  );
}
