import { scrubOwner } from './owner-name.mjs';
// Build-time data for /feed.json (JSON Feed 1.1) and /ask-index.json (Ask All-Star answer box).
// Answers are copied verbatim from on-site FAQ content only: no AI, no generated text.
import fs from 'node:fs';
import { SITE, BUSINESS } from '../data/business.mjs';
import { CATEGORIES } from '../data/services.mjs';
import { CITIES } from '../data/cities.mjs';
import { SERVICE_PAGES } from '../data/service-pages.mjs';
import { FAQS as AREA_FAQS } from '../data/service-areas-content.mjs';
import { NOINDEX_SLUGS } from '../data/city-pages.mjs';
import { loadPages } from './legacy.mjs';
const LASTMOD = '2026-10-23T00:00:00-05:00';
const strip = (s = '') => String(s).replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/&#8217;|&rsquo;/g, '’').replace(/&quot;/g, '"').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();

export function feedItems() {
  const pages = loadPages();
  const items = [];
  for (const c of CATEGORIES) {
    const d = SERVICE_PAGES[c.slug];
    items.push({ id: `${SITE}/${c.slug}`, url: `${SITE}/${c.slug}`, title: `${c.name} in Conway, AR`, summary: strip(d?.lead || ''), tags: ['service', c.name] });
    for (const s of c.subs.filter((s) => s.slug !== 'full-bathroom-remodel')) {
      const sd = SERVICE_PAGES[`${c.slug}/${s.slug}`];
      items.push({ id: `${SITE}/${c.slug}/${s.slug}`, url: `${SITE}/${c.slug}/${s.slug}`, title: `${s.name} in Conway, AR`, summary: strip(sd?.lead || `${s.name} by All-Star Renovations, Conway, AR.`), tags: ['service', c.name] });
    }
  }
  for (const c of CITIES) items.push({ id: `${SITE}/service-areas/${c.slug}`, url: `${SITE}/service-areas/${c.slug}`, title: `Remodeling in ${c.name}, AR`, summary: `Bathroom, kitchen and handyman remodeling in ${c.name}, AR${c.county ? ` (${c.county})` : ''} from All-Star Renovations of Conway.`, tags: ['service-area', c.name] });
  for (const p of pages.filter((p) => p.indexable && /^(blog|guides)\//.test(p.slug))) items.push({ id: p.url, url: p.url, title: p.title, summary: p.description, tags: ['guide'] });
  for (const d of JSON.parse(fs.readFileSync('src/data/docs-pages.json', 'utf8'))) items.push({ id: d.url, url: d.url, title: d.title, summary: d.desc, tags: ['guide', 'help-center'] });
  const seen = new Set();
  return items.filter((i) => !seen.has(i.id) && seen.add(i.id)).map((i) => ({ ...i, content_text: i.summary, date_modified: LASTMOD }));
}

export function feed() {
  return { version: 'https://jsonfeed.org/version/1.1', title: 'All-Star Renovations: services, service areas and guides', home_page_url: `${SITE}/`, feed_url: `${SITE}/feed.json`,
    description: `Services, service-area pages and homeowner guides from ${BUSINESS.name}, 11 Arnett Ln, Conway, AR 72032. Call ${BUSINESS.phone}.`, language: 'en-US', icon: `${SITE}/icon-192.png`, favicon: `${SITE}/favicon-32x32.png`,
    authors: [{ name: BUSINESS.name, url: `${SITE}/` }], items: feedItems() };
}

export function askIndex() {
  const out = [];
  const add = (q, a, url) => { q = scrubOwner(strip(q)); a = scrubOwner(strip(a)); if (q && a && !out.some((x) => x.q.toLowerCase() === q.toLowerCase())) out.push({ q, a, url }); };
  for (const [slug, d] of Object.entries(SERVICE_PAGES)) { add(d.q, d.a, `/${slug}`); for (const f of d.extraFaq || []) add(f.q, f.a, `/${slug}`); }
  for (const f of AREA_FAQS) add(f.q, f.a, '/service-areas');
  for (const p of loadPages().filter((p) => p.indexable && !NOINDEX_SLUGS.has(p.slug))) {
    for (const n of p.jsonld.flatMap((n) => n['@graph'] || [n])) if ([].concat(n['@type']).includes('FAQPage'))
      for (const e of [].concat(n.mainEntity || [])) add(e.name, e.acceptedAnswer?.text, '/' + p.slug);
  }
  return out;
}
