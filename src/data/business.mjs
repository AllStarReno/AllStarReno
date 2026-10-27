// Single source of truth for NAP + entity data. Never add a license number.
export const SITE = 'https://allstarreno.com';
export const BUSINESS = {
  name: 'All-Star Renovations',
  alternateName: ['All-Star Renovations of Conway, AR', 'All-Star Renovations of Conway, Arkansas', 'All-Star Renovations Conway', 'All-Star Renovate', 'allstarreno'],
  phone: '(501) 504-3398',
  tel: '+15015043398',
  telSchema: '+1-501-504-3398',
  guarantee: 'Google Guaranteed',
  officePhone: '(501) 909-4406',
  officeTel: '+15019094406',
  // Owner-approved standard trust wording (2026-10-23). Never show a license number.
  coverage: 'Licensed, Insured & Workers’ Comp Covered',
  veteranOwned: true,
  emergency: '24/7 Emergency Handyman Service',
  email: 'info@allstarreno.com',
  // Owner-confirmed 2026-10-26.
  paymentAccepted: 'Cash, Check, Credit Card, Debit Card, ACH, Wire Transfer, PayPal, Cash App, Apple Pay, Google Pay, Amazon Pay, Bitcoin, Buy Now Pay Later',
  paymentText: 'cash, check, credit and debit cards, ACH, wire, PayPal, Cash App, Apple Pay, Google Pay, Amazon Pay, Bitcoin, and several buy-now-pay-later options, in person or digitally on invoice',
  city: 'Conway, AR',
  address: { streetAddress: '11 Arnett Ln', addressLocality: 'Conway', addressRegion: 'AR', postalCode: '72032', addressCountry: 'US' },
  identity: 'All-Star Renovations of Conway, Arkansas is a locally owned company serving Central Arkansas. We are not affiliated with any other All-Star Renovations outside of Central Arkansas.',
  geo: { latitude: 35.0887, longitude: -92.4421 },
  founder: 'Thomas Pedersen',
  hours: [
    { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '07:30', closes: '17:00' },
    { days: ['Saturday'], opens: '07:00', closes: '19:00' },
    { days: ['Sunday'], opens: '09:00', closes: '15:00' },
  ],
  // Google Business Profile (verified via g.page short link -> Maps place CID 0x10915455e557a7a5).
  gbp: 'https://www.google.com/maps?cid=1193828104126572453',
  // Only profiles verified to exist (owner's allstarreno.link hub + web search, 2026-10-23). Never invent one.
  sameAs: [
    'https://www.google.com/maps?cid=1193828104126572453',
    'https://www.facebook.com/allstarreno1/',
    'https://www.instagram.com/allstarreno/',
    'https://www.yelp.com/biz/all-star-renovations-conway',
    'https://www.bbb.org/us/ar/conway/profile/bathroom-remodel/all-star-renovations-0935-90368635',
    'https://nextdoor.com/pages/all-star-renovations-conway-ar-1',
    'https://www.houzz.com/professionals/kitchen-and-bath-remodelers/all-star-renovations-pfvwus-pf~1481213171',
    'https://www.linkedin.com/company/all-starrenovations',
    'https://www.youtube.com/channel/UChXHzlSsdqMEQwMV8V4BqRA',
    'https://www.pinterest.com/All_StarReno',
    'https://www.tiktok.com/@allstarreno',
    'https://www.threads.net/@allstarreno',
    'https://x.com/All_StarReno',
    'https://prosgrade.com/renovations/conway/all-star-renovations',
  ],
};

// Keyless Google Maps embed (lazy, below the fold) for contact + service areas.
export const MAP_EMBED = `<section class="asr-map" aria-labelledby="asr-map-h" style="padding:48px 20px;background:#0e172a"><div style="max-width:1100px;margin:0 auto"><h2 id="asr-map-h" style="color:#fff;font-size:1.6rem;font-weight:700;margin:0 0 6px">Where is All-Star Renovations located?</h2><p style="color:#cbd5e1;margin:0 0 16px">All-Star Renovations, 11 Arnett Ln, Conway, AR 72032 · <a href="tel:+15015043398" style="color:#fdba74">(501) 504-3398</a> · <a href="https://www.google.com/maps?cid=1193828104126572453" rel="noopener" target="_blank" style="color:#fdba74">Open in Google Maps</a></p><div class="asr-map-f" data-src="https://maps.google.com/maps?q=All-Star%20Renovations%2C%2011%20Arnett%20Ln%2C%20Conway%2C%20AR%2072032&z=11&output=embed" style="position:relative;height:380px;border-radius:12px;overflow:hidden;background:#1e293b linear-gradient(135deg,#1e293b,#0f2b48);display:grid;place-items:center"><button type="button" onclick="var d=this.parentNode,f=document.createElement('iframe');f.title='Map of All-Star Renovations, 11 Arnett Ln, Conway, AR 72032';f.src=d.dataset.src;f.width='100%';f.height='380';f.style.border='0';f.allowFullscreen=true;f.referrerPolicy='no-referrer-when-downgrade';d.replaceChildren(f)" style="background:#c2410c;color:#fff;border:0;border-radius:10px;padding:14px 22px;font-weight:700;font-size:1rem;cursor:pointer">Show map: 11 Arnett Ln, Conway, AR</button></div></div></section>`;

// Trust badges (owner-confirmed). Add a profile URL to `href` to make a badge a link; empty = plain image.
// Display-only: these are NOT used for aggregateRating schema.
export const BADGES = [
  { id: 'google-reviews', alt: 'Google Reviews 5-star rated', w: 218, h: 104, href: 'https://g.page/r/CaWnV-VVVJEQEBM/review' },
  { id: 'yelp-5-star', alt: 'Yelp business profile', w: 163, h: 112, href: 'https://www.yelp.com/biz/all-star-renovations-conway' },
  { id: 'facebook-5-rating', alt: 'Facebook 5.0 average rating', w: 218, h: 92, href: 'https://www.facebook.com/allstarreno1/' },
  { id: 'houzz', alt: 'Houzz listed pro', w: 101, h: 112, href: 'https://www.houzz.com/professionals/kitchen-and-bath-remodelers/all-star-renovations-pfvwus-pf~1481213171' },
  { id: 'nextdoor-fave-2026', alt: '2026 Nextdoor Fave Winner, voted by neighbors on Nextdoor', w: 112, h: 112, href: 'https://nextdoor.com/pages/all-star-renovations-conway-ar-1' },
];
