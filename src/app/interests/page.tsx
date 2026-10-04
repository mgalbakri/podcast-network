import type { Metadata } from 'next';
import { InterestRows } from '@/components/InterestRows';

export const metadata: Metadata = {
  title: 'Browse by interest',
  description: 'Find a show or an episode by what you are curious about.',
};

export default function InterestsPage() {
  return (
    <div className="pt-10 sm:pt-14">
      <h1 className="text-[clamp(2.6rem,7vw,5rem)] font-bold leading-[0.95] tracking-[-0.03em]">Browse by interest</h1>
      <p className="mb-10 mt-4 max-w-[56ch] font-serif text-lg text-ink/85">
        Pick a subject to see every show and episode that covers it. An episode can sit under more than one interest.
      </p>
      <InterestRows />
    </div>
  );
}
