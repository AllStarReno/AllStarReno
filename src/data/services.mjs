// Service taxonomy: single source of truth for page categories and the lead form's Service dropdown.
// Pages are routed by URL: /<category.slug>/... ; a path segment matching a sub.slug marks a sub-service page.
// New (step 3) pages under these paths inherit the right options automatically.
export const OTHER = 'Other / Not sure';
export const CATEGORIES = [
  { slug: 'bathroom-remodeling', name: 'Bathroom Remodeling', subs: [
    { slug: 'all-star-shower-systems', name: 'All-Star Shower Systems' },
    { slug: 'walk-in-showers', name: 'Walk-In Showers' },
    { slug: 'tub-to-shower-conversions', name: 'Tub-to-Shower Conversions' },
    { slug: 'walk-in-tubs', name: 'Walk-In Tubs' },
    { slug: 'aging-in-place-ada', name: 'Aging-in-Place & ADA' },
    { slug: 'full-bathroom-remodel', name: 'Full Bathroom Remodel' },
  ] },
  { slug: 'kitchen-remodeling', name: 'Kitchen Remodeling', subs: [
    { slug: 'cabinet-refacing', name: 'Cabinet Refacing' },
    { slug: 'cabinet-renovations', name: 'Cabinet Renovations' },
    { slug: 'countertop-replacement', name: 'Countertop Replacement' },
    { slug: 'backsplash-installation', name: 'Backsplash Installation' },
  ] },
  { slug: 'handyman-services', name: 'Handyman Services', subs: [
    { slug: 'repairs', name: 'Repairs' },
    { slug: 'installation', name: 'Installation' },
    { slug: 'maintenance', name: 'Maintenance' },
  ] },
];

// { category: name|'' , options: string[], selected: string|'' } for a page slug like "kitchen-remodeling/cabot".
export function serviceContext(slug = '') {
  const parts = String(slug).split('/').filter(Boolean);
  const cat = CATEGORIES.find((c) => c.slug === parts[0]);
  if (!cat) return { category: '', options: [...CATEGORIES.map((c) => c.name), OTHER], selected: '' };
  const sub = cat.subs.find((s) => parts.includes(s.slug));
  return { category: cat.name, options: [...cat.subs.map((s) => s.name), OTHER], selected: sub ? sub.name : '' };
}

// Server-side: resolve and validate a submitted (category, service) pair.
export function resolveService(category, service) {
  for (const c of CATEGORIES) {
    if (service === c.name) return { category: c.name, service };
    if (c.subs.some((s) => s.name === service)) return { category: c.name, service };
  }
  if (service === OTHER) return { category: CATEGORIES.some((c) => c.name === category) ? category : '', service };
  return null;
}
