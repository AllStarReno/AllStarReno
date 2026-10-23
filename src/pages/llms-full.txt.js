import fs from 'node:fs';
import { docsSection, locationsSection } from '../lib/llms-extra.mjs';
import { loadPages } from '../lib/legacy.mjs';
// Curated reference (src/data/llms-full.txt) + generated plain-text digest of every indexable page.
const text = (h) => h.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<svg[\s\S]*?<\/svg>/g, ' ')
  .replace(/<(header|footer|nav)[\s\S]*?<\/\1>/g, ' ').replace(/<br\s*\/?>|<\/(p|h\d|li|div|section|dt|dd)>/g, '\n')
  .replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/&nbsp;|&#160;/g, ' ').replace(/&[a-z#0-9]+;/g, ' ')
  .replace(/[ \t]+/g, ' ').replace(/\n\s*\n+/g, '\n').trim();
export function GET() {
  const pages = loadPages().filter((p) => p.indexable).sort((a, b) => a.slug.localeCompare(b.slug));
  const body = pages.map((p) => `\n\n---\n\n## ${p.title}\nURL: ${p.url}\n${p.description}\n\n${text(p.body)}`).join('');
  return new Response(fs.readFileSync('src/data/llms-full.txt', 'utf8').trimEnd() + '\n\n' + locationsSection() + '\n\n' + docsSection() + '\n\n# Appendix: page content (generated at build time)' + body + '\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
