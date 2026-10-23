// Sitemap index: main site only. /docs (Mintlify) stays out of search until the Help Center content is approved.
export function GET() {
  const maps = ['https://allstarreno.com/sitemap.xml'];
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${maps.map((m) => `  <sitemap><loc>${m}</loc><lastmod>2026-10-23</lastmod></sitemap>`).join('\n')}\n</sitemapindex>\n`, { headers: { 'Content-Type': 'application/xml' } });
}
