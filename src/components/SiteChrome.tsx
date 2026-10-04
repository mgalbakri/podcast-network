import Link from 'next/link';

export function Header() {
  return (
    <header className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 pb-4 pt-6 sm:px-6">
      <Link href="/" className="flex shrink-0 items-center gap-2 whitespace-nowrap text-base font-bold tracking-tight sm:gap-2.5 sm:text-lg">
        <Mark />
        The Listening Room
      </Link>
      <nav aria-label="Main" className="flex gap-3.5 text-sm sm:gap-5 sm:text-[0.95rem]">
        <Link href="/interests" className="hover:text-signal">
          Browse
        </Link>
        <Link href="/series" className="hover:text-signal">
          Shows
        </Link>
        <Link href="/about" className="hover:text-signal">
          About
        </Link>
      </nav>
    </header>
  );
}

/** Logo mark: a room (square) holding a signal. */
export function Mark({ className = 'size-6' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <rect x="1.5" y="1.5" width="21" height="21" rx="3" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M5 13h2.5l1.5-5 2.5 9 2-7 1.5 3H19" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="mx-auto mt-24 max-w-6xl px-4 pb-32 text-sm text-slate sm:px-6">
      <div className="flex flex-wrap items-start justify-between gap-6 border-t border-line pt-8">
        <p className="max-w-md">
          The Listening Room is a small network of documentary podcasts. Every episode has a full transcript and show notes.
        </p>
        <nav aria-label="Footer" className="flex gap-5">
          <Link href="/interests" className="hover:text-ink">Browse</Link>
          <Link href="/series" className="hover:text-ink">Shows</Link>
          <Link href="/about" className="hover:text-ink">About</Link>
        </nav>
      </div>
    </footer>
  );
}

export function Swatch({ hue }: { hue: string }) {
  return <span aria-hidden="true" className="inline-block size-3 shrink-0 rounded-sm" style={{ background: hue }} />;
}
