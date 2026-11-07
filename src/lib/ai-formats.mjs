// Static Markdown (.md) and section .txt copies for AI / voice-search grounding.
// Answer-first wording from approved facts and existing page content only.
// No new claims. Never show a license number. No "20+ 5-star reviews". No "we handle all permits".
import { BUSINESS, SITE } from '../data/business.mjs';
import { CATEGORIES } from '../data/services.mjs';
import { REVIEW_TOTAL, REVIEW_CHECKED, REVIEW_PLATFORMS } from '../data/review-summary.mjs';

export const UPDATED = '2026-11-05';

const phone = BUSINESS.phone;
const addr = `${BUSINESS.address.streetAddress}, ${BUSINESS.address.addressLocality}, ${BUSINESS.address.addressRegion} ${BUSINESS.address.postalCode}`;

function meta({ title, description, canonical, crumbs }) {
  return [
    `<!--`,
    `title: ${title}`,
    `description: ${description}`,
    `canonical: ${canonical}`,
    `last_updated: ${UPDATED}`,
    `-->`,
    '',
    crumbs,
    '',
  ].join('\n');
}

function crumb(parts) {
  // Markdown breadcrumb line: Home > Category > Page
  return parts.join(' > ');
}

const SHOWER = [
  'Premier: $5,000–$7,499',
  'Signature: $7,500–$9,999',
  'Designer: $10,000–$12,500+',
];

