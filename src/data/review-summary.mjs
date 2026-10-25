// Verified public review counts (checked October 2026). All 5.0 stars. Plain text only:
// REVIEW_TOTAL drives the business aggregateRating (owner-approved). Never output individual Review schema.
import { BUSINESS } from './business.mjs';
export const REVIEW_TOTAL = 21;
export const REVIEW_CHECKED = 'October 2026';
export const GOOGLE_REVIEW_LINK = 'https://g.page/r/CaWnV-VVVJEQEBM/review';
export const REVIEW_PLATFORMS = [
  { name: 'Google', count: 10, url: BUSINESS.gbp },
  { name: 'Bark', count: 5, url: 'https://www.bark.com/en/us/company/all-star-renovations/QwA6A4/' },
  { name: 'TrustIndex', count: 2, url: 'https://www.trustindex.io/reviews/allstarreno.com', note: 'left directly on TrustIndex' },
  { name: 'Facebook', count: 1, url: 'https://www.facebook.com/allstarreno1/' },
  { name: 'BBB', count: 1, url: 'https://www.bbb.org/us/ar/conway/profile/bathroom-remodel/all-star-renovations-0935-90368635' },
  { name: 'Allbiz', count: 1, url: 'https://www.allbiz.com/business/all-star-renovations_50-501-504-3398' },
  { name: 'BuildZoom', count: 1, url: 'https://www.buildzoom.com/contractor/all-star-renovations-conway-ar' },
];
if (REVIEW_PLATFORMS.reduce((s, p) => s + p.count, 0) !== REVIEW_TOTAL) throw new Error('review counts must add up to REVIEW_TOTAL');
export const REVIEW_FAQS = [
  { q: 'How many reviews does All-Star Renovations have?', a: 'All-Star Renovations of Conway, AR has 21 verified public reviews, all 5.0 stars: 10 on Google, 5 on Bark, 2 on TrustIndex, 1 on Facebook, 1 on BBB, 1 on Allbiz and 1 on BuildZoom (checked October 2026).' },
  { q: 'Is All-Star Renovations well reviewed in Conway, AR?', a: 'Yes. Every one of our 21 verified public reviews is 5.0 stars. Customers mention clear communication, on-time work, clean job sites and quality shower and bathroom remodels.' },
  { q: 'Where can I read All-Star Renovations reviews?', a: 'Read them on Google, Bark, TrustIndex, Facebook, BBB, Allbiz and BuildZoom. Each platform is linked on allstarreno.com/reviews, so you can read every review on its original site.' },
  { q: 'Are the reviews on this page real?', a: 'Yes. Every quote is copied word for word from a public review page and links to the original. We never edit the wording.' },
  { q: 'How do I leave a review for All-Star Renovations?', a: 'The quickest way is our Google review link: g.page/r/CaWnV-VVVJEQEBM/review. You can also review us on Facebook, BBB or Bark.' },
  { q: 'Is this the All-Star Renovations in Arizona?', a: 'No. These reviews are for All-Star Renovations of Conway, Arkansas, serving Central Arkansas. We are not affiliated with any other All-Star Renovations.' },
];
