// Stage 3: every city/county page slug rendered by CityPage.astro (catch-all skips these; sitemap includes them).
import { CITIES } from './cities.mjs';
import { COUNTY_INFO } from './city-guides.mjs';
export const CITY_CATS = ['bathroom-remodeling', 'kitchen-remodeling', 'handyman-services'];
export const CITY_PAGE_SLUGS = [
  ...CITIES.map((c) => `service-areas/${c.slug}`),
  ...Object.keys(COUNTY_INFO).map((k) => `service-areas/${k}`),
  ...CITY_CATS.flatMap((cat) => CITIES.map((c) => `${cat}/${c.slug}`)),
];
