import { NEW_CITIES } from './city-guides.mjs';
// City directory data (service-areas hub). Seeded from the original city cards. No ratings: only real review data may be used.
const BASE = [
  {
    "slug": "conway",
    "geo": { "latitude": 35.0887, "longitude": -92.4421 },
    "milesFromHQ": 0,
    "name": "Conway",
    "county": "Faulkner County",
    "countySlug": "faulkner-county",
    "zips": [
      "72032",
      "72034",
      "72035"
    ],
    "description": "Conway is the headquarters and home base of All-Star Renovations. Homeowners here can count on bathroom remodeling, 1-2 day tub-to-shower conversions, and accessibility solutions, with kitchen and handyman help available too.",
    "services": [
      {
        "label": "Bathroom Remodeling",
        "href": "/bathroom-remodeling/conway"
      },
      {
        "label": "Kitchen Remodeling",
        "href": "/kitchen-remodeling/conway"
      },
      {
        "label": "Handyman Services",
        "href": "/handyman-services/conway"
      }
    ]
  },
  {
    "slug": "greenbrier",
    "geo": { "latitude": 35.2337, "longitude": -92.3877 },
    "milesFromHQ": 12,
    "name": "Greenbrier",
    "county": "Faulkner County",
    "countySlug": "faulkner-county",
    "zips": [
      "72058"
    ],
    "description": "Located about 12 miles north of our Conway headquarters, Greenbrier homeowners turn to All-Star Renovations for fast tub-to-shower conversions, walk-in tubs for aging in place, and durable kitchen cabinetry.",
    "services": [
      {
        "label": "Bathroom Remodeling",
        "href": "/bathroom-remodeling/greenbrier"
      },
      {
        "label": "Kitchen Remodeling",
        "href": "/kitchen-remodeling/greenbrier"
      },
      {
        "label": "Handyman Services",
        "href": "/handyman-services/greenbrier"
      }
    ]
  },
  {
    "slug": "vilonia",
    "geo": { "latitude": 35.0065, "longitude": -92.2132 },
    "milesFromHQ": 14,
    "name": "Vilonia",
    "county": "Faulkner County",
    "countySlug": "faulkner-county",
    "zips": [
      "72173"
    ],
    "description": "In Vilonia we bring custom remodeling right to your door, from master bathroom transformations with frameless glass showers to kitchen updates.",
    "services": [
      {
        "label": "Bathroom Remodeling",
        "href": "/bathroom-remodeling/vilonia"
      },
      {
        "label": "Kitchen Remodeling",
        "href": "/kitchen-remodeling/vilonia"
      },
      {
        "label": "Handyman Services",
        "href": "/handyman-services/vilonia"
      }
    ]
  },
  {
    "slug": "maumelle",
    "geo": { "latitude": 34.869, "longitude": -92.4046 },
    "milesFromHQ": 21,
    "name": "Maumelle",
    "county": "Pulaski County",
    "countySlug": "pulaski-county",
    "zips": [
      "72113"
    ],
    "description": "Maumelle homeowners appreciate grout-free luxury wall panel systems. We handle master bath retreats, custom vanity builds, and kitchen renovations.",
    "services": [
      {
        "label": "Bathroom Remodeling",
        "href": "/bathroom-remodeling/maumelle"
      },
      {
        "label": "Kitchen Remodeling",
        "href": "/kitchen-remodeling/maumelle"
      },
      {
        "label": "Handyman Services",
        "href": "/handyman-services/maumelle"
      }
    ]
  },
  {
    "slug": "north-little-rock",
    "geo": { "latitude": 34.7695, "longitude": -92.2671 },
    "milesFromHQ": 30,
    "name": "North Little Rock",
    "county": "Pulaski County",
    "countySlug": "pulaski-county",
    "zips": [
      "72114",
      "72116",
      "72117",
      "72118"
    ],
    "description": "In North Little Rock our team delivers reliable 1-2 day bathroom makeovers, tub-to-shower conversions, and kitchen upgrades, part of our Little Rock metro coverage.",
    "services": [
      {
        "label": "Bathroom Remodeling",
        "href": "/bathroom-remodeling/north-little-rock"
      },
      {
        "label": "Kitchen Remodeling",
        "href": "/kitchen-remodeling/north-little-rock"
      },
      {
        "label": "Handyman Services",
        "href": "/handyman-services/north-little-rock"
      }
    ]
  },
  {
    "slug": "little-rock",
    "geo": { "latitude": 34.7465, "longitude": -92.2896 },
    "milesFromHQ": 32,
    "name": "Little Rock",
    "county": "Pulaski County",
    "countySlug": "pulaski-county",
    "zips": [
      "72201",
      "72205",
      "72207",
      "72211",
      "72212",
      "72223"
    ],
    "description": "We serve Little Rock homeowners with bathroom renovations, zero-threshold ADA showers for senior accessibility, and kitchen transformations.",
    "services": [
      {
        "label": "Bathroom Remodeling",
        "href": "/bathroom-remodeling/little-rock"
      },
      {
        "label": "Kitchen Remodeling",
        "href": "/kitchen-remodeling/little-rock"
      },
      {
        "label": "Handyman Services",
        "href": "/handyman-services/little-rock"
      }
    ]
  },
  {
    "slug": "sherwood",
    "geo": { "latitude": 34.8151, "longitude": -92.2243 },
    "milesFromHQ": 28,
    "name": "Sherwood",
    "county": "Pulaski County",
    "countySlug": "pulaski-county",
    "zips": [
      "72120"
    ],
    "description": "Sherwood residents trust All-Star Renovations for safety-focused bathroom updates, walk-in safety tubs, low-barrier showers, and professional handyman services.",
    "services": [
      {
        "label": "Bathroom Remodeling",
        "href": "/bathroom-remodeling/sherwood"
      },
      {
        "label": "Kitchen Remodeling",
        "href": "/kitchen-remodeling/sherwood"
      },
      {
        "label": "Handyman Services",
        "href": "/handyman-services/sherwood"
      }
    ]
  },
  {
    "slug": "cabot",
    "geo": { "latitude": 34.9745, "longitude": -92.0165 },
    "milesFromHQ": 29,
    "name": "Cabot",
    "county": "Lonoke County",
    "countySlug": "lonoke-county",
    "zips": [
      "72023"
    ],
    "description": "In Cabot and Lonoke County we handle full master bath renovations, tub replacements with grout-free panels, and kitchen remodels.",
    "services": [
      {
        "label": "Bathroom Remodeling",
        "href": "/bathroom-remodeling/cabot"
      },
      {
        "label": "Kitchen Remodeling",
        "href": "/kitchen-remodeling/cabot"
      },
      {
        "label": "Handyman Services",
        "href": "/handyman-services/cabot"
      }
    ]
  },
  {
    "slug": "benton",
    "geo": { "latitude": 34.5645, "longitude": -92.5868 },
    "milesFromHQ": 44,
    "name": "Benton",
    "county": "Saline County",
    "countySlug": "saline-county",
    "zips": [
      "72015",
      "72019"
    ],
    "description": "Serving Benton and Saline County with bathroom transformations, walk-in safety showers, aging-in-place modifications, and kitchen cabinetry.",
    "services": [
      {
        "label": "Bathroom Remodeling",
        "href": "/bathroom-remodeling/benton"
      },
      {
        "label": "Kitchen Remodeling",
        "href": "/kitchen-remodeling/benton"
      },
      {
        "label": "Handyman Services",
        "href": "/handyman-services/benton"
      }
    ]
  },
  {
    "slug": "bryant",
    "geo": { "latitude": 34.5951, "longitude": -92.4896 },
    "milesFromHQ": 39,
    "name": "Bryant",
    "county": "Saline County",
    "countySlug": "saline-county",
    "zips": [
      "72022"
    ],
    "description": "Bryant homeowners get quick 1-2 day tub-to-shower installations, stone-look acrylic surrounds, and kitchen countertops built for busy family homes.",
    "services": [
      {
        "label": "Bathroom Remodeling",
        "href": "/bathroom-remodeling/bryant"
      },
      {
        "label": "Kitchen Remodeling",
        "href": "/kitchen-remodeling/bryant"
      },
      {
        "label": "Handyman Services",
        "href": "/handyman-services/bryant"
      }
    ]
  }
];

