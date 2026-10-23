// Paid-ad landing pages: /lp/<platform>/<offer>. noindex, excluded from the sitemap, no main nav.
export const PLATFORMS = [
  { slug: 'meta', name: 'Meta', short: true },
  { slug: 'google', name: 'Google Ads', short: false },
  { slug: 'microsoft', name: 'Microsoft Ads', short: false },
];
// formSlug drives the LeadForm service dropdown (see services.mjs serviceContext).
export const OFFERS = [
  { slug: 'shower-replacement', name: 'Shower Replacement', formSlug: 'bathroom-remodeling/all-star-shower-systems',
    search: 'Shower Replacement in Conway & Central Arkansas', social: 'Swap Your Old Shower for a New One, Fast*',
    sub: 'Replace a worn or leaking shower with a low-maintenance, custom-fit shower system, installed by our own crew in as little as 1–2 days.*',
    points: ['Custom-fit, low-maintenance wall systems', 'Removal of the old shower included', 'Glass doors, grab bars and seating options', 'Typical installs in 1–2 days*'] },
  { slug: 'tub-to-shower', name: 'Tub-to-Shower Conversion', formSlug: 'bathroom-remodeling/tub-to-shower-conversions',
    search: 'Tub-to-Shower Conversion in Central Arkansas', social: 'Trade the Tub You Never Use for a Walk-In Shower*',
    sub: 'Convert a hard-to-step-over tub into a safer, low-threshold walk-in shower, often in 1–2 days.*',
    points: ['Low or zero-threshold shower bases', 'Safer entry for every age', 'Grab bars and fold-down seats available', 'Typical installs in 1–2 days*'] },
  { slug: 'walk-in-tub', name: 'Walk-In Tub', formSlug: 'bathroom-remodeling/walk-in-tubs',
    search: 'Walk-In Tub Installation in Conway & Central Arkansas', social: 'Bathe Safely Again With a Walk-In Tub*',
    sub: 'Low step-in entry, built-in seating and hydrotherapy options for safer, more comfortable bathing at home.',
    points: ['Low step-in door and built-in seat', 'Hydrotherapy and heated options', 'Aging-in-place and ADA-minded designs', 'Professional install and haul-away'] },
  { slug: 'bathroom-remodel', name: 'Full Bathroom Remodel', formSlug: 'bathroom-remodeling/full-bathroom-remodel',
    search: 'Full Bathroom Remodel in Conway & Central Arkansas', social: 'Get the Bathroom You Actually Want*',
    sub: 'Complete bathroom remodels, from layout and plumbing to tile, vanity and lighting, handled by one local team.',
    points: ['Design help and a clear written quote', 'Showers, tubs, vanities, flooring and lighting', 'One local crew from start to finish', 'Clean, respectful job sites'] },
  { slug: 'kitchen-remodel', name: 'Kitchen Remodel', formSlug: 'kitchen-remodeling',
    search: 'Kitchen Remodeling in Conway & Central Arkansas', social: 'Refresh Your Kitchen Without the Headache*',
    sub: 'Cabinet refacing, countertops, backsplashes and full kitchen renovations for Central Arkansas homes.',
    points: ['Cabinet refacing and renovations', 'Countertop replacement', 'Backsplash installation', 'Free in-home estimate'] },
  { slug: 'handyman', name: 'Handyman', formSlug: 'handyman-services',
    search: 'Handyman Services in Conway & Central Arkansas', social: 'That Repair List? We’ll Handle It.',
    sub: 'Reliable repairs, installations and maintenance from a local team that shows up when scheduled.',
    points: ['Repairs, installs and maintenance', 'Insured, in-house pros', 'On-time arrival and clean-up', 'Free estimates'] },
];
export const TESTIMONIALS = [
  { q: 'Our new shower is absolutely stunning, exceeding all our expectations. The craftsmanship is truly top-notch.', n: 'Rob D.' },
  { q: 'Their craftsmanship, communication, and professionalism were top-notch. Completed on schedule and within budget.', n: 'Anibal Garcia' },
  { q: 'Thomas communicated clearly from the start, arrived as scheduled, and completed the work within the agreed timeline.', n: 'Gary R' },
];
export const LP_SLUGS = PLATFORMS.flatMap((p) => OFFERS.map((o) => `lp/${p.slug}/${o.slug}`));
