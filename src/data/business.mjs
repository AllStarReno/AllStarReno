// Single source of truth for NAP + entity data. Never add a license number.
export const SITE = 'https://allstarreno.com';
export const BUSINESS = {
  name: 'All-Star Renovations',
  alternateName: ['All-Star Renovate', 'allstarreno'],
  phone: '(501) 504-3398',
  tel: '+15015043398',
  email: 'info@allstarreno.com',
  city: 'Conway, AR',
  address: { streetAddress: '11 Arnett Ln', addressLocality: 'Conway', addressRegion: 'AR', postalCode: '72032', addressCountry: 'US' },
  identity: 'All-Star Renovations of Conway, Arkansas is a locally owned company serving Central Arkansas. We are not affiliated with any other All-Star Renovations outside of Central Arkansas.',
  geo: { latitude: 35.0887, longitude: -92.4421 },
};

// Trust badges (owner-confirmed). Add a profile URL to `href` to make a badge a link; empty = plain image.
// Display-only: these are NOT used for aggregateRating schema.
export const BADGES = [
  { id: 'google-reviews', alt: 'Google Reviews 5-star rated', w: 218, h: 104, href: '' },
  { id: 'yelp-5-star', alt: 'Yelp 5-star rated', w: 163, h: 112, href: '' },
  { id: 'facebook-5-rating', alt: 'Facebook 5.0 average rating', w: 218, h: 92, href: '' },
  { id: 'top-10-rated-best-remodel', alt: 'Top 10 Rated Best Remodel', w: 200, h: 110, href: '' },
  { id: 'porch-featured-pro', alt: 'Porch Featured Pro', w: 91, h: 112, href: '' },
  { id: 'fibo', alt: 'Fibo listed contractor', w: 211, h: 112, href: '' },
  { id: 'houzz', alt: 'Houzz listed pro', w: 101, h: 112, href: '' },
  { id: 'homeadvisor-screened-approved', alt: 'HomeAdvisor Screened & Approved', w: 123, h: 112, href: '' },
  { id: 'nextdoor-fave-2026', alt: '2026 Nextdoor Fave Winner, voted by neighbors on Nextdoor', w: 112, h: 112, href: '' },
];
