// Sitemap index: main site + Mintlify Help Center (proxied at /docs via vercel.json rewrites).
export function GET() {
  const maps = ['https://allstarreno.com/sitemap.xml', 'https://allstarreno.com/docs/sitemap.xml'];
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${maps.map((m) => `  <sitemap><loc>${m}</loc><lastmod>2026-10-23</lastmod></sitemap>`).join('\n')}\n</sitemapindex>\n`, { headers: { 'Content-Type': 'application/xml' } });
}
