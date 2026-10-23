// Post-build QA: internal links, alt text, JSON-LD validity, canonical/h1, sitemap coverage.
import fs from 'node:fs';
import path from 'node:path';
const DIST = 'dist';
const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]);
const files = walk(DIST);
const html = files.filter((f) => f.endsWith('.html'));
const vercel = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));
const redirects = new Set(vercel.redirects.map((r) => r.source));
const PROXIED = /^\/(docs|_mintlify|mintlify-assets)(\/|$)/; // served by vercel.json rewrites (Mintlify)
const exists = (p) => { if (PROXIED.test(p)) return true;
  p = decodeURI(p.split('#')[0].split('?')[0]); if (p === '/' || p === '') return true;
  if (redirects.has(p)) return true;
  const f = path.join(DIST, p);
  return fs.existsSync(f) && fs.statSync(f).isFile() || fs.existsSync(f + '.html');
};
const errs = [];
for (const f of html) {
  const s = fs.readFileSync(f, 'utf8'); const rel = f.slice(DIST.length);
  for (const m of s.matchAll(/<img\b[^>]*>/g)) if (!/\balt="/.test(m[0])) errs.push(`${rel}: <img> without alt: ${m[0].slice(0, 90)}`);
  for (const m of s.matchAll(/\b(?:href|src)="(\/[^"]*)"/g)) if (!m[1].startsWith('//') && !exists(m[1])) errs.push(`${rel}: broken link ${m[1]}`);
  const ld = [...s.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  if (ld.length !== 1) errs.push(`${rel}: expected 1 JSON-LD graph, got ${ld.length}`);
  for (const m of ld) { try { const g = JSON.parse(m[1]); const ids = g['@graph'].map((n) => n['@id']).filter(Boolean); if (new Set(ids).size !== ids.length) errs.push(`${rel}: duplicate @id`); if (!g['@graph'].some((n) => n['@id'] === 'https://allstarreno.com/#business')) errs.push(`${rel}: no business node`); if (!g['@graph'].some((n) => n['@type'] === 'BreadcrumbList')) errs.push(`${rel}: no BreadcrumbList`); } catch (e) { errs.push(`${rel}: invalid JSON-LD ${e.message}`); } }
  const h1 = (s.match(/<h1\b/g) || []).length; if (h1 !== 1) errs.push(`${rel}: ${h1} <h1>`);
  const noindex = /name="robots" content="noindex/.test(s);
  if (!noindex && (s.match(/rel="canonical"/g) || []).length !== 1) errs.push(`${rel}: canonical count`);
  if (/license/i.test(s.replace(/<script[\s\S]*?<\/script>/g, '')) && /lic(ense)?\s*#|license (no|number)/i.test(s)) errs.push(`${rel}: license number present`);
}
// Built pages must not be shadowed by a redirect; noindex pages must stay out of the sitemap.
const smTxt = fs.readFileSync(path.join(DIST, 'sitemap.xml'), 'utf8');
for (const f of html) { const rel = '/' + path.relative(DIST, f).replace(/(^|\/)index\.html$/, '').replace(/\.html$/, ''); const r = rel.replace(/\/$/, '') || '/';
  if (r !== '/' && !r.endsWith('-mobile') && redirects.has(r)) errs.push(`${r}: page shadowed by a redirect`);
  if (/name="robots" content="noindex/.test(fs.readFileSync(f, 'utf8')) && smTxt.includes(`<loc>https://allstarreno.com${r}</loc>`)) errs.push(`${r}: noindex page in sitemap`); }
const sm = fs.readFileSync(path.join(DIST, 'sitemap.xml'), 'utf8');
for (const m of sm.matchAll(/<loc>https:\/\/allstarreno\.com([^<]*)<\/loc>/g)) if (!exists(m[1] || '/')) errs.push(`sitemap: ${m[1]} missing`);
console.log(`check: ${html.length} pages, ${(sm.match(/<loc>/g) || []).length} sitemap URLs, ${errs.length} problems`);
errs.slice(0, 80).forEach((e) => console.log('  ' + e));
if (errs.length) process.exit(1);
