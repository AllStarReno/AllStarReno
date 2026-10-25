// Builds one connected JSON-LD @graph per page (business, website, webpage, breadcrumbs,
// services, FAQ, articles, images, speakable) from the page's existing structured data.
import { SITE, BUSINESS } from '../data/business.mjs';
import { CITIES } from '../data/cities.mjs';
import { CATEGORIES } from '../data/services.mjs';
import { REVIEW_TOTAL } from '../data/review-summary.mjs';

const BIZ = `${SITE}/#business`;
const WEBSITE = `${SITE}/#website`;
const LASTMOD = '2026-10-23';
const FOUNDER = `${SITE}/about#thomas-pedersen`;
const ABOUT_URL = `${SITE}/about`;

// Full founder Person entity. Emitted once, on the About page only; every other page
// references it by @id through the business `founder`. Facts come only from the About page.
export function founderPerson() {
  return { '@type': 'Person', '@id': FOUNDER, name: BUSINESS.founder, jobTitle: 'Founder and Owner',
    url: ABOUT_URL, mainEntityOfPage: { '@id': `${ABOUT_URL}#webpage` },
    worksFor: { '@id': BIZ }, affiliation: { '@id': BIZ },
    description: `Founder and owner of All-Star Renovations, a veteran-owned bathroom remodeling, kitchen remodeling and handyman company in Conway, Arkansas. He started the company in 2014 and still leads it, bringing 20 years of experience.`,
    knowsAbout: ['Bathroom remodeling', 'Grout-free shower systems', 'Tub-to-shower conversions', 'Aging-in-place bathroom safety', 'Kitchen remodeling'],
    areaServed: [{ '@type': 'City', name: 'Conway, AR' }, { '@type': 'AdministrativeArea', name: 'Central Arkansas' }] };
}

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
      if (t.includes('Article') || t.includes('BlogPosting')) { hasArticle = true; n.publisher = { '@id': BIZ }; n.mainEntityOfPage = { '@id': pageId }; n.author ||= { '@type': 'Organization', '@id': BIZ, name: 'All-Star Renovations' }; n.dateModified ||= LASTMOD; }
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
    telephone: BUSINESS.telSchema, email: BUSINESS.email, address: { '@type': 'PostalAddress', ...BUSINESS.address },
    geo: { '@type': 'GeoCoordinates', ...BUSINESS.geo }, foundingDate: '2014', image: `${SITE}/assets/img/og-image.jpg` });
  if (page.ogImage) add({ '@type': 'ImageObject', '@id': `${page.url}#primaryimage`, url: page.ogImage, contentUrl: page.ogImage, caption: page.ogImageAlt || page.title, width: 1200, height: 630 });
  add({ '@type': 'BreadcrumbList', '@id': `${page.url}#breadcrumb`, itemListElement: breadcrumbTrail(page).map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: c.url })) });
  const LOGO = { '@type': 'ImageObject', '@id': `${SITE}/#logo`, url: `${SITE}/images/logo.png`, contentUrl: `${SITE}/images/logo.png`, width: 512, height: 512, caption: BUSINESS.name };
  for (const n of graph) if (n['@id'] === BIZ || n.logo) n.logo = LOGO;
  const biz = graph.find((n) => n['@id'] === BIZ);
  if (biz) {
    Object.assign(biz, { name: BUSINESS.name, url: `${SITE}/`, telephone: '+1-501-504-3398',
      address: { '@type': 'PostalAddress', ...BUSINESS.address }, geo: { '@type': 'GeoCoordinates', ...BUSINESS.geo },
      description: `Bathroom remodeling, kitchen remodeling and handyman services based in Conway, Arkansas. ${BUSINESS.identity}`,
      disambiguatingDescription: BUSINESS.identity, foundingDate: '2014', slogan: '20 years of experience. In business since 2014.' });
    delete biz.review;
    // Owner-approved (Oct 2026) despite Google's self-serving review rule; revert this commit to remove.
    biz.aggregateRating = { '@type': 'AggregateRating', ratingValue: 5, bestRating: 5, worstRating: 1, reviewCount: REVIEW_TOTAL };
    biz.sameAs = [...BUSINESS.sameAs];
    Object.assign(biz, {
      hasMap: BUSINESS.gbp, currenciesAccepted: 'USD',
      openingHoursSpecification: BUSINESS.hours.map((h) => ({ '@type': 'OpeningHoursSpecification', dayOfWeek: h.days, opens: h.opens, closes: h.closes })),
      areaServed: [...CITIES.map((c) => ({ '@type': 'City', name: `${c.name}, AR`, ...(c.county ? { containedInPlace: { '@type': 'AdministrativeArea', name: `${c.county}, Arkansas` } } : {}) })),
        { '@type': 'GeoCircle', geoMidpoint: { '@type': 'GeoCoordinates', ...BUSINESS.geo }, geoRadius: '80467' }],
      hasOfferCatalog: { '@type': 'OfferCatalog', name: 'Remodeling services', itemListElement: CATEGORIES.map((c) => ({ '@type': 'OfferCatalog', name: c.name, url: `${SITE}/${c.slug}`,
        itemListElement: c.subs.map((s) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: s.name, url: `${SITE}/${c.slug}/${s.slug}`, provider: { '@id': BIZ } } })) })) },
      knowsAbout: ['Bathroom remodeling', 'Tub-to-shower conversions', 'Walk-in showers', 'Walk-in tubs', 'Grout-free shower wall panels', 'Aging-in-place and ADA bathroom design', 'Kitchen remodeling', 'Cabinet refacing', 'Countertop replacement', 'Backsplash installation', 'Handyman repairs'],
      founder: { '@id': FOUNDER, name: BUSINESS.founder },
      contactPoint: [
        { '@type': 'ContactPoint', telephone: '+1-501-504-3398', contactType: 'customer service', areaServed: 'US-AR', availableLanguage: 'en' },
        { '@type': 'ContactPoint', telephone: '+1-501-909-4406', contactType: 'office', areaServed: 'US-AR', availableLanguage: 'en' },
        { '@type': 'ContactPoint', telephone: '+1-501-504-3398', contactType: 'emergency handyman service', areaServed: 'US-AR', availableLanguage: 'en',
          hoursAvailable: { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'], opens: '00:00', closes: '23:59' } },
      ],
      email: BUSINESS.email, logo: LOGO, image: `${SITE}/assets/img/og-image.jpg`,
    });
    delete biz.openingHours;
  }
  if (page.slug === 'about') {
    for (let i = graph.length - 1; i >= 0; i--) if (graph[i]['@id'] === `${ABOUT_URL}#about` || (graph[i]['@id'] === FOUNDER)) graph.splice(i, 1);
    const wp = graph.find((n) => n['@id'] === pageId);
    if (wp) Object.assign(wp, { '@type': ['AboutPage', 'ProfilePage'], mainEntity: { '@id': FOUNDER } });
    graph.push(founderPerson());
  }
  return { '@context': 'https://schema.org', '@graph': graph, _hasArticle: hasArticle };
}
