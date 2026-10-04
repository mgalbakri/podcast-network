# Production: writing and voicing episodes

Everything needed to turn a source (a thesis, a report, a book) into a finished, published episode.

## One-time setup

```bash
./production/setup.sh        # Python packages + Kokoro voice model (~350 MB, not committed)
```

Requires Python 3.10+, ffmpeg and Node 20+.

## The workflow

1. **Bible.** For a new series, write a production bible: premise, format, cast, rules, sound palette, episode guide. `still-learning-bible.md` is the model to copy.
2. **Scripts.** Write each episode in the script format the site and the renderer both read (`writer-brief.md` has the full brief). Save it as `content/series/<series>/episodes/NN-<slug>.md` with frontmatter (`number, title, slug, summary, coverage, interests, estimatedMinutes, status: in-production`). It appears on the site straight away with its transcript and show notes, marked "audio in production".
3. **Voice it.**
   ```bash
   python3 production/render.py content/series/<series>/episodes/NN-<slug>.md
   ```
   About 25 minutes per hour of audio on two CPU cores. Writes `media/<series>/NN-<slug>.mp3`, fills in `status`, `published`, `audio`, `duration` and `chapters`, and regenerates the waveform. Lines are cached in `production/cache/`, so fixing one line and re-running only re-voices that line.
4. **Publish.** Commit and push to `main`. Vercel builds, uploads the new MP3 to Blob, and the episode goes live with its player and feed entry.

## Script format

```
### Cold Open                          <- chapter (also a chapter marker in the MP3)
#### A sub-segment                     <- no chapter marker
*[MUSIC: "Still Learning" theme]*      <- music: theme intro, bed, sting, swell, resolves
*[SFX: ledger bell]*                   <- effects: bell, chime, rising tone, click and hum, latch, cards, coin, cups
*[AMBIENCE: archive room]*             <- server room or archive room
*[TAPE: Dr. X, recorded in her lab]*   <- interview tape in
*[BEAT]*                               <- a pause
**MIRIAM:** Spoken line.               <- dialogue; a leading (faint, far away) note is performed
### Show Notes                         <- everything after this is site-only markdown
```

## Voices

Cast-to-voice mapping lives in `VOICES` at the top of `render.py` (13 characters, Kokoro voice ids). Pronunciation fixes for acronyms and names are in `REPL` in the same file: add a regex and its spoken form. To recast a character for a new series, add its speaker tag and a voice id.

`sound.py` composes the music and effects in code (the "Still Learning" theme in D minor, the explainer bed, every sound effect), so there is nothing to license.
