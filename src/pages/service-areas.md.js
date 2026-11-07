// Markdown copy of /service-areas for AI crawlers and answer engines.
import { CITIES } from '../data/cities.mjs';
import { ANSWER, COUNTIES, FAQS, HOURS } from '../data/service-areas-content.mjs';
import { UPDATED } from '../lib/ai-formats.mjs';
import { THIN_TOWNS } from '../data/city-pages.mjs';
const S = 'https://allstarreno.com';
// Thin towns (Guy, Enola, Quitman) have no standalone pages; their old URLs 308 to the Faulkner County hub anchor,
// so link straight to that anchor (same as the thin-town-links build step does for HTML).
const thin = (c) => THIN_TOWNS.includes(c.slug);
const hub = (c) => thin(c) ? `${S}/service-areas/faulkner-county#${c.slug}` : `${S}/service-areas/${c.slug}`;
const svc = (c, href) => thin(c) ? hub(c) : `${S}${href}`;
export function GET() {
  const md = `<!--
title: Central Arkansas Service Coverage & City Directory
description: Cities and counties served by All-Star Renovations within about 50 miles of Conway, AR.
canonical: ${S}/service-areas
last_updated: ${UPDATED}
-->

Home > Service Areas

# Central Arkansas Service Coverage & City Directory

What areas does All-Star Renovations serve? About 50 miles around Conway, AR. Phone: (501) 504-3398 · Email: info@allstarreno.com · Hours: ${HOURS}

## ${ANSWER.question}

${ANSWER.answer}

## City directory

${CITIES.map((c) => `### ${c.name}, AR (${c.county})

${c.description}

- ZIP: ${c.zips.join(', ')}
- About ${c.milesFromHQ} miles from Conway HQ
- City hub: ${hub(c)}
${c.services.map((s) => `- ${s.label}: ${svc(c, s.href)}`).join('\n')}
`).join('\n')}
## Counties

${COUNTIES.map((c) => `- [${c.name}](${S}/service-areas/${c.slug}): ${c.cities}`).join('\n')}
- [Other areas](${S}/service-areas/other-areas)

## FAQ

${FAQS.map((f) => `### ${f.q}

${f.a}
`).join('\n')}
`;
  return new Response(md, { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
}
