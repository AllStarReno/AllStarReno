// Stage 4: sub-service x city location pages (/<category>/<sub>/<city>), AI Studio LocationPage layout.
// Local copy is assembled from per-city facts (city-guides LOCAL: housing, areas, landmarks, route; ZIPs, county,
// distance) and per-sub-service angles below. Only owner-confirmed claims. No prices, ratings or license numbers.
import { CATEGORIES } from './services.mjs';
import { CITIES } from './cities.mjs';
import { THIN_TOWNS } from './city-pages.mjs';

// Sub-services with a hub page (full-bathroom-remodel is covered by /bathroom-remodeling/<city>).
export const SUBS = CATEGORIES.flatMap((c) => c.subs.filter((s) => s.slug !== 'full-bathroom-remodel').map((s) => ({ ...s, cat: c })));
export const SUB_CITY_SLUGS = SUBS.flatMap((s) => CITIES.map((c) => `${s.cat.slug}/${s.slug}/${c.slug}`));
export const SUB_CITY_NOINDEX = new Set(SUBS.flatMap((s) => THIN_TOWNS.map((t) => `${s.cat.slug}/${s.slug}/${t}`)));
export const parseSubCity = (slug) => { const [c, s, t] = slug.split('/'); const sub = SUBS.find((x) => x.cat.slug === c && x.slug === s); const city = CITIES.find((x) => x.slug === t); return sub && city ? { sub, city } : null; };

const band = (m) => (m === 0 ? 'home' : m <= 15 ? 'near' : m <= 30 ? 'mid' : 'far');
const visit = { home: 'Conway is our home base, so estimate visits and follow-ups are quick to schedule.',
  near: 'is a short drive from our Conway office, so estimate visits are easy to fit into the week.',
  mid: 'is within our regular service loop, and we group visits so travel never holds up your project.',
  far: 'sits toward the edge of our 50-mile radius; we plan the visit and crew days together so the job stays on schedule.' };
export const visitLine = (city) => { const b = band(city.milesFromHQ); return b === 'home' ? visit.home : `${city.name} ${visit[b]}`; };

