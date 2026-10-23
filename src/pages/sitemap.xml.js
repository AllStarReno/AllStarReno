import { loadPages } from '../lib/legacy.mjs';
const prio = (s) => s === '' ? '1.0' : /^(bathroom-remodeling|kitchen-remodeling|handyman-services|service-areas)$/.test(s) ? '0.9' : s.split('/').length === 1 ? '0.7' : '0.8';
export function GET() {
  const urls = loadPages().filter((p) => p.indexable).sort((a, b) => a.slug.localeCompare(b.slug))
    .map((p) => `  <url><loc>${p.url}</loc><lastmod>2026-10-23</lastmod><priority>${prio(p.slug)}</priority></url>`).join('\n');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`, { headers: { 'Content-Type': 'application/xml' } });
}
