// Shared helpers for /api/lead (Vercel Node functions).
// Files starting with "_" are not deployed as routes. No secrets live here: all
// credentials come from Vercel environment variables (see docs/forms-setup.md).
export const TZ = 'America/Chicago';
export const LEAD_TO = () => process.env.LEAD_TO_EMAIL || 'info@allstarreno.com';
export const LEAD_FROM = () => process.env.LEAD_FROM_EMAIL || 'All-Star Renovations Website <leads@allstarreno.com>';
export const PHONE = '(501) 504-3398';
// Public Google Calendar appointment booking page (owner's schedule; not a secret).
export const BOOKING_URL = 'https://calendar.google.com/calendar/appointments/schedules/AcZssZ0ZRx4CfMx9hmkVVcZm7KSoe_jVz0t6PvVOoKPgbogD28yX4PjouFRxs54v6qmA-gPzzc3hVSfi?gv=true';

export const SERVICES = ['Shower Replacement', 'Tub-to-Shower Conversion', 'Walk-In Tub Installation', 'Full Bathroom Remodel',
  'Aging-in-Place Renovation', 'Kitchen Remodeling', 'Handyman Services', 'Other / Not Sure'];
export const TIMELINES = ['', 'Immediate (1-2 Weeks)', 'Within 1 Month', '1 to 3 Months', 'Planning / Flexible'];

export async function readBody(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  let raw = typeof req.body === 'string' ? req.body : '';
  if (!raw) { for await (const c of req) raw += c; }
  const ct = String(req.headers['content-type'] || '');
  if (ct.includes('json')) { try { return JSON.parse(raw || '{}'); } catch { return {}; } }
  return Object.fromEntries(new URLSearchParams(raw));
}
