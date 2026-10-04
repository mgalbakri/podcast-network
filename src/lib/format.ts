export function clock(sec: number) {
  if (!Number.isFinite(sec) || sec < 0) sec = 0;
  const s = Math.floor(sec % 60);
  const m = Math.floor((sec / 60) % 60);
  const h = Math.floor(sec / 3600);
  const mm = h ? String(m).padStart(2, '0') : String(m);
  return `${h ? h + ':' : ''}${mm}:${String(s).padStart(2, '0')}`;
}

export function minutes(sec?: number, estimate?: number) {
  if (sec) return `${Math.round(sec / 60)} min`;
  if (estimate) return `about ${estimate} min`;
  return '';
}

export function longDate(iso?: string) {
  if (!iso) return '';
  return new Date(iso + 'T12:00:00Z').toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

export function rfc822(iso?: string) {
  return new Date((iso ?? '2026-01-01') + 'T06:00:00Z').toUTCString();
}
