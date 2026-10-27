import { loadPages } from '../lib/legacy.mjs';
import { CITY_PAGE_SLUGS, NOINDEX_SLUGS } from '../data/city-pages.mjs';
import { SUB_CITY_SLUGS, SUB_CITY_NOINDEX } from '../data/sub-locations.mjs';
import { SITE } from '../data/business.mjs';
import { SERVICE_PAGES } from '../data/service-pages.mjs';
import { photosFor } from '../lib/project-photos.mjs';
import { lastmodFor } from '../lib/lastmod.mjs';
const D = 'src/data/', C = 'src/components/';
const SHARED = { service: [C + 'service/ServicePage.astro', D + 'service-pages.mjs', D + 'reviews.mjs'],
  city: [C + 'city/CityPage.astro', D + 'city-pages.mjs', D + 'service-areas-content.mjs', D + 'reviews.mjs'],
  sub: [C + 'location/SubCityPage.astro', D + 'sub-locations.mjs', D + 'service-pages.mjs', D + 'reviews.mjs'] };
const SUBSET = new Set(SUB_CITY_SLUGS), CITYSET = new Set(CITY_PAGE_SLUGS);
const sources = (p) => [p.file, ...(p.slug === 'reviews' ? [D + 'review-summary.mjs', D + 'reviews.mjs'] : []), ...(SUBSET.has(p.slug) ? SHARED.sub : SERVICE_PAGES[p.slug] ? SHARED.service : CITYSET.has(p.slug) || p.slug.startsWith('service-areas/') ? SHARED.city : [])].filter(Boolean);
const esc = (t) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
// image:caption/title are deprecated by Google (ignored) but kept for other crawlers; image:loc is what counts.
const imgs = (slug) => (photosFor(slug)?.images || []).map((i) => `\n    <image:image><image:loc>${SITE}${i.url}</image:loc><image:caption>${esc(i.caption)}</image:caption><image:title>${esc(i.title)}</image:title><image:geo_location>Conway, Arkansas, USA</image:geo_location></image:image>`).join('');
const prio = (s) => s === '' ? '1.0' : /^(bathroom-remodeling|kitchen-remodeling|handyman-services|service-areas)$/.test(s) ? '0.9' : s.split('/').length === 1 ? '0.7' : s.split('/').length === 3 ? '0.6' : '0.8';
export function GET() {
  const known = new Set(loadPages().map((p) => p.slug));
  const extra = CITY_PAGE_SLUGS.filter((s) => !known.has(s)).map((slug) => ({ slug, url: `${SITE}/${slug}`, indexable: !NOINDEX_SLUGS.has(slug) }))
    .concat([{ slug: 'reviews', url: `${SITE}/reviews`, indexable: true, file: 'src/pages/reviews.astro' }])
    .concat(SUB_CITY_SLUGS.map((slug) => ({ slug, url: `${SITE}/${slug}`, indexable: !SUB_CITY_NOINDEX.has(slug) })));
  const urls = [...loadPages(), ...extra].filter((p) => p.indexable).sort((a, b) => a.slug.localeCompare(b.slug))
    .map((p) => `  <url><loc>${p.url}</loc><lastmod>${lastmodFor(sources(p))}</lastmod><priority>${prio(p.slug)}</priority>${imgs(p.slug)}</url>`).join('\n');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${urls}\n</urlset>\n`, { headers: { 'Content-Type': 'application/xml' } });
}
