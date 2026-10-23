// GET /api/availability -> next 14 days (Mon–Sat) with each AI Studio time window
// marked busy from Google Calendar free/busy. Without Google env vars every window is open.
import { availability } from './_lib.js';
export default async function handler(req, res) {
  if (req.method !== 'GET') { res.setHeader('Allow', 'GET'); return res.status(405).json({ error: 'method' }); }
  const data = await availability();
  res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=120');
  res.setHeader('X-Robots-Tag', 'noindex');
  res.status(200).json(data);
}
