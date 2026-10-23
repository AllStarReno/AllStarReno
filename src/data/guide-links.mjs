// Internal-linking map: guides <-> the services they support (descriptive anchors).
export const GUIDES = [
  { href: '/blog/bathroom-remodeling-cost-guide', title: 'Bathroom Remodeling Cost Guide', subs: ['*'] },
  { href: '/blog/tub-to-shower-conversion-guide', title: 'Tub-to-Shower Conversion Guide', subs: ['tub-to-shower-conversions', 'walk-in-showers', 'all-star-shower-systems'] },
  { href: '/blog/aging-in-place-bathroom-design', title: 'Aging-in-Place Bathroom Design Guide', subs: ['aging-in-place-ada', 'walk-in-tubs', 'walk-in-showers'] },
];
export const guidesFor = (cat, sub) => cat !== 'bathroom-remodeling' ? [] : GUIDES.filter((g) => !sub || g.subs.includes('*') || g.subs.includes(sub));
