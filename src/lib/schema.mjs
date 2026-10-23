// Builds one connected JSON-LD @graph per page (business, website, webpage, breadcrumbs,
// services, FAQ, articles, images, speakable) from the page's existing structured data.
import { SITE, BUSINESS } from '../data/business.mjs';

const BIZ = `${SITE}/#business`;
const WEBSITE = `${SITE}/#website`;
const LASTMOD = '2026-10-23';

export function breadcrumbTrail(page) {
  if (page.slug === '') return [{ name: 'Home', url: `${SITE}/` }];
  const existing = page.jsonld.find((b) => b['@type'] === 'BreadcrumbList');
  if (existing) return existing.itemListElement.map((i) => ({ name: i.name, url: i.item }));
  const parts = page.slug.split('/');
  const label = page.title.split('|')[0].trim();
  return [{ name: 'Home', url: `${SITE}/` }, ...parts.map((p, i) => ({
    name: i === parts.length - 1 ? label : p.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
    url: `${SITE}/${parts.slice(0, i + 1).join('/')}`,
  }))];
}

export function buildGraph(page) {
  const graph = [];
  const seen = new Set();
  const add = (n) => { if (n['@id'] && seen.has(n['@id'])) return; if (n['@id']) seen.add(n['@id']); graph.push(n); };
  const pageId = `${page.url}#webpage`;
  let hasArticle = false;

  for (const raw of page.jsonld) {
    const nodes = raw['@graph'] ? raw['@graph'] : [raw];
    for (const n0 of nodes) {
      const n = { ...n0 }; delete n['@context'];
      const t = [].concat(n['@type']);
      if (t.includes('LocalBusiness') || t.includes('HomeAndConstructionBusiness')) { n['@id'] = BIZ; add(n); continue; }
      if (t.includes('WebSite')) { n['@id'] = WEBSITE; add(n); continue; }
      if (t.includes('WebPage') || t.includes('CollectionPage') || t.includes('AboutPage') || t.includes('ContactPage') || t.includes('FAQPage') && n['@id'] === pageId) {
        Object.assign(n, { '@id': pageId, url: page.url, isPartOf: { '@id': WEBSITE }, about: { '@id': BIZ }, dateModified: LASTMOD, breadcrumb: { '@id': `${page.url}#breadcrumb` } });
        if (page.ogImage) n.primaryImageOfPage = { '@id': `${page.url}#primaryimage` };
        add(n); continue;
      }
      if (t.includes('BreadcrumbList')) continue; // regenerated below
      if (t.includes('Article') || t.includes('BlogPosting')) { hasArticle = true; n.publisher = { '@id': BIZ }; n.mainEntityOfPage = { '@id': pageId }; n.author ||= { '@type': 'Person', name: 'Thomas Pedersen', worksFor: { '@id': BIZ } }; }
      if (t.includes('Service') && !n.provider) n.provider = { '@id': BIZ };
      add(n);
    }
  }
  if (!graph.some((n) => n['@id'] === pageId)) {
    add({ '@type': 'WebPage', '@id': pageId, url: page.url, name: page.title, description: page.description, inLanguage: 'en-US',
      isPartOf: { '@id': WEBSITE }, about: { '@id': BIZ }, dateModified: LASTMOD, breadcrumb: { '@id': `${page.url}#breadcrumb` },
      speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '#speakable-summary', '[data-quick-answer]'] },
      ...(page.ogImage ? { primaryImageOfPage: { '@id': `${page.url}#primaryimage` } } : {}) });
  }
  if (!seen.has(BIZ)) add({ '@type': ['HomeAndConstructionBusiness', 'LocalBusiness'], '@id': BIZ, name: BUSINESS.name, url: `${SITE}/`,
    telephone: BUSINESS.tel, email: BUSINESS.email, address: { '@type': 'PostalAddress', ...BUSINESS.address },
    geo: { '@type': 'GeoCoordinates', ...BUSINESS.geo }, image: `${SITE}/assets/img/og-image.jpg` });
  if (page.ogImage) add({ '@type': 'ImageObject', '@id': `${page.url}#primaryimage`, url: page.ogImage, contentUrl: page.ogImage, caption: page.ogImageAlt || page.title, width: 1200, height: 630 });
  add({ '@type': 'BreadcrumbList', '@id': `${page.url}#breadcrumb`, itemListElement: breadcrumbTrail(page).map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: c.url })) });
  const LOGO = { '@type': 'ImageObject', '@id': `${SITE}/#logo`, url: `${SITE}/images/logo.png`, contentUrl: `${SITE}/images/logo.png`, width: 512, height: 512, caption: BUSINESS.name };
  for (const n of graph) if (n['@id'] === BIZ || n.logo) n.logo = LOGO;
  return { '@context': 'https://schema.org', '@graph': graph, _hasArticle: hasArticle };
}