// Stage 3: 9 more city hubs from architecture.md (straight-line miles for these).
const HQ = { latitude: 35.0887, longitude: -92.4421 };
const rad = (x) => x * Math.PI / 180;
const miles = (g) => { const a = rad(g.latitude - HQ.latitude), b = rad(g.longitude - HQ.longitude);
  return Math.round(2 * 3958.8 * Math.asin(Math.sqrt(Math.sin(a / 2) ** 2 + Math.cos(rad(HQ.latitude)) * Math.cos(rad(g.latitude)) * Math.sin(b / 2) ** 2))); };
const svc = (slug) => [
  { label: 'Bathroom Remodeling', href: `/bathroom-remodeling/${slug}` },
  { label: 'Kitchen Remodeling', href: `/kitchen-remodeling/${slug}` },
  { label: 'Handyman Services', href: `/handyman-services/${slug}` },
];
export const CITIES = [...BASE, ...NEW_CITIES.map((c) => ({ ...c, milesFromHQ: miles(c.geo), services: svc(c.slug) }))];
export const nearestCities = (slug, n = 4) => { const c = CITIES.find((x) => x.slug === slug);
  const d = (o) => Math.hypot(o.geo.latitude - c.geo.latitude, (o.geo.longitude - c.geo.longitude) * 0.82);
  return CITIES.filter((o) => o.slug !== slug).sort((a, b) => d(a) - d(b)).slice(0, n); };