// Per sub-service: who it fits, a local-fit sentence built from the city's housing notes, prep tips and FAQ angles.
export const ANGLES = {
  'all-star-shower-systems': { noun: 'All-Star Shower System', who: 'homeowners who want a grout-free, easy-clean shower installed by our own crew',
    fit: (c, L) => `In ${c.name}, we often install All-Star Shower Systems where an old tub or tiled stall has worn out. ${L.housing.split('. ')[0]}.`,
    prep: 'Clear the bathroom counters and floor, and plan on using another shower for the install days.',
    faq: (c) => ({ q: `Is All-Star Shower Systems a separate company from All-Star Renovations in ${c.name}?`, a: `No. All-Star Shower Systems is the branded shower service of All-Star Renovations of Conway, AR, and the same crew that serves ${c.name} installs it.` }) },
  'walk-in-showers': { noun: 'walk-in shower', who: 'homeowners who want an easier, low-threshold step into the shower',
    fit: (c, L) => `${L.housing.split('. ')[0]}. Many of those ${c.name} bathrooms are good candidates for a low-threshold walk-in shower.`,
    prep: 'Measure the doorway and note who uses the shower and how, so we can plan the threshold, seat and fixtures.',
    faq: (c) => ({ q: `Can you add a low-threshold walk-in shower to an older home in ${c.name}?`, a: `Usually, yes. We check the floor, drain location and wall framing at the free in-home quote in ${c.name} and recommend the threshold and base that fit your bathroom.` }) },
  'tub-to-shower-conversions': { noun: 'tub-to-shower conversion', who: 'homeowners tired of stepping over a high tub wall',
    fit: (c, L) => `A lot of ${c.name} homes still have the original tub-shower combo. ${L.housing.split('. ').slice(-1)[0].replace(/\.$/, '')}.`,
    prep: 'Decide whether you want to keep a tub in another bathroom; it helps resale and guides the plan.',
    faq: (c) => ({ q: `How long does a tub-to-shower conversion take in ${c.name}, AR?`, a: `Most of our tub-to-shower conversions in ${c.name} take 1-2 days once materials arrive; timing varies by project and is confirmed in your written quote. Older plumbing or wall repairs found at demo can add time, and we tell you before any change.` }) },
  'walk-in-tubs': { noun: 'walk-in tub', who: 'homeowners who still want to soak but need a safer, door-style entry',
    fit: (c, L) => `Walk-in tubs suit ${c.name} homeowners planning to stay put. ${L.housing.split('. ')[0]}, so we check the water heater and floor at every visit.`,
    prep: 'Check your water heater size and age; walk-in tubs need enough hot water to fill comfortably.',
    faq: (c) => ({ q: `Do walk-in tubs fit standard bathrooms in ${c.name} homes?`, a: `Most walk-in tubs are sized to replace a standard tub. At the free in-home quote in ${c.name} we measure the space, doorway and water heater before recommending a model.` }) },
  'aging-in-place-ada': { noun: 'aging-in-place bathroom', who: 'homeowners and families planning for safer bathing and mobility',
    fit: (c, L) => `Families across ${c.name} ask us to make a bathroom safer for a parent or for their own later years. ${L.housing.split('. ')[0]}, which shapes the curbless-entry and grab-bar plan.`,
    prep: 'List daily routines and any mobility aids (walker, wheelchair, shower chair) so the layout fits real use.',
    faq: (c) => ({ q: `Can you make a bathroom wheelchair-friendly in ${c.name}?`, a: `Often, yes. We plan curbless or low-threshold entries, seating and grab-bar blocking for ${c.name} bathrooms. Grab bars we install are rated to 500 lbs and teak seats to 400 lbs.` }) },
  'cabinet-refacing': { noun: 'cabinet refacing project', who: 'homeowners with solid cabinet boxes who want a new look without a full tear-out',
    fit: (c, L) => `${L.housing.split('. ')[0]}. In ${c.name}, refacing is a common way to update sound cabinet boxes without replacing them.`,
    prep: 'Empty the cabinets you want refaced and pick two or three door styles you like before the visit.',
    faq: (c) => ({ q: `Is cabinet refacing worth it for ${c.name} kitchens?`, a: `When the cabinet boxes are solid, refacing gives a new look with less disruption than replacement. We check the boxes at your free ${c.name} in-home quote and tell you honestly which option fits.` }) },
  'cabinet-renovations': { noun: 'cabinet renovation', who: 'homeowners who want new layouts, storage or replacement cabinets',
    fit: (c, L) => `${c.name} kitchens range widely. ${L.housing.split('. ').slice(-1)[0].replace(/\.$/, '')}, and cabinet renovations let us fix layout and storage, not just looks.`,
    prep: 'Note what does not work today (storage, reach, appliance fit) so we can plan around it.',
    faq: (c) => ({ q: `Do you replace cabinets or only update them in ${c.name}?`, a: `Both. In ${c.name} we refinish, reface or replace cabinets depending on condition and goals, and we explain the trade-offs at the free in-home quote.` }) },
  'countertop-replacement': { noun: 'countertop replacement', who: 'homeowners ready to swap worn laminate or dated tops',
    fit: (c, L) => `Countertops are one of the most requested kitchen updates we do in ${c.name}. ${L.housing.split('. ')[0]}.`,
    prep: 'Clear the counters and decide whether you are keeping the current sink and faucet.',
    faq: (c) => ({ q: `How long does countertop replacement take in ${c.name}?`, a: `It depends on the material and fabrication schedule. We give you a timeline for your ${c.name} kitchen at the free in-home quote, including when the old tops come out and the new ones go in.*` }) },
  'backsplash-installation': { noun: 'backsplash installation', who: 'homeowners wanting a fast kitchen refresh',
    fit: (c, L) => `A new backsplash is one of the quickest kitchen refreshes we do in ${c.name}. ${L.housing.split('. ')[0]}.`,
    prep: 'Pick a few tile samples you like and keep the counters clear on install day.',
    faq: (c) => ({ q: `Can you install a backsplash without replacing my countertops in ${c.name}?`, a: `Yes. Most backsplash projects in ${c.name} work with existing counters. We check the wall surface and outlets at the free in-home quote.` }) },
  repairs: { noun: 'home repair', who: 'homeowners with a list of fixes that keeps growing',
    fit: (c, L) => `${L.housing.split('. ')[0]}. Those ${c.name} homes bring a steady list of drywall, door, trim and fixture repairs.`,
    prep: 'Write down every repair in one list, with photos if you can, so we can quote it in one visit.',
    faq: (c) => ({ q: `Do you take small repair jobs in ${c.name}?`, a: `Yes. We group small repairs in ${c.name} into one visit when we can, which saves you time. Send us your list or call (501) 504-3398.` }) },
  installation: { noun: 'installation job', who: 'homeowners who need fixtures, doors, shelving or safety items put in right',
    fit: (c, L) => `From ${L.areas[0]} to ${L.areas[L.areas.length - 1]}, ${c.name} homeowners call us to install fixtures, doors, shelving and grab bars.`,
    prep: 'Have the product (or model number) on hand, or ask us to recommend one at the visit.',
    faq: (c) => ({ q: `Can you install grab bars and safety items in ${c.name}?`, a: `Yes. We install grab bars anchored into blocking or studs in ${c.name} homes; the grab bars we install are rated to 500 lbs.` }) },
  maintenance: { noun: 'maintenance visit', who: 'homeowners who want to stay ahead of wear and small problems',
    fit: (c, L) => `Arkansas humidity and seasonal storms are hard on caulk, seals and trim in ${c.name}. ${L.housing.split('. ')[0]}.`,
    prep: 'Note anything sticking, leaking or cracking, plus any seasonal tasks you want handled.',
    faq: (c) => ({ q: `Do you offer seasonal maintenance in ${c.name}?`, a: `Yes. We handle seasonal caulking, sealing, door and trim adjustments and small fixes for ${c.name} homeowners. Call (501) 504-3398 to set up a visit.` }) },
};
