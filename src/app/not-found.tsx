import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="pt-16">
      <h1 className="text-5xl font-bold tracking-tight">Nothing on this frequency</h1>
      <p className="mt-4 font-serif text-lg">
        That page doesn&apos;t exist. <Link href="/" className="link">Go to the front page</Link> or{' '}
        <Link href="/interests" className="link">browse by interest</Link>.
      </p>
    </div>
  );
}
