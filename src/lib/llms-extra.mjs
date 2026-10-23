// Generated llms.txt sections: Help Center (/docs) pages and location pages. No ratings, no license numbers.
import fs from 'node:fs';
import { CATEGORIES } from '../data/services.mjs';
import { CITIES } from '../data/cities.mjs';
import { THIN_TOWNS } from '../data/city-pages.mjs';
const SITE = 'https://allstarreno.com';
const docs = JSON.parse(fs.readFileSync('src/data/docs-pages.json', 'utf8'));
export function docsSection() {
  return ['## Help Center (/docs)',
    'Homeowner guides on planning, costs, materials, accessibility, care and warranty. Markdown copies: append .md to any page URL. Index: https://allstarreno.com/docs/llms.txt (full text: https://allstarreno.com/docs/llms-full.txt).',
    '*Guide ranges and timelines are general information, not quotes or guarantees.',
    ...docs.map((d) => `- [${d.title}](${d.url}): ${d.desc}`)].join('\n');
}
export function locationsSection() {
  const cities = CITIES.filter((c) => !THIN_TOWNS.includes(c.slug));
  const lines = ['## Location pages',
    `Every service and sub-service has a local page for each town served. URL patterns: ${SITE}/<service>/<town> (e.g. ${SITE}/bathroom-remodeling/conway) and ${SITE}/<service>/<sub-service>/<town> (e.g. ${SITE}/bathroom-remodeling/walk-in-showers/cabot). Town hubs: ${SITE}/service-areas/<town>.`,
    `- Services and sub-services: ${CATEGORIES.map((c) => `${c.name} (${c.subs.map((s) => s.name).join(', ')})`).join('; ')}.`,
    '- Towns:'];
  for (const c of cities) lines.push(`  - [${c.name}, AR](${SITE}/service-areas/${c.slug}) (${c.county}): ${CATEGORIES.map((k) => `[${k.name}](${SITE}/${k.slug}/${c.slug})`).join(', ')}`);
  return lines.join('\n');
}