/** @type {{ slug: string, title: string, description: string, crumbs: string[], body: string }[]} */
export const MD_PAGES = [
  {
    slug: 'index',
    title: 'All-Star Renovations | Bathroom Remodeling Conway AR',
    description: 'Bathroom remodeling contractor in Conway, AR. All-Star Shower Systems, walk-in tubs, kitchen remodeling and handyman services across Central Arkansas.',
    crumbs: ['Home'],
    body: `# All-Star Renovations | Bathroom Remodeling Conway AR

What does All-Star Renovations do? Bathroom remodeling (primary), plus kitchen remodeling and handyman services in Conway and Central Arkansas.

Where are you located? ${addr}. Call ${phone} for a free estimate.

How fast is a shower remodel? Most shower replacements, tub-to-shower conversions and walk-in showers are installed in 1-2 days (timing varies by project and is confirmed in your written quote).

## Pricing (All-Star Shower Systems)

${SHOWER.map((x) => `- ${x}`).join('\n')}

Estimated ranges; final price confirmed at your free in-home quote.

## Core services

- Bathroom remodeling and All-Star Shower Systems
- Walk-in showers and tub-to-shower conversions
- Walk-in tubs and aging-in-place / ADA bathrooms
- Kitchen remodeling
- Handyman services, including 24/7 emergency handyman

## Facts

- In business since 2014; 20 years of experience; 500+ completed bathroom remodels
- Veteran-owned; Google Guaranteed; licensed, insured and workers' comp covered
- Service area: about 50 miles around Conway (Faulkner, Pulaski, Saline and Lonoke counties)
- Warranty: lifetime product warranty on All-Star Shower Systems materials and a 5-year workmanship warranty

## Key links

- [Bathroom Remodeling](${SITE}/bathroom-remodeling)
- [Services & Pricing](${SITE}/services-pricing)
- [Service Areas](${SITE}/service-areas)
- [Contact / Free Estimate](${SITE}/contact)
- [llms.txt](${SITE}/llms.txt)
`,
  },
  {
    slug: 'about',
    title: 'About All-Star Renovations | Conway, AR',
    description: 'All-Star Renovations of Conway, Arkansas: founded 2014, veteran-owned bathroom remodeling contractor serving Central Arkansas.',
    crumbs: ['Home', 'About'],
    body: `# About All-Star Renovations

Who is All-Star Renovations? A locally owned bathroom remodeling contractor in Conway, Arkansas, founded in 2014. Veteran-owned. Not affiliated with any All-Star Renovations outside Central Arkansas.

Where is the office? ${addr}. Main phone ${phone}. Office ${(BUSINESS.officePhone)}. Email ${BUSINESS.email}.

What credentials apply? Licensed, insured and workers' comp covered. Google Guaranteed. 20 years of experience and 500+ completed bathroom remodels.

## Reviews

${REVIEW_TOTAL} verified public reviews, all 5.0 stars (checked ${REVIEW_CHECKED}): ${REVIEW_PLATFORMS.map((p) => `${p.name} ${p.count}`).join(', ')}.

## Links

- [Contact](${SITE}/contact)
- [Reviews](${SITE}/reviews)
- [Services & Pricing](${SITE}/services-pricing)
`,
  },
  {
    slug: 'contact',
    title: 'Contact All-Star Renovations | Free Estimate',
    description: `Call ${phone} or request a free in-home estimate for bathroom remodeling in Central Arkansas.`,
    crumbs: ['Home', 'Contact'],
    body: `# Contact All-Star Renovations

How do I get a free estimate? Call ${phone} or visit the contact page form. Free in-home quotes across the Central Arkansas service area.

Address: ${addr}
Main: ${phone}
Office: ${BUSINESS.officePhone}
Email: ${BUSINESS.email}

Hours (Central Time): Mon–Fri 7:30 AM–5:00 PM; Sat 7:00 AM–7:00 PM; Sun 9:00 AM–3:00 PM. 24/7 emergency handyman: call ${phone}.

- [HTML contact page](${SITE}/contact)
- [Services & Pricing](${SITE}/services-pricing)
`,
  },
  {
    slug: 'warranty',
    title: 'Warranty | All-Star Renovations',
    description: 'Lifetime product warranty on All-Star Shower Systems materials and a 5-year workmanship warranty.',
    crumbs: ['Home', 'Warranty'],
    body: `# Warranty

What warranty is offered? Lifetime product warranty on All-Star Shower Systems materials and a 5-year workmanship warranty, backed by All-Star Renovations of Conway, Arkansas.

- [HTML warranty page](${SITE}/warranty)
- [All-Star Shower Systems](${SITE}/bathroom-remodeling/all-star-shower-systems)
- [Contact](${SITE}/contact)
`,
  },
  {
    slug: 'financing',
    title: 'Financing | All-Star Renovations',
    description: 'Bathroom remodel financing through Acorn Finance, HFS Financial and RenoFi.',
    crumbs: ['Home', 'Financing'],
    body: `# Financing

Is financing available? Yes, through Acorn Finance, HFS Financial and RenoFi. Rates, terms and approval are set by each lender.

Payment methods accepted: ${BUSINESS.paymentText}.

- [HTML financing page](${SITE}/financing)
- [Contact](${SITE}/contact)
`,
  },
  {
    slug: 'services-pricing',
    title: 'Services & Pricing | All-Star Renovations',
    description: 'All-Star Shower Systems package ranges and bathroom, kitchen and handyman services in Central Arkansas.',
    crumbs: ['Home', 'Services & Pricing'],
    body: `# Services & Pricing

How much does a shower remodel cost? All-Star Shower Systems packages:

${SHOWER.map((x) => `- ${x}`).join('\n')}

Estimated ranges; final price confirmed at your free in-home quote. Full bathroom remodels are priced by scope at the free in-home quote.

## Services

- Bathroom remodeling (All-Star Shower Systems, walk-in showers, tub-to-shower conversions, walk-in tubs, aging-in-place & ADA, full remodel)
- Kitchen remodeling (cabinet refacing and renovations, countertops, backsplash)
- Handyman services (repairs, installation, maintenance, 24/7 emergency)

- [HTML services & pricing](${SITE}/services-pricing)
- [Contact](${SITE}/contact)
`,
  },
  {
    slug: 'reviews',
    title: 'Reviews | All-Star Renovations Conway AR',
    description: `${REVIEW_TOTAL} verified public reviews, all 5.0 stars, for All-Star Renovations of Conway, Arkansas.`,
    crumbs: ['Home', 'Reviews'],
    body: `# Reviews

How many reviews does All-Star Renovations have? ${REVIEW_TOTAL} verified public reviews, all 5.0 stars (checked ${REVIEW_CHECKED}).

${REVIEW_PLATFORMS.map((p) => `- [${p.name} (${p.count})](${p.url})`).join('\n')}

These reviews are for All-Star Renovations of Conway, Arkansas, not any other company with a similar name.

- [HTML reviews page](${SITE}/reviews)
- [Leave a Google review](https://g.page/r/CaWnV-VVVJEQEBM/review)
`,
  },
  {
    slug: 'bathroom-remodeling',
    title: 'Bathroom Remodeling in Conway, AR | All-Star Renovations',
    description: 'Bathroom remodeling across Conway and Central Arkansas. Most shower installs take 1-2 days (timing varies).',
    crumbs: ['Home', 'Bathroom Remodeling'],
    body: `# Bathroom Remodeling in Conway, AR

What bathroom work do you do? All-Star Shower Systems, walk-in showers, tub-to-shower conversions, walk-in tubs, aging-in-place & ADA upgrades, and full or partial bathroom remodels.

How fast? Most shower replacements and tub-to-shower conversions take 1-2 days; timing varies by project and is confirmed in your written quote.

## Package ranges

${SHOWER.map((x) => `- ${x}`).join('\n')}

## Sub-services

- [All-Star Shower Systems](${SITE}/bathroom-remodeling/all-star-shower-systems)
- [Walk-In Showers](${SITE}/bathroom-remodeling/walk-in-showers)
- [Tub-to-Shower Conversions](${SITE}/bathroom-remodeling/tub-to-shower-conversions)
- [Walk-In Tubs](${SITE}/bathroom-remodeling/walk-in-tubs)
- [Aging-in-Place & ADA](${SITE}/bathroom-remodeling/aging-in-place-ada)
- [Full Bathroom Remodel](${SITE}/bathroom-remodeling/full-bathroom-remodel)

Call ${phone} · [Contact](${SITE}/contact)
`,
  },
  {
    slug: 'bathroom-remodeling/all-star-shower-systems',
    title: 'All-Star Shower Systems | All-Star Renovations',
    description: 'Premier, Signature and Designer All-Star Shower Systems packages for Central Arkansas.',
    crumbs: ['Home', 'Bathroom Remodeling', 'All-Star Shower Systems'],
    body: `# All-Star Shower Systems

What is All-Star Shower Systems? The branded shower line from All-Star Renovations (not a separate company), with grout-free wall systems for walk-in showers and tub-to-shower conversions.

## Packages

${SHOWER.map((x) => `- ${x}`).join('\n')}

Estimated ranges; final price confirmed at your free in-home quote. Lifetime product warranty on materials; 5-year workmanship warranty.

Materials: Non-Porous Custom Acrylic, Engineered Solid Surface, Composite Stone, RCB, and Engineered Wood.

- [HTML page](${SITE}/bathroom-remodeling/all-star-shower-systems)
- [Contact](${SITE}/contact)
`,
  },
  {
    slug: 'bathroom-remodeling/walk-in-showers',
    title: 'Walk-In Showers | All-Star Renovations',
    description: 'Walk-in shower installation in Conway and Central Arkansas. Most installs 1-2 days (timing varies).',
    crumbs: ['Home', 'Bathroom Remodeling', 'Walk-In Showers'],
    body: `# Walk-In Showers

Do you install walk-in showers? Yes, across Central Arkansas. Most installs take 1-2 days; timing varies by project and is confirmed in your written quote.

Package ranges follow All-Star Shower Systems: Premier $5,000–$7,499; Signature $7,500–$9,999; Designer $10,000–$12,500+.

- [HTML page](${SITE}/bathroom-remodeling/walk-in-showers)
- [Contact](${SITE}/contact)
`,
  },
  {
    slug: 'bathroom-remodeling/tub-to-shower-conversions',
    title: 'Tub-to-Shower Conversions | All-Star Renovations',
    description: 'Tub-to-shower conversions in Central Arkansas. Most installs 1-2 days (timing varies).',
    crumbs: ['Home', 'Bathroom Remodeling', 'Tub-to-Shower Conversions'],
    body: `# Tub-to-Shower Conversions

Do you convert tubs to showers? Yes. Most tub-to-shower conversions take 1-2 days; timing varies by project and is confirmed in your written quote.

- [HTML page](${SITE}/bathroom-remodeling/tub-to-shower-conversions)
- [Planning checklist](${SITE}/planning-checklist)
- [Contact](${SITE}/contact)
`,
  },
  {
    slug: 'bathroom-remodeling/walk-in-tubs',
    title: 'Walk-In Tubs | All-Star Renovations',
    description: 'Walk-in tub installation across Central Arkansas. Final price confirmed at your free in-home quote.',
    crumbs: ['Home', 'Bathroom Remodeling', 'Walk-In Tubs'],
    body: `# Walk-In Tubs

Does All-Star Renovations install walk-in tubs? Yes, across Central Arkansas. National 2026 guides put installed walk-in tubs at about $4,000–$15,000 (Angi); final price confirmed at your free in-home quote.

- [HTML page](${SITE}/bathroom-remodeling/walk-in-tubs)
- [Contact](${SITE}/contact)
`,
  },
  {
    slug: 'bathroom-remodeling/aging-in-place-ada',
    title: 'Aging-in-Place & ADA Bathrooms | All-Star Renovations',
    description: 'Aging-in-place and ADA bathroom upgrades in Conway and Central Arkansas.',
    crumbs: ['Home', 'Bathroom Remodeling', 'Aging-in-Place & ADA'],
    body: `# Aging-in-Place & ADA

Do you build safer bathrooms for aging in place? Yes: low-threshold or curbless entries, grab-bar blocking, seating and related accessibility upgrades, quoted in person.

- [HTML page](${SITE}/bathroom-remodeling/aging-in-place-ada)
- [Contact](${SITE}/contact)
`,
  },
  {
    slug: 'bathroom-remodeling/full-bathroom-remodel',
    title: 'Full & Partial Bathroom Remodel | All-Star Renovations',
    description: 'Full bathroom remodels priced by scope; partial updates often 1-2 days (timing varies).',
    crumbs: ['Home', 'Bathroom Remodeling', 'Full Bathroom Remodel'],
    body: `# Full & Partial Bathroom Remodel

What does a full remodel cost? Priced by scope at your free in-home quote. Partial updates that replace the tub or shower often take 1-2 days; timing varies.

- [HTML page](${SITE}/bathroom-remodeling/full-bathroom-remodel)
- [Contact](${SITE}/contact)
`,
  },
  {
    slug: 'kitchen-remodeling',
    title: 'Kitchen Remodeling | All-Star Renovations',
    description: 'Kitchen remodeling in Conway and Central Arkansas: cabinets, countertops and backsplash.',
    crumbs: ['Home', 'Kitchen Remodeling'],
    body: `# Kitchen Remodeling

What kitchen work do you offer? Cabinet refacing, cabinet renovations, countertop replacement and backsplash installation in Central Arkansas. Pricing is confirmed at your free in-home quote.

- [Cabinet Refacing](${SITE}/kitchen-remodeling/cabinet-refacing)
- [Cabinet Renovations](${SITE}/kitchen-remodeling/cabinet-renovations)
- [Countertop Replacement](${SITE}/kitchen-remodeling/countertop-replacement)
- [Backsplash Installation](${SITE}/kitchen-remodeling/backsplash-installation)
- [Contact](${SITE}/contact)
`,
  },
  {
    slug: 'kitchen-remodeling/cabinet-refacing',
    title: 'Cabinet Refacing | All-Star Renovations',
    description: 'Kitchen cabinet refacing in Central Arkansas.',
    crumbs: ['Home', 'Kitchen Remodeling', 'Cabinet Refacing'],
    body: `# Cabinet Refacing

Do you reface cabinets? Yes. Scope and price are confirmed at your free in-home quote.

- [HTML page](${SITE}/kitchen-remodeling/cabinet-refacing)
- [Contact](${SITE}/contact)
`,
  },
  {
    slug: 'kitchen-remodeling/cabinet-renovations',
    title: 'Cabinet Renovations | All-Star Renovations',
    description: 'Kitchen cabinet renovations in Central Arkansas.',
    crumbs: ['Home', 'Kitchen Remodeling', 'Cabinet Renovations'],
    body: `# Cabinet Renovations

Do you renovate kitchen cabinets? Yes. Scope and price are confirmed at your free in-home quote.

- [HTML page](${SITE}/kitchen-remodeling/cabinet-renovations)
- [Contact](${SITE}/contact)
`,
  },
  {
    slug: 'kitchen-remodeling/countertop-replacement',
    title: 'Countertop Replacement | All-Star Renovations',
    description: 'Kitchen countertop replacement in Central Arkansas.',
    crumbs: ['Home', 'Kitchen Remodeling', 'Countertop Replacement'],
    body: `# Countertop Replacement

Do you replace countertops? Yes. Scope and price are confirmed at your free in-home quote.

- [HTML page](${SITE}/kitchen-remodeling/countertop-replacement)
- [Contact](${SITE}/contact)
`,
  },
  {
    slug: 'kitchen-remodeling/backsplash-installation',
    title: 'Backsplash Installation | All-Star Renovations',
    description: 'Kitchen backsplash installation in Central Arkansas.',
    crumbs: ['Home', 'Kitchen Remodeling', 'Backsplash Installation'],
    body: `# Backsplash Installation

Do you install backsplashes? Yes. Scope and price are confirmed at your free in-home quote.

- [HTML page](${SITE}/kitchen-remodeling/backsplash-installation)
- [Contact](${SITE}/contact)
`,
  },
  {
    slug: 'handyman-services',
    title: 'Handyman Services | All-Star Renovations',
    description: 'Handyman repairs, installation, maintenance and 24/7 emergency service in Central Arkansas.',
    crumbs: ['Home', 'Handyman Services'],
    body: `# Handyman Services

What handyman work do you offer? Repairs, installation and maintenance, plus 24/7 emergency handyman service. Call ${phone}.

- [Repairs](${SITE}/handyman-services/repairs)
- [Installation](${SITE}/handyman-services/installation)
- [Maintenance](${SITE}/handyman-services/maintenance)
- [Contact](${SITE}/contact)
`,
  },
  {
    slug: 'handyman-services/repairs',
    title: 'Handyman Repairs | All-Star Renovations',
    description: 'Handyman repairs in Central Arkansas.',
    crumbs: ['Home', 'Handyman Services', 'Repairs'],
    body: `# Handyman Repairs

Do you handle home repairs? Yes. Call ${phone} or request a visit.

- [HTML page](${SITE}/handyman-services/repairs)
`,
  },
  {
    slug: 'handyman-services/installation',
    title: 'Handyman Installation | All-Star Renovations',
    description: 'Handyman installation services in Central Arkansas.',
    crumbs: ['Home', 'Handyman Services', 'Installation'],
    body: `# Handyman Installation

Do you install fixtures and related home items? Yes. Call ${phone}.

- [HTML page](${SITE}/handyman-services/installation)
`,
  },
  {
    slug: 'handyman-services/maintenance',
    title: 'Handyman Maintenance | All-Star Renovations',
    description: 'Handyman maintenance in Central Arkansas.',
    crumbs: ['Home', 'Handyman Services', 'Maintenance'],
    body: `# Handyman Maintenance

Do you offer maintenance visits? Yes. Call ${phone}.

- [HTML page](${SITE}/handyman-services/maintenance)
`,
  },
];

