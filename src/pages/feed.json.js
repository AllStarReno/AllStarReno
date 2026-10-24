import { feed } from '../lib/feeds.mjs';
// JSON Feed 1.1, regenerated on every build.
export function GET() { return new Response(JSON.stringify(feed(), null, 1), { headers: { 'Content-Type': 'application/feed+json; charset=utf-8' } }); }
