// Conway-only answer blocks for /bathroom-remodeling/conway and /kitchen-remodeling/conway (AI-visibility gaps, 2026-11-23).
// RULES: approved prices only (bathroom remodel $6,500–$18,000; All-Star Shower Systems tiers; walk-in tubs $5,500–$11,000).
// No kitchen price range is approved, so kitchen copy explains what drives the quote instead of quoting numbers.
// Local facts reuse the verified Conway entries in hyperlocal.mjs (ACS 2020–2024, City of Conway permits page).
// Never claim we handle all permits; never show a license number.
import { BUSINESS } from './business.mjs';
const P = BUSINESS.phone;
const ADDR = '11 Arnett Ln in Conway, Arkansas';
const TIERS = 'Premier $5,000–$7,499 · Signature $7,500–$9,999 · Designer $10,000–$12,500+';

export const CONWAY = {
  'bathroom-remodeling': {
    lead: `All-Star Renovations does bathroom remodeling in Conway, AR from our office at 11 Arnett Ln: shower replacements, walk-in showers, tub-to-shower conversions, walk-in tubs and safer bathrooms for aging in place. A typical bathroom remodel runs $6,500–$18,000, and every project starts with a free in-home quote.`,
    q: 'Who does bathroom remodeling in Conway, AR?',
    a: `All-Star Renovations, a locally owned, veteran-owned remodeler at ${ADDR} (Faulkner County), does bathroom remodeling across Conway ZIP 72032 and 72034. A typical bathroom remodel runs $6,500–$18,000. Shower replacements and tub-to-shower conversions use All-Star Shower Systems packages from $5,000 to $12,500+, and walk-in tubs run $5,500–$11,000. Most shower replacements and conversions take 1-2 days; timing varies by project. Licensed, Insured & Workers’ Comp Covered, with a 100% Customer Guarantee and a 5-year workmanship warranty. Call ${P} for a free in-home quote.`,
    costH: 'How much does bathroom remodeling cost in Conway, AR?',
    costHtml: `<div class="sp-tbl" tabindex="0" role="region" aria-label="Bathroom remodeling prices in Conway, AR"><table><thead><tr><th scope="col">Project</th><th scope="col">What it covers</th><th scope="col">Typical price</th><th scope="col">Typical timing</th></tr></thead><tbody>`
      + `<tr><th scope="row">Shower replacement or tub-to-shower conversion</th><td>New grout-free shower walls, base, door and fixtures in the space you already have</td><td>All-Star Shower Systems: ${TIERS}</td><td>Most take 1-2 days (timing varies)</td></tr>`
      + `<tr><th scope="row">Walk-in tub</th><td>A walk-in tub with a sealed door and seat, plus the surround and plumbing work it needs</td><td>$5,500–$11,000</td><td>Set in your written quote</td></tr>`
      + `<tr><th scope="row">Bathroom remodel</th><td>The wet area plus the flooring, vanity, fixtures and lighting in your scope</td><td>$6,500–$18,000</td><td>Set in your written quote</td></tr>`
      + `</tbody></table></div>`
      + `<p>These ranges are estimates, not a quote. In Conway the price usually moves with four things: the tub or shower being replaced, what turns up behind the old walls (older supply lines or a soft subfloor are more likely in the roughly 19% of Conway homes built before 1980), any plumbing that has to move, and the finish level you choose. Your final price is confirmed in writing at the free in-home quote. Financing is available through Acorn Finance, HFS Financial and RenoFi. More detail: <a href="/blog/bathroom-remodeling-cost-guide">bathroom remodeling cost guide</a> and <a href="/services-pricing">pricing &amp; shower packages</a>.</p>`,
    stepsH: 'Bathroom remodel timeline in Conway, step by step',
    steps: [
      ['Call or request a quote.', `Call ${P} or use the form, and tell us about the bathroom and who uses it.`],
      ['Free in-home visit in Conway.', 'We measure the room and check the walls, subfloor, drain and plumbing (and the water heater if you want a walk-in tub), then walk you through the options.'],
      ['Written quote.', 'Scope, price and timing are in writing before work starts. If we find something once the old walls come out, the change goes in writing first.'],
      ['Permits and materials.', 'The City of Conway requires a building permit for remodels, and plumbing, electrical, gas and mechanical work each need their own permit. We go over what your project needs at the quote.'],
      ['Our crew does the install.', 'Most shower replacements and tub-to-shower conversions take 1-2 days once materials arrive. Full remodels take longer; your timing is set in the written quote.'],
      ['Walkthrough and warranty.', 'We walk the finished bathroom with you. The work is backed by a 5-year workmanship warranty and our 100% Customer Guarantee, plus a lifetime product warranty on All-Star Shower Systems materials.'],
    ],
    linksH: 'Plan your Conway bathroom remodel',
    links: [
      ['Bathroom services', [['/bathroom-remodeling', 'Bathroom remodeling overview'], ['/bathroom-remodeling/full-bathroom-remodel', 'Full bathroom remodel'], ['/bathroom-remodeling/all-star-shower-systems', 'All-Star Shower Systems'], ['/bathroom-remodeling/walk-in-showers', 'Walk-in showers'], ['/bathroom-remodeling/tub-to-shower-conversions', 'Tub-to-shower conversions'], ['/bathroom-remodeling/walk-in-tubs', 'Walk-in tubs'], ['/bathroom-remodeling/aging-in-place-ada', 'Aging-in-place & ADA bathrooms']]],
      ['Guides', [['/blog/bathroom-remodeling-cost-guide', 'Bathroom remodeling cost guide'], ['/blog/how-long-does-a-bathroom-remodel-take', 'How long a bathroom remodel takes'], ['/blog/tub-to-shower-conversion-guide', 'Tub-to-shower conversion guide'], ['/blog/wall-panels-vs-tile', 'Wall panels vs. tile'], ['/blog/aging-in-place-bathroom-design', 'Aging-in-place bathroom design'], ['/blog/how-to-vet-a-bathroom-remodeling-contractor', 'How to vet a bathroom remodeler']]],
      ['More in Conway', [['/service-areas/conway', 'Conway service area guide'], ['/kitchen-remodeling/conway', 'Kitchen remodeling in Conway'], ['/handyman-services/conway', 'Handyman services in Conway'], ['/warranty', 'Warranty & guarantee'], ['/financing', 'Financing options'], ['/reviews', 'Customer reviews']]],
    ],
    offers: [
      { name: 'Bathroom remodel in Conway, AR', min: 6500, max: 18000 },
      { name: 'Shower replacement or tub-to-shower conversion (All-Star Shower Systems)', min: 5000, max: 12500 },
      { name: 'Walk-in tub installation in Conway, AR', min: 5500, max: 11000 },
    ],
    faq: [
      { q: 'How much does a walk-in tub cost in Conway, AR?', a: `All-Star Renovations walk-in tub installations in Conway typically run $5,500–$11,000, depending on the tub, your plumbing and how much of the surround needs rebuilding. We check your water heater at the free in-home quote. Call ${P}.` },
      { q: 'Is this the All-Star Renovations in Conway, Arkansas?', a: `Yes. All-Star Renovations of Conway, Arkansas is at 11 Arnett Ln, Conway, AR 72032, phone ${P}. We are a locally owned company serving Central Arkansas and are not affiliated with any other All-Star Renovations outside of Central Arkansas.` },
    ],
  },
  'kitchen-remodeling': {
    lead: 'All-Star Renovations does kitchen remodeling in Conway, AR from our office at 11 Arnett Ln: cabinet refacing, cabinet renovations, countertop replacement and backsplash installation, each priced at a free in-home quote.',
    q: 'Who does kitchen remodeling in Conway, AR?',
    a: `All-Star Renovations, a locally owned, veteran-owned remodeler at ${ADDR} (Faulkner County), does kitchen remodeling across Conway ZIP 72032 and 72034: cabinet refacing, cabinet renovations, countertop replacement and backsplash installation. Kitchen work is priced by scope at a free in-home quote and backed by a 100% Customer Guarantee and a 5-year workmanship warranty. Licensed, Insured & Workers’ Comp Covered. Call ${P}.`,
    costH: 'How much does a kitchen remodel cost in Conway, AR?',
    costHtml: `<p>We price Conway kitchen work by scope at a free in-home quote instead of publishing one flat range, because a new backsplash and a full cabinet renovation are very different jobs. These are the things that move a Conway kitchen quote:</p>`
      + `<ul style="margin:.5rem 0 0;padding-left:1.25rem;line-height:1.7">`
      + `<li><strong>Reface or replace.</strong> Refacing keeps cabinet boxes that are still solid, which is common in Conway kitchens from the 1990s and 2000s. Worn boxes or a layout that no longer works point to a cabinet renovation.</li>`
      + `<li><strong>Countertops.</strong> The material you pick and how many runs and cutouts (sink, range, cooktop) the kitchen has.</li>`
      + `<li><strong>Backsplash.</strong> How much wall it covers and the material.</li>`
      + `<li><strong>Plumbing or electrical changes.</strong> Moving a sink or adding circuits adds work, and in Conway plumbing and electrical work each need their own permit.</li>`
      + `<li><strong>What is behind the old surfaces.</strong> Anything found once old counters or cabinets come off is reviewed with you in writing before work continues.</li>`
      + `</ul><p>Financing is available through Acorn Finance, HFS Financial and RenoFi. Planning a bathroom too? Both can be covered in one in-home quote; see <a href="/bathroom-remodeling/conway">bathroom remodeling in Conway</a>.</p>`,
    stepsH: 'How a Conway kitchen remodel works',
    steps: [
      ['Call or request a quote.', `Call ${P} or use the form, and tell us what is not working in your kitchen.`],
      ['Free in-home visit in Conway.', 'We measure, look at the cabinet boxes, counters, sink and walls, and talk through refacing, renovation, counters and backsplash options.'],
      ['Written quote.', 'Scope, price and timing are in writing before work starts.'],
      ['Permits and materials.', 'Conway requires a building permit for remodels, with separate permits for plumbing, electrical, gas and mechanical work. We go over what your kitchen project needs at the quote.'],
      ['Our crew does the work.', 'Cabinet, countertop and backsplash work is scheduled around your household; timing varies by project and is set in your written quote.'],
      ['Walkthrough and warranty.', 'We walk the finished kitchen with you. The work is backed by a 5-year workmanship warranty and our 100% Customer Guarantee.'],
    ],
    linksH: 'Plan your Conway kitchen remodel',
    links: [
      ['Kitchen services', [['/kitchen-remodeling', 'Kitchen remodeling overview'], ['/kitchen-remodeling/cabinet-refacing', 'Cabinet refacing'], ['/kitchen-remodeling/cabinet-renovations', 'Cabinet renovations'], ['/kitchen-remodeling/countertop-replacement', 'Countertop replacement'], ['/kitchen-remodeling/backsplash-installation', 'Backsplash installation']]],
      ['More in Conway', [['/service-areas/conway', 'Conway service area guide'], ['/bathroom-remodeling/conway', 'Bathroom remodeling in Conway'], ['/handyman-services/conway', 'Handyman services in Conway'], ['/warranty', 'Warranty & guarantee'], ['/financing', 'Financing options'], ['/reviews', 'Customer reviews']]],
    ],
    era: [
      'Conway is the Faulkner County seat and is known as the City of Colleges for the University of Central Arkansas, Hendrix College and Central Baptist College. Older houses gather near downtown and the campuses, while much of the newer housing sits in subdivisions on the west and south sides.',
      'That split shows up in the kitchen. Near downtown, Hendrix and UCA, a tighter older layout often makes a cabinet renovation about storage and reach as much as looks. With about 46% of Conway homes built in 2000 or later, many kitchens in the newer west- and south-side subdivisions still have sound builder-grade cabinets that suit refacing, and original laminate counters that are ready to replace.',
      'Only about 45% of Conway homes are owner-occupied, so many kitchens here are rentals, where a new backsplash or countertop refreshes the room without a long shutdown.',
    ],
    faq: [
      { q: 'How much does a kitchen remodel cost in Conway, AR?', a: `It depends on the scope. All-Star Renovations prices Conway kitchen work at a free in-home quote, based on whether cabinets are refaced or replaced, the countertop material, the backsplash and any plumbing or electrical changes. Financing is available through Acorn Finance, HFS Financial and RenoFi. Call ${P}.` },
      { q: 'Do I need a permit for a kitchen remodel in Conway?', a: 'Often, yes. The City of Conway requires a building permit for remodels, and plumbing, electrical, gas and mechanical work each need their own permit. We go over what your kitchen project needs at the free in-home quote; details are on the City of Conway Building Permits & Inspections page.' },
      { q: 'How long does a kitchen remodel take in Conway?', a: 'It depends on the work. A backsplash or countertop replacement is a smaller job than a cabinet renovation with layout changes. Timing varies by project and is set in your written quote.' },
      { q: 'Is this the All-Star Renovations in Conway, Arkansas?', a: `Yes. All-Star Renovations of Conway, Arkansas is at 11 Arnett Ln, Conway, AR 72032, phone ${P}. We are a locally owned company serving Central Arkansas and are not affiliated with any other All-Star Renovations outside of Central Arkansas.` },
    ],
  },
};
export const conwayFor = (citySlug, catSlug) => (citySlug === 'conway' ? CONWAY[catSlug] || null : null);
