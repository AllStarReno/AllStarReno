import { loadPages } from '../lib/legacy.mjs';
import { CITY_PAGE_SLUGS, NOINDEX_SLUGS } from '../data/city-pages.mjs';
import { SUB_CITY_SLUGS, SUB_CITY_NOINDEX } from '../data/sub-locations.mjs';
import { SITE } from '../data/business.mjs';
import { SERVICE_PAGES } from '../data/service-pages.mjs';
import { lastmodFor } from '../lib/lastmod.mjs';
const D = 'src/data/', C = 'src/components/';
const SHARED = { service: [C + 'service/ServicePage.astro', D + 'service-pages.mjs', D + 'reviews.mjs'],
  city: [C + 'city/CityPage.astro', D + 'city-pages.mjs', D + 'service-areas-content.mjs', D + 'reviews.mjs'],
  sub: [C + 'location/SubCityPage.astro', D + 'sub-locations.mjs', D + 'service-pages.mjs', D + 'reviews.mjs'] };
const SUBSET = new Set(SUB_CITY_SLUGS), CITYSET = new Set(CITY_PAGE_SLUGS);
const sources = (p) => [p.file, ...(SUBSET.has(p.slug) ? SHARED.sub : SERVICE_PAGES[p.slug] ? SHARED.service : CITYSET.has(p.slug) || p.slug.startsWith('service-areas/') ? SHARED.city : [])].filter(Boolean);
const prio = (s) => s === '' ? '1.0' : /^(bathroom-remodeling|kitchen-remodeling|handyman-services|service-areas)$/.test(s) ? '0.9' : s.split('/').length === 1 ? '0.7' : s.split('/').length === 3 ? '0.6' : '0.8';
export function GET() {
  const known = new Set(loadPages().map((p) => p.slug));
  const extra = CITY_PAGE_SLUGS.filter((s) => !known.has(s)).map((slug) => ({ slug, url: `${SITE}/${slug}`, indexable: !NOINDEX_SLUGS.has(slug) }))
    .concat(SUB_CITY_SLUGS.map((slug) => ({ slug, url: `${SITE}/${slug}`, indexable: !SUB_CITY_NOINDEX.has(slug) })));
  const urls = [...loadPages(), ...extra].filter((p) => p.indexable).sort((a, b) => a.slug.localeCompare(b.slug))
    .map((p) => `  <url><loc>${p.url}</loc><lastmod>${lastmodFor(sources(p))}</lastmod><priority>${prio(p.slug)}</priority></url>`).join('\n');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`, { headers: { 'Content-Type': 'application/xml' } });
}
