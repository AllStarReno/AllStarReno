import fs from 'node:fs';
import { docsSection, locationsSection, photosSection } from '../lib/llms-extra.mjs';
// Curated summary (src/data/llms.txt, hand-edited) + generated Help Center and location sections.
export function GET() { return new Response(fs.readFileSync('src/data/llms.txt', 'utf8').trimEnd() + '\n\n' + photosSection() + '\n\n' + locationsSection() + '\n\n' + docsSection() + '\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } }); }
