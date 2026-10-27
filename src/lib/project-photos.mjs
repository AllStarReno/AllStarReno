// Real project photos (see src/data/project-photos.json; built by scripts/photos/build.py).
// Location is city-level Conway, AR (the business), never a customer address.
import fs from 'node:fs';
import { SITE, BUSINESS } from '../data/business.mjs';
const D = JSON.parse(fs.readFileSync('src/data/project-photos.json', 'utf8'));
const G = JSON.parse(fs.readFileSync('src/data/project-photos.generated.json', 'utf8'));
const DIR = '/images/projects';
const enrich = (it) => { const g = G[it.name];
  const set = (ext) => g.widths.map((w) => `${DIR}/${it.name}-${w}.${ext} ${w}w`).join(', ');
  return { ...it, width: g.width, height: g.height, url: `${DIR}/${it.name}.jpg`,
    src: `${DIR}/${it.name}-${g.widths.find((w) => w >= 800) || g.widths.at(-1)}.jpg`,
    avif: set('avif'), webp: set('webp'), jpg: set('jpg') }; };
export const PAIRS = D.pairs.map((p) => ({ ...p, before: enrich(p.before), after: enrich(p.after) }));
export const SINGLES = D.singles.map(enrich);
export const ALL_PHOTOS = [...PAIRS.flatMap((p) => [{ ...p.before, title: `${p.title} (before)` }, { ...p.after, title: `${p.title} (after)` }]),
  ...SINGLES.map((s) => ({ ...s, title: s.caption.replace(/\.$/, '') }))];
export const pairsFor = (service) => PAIRS.filter((p) => !service || p.service === service);
const CONWAY = { '@type': 'Place', name: 'Conway, Arkansas', address: { '@type': 'PostalAddress', addressLocality: 'Conway', addressRegion: 'AR', addressCountry: 'US' },
  geo: { '@type': 'GeoCoordinates', latitude: BUSINESS.geo.latitude, longitude: BUSINESS.geo.longitude } };
export function imageObject(it, pageUrl) {
  const u = SITE + it.url;
  return { '@type': 'ImageObject', '@id': `${u}#image`, url: u, contentUrl: u, name: it.title || it.caption, caption: it.caption, description: it.alt,
    width: it.width, height: it.height, encodingFormat: 'image/jpeg', representativeOfPage: false,
    creator: { '@id': `${SITE}/#business` }, copyrightHolder: { '@id': `${SITE}/#business` }, creditText: BUSINESS.name,
    copyrightNotice: `© ${new Date().getFullYear()} ${BUSINESS.name}`, contentLocation: CONWAY, ...(pageUrl ? { isPartOf: { '@id': `${pageUrl}#webpage` } } : {}) };
}
import { PHOTO_PLACEMENT } from '../data/photo-placement.mjs';
// Photos shown on a page (per PHOTO_PLACEMENT): { cfg, pairs, singles, images } or null.
export function photosFor(slug) {
  const cfg = PHOTO_PLACEMENT[slug]; if (!cfg) return null;
  const pairs = cfg.pairs === '*' ? PAIRS : PAIRS.filter((p) => cfg.pairs.includes(p.id));
  const singles = cfg.singles ? SINGLES : [];
  const images = [...pairs.flatMap((p) => [{ ...p.before, title: `${p.title} (before)` }, { ...p.after, title: `${p.title} (after)` }]), ...singles.map((s) => ({ ...s, title: s.caption.replace(/\.$/, '') }))];
  return { cfg, pairs, singles, images };
}
