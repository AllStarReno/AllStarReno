// Shared helpers for /api/availability and /api/lead (Vercel Node functions).
// Files starting with "_" are not deployed as routes. No secrets live here: all
// credentials come from Vercel environment variables (see docs/forms-setup.md).
export const TZ = 'America/Chicago';
export const CALENDAR_ID = () => process.env.GOOGLE_CALENDAR_ID || 'allstarenovations@gmail.com';
export const LEAD_TO = () => process.env.LEAD_TO_EMAIL || 'info@allstarreno.com';
export const LEAD_FROM = () => process.env.LEAD_FROM_EMAIL || 'All-Star Renovations Website <leads@allstarreno.com>';
export const PHONE = '(501) 504-3398';

// AI Studio time windows (Contact.tsx). Times are local America/Chicago.
export const WINDOWS = [
  { id: 'morning', label: 'Morning (9:00 AM – 12:00 PM)', start: [9, 0], end: [12, 0] },
  { id: 'early-afternoon', label: 'Early Afternoon (12:00 PM – 3:00 PM)', start: [12, 0], end: [15, 0] },
  { id: 'late-afternoon', label: 'Late Afternoon (3:00 PM – 6:00 PM)', start: [15, 0], end: [18, 0] },
  { id: 'evening', label: 'Evening (6:00 PM – 7:30 PM)', start: [18, 0], end: [19, 30] },
  { id: 'flexible', label: 'Flexible / Any Time', start: [9, 0], end: [19, 30], flexible: true },
];
export const SERVICES = ['Shower Replacement', 'Tub-to-Shower Conversion', 'Walk-In Tub Installation', 'Full Bathroom Remodel',
  'Aging-in-Place Renovation', 'Kitchen Remodeling', 'Handyman Services', 'Other / Not Sure'];
export const TIMELINES = ['', 'Immediate (1-2 Weeks)', 'Within 1 Month', '1 to 3 Months', 'Planning / Flexible'];

// Offset (ms) of TZ at a given instant.
function tzOffset(ms) {
  const p = Object.fromEntries(new Intl.DateTimeFormat('en-US', { timeZone: TZ, hourCycle: 'h23', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' })
    .formatToParts(new Date(ms)).map((x) => [x.type, x.value]));
  return Date.UTC(+p.year, p.month - 1, +p.day, +p.hour, +p.minute, +p.second) - Math.floor(ms / 1000) * 1000;
}
// Local wall-clock time in TZ -> UTC Date.
export function zoned(date, [h, m]) {
  const [y, mo, d] = date.split('-').map(Number);
  let t = Date.UTC(y, mo - 1, d, h, m);
  t -= tzOffset(t); t = Date.UTC(y, mo - 1, d, h, m) - tzOffset(t);
  return new Date(t);
}
// Next 14 days (starting tomorrow, Chicago time), Mon–Sat only.
export function upcomingDays(now = Date.now()) {
  const fmt = new Intl.DateTimeFormat('en-CA', { timeZone: TZ, year: 'numeric', month: '2-digit', day: '2-digit' });
  const today = fmt.format(new Date(now));
  const out = [];
  for (let i = 1; i <= 14; i++) {
    const d = new Date(Date.parse(today + 'T12:00:00Z') + i * 864e5);
    const iso = d.toISOString().slice(0, 10);
    if (d.getUTCDay() === 0) continue; // Sunday
    out.push({ date: iso, label: d.toLocaleDateString('en-US', { timeZone: 'UTC', weekday: 'short', month: 'short', day: 'numeric' }) });
  }
  return out;
}
export const googleConfigured = () => !!(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET && process.env.GOOGLE_REFRESH_TOKEN);

async function googleToken() {
  const r = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST', headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ client_id: process.env.GOOGLE_CLIENT_ID, client_secret: process.env.GOOGLE_CLIENT_SECRET, refresh_token: process.env.GOOGLE_REFRESH_TOKEN, grant_type: 'refresh_token' }),
    signal: AbortSignal.timeout(6000),
  });
  const j = await r.json();
  if (!r.ok || !j.access_token) throw new Error('google token: ' + (j.error || r.status));
  return j.access_token;
}
export async function google(path, body, token) {
  token = token || await googleToken();
  const r = await fetch('https://www.googleapis.com/calendar/v3' + path, {
    method: 'POST', headers: { authorization: 'Bearer ' + token, 'content-type': 'application/json' },
    body: JSON.stringify(body), signal: AbortSignal.timeout(8000),
  });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(`google ${path}: ${r.status} ${j.error?.message || ''}`);
  return j;
}
// Busy intervals [{start,end}] (ms) for the calendar between two instants.
export async function busy(timeMin, timeMax) {
  const id = CALENDAR_ID();
  const j = await google('/freeBusy', { timeMin: timeMin.toISOString(), timeMax: timeMax.toISOString(), timeZone: TZ, items: [{ id }] });
  const cal = j.calendars?.[id];
  if (cal?.errors?.length) throw new Error('freebusy: ' + cal.errors[0].reason);
  return (cal?.busy || []).map((b) => ({ start: Date.parse(b.start), end: Date.parse(b.end) }));
}
export const overlaps = (busyList, s, e) => busyList.some((b) => b.start < e.getTime() && b.end > s.getTime());

// Availability grid. A specific window is busy if anything overlaps it; "Flexible" is
// busy only when every specific window that day is busy.
export async function availability(now = Date.now()) {
  const days = upcomingDays(now);
  let list = [], live = false, error = null;
  if (googleConfigured() && days.length) {
    try {
      list = await busy(zoned(days[0].date, [0, 0]), zoned(days[days.length - 1].date, [23, 59]));
      live = true;
    } catch (e) { error = String(e.message || e); console.error('[availability]', error); }
  }
  return {
    live, error: error ? 'calendar_unavailable' : null, timeZone: TZ,
    days: days.map((d) => {
      const w = WINDOWS.filter((x) => !x.flexible).map((x) => ({ id: x.id, label: x.label, busy: live && overlaps(list, zoned(d.date, x.start), zoned(d.date, x.end)) }));
      w.push({ id: 'flexible', label: WINDOWS[4].label, busy: w.every((x) => x.busy) });
      return { ...d, windows: w };
    }),
  };
}
export async function readBody(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  let raw = typeof req.body === 'string' ? req.body : '';
  if (!raw) { for await (const c of req) raw += c; }
  const ct = String(req.headers['content-type'] || '');
  if (ct.includes('json')) { try { return JSON.parse(raw || '{}'); } catch { return {}; } }
  return Object.fromEntries(new URLSearchParams(raw));
}
