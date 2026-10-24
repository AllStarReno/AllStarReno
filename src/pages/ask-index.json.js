import { askIndex } from '../lib/feeds.mjs';
// Build-time index of on-site FAQ answers for the Ask All-Star box (verbatim, no AI).
export function GET() { return new Response(JSON.stringify(askIndex()), { headers: { 'Content-Type': 'application/json; charset=utf-8' } }); }
