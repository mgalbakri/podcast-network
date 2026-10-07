# The Listening Room

A podcast network site. Listeners browse shows by interest, play episodes in a player that keeps going between pages, and read along with full transcripts and show notes. Each show also has a podcast feed for Apple Podcasts, Overcast and other apps.

Live at **https://the-listening-room-ten.vercel.app**.

First show: **Still Learning**, a ten-part documentary on why neural networks that keep learning lose the ability to learn.

## Run it

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build (runs scripts/publish-audio.mjs first)
```

## Add content

- **New episode or series:** see `CLAUDE.md` ("Adding a new episode or series") and `production/README.md`.
- **New interest:** add an entry to `content/interests.json`.

## How audio is hosted

MP3s live in `media/<series>/`. Before each build, `scripts/publish-audio.mjs` uploads any new ones to Vercel Blob (using `BLOB_READ_WRITE_TOKEN`, which Vercel sets once a Blob store is connected) and writes the URLs into `content/audio-manifest.json`. Without the token it serves them from `public/audio/` instead, so local development works offline.

## Stack

Next.js 15 (App Router, fully static), React 19, Tailwind CSS 4, self-hosted Bricolage Grotesque and Literata, KaTeX for show-note equations, Vercel + Vercel Blob.

## Credits

Still Learning adapts *Selective Reinitialization Algorithms for Preventing Plasticity Loss in Artificial Neural Networks* by Juan Fernando Hernandez Garcia (University of Alberta, 2026), licensed CC BY 4.0. All hosts, actors and experts are fictional and their voices are synthetic.