export const TXT_SECTIONS = [
  {
    id: 'bathroom-remodeling',
    title: 'Bathroom remodeling — All-Star Renovations',
    body: `Bathroom remodeling is the primary service of All-Star Renovations of Conway, Arkansas (${phone}).

Most shower replacements, tub-to-shower conversions and walk-in showers are installed in 1-2 days (timing varies by project and is confirmed in your written quote).

All-Star Shower Systems packages: Premier $5,000–$7,499; Signature $7,500–$9,999; Designer $10,000–$12,500+. Final price confirmed at your free in-home quote.

Also: walk-in tubs; aging-in-place & ADA; full and partial bathroom remodels.

HTML: ${SITE}/bathroom-remodeling
Markdown: ${SITE}/bathroom-remodeling.md
llms.txt: ${SITE}/llms.txt
`,
  },
  {
    id: 'kitchen-remodeling',
    title: 'Kitchen remodeling — All-Star Renovations',
    body: `Kitchen remodeling from All-Star Renovations of Conway, Arkansas: cabinet refacing, cabinet renovations, countertop replacement and backsplash installation. Pricing confirmed at your free in-home quote. Call ${phone}.

HTML: ${SITE}/kitchen-remodeling
Markdown: ${SITE}/kitchen-remodeling.md
`,
  },
  {
    id: 'handyman-services',
    title: 'Handyman services — All-Star Renovations',
    body: `Handyman services from All-Star Renovations: repairs, installation, maintenance and 24/7 emergency handyman. Call ${phone}. Address: ${addr}.

HTML: ${SITE}/handyman-services
Markdown: ${SITE}/handyman-services.md
`,
  },
  {
    id: 'service-areas',
    title: 'Service areas — All-Star Renovations',
    body: `All-Star Renovations serves about 50 miles around Conway, Arkansas: Faulkner, Pulaski, Saline and Lonoke counties (Conway, Greenbrier, Vilonia, Little Rock, North Little Rock, Maumelle, Sherwood, Benton, Bryant, Cabot and nearby towns). Call ${phone} to confirm coverage.

HTML: ${SITE}/service-areas
Markdown: ${SITE}/service-areas.md
`,
  },
];

export function renderMarkdown(page) {
  const canonical = page.slug === 'index' ? `${SITE}/` : `${SITE}/${page.slug}`;
  const crumbs = crumb(page.crumbs);
  return meta({ title: page.title, description: page.description, canonical, crumbs }) + page.body.trim() + '\n';
}

export function renderSectionTxt(section) {
  return `# ${section.title}\n\nLast updated: ${UPDATED}\n\n${section.body.trim()}\n`;
}

export const MD_SLUGS = new Set(MD_PAGES.map((p) => p.slug === 'index' ? '' : p.slug));
