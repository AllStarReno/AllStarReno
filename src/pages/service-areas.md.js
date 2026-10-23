// Markdown copy of /service-areas for AI crawlers and answer engines.
import { CITIES } from '../data/cities.mjs';
import { ANSWER, COUNTIES, FAQS, HOURS } from '../data/service-areas-content.mjs';
const S = 'https://allstarreno.com';
export function GET() {
  const md = `# Central Arkansas Service Coverage & City Directory\n\nCanonical: ${S}/service-areas\nPhone: (501) 504-3398 · Email: info@allstarreno.com · Hours: ${HOURS}\n\n## ${ANSWER.question}\n\n${ANSWER.answer}\n\n## City directory\n\n${CITIES.map((c) => `### ${c.name}, AR (${c.county})\n\n${c.description}\n\n- ZIP: ${c.zips.join(', ')}\n- About ${c.milesFromHQ} miles from Conway HQ\n- City hub: ${S}/service-areas/${c.slug}\n${c.services.map((s) => `- ${s.label}: ${S}${s.href}`).join('\n')}\n`).join('\n')}\n## Counties\n\n${COUNTIES.map((c) => `- [${c.name}](${S}/service-areas/${c.slug}): ${c.cities}`).join('\n')}\n- [Other areas](${S}/service-areas/other-areas)\n\n## FAQ\n\n${FAQS.map((f) => `### ${f.q}\n\n${f.a}\n`).join('\n')}\n`;
  return new Response(md, { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
}
