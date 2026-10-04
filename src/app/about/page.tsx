import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'About', description: 'What The Listening Room is and how the shows are made.' };

export default function About() {
  return (
    <div className="pt-10 sm:pt-14">
      <h1 className="text-[clamp(2.6rem,7vw,5rem)] font-bold leading-[0.95] tracking-[-0.03em]">About the room</h1>
      <div className="prose-room mt-8">
        <p>
          The Listening Room publishes documentary podcasts that take one serious subject and explain all of it, from the first
          idea to the last footnote. Each show is built to be heard and read: every episode has chapters, a full transcript, and
          show notes with the numbers, figures and equations spoken on air.
        </p>
        <h3>How the shows are made</h3>
        <p>
          Each series starts from a source, such as a thesis, a report or a body of research. It is turned into a scripted
          documentary with a narrator, two explainers and a cast of expert voices. The cast is fictional and the voices are
          synthetic. Real people who appear in the sources are named and credited, and never given words they did not write.
        </p>
        <p>
          The theme music and sound effects are original and composed in code for each series.
        </p>
        <h3>Browsing</h3>
        <p>
          Shows and episodes are filed under interests. Start from <Link href="/interests">Browse</Link> to find a subject, or go
          straight to the <Link href="/series">shows</Link>. Playback continues while you move between pages, and the site
          remembers where you stopped in each episode on this device.
        </p>
        <h3>Listening elsewhere</h3>
        <p>
          Every show has a feed you can add to Apple Podcasts, Overcast, Pocket Casts or any app that accepts a feed address.
          You will find it at the bottom of each show&apos;s page.
        </p>
      </div>
    </div>
  );
}
