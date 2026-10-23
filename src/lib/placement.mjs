// Where the AI Studio lead form goes on each legacy page, and with what presets.
const CITY = { conway: 'Conway', greenbrier: 'Greenbrier', vilonia: 'Vilonia', maumelle: 'Maumelle', 'little-rock': 'Little Rock', 'north-little-rock': 'North Little Rock', sherwood: 'Sherwood', cabot: 'Cabot', benton: 'Benton', bryant: 'Bryant' };
const SVC = {
  'bathroom-remodeling': 'Full Bathroom Remodel', 'all-star-shower-systems': 'Shower Replacement', 'walk-in-showers': 'Shower Replacement',
  'tub-to-shower-conversions': 'Tub-to-Shower Conversion', 'walk-in-tubs': 'Walk-In Tub Installation', 'aging-in-place-ada': 'Aging-in-Place Renovation',
  'kitchen-remodeling': 'Kitchen Remodeling', 'handyman-services': 'Handyman Services', 'service-areas': 'Full Bathroom Remodel',
};
const COMPACT = /^(bathroom-remodeling|kitchen-remodeling|handyman-services|service-areas)(\/|$)/;

// Returns { at, end, props } (insert/replace range in page.body) or null.
export function formPlacement(page) {
  const b = page.body, s = page.slug;
  if (s === 'estimate') {
    const a = b.indexOf('<form'), e = b.indexOf('</form>');
    return a > -1 ? { at: a, end: e + 7, props: { variant: 'full', pitch: false, bare: true, source: 'estimate_page' } } : null;
  }
  if (s === '') { // home: card inside the existing "Ready to Transform" contact section
    const i = b.indexOf('id="contact"'), k = b.indexOf('<div class="lg:col-span-7">', i);
    if (k > -1) { const at = k + '<div class="lg:col-span-7">'.length; return { at, end: at, props: { variant: 'full', pitch: false, bare: true, source: 'home_contact' } }; }
  }
  if (s === 'contact') { // after the hero
    const h = b.indexOf('id="hero-h"'), at = b.indexOf('</section>', h) + 10;
    return { at, end: at, props: { variant: 'full', source: 'contact_page' } };
  }
  if (COMPACT.test(s)) {
    const parts = s.split('/'), last = parts[parts.length - 1];
    const city = CITY[last] || 'Conway';
    const service = SVC[last] || SVC[parts[0]];
    const at = b.lastIndexOf('<footer') > -1 ? b.lastIndexOf('<footer') : b.length;
    return { at, end: at, props: { variant: 'compact', city, service, source: `compact:${s}` } };
  }
  return null;
}

// "Request a visit" link placed right after the first Swivl scheduler button (Swivl untouched).
export function addVisitCta(body, hasForm) {
  const m = body.match(/<a\b[^>]*data-swivl="scheduler"[^>]*>[\s\S]*?<\/a>/) || body.match(/<a\b[^>]*data-swivl="quote"[^>]*>[\s\S]*?<\/a>/);
  if (!m) return body;
  const cls = (m[0].match(/class="([^"]*)"/) || [])[1] || '';
  const href = hasForm ? '#request-visit' : '/estimate';
  const link = `<a href="${href}" class="${cls} asr-rv" data-cta="request-visit">Request a visit</a>`;
  return body.slice(0, m.index + m[0].length) + link + body.slice(m.index + m[0].length);
}
