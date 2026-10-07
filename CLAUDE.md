# The Listening Room

A podcast network site: people browse shows by interest, listen in a persistent player, and read along with full transcripts and show notes. The first series is **Still Learning**, a 10-part documentary adaptation of a PhD thesis on plasticity loss in neural networks. More series will be added over time.

Owner: MGB. Communication style: direct, BLUF-first. Prefer complete, deployable changes over partial drafts.

## Stack (non-negotiable)

- Next.js 15 App Router, TypeScript, React 19, all pages statically generated
- Tailwind CSS v4 (tokens in `src/app/globals.css` under `@theme`)
- Fonts self-hosted from npm (`@fontsource-variable/*`), never Google Fonts at runtime
- Content is files in `content/`, read at build time by `src/lib/content.ts`; no CMS, no database
- Audio: source MP3s in `media/<series>/`, uploaded to Vercel Blob by `scripts/publish-audio.mjs` (runs as `prebuild`)
- Hosting: Vercel (team "MGB's projects"), auto-deploys on push to `main`

## Live setup

- Site: https://the-listening-room-ten.vercel.app (Vercel project `the-listening-room`, `prj_5sMkcGlx7x6eoIBSBDnLb9vCdpnr`, team `team_JlZwo4jjeUI8hth2Ea9oOIJU`)
- Feed: https://the-listening-room-ten.vercel.app/series/still-learning/feed.xml
- Audio: Vercel Blob store `the-listening-room-blob` (public, Frankfurt `fra1`), connected to the project; `BLOB_READ_WRITE_TOKEN` is set in Production and Preview
- Hobby plan limits that matter: Blob 1 GB storage and 10 GB transfer per month (an episode is ~26 MB at 64 kbps mono)
- The Vercel MCP connector can read and redeploy but gets 403 on creating projects or stores; do those in the dashboard

## Content model

```
content/
  interests.json                     # the interest taxonomy: slug, name, blurb, hue
  audio-manifest.json                # GENERATED at build; do not edit or commit
  series/<series-slug>/
    series.json                      # title, tagline, description, interests, cast, source, palette
    episodes/NN-<slug>.md            # frontmatter + the full script (transcript + "### Show Notes")
media/<series-slug>/NN-<slug>.mp3    # episode audio (source of truth)
public/peaks/<series-slug>/NN-<slug>.json  # waveform peaks (npm run peaks)
public/covers/<series-slug>.png      # 3000x3000 cover for podcast apps (python3 scripts/make-cover.py)
production/                          # tools to write and voice new episodes (see below)
```

Episode frontmatter: `number, title, slug, summary, coverage, interests[], estimatedMinutes, status (published | in-production), published (YYYY-MM-DD), audio (file name in media/<series>/), duration (seconds), chapters[{start, title}]`.

An episode only appears in the RSS feed and gets a player when `status: published` and its `audio` file exists.

Script format inside the episode body (the transcript parser depends on it):
- `### Heading` = a chapter-level segment; `#### Heading` = a sub-segment
- `**SPEAKER:** text` = a spoken line (speaker in caps)
- `*[MUSIC: ...]*`, `*[SFX: ...]*`, `*[TAPE: ...]*`, `*[BEAT]*`, `*[AMBIENCE: ...]*`, `*[TIMECODE: ...]*` = production cues
- Everything after `### Show Notes` is markdown show notes; ```latex fences render as display math

## Adding a new episode or series

1. Write the script (see `production/README.md`), save as `content/series/<series>/episodes/NN-<slug>.md` with frontmatter.
2. Render audio with `production/render.py` and copy the MP3 to `media/<series>/NN-<slug>.mp3`.
3. `npm run peaks` to make the waveform; set `status: published`, `published`, `audio`, `duration`, `chapters` in frontmatter (render.py writes chapters to a `.ffmeta` file next to the MP3).
4. New series: add `series.json`, then `python3 scripts/make-cover.py <series-slug>` for the cover.
5. Push to `main`. Vercel builds, uploads new audio to Blob, and deploys.

New interests go in `content/interests.json`. An interest with no series or episodes shows as "nothing here yet" on the browse page.

## Design system

Concept: a broadcast studio. Cool acoustic-panel greys, ink-blue text, and one red "on air" lamp that only lights when something is playing. The memorable element is the waveform: every episode's real audio waveform is the scrubber, with chapter notches above it. Everything else stays quiet.

| Token | Light | Dark | Use |
| --- | --- | --- | --- |
| `room` | #E6EAEE | #12171D | page background |
| `panel` | #F6F8F9 | #1A2129 | raised surfaces: player bar, transcript column |
| `ink` | #17202B | #E7EBEF | primary text, played waveform |
| `slate` | #566273 | #9AA6B2 | secondary text |
| `line` | #C6CED6 | #2C3641 | rules, unplayed waveform |
| `onair` | #D3263A | #FF4A5C | the on-air lamp, play buttons, playhead. Nothing else. |
| `signal` | #2F5D8A | #8DB6E0 | links and focus rings |

Interest hues (in `interests.json`) appear only as small swatches beside interest names.

Type: **Bricolage Grotesque** (display and UI), **Literata** (long-form reading: descriptions, transcripts, show notes). Scale ~1.25 ratio; display headlines tight (`leading-[0.95]`, slight negative tracking). Sentence case everywhere; no all-caps labels, no eyebrow labels above headings, no middle-dot meta strings.

Layout: left-aligned, generous left margin, max reading width ~68ch for serif text. Lists of episodes are tracklists (numbered, because episodes are a sequence). Interests are typographic rows, not cards.

Motion: none on load except the waveform drawing in once. The player bar slides up when playback first starts. Respect `prefers-reduced-motion`.

## Conventions

- Server Components by default; client components only for the player, waveform and play buttons (`src/components/player/*`).
- The audio element lives once in `PlayerProvider` (root layout) so playback survives navigation.
- Use semantic color utilities (`text-ink`, `bg-room`), never raw hex in className.
- Quality bar: one `h1` per page, keyboard-operable player and waveform (slider role, arrow keys), visible focus, WCAG AA contrast, responsive to 360px.

## Production tools

`production/` holds the bible, writer and loader briefs, and `render.py` + `sound.py`, which voice a script with the open-source Kokoro TTS model (13 cast voices) and mix in original synthesized music and effects. See `production/README.md`.
