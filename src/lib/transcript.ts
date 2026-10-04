import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkRehype from 'remark-rehype';
import rehypeKatex from 'rehype-katex';
import rehypeStringify from 'rehype-stringify';

export type TranscriptBlock =
  | { kind: 'segment'; level: 3 | 4; title: string; id: string }
  | { kind: 'line'; speaker: string; html: string }
  | { kind: 'cue'; type: string; text: string };

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Inline markdown only: links, bold, italics, code. Escapes everything else. */
function inline(md: string) {
  let s = esc(md);
  s = s.replace(/\[([^\]]+)\]\((https?:[^)\s]+)\)/g, '<a href="$2" rel="noopener">$1</a>');
  s = s.replace(/`([^`]+)`/g, '<code>$1</code>');
  s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  s = s.replace(/(^|[^*\w])\*([^*\n]+)\*(?=[^*\w]|$)/g, '$1<em>$2</em>');
  return s;
}

export const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');

/** "DR. LINDQVIST" -> "Dr. Lindqvist", "THE THESIS" -> "The Thesis", "UNIT 47" -> "Unit 47" */
export function speakerName(tag: string) {
  return tag
    .toLowerCase()
    .split(/(\s+|-)/)
    .map((w) => (/^(al)$/.test(w) ? 'Al' : w.charAt(0).toUpperCase() + w.slice(1)))
    .join('');
}

/** Split an episode body into the spoken transcript and the markdown show notes. */
export function splitBody(body: string) {
  const i = body.search(/^### Show Notes\s*$/m);
  if (i < 0) return { script: body, notes: '' };
  return { script: body.slice(0, i), notes: body.slice(i).replace(/^### Show Notes\s*\n/, '') };
}

export function parseTranscript(script: string): TranscriptBlock[] {
  const blocks: TranscriptBlock[] = [];
  for (const raw of script.split('\n')) {
    const l = raw.trim();
    if (!l) continue;
    let m: RegExpMatchArray | null;
    if ((m = l.match(/^(#{3,4})\s+(.+)$/))) {
      const title = m[2].trim();
      blocks.push({ kind: 'segment', level: m[1].length as 3 | 4, title, id: slugify(title) });
    } else if ((m = l.match(/^\*\[([A-Z]+)(?::\s*)?(.*?)\]\*$/))) {
      if (m[1] === 'TIMECODE') continue;
      blocks.push({ kind: 'cue', type: m[1], text: m[2] });
    } else if ((m = l.match(/^\*\*([^*]+?):\*\*\s*(.*)$/))) {
      blocks.push({ kind: 'line', speaker: speakerName(m[1].trim()), html: inline(m[2]) });
    } else if (blocks.length && blocks[blocks.length - 1].kind === 'line') {
      // continuation paragraph of the previous speaker
      const prev = blocks[blocks.length - 1] as Extract<TranscriptBlock, { kind: 'line' }>;
      prev.html += '<br/><br/>' + inline(l);
    }
  }
  return blocks;
}

/** Show notes markdown -> HTML (GFM tables, ```latex fences as display math). */
export async function renderNotes(md: string) {
  const withMath = md.replace(/```latex\s*\n([\s\S]*?)```/g, (_m, tex: string) => `$$\n${tex.trim()}\n$$`);
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkMath)
    .use(remarkRehype)
    .use(rehypeKatex, { strict: 'ignore' })
    .use(rehypeStringify)
    .process(withMath);
  return String(file);
}

export function wordCount(script: string) {
  return parseTranscript(script)
    .filter((b) => b.kind === 'line')
    .reduce((n, b) => n + (b as { html: string }).html.split(/\s+/).length, 0);
}
