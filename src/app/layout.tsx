import type { Metadata, Viewport } from 'next';
import './globals.css';
import { PlayerProvider } from '@/components/player/PlayerProvider';
import { PlayerBar } from '@/components/player/PlayerBar';
import { Footer, Header } from '@/components/SiteChrome';
import { siteUrl } from '@/lib/content';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: { default: 'The Listening Room', template: '%s | The Listening Room' },
  description: 'Documentary podcasts you can browse by interest, listen to, and read along with.',
  openGraph: { siteName: 'The Listening Room', type: 'website' },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#e6eaee' },
    { media: '(prefers-color-scheme: dark)', color: '#12171d' },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-panel focus:px-3 focus:py-2">
          Skip to content
        </a>
        <PlayerProvider>
          <Header />
          <main id="main" className="mx-auto max-w-6xl px-4 sm:px-6">
            {children}
          </main>
          <Footer />
          <PlayerBar />
        </PlayerProvider>
      </body>
    </html>
  );
}
