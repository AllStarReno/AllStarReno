// Build step: internal links to the noindexed thin-town service pages (e.g. /bathroom-remodeling/guy,
// /kitchen-remodeling/walk-in-tubs/enola) and to their old hubs are repointed to the Faulkner County hub section (/service-areas/faulkner-county#guy),
// so link equity flows to pages that can rank. The thin pages themselves are left untouched.
import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { THIN_TOWNS } from '../data/city-pages.mjs';
const T = THIN_TOWNS.join('|');
const CATS = 'bathroom-remodeling|kitchen-remodeling|handyman-services';
const HREF = new RegExp(`href="(?:https://allstarreno\\.com)?/(?:(?:${CATS})(?:/[a-z0-9-]+)?|service-areas)/(${T})"`, 'g');
const URLJ = new RegExp(`"url":\\s*"https://allstarreno\\.com/(?:(?:${CATS})(?:/[a-z0-9-]+)?|service-areas)/(${T})"`, 'g');
const THIN_FILE = new RegExp(`^(?:(?:${CATS})(?:/[a-z0-9-]+)?|service-areas)/(?:${T})\\.html$`);
const walk = (d) => readdirSync(d).flatMap((f) => { const p = join(d, f); return statSync(p).isDirectory() ? walk(p) : [p]; });
export default function thinTownLinks() {
  return { name: 'thin-town-links', hooks: { 'astro:build:done': ({ dir, logger }) => {
    const root = fileURLToPath(dir); let n = 0;
    for (const f of walk(root).filter((p) => p.endsWith('.html'))) {
      if (THIN_FILE.test(relative(root, f))) continue;
      const s = readFileSync(f, 'utf8');
      const o = s.replace(HREF, (_, t) => (n++, `href="/service-areas/faulkner-county#${t}"`)).replace(URLJ, (_, t) => `"url":"https://allstarreno.com/service-areas/faulkner-county#${t}"`);
      if (o !== s) writeFileSync(f, o);
    }
    logger.info(`repointed ${n} links to noindexed thin-town pages -> /service-areas/faulkner-county#{town}`);
  } } };
}
