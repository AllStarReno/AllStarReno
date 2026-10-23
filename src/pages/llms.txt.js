import fs from 'node:fs';
// Curated summary lives in src/data/llms.txt (hand-edited); served verbatim.
export function GET() { return new Response(fs.readFileSync('src/data/llms.txt', 'utf8'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } }); }
