// Internal-linking map: guides <-> the services they support (descriptive anchors).
export const GUIDES = [
  { href: '/blog/bathroom-remodeling-cost-guide', title: 'Bathroom Remodeling Cost Guide', subs: ['*'] },
  { href: '/blog/tub-to-shower-conversion-guide', title: 'Tub-to-Shower Conversion Guide', subs: ['tub-to-shower-conversions', 'walk-in-showers', 'all-star-shower-systems'] },
  { href: '/blog/aging-in-place-bathroom-design', title: 'Aging-in-Place Bathroom Design Guide', subs: ['aging-in-place-ada', 'walk-in-tubs', 'walk-in-showers'] },
  { href: '/blog/how-long-does-a-bathroom-remodel-take', title: 'How Long a Bathroom Remodel Takes', subs: [] },
  { href: '/blog/types-of-bathroom-remodeling', title: 'Types of Bathroom Remodeling', subs: [] },
  { href: '/blog/bathroom-remodeling-considerations', title: 'Bathroom Remodel Considerations', subs: [] },
  { href: '/blog/bathroom-remodeling-steps', title: 'Bathroom Remodeling Steps', subs: [] },
  { href: '/blog/bathroom-remodeling-trends', title: 'Bathroom Remodeling Trends', subs: ['walk-in-showers', 'all-star-shower-systems'] },
  { href: '/blog/how-to-finance-a-bathroom-safety-remodel', title: 'Paying for a Bathroom Safety Remodel', subs: ['aging-in-place-ada', 'walk-in-tubs'] },
  { href: '/blog/how-to-vet-a-bathroom-remodeling-contractor', title: 'How to Vet a Bathroom Remodeler', subs: ['*'] },
];
export const guidesFor = (cat, sub) => cat !== 'bathroom-remodeling' ? [] : GUIDES.filter((g) => !sub || g.subs.includes('*') || g.subs.includes(sub));
