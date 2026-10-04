# Writer brief — STILL LEARNING

You are writing ONE episode script of a documentary podcast series that teaches a PhD thesis on plasticity loss in neural networks. Read `/home/claude/podcast/bible.md` first (cast, tone, rules, sound palette, episode guide). Then read your assigned line range of the source book `/mnt/user-data/uploads/Keeping_Neural_Networks_Learning.md` IN FULL (use Read with offset/limit; read every line of your range, in chunks of ~400 lines). The book is the only source of facts.

## What the script must do

- Teach EVERYTHING in your chapters: every numbered section, every defined term, every figure, table, algorithm and equation, every number and hyperparameter value the chapter gives, every caveat and every correction the book flags. A listener who hears only this episode should learn what a reader of those chapters learns. Do not skip "Key takeaways" or "Check your understanding" content — fold it into the episode's closing segments.
- Style: PBS FRONTLINE documentary spine (MIRIAM OKAFOR's grave, precise narration, investigative framing: evidence, suspects, verdict) blended with Planet Money explainers (DEV RAMAN and LUCÍA FERREIRA banter, props, toy examples, jokes, the "dumb question"). Use the actors (THE THESIS, NORA the network, THE UNITS, THE ARCHIVIST, THE AUDITOR) and invented experts from the bible wherever they help. Experts are interviewed: Miriam or Dev ask questions, experts answer, and experts sometimes ask the hosts questions back. Include at least one listener-style question answered on air.
- Professional direction: scene headings, sound cues in italics, pacing beats, interview setups ("Tape: Prof. Tomás Adeyemi, recorded in his office"), and occasional timecodes.

## Hard rules

1. Facts only from the book. Numbers exactly as the book gives them. Approximate figure readings are said to be "read off the chart."
2. Never voice or invent quotes for real people (the thesis author, his supervisor, any cited researcher). Name them and their papers only. THE THESIS actor speaks in faithful paraphrase, introduced as adapted from the thesis. Short direct quotes the book itself quotes (e.g. "remains elusive") may be used sparingly.
3. Equations: in the script, a host or expert says the equation in words and explains each symbol. Then in SHOW NOTES at the end, print every equation of your chapters as a ```latex code block (bare TeX, no $), labelled with its thesis number.
4. Figures and algorithms: each is turned into an "audio figure" or "audio walkthrough": axes, colors, curve shapes, then what it shows. List each in SHOW NOTES with one line.
5. Analogies: label them and say where they break. Capt. Rashid Al-Harbi is the aviation voice.
6. THE AUDITOR (with *[SFX: ledger bell]*) delivers every slip/correction the book notes in your chapters.

## Format (markdown, will be pasted into a document — follow exactly)

- First line: `## Episode N — Title` (use the number and title from the bible's episode guide).
- Then a one-paragraph italic logline: `*Running time ~NN min. Covers book chapters X–Y (thesis §...).*`
- Segment headings as `### Cold Open`, `### Act One — <name>`, `### Act Two — <name>`, … , `### Three Things to Remember`, `### Check Your Understanding`, `### Credits and Next Time`, `### Show Notes`.
- Each spoken turn is its own paragraph: `**MIRIAM:** text`. Speaker names in caps exactly as: MIRIAM, DEV, LUCÍA, THE THESIS, NORA, UNIT 47 (etc.), THE ARCHIVIST, THE AUDITOR, DR. LINDQVIST, PROF. ADEYEMI, DR. VENKATARAMAN, CAPT. AL-HARBI, DR. PARK, DR. MARCHETTI.
- Directions each on their own paragraph in italics: `*[MUSIC: ...]*`, `*[SFX: ...]*`, `*[TAPE: ...]*`, `*[BEAT]*`.
- Tables only inside Show Notes. No horizontal rules, no emoji, no HTML, no ```markdown fences.
- Credits must include: "The thesis is © Juan Fernando Hernandez Garcia, 2026, licensed CC BY 4.0, adapted here with credit. All experts and actors in this series are fictional." and a tease naming the next episode.

## Length

Target the word count given in your assignment. Write the whole script — no placeholders, no "[continue]", no summaries in place of scenes.

## Output

Write the script with the Write tool to the path in your assignment (write in a few large chunks if needed: write the first half, then append the rest by reading and rewriting, or use Bash heredoc appends). When done, check: every figure/table/algorithm/equation of your range appears; word count (`wc -w`). Reply with only: the path, the word count, and a checklist of the figures/tables/algorithms/equations covered. Do not paste the script in your reply.
