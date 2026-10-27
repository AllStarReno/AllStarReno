// Real project photos (see src/data/project-photos.json; built by scripts/photos/build.py).
// Each set/single is assigned a Central Arkansas town (city-level only), never a customer address.
import fs from 'node:fs';
import { SITE, BUSINESS } from '../data/business.mjs';
const D = JSON.parse(fs.readFileSync('src/data/project-photos.json', 'utf8'));
const G = JSON.parse(fs.readFileSync('src/data/project-photos.generated.json', 'utf8'));
import { CITIES } from '../data/cities.mjs';
const DIR = '/images/projects';
const TOWN = Object.fromEntries(CITIES.map((c) => [c.slug, c]));
export const townName = (slug) => TOWN[slug]?.name || 'Conway';
const enrich = (it, town) => { const g = G[it.name]; const tn = townName(town);
  it = { ...it, town, townName: tn, place: `Project in ${tn}, AR`, alt: `${it.alt} (${tn}, AR project)`, caption: `${it.caption} Project in ${tn}, AR.` };
  const set = (ext) => g.widths.map((w) => `${DIR}/${it.name}-${w}.${ext} ${w}w`).join(', ');
  return { ...it, width: g.width, height: g.height, url: `${DIR}/${it.name}.jpg`,
    src: `${DIR}/${it.name}-${g.widths.find((w) => w >= 800) || g.widths.at(-1)}.jpg`,
    avif: set('avif'), webp: set('webp'), jpg: set('jpg') }; };
export const PAIRS = D.pairs.map((p) => ({ ...p, townName: townName(p.town), place: `Project in ${townName(p.town)}, AR`, before: enrich(p.before, p.town), after: enrich(p.after, p.town) }));
export const SINGLES = D.singles.map((s) => enrich(s, s.town));
export const ALL_PHOTOS = [...PAIRS.flatMap((p) => [{ ...p.before, title: `${p.title} (before)` }, { ...p.after, title: `${p.title} (after)` }]),
  ...SINGLES.map((s) => ({ ...s, title: s.caption.replace(/\.$/, '') }))];
export const pairsFor = (service) => PAIRS.filter((p) => !service || p.service === service);
const place = (slug) => { const c = TOWN[slug] || TOWN.conway; return { '@type': 'Place', name: `${c.name}, Arkansas`, address: { '@type': 'PostalAddress', addressLocality: c.name, addressRegion: 'AR', addressCountry: 'US' },
  geo: { '@type': 'GeoCoordinates', latitude: c.geo.latitude, longitude: c.geo.longitude } }; };
export function imageObject(it, pageUrl) {
  const u = SITE + it.url;
  return { '@type': 'ImageObject', '@id': `${u}#image`, url: u, contentUrl: u, name: it.title || it.caption, caption: it.caption, description: it.alt,
    width: it.width, height: it.height, encodingFormat: 'image/jpeg', representativeOfPage: false,
    creator: { '@id': `${SITE}/#business` }, copyrightHolder: { '@id': `${SITE}/#business` }, creditText: BUSINESS.name,
    copyrightNotice: `© ${new Date().getFullYear()} ${BUSINESS.name}`, contentLocation: place(it.town), ...(pageUrl ? { isPartOf: { '@id': `${pageUrl}#webpage` } } : {}) };
}
import { PHOTO_PLACEMENT } from '../data/photo-placement.mjs';
// Photos shown on a page (per PHOTO_PLACEMENT): { cfg, pairs, singles, images } or null.
export function photosFor(slug) {
  let cfg = PHOTO_PLACEMENT[slug];
  const [first, key] = slug.split('/');
  if (!cfg && key && ['service-areas', 'bathroom-remodeling'].includes(first) && TOWN[key]) {
    const tp = PAIRS.filter((p) => p.town === key), ts = SINGLES.filter((s) => s.town === key);
    if (!tp.length && !ts.length) return null;
    cfg = { variant: 'slider', pairs: tp.map((p) => p.id), singles: 'town', town: key, title: `Recent Project in ${TOWN[key].name}, AR` };
  }
  if (!cfg) return null;
  const pairs = cfg.pairs === '*' ? PAIRS : PAIRS.filter((p) => cfg.pairs.includes(p.id));
  const singles = cfg.singles === 'town' ? SINGLES.filter((s) => s.town === cfg.town) : cfg.singles ? SINGLES : [];
  const images = [...pairs.flatMap((p) => [{ ...p.before, title: `${p.title} (before)` }, { ...p.after, title: `${p.title} (after)` }]), ...singles.map((s) => ({ ...s, title: s.caption.replace(/\.$/, '') }))];
  return { cfg, pairs, singles, images };
}
