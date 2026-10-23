// POST /api/lead: validate -> spam checks -> re-check free/busy -> create Google Calendar
// event -> email the office via Resend. Calendar/email failures never lose the lead:
// the full lead is always written to the function log and the client gets success plus
// a prefilled mailto/sms fallback. Accepts JSON (JS form) or urlencoded (no-JS form).
import { WINDOWS, SERVICES, TIMELINES, TZ, PHONE, CALENDAR_ID, LEAD_TO, LEAD_FROM, upcomingDays, zoned, googleConfigured, busy, overlaps, google, readBody } from './_lib.js';

const MIN_FILL_MS = 3000, MAX_FILL_MS = 24 * 3600e3;
const clean = (v, n = 200) => String(v ?? '').replace(/[\u0000-\u001f\u007f]/g, ' ').trim().slice(0, n);
const cleanNotes = (v) => String(v ?? '').replace(/[\u0000-\u0009\u000b-\u001f\u007f]/g, ' ').trim().slice(0, 2000);
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

export function validate(b) {
  const lead = {
    firstName: clean(b.firstName, 80), lastName: clean(b.lastName, 80), email: clean(b.email, 160).toLowerCase(),
    phone: clean(b.phone, 40), service: clean(b.service, 80), city: clean(b.city, 80), date: clean(b.date, 10),
    window: clean(b.window, 30), timeline: clean(b.timeline, 40), message: cleanNotes(b.message),
    source: clean(b.source, 120), page: clean(b.page, 200),
  };
  const errors = {};
  if (!lead.firstName) errors.firstName = 'Please enter your first name.';
  if (!lead.lastName) errors.lastName = 'Please enter your last name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(lead.email)) errors.email = 'Please enter a valid email address.';
  const digits = lead.phone.replace(/\D/g, '').replace(/^1(?=\d{10}$)/, '');
  if (digits.length !== 10) errors.phone = 'Please enter a 10-digit phone number.';
  else lead.phone = `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  if (!SERVICES.includes(lead.service)) errors.service = 'Please choose a service.';
  if (!lead.city) errors.city = 'Please enter your city.';
  if (!upcomingDays().some((d) => d.date === lead.date)) errors.date = 'Please choose a date in the next two weeks (Mon–Sat).';
  const w = WINDOWS.find((x) => x.id === lead.window || x.label === lead.window);
  if (!w) errors.window = 'Please choose a time window.'; else lead.window = w.id;
  if (!TIMELINES.includes(lead.timeline)) lead.timeline = '';
  return { lead, errors, win: w };
}

function summaryText(l, win) {
  return [
    `NEW WEB LEAD: ${l.firstName} ${l.lastName} (${l.service})`, '',
    `Name: ${l.firstName} ${l.lastName}`, `Phone: ${l.phone}`, `Email: ${l.email}`, `City / Region: ${l.city}, AR`,
    `Project Type: ${l.service}`, `Requested Consultation: ${l.date} (${win.label}, ${TZ})`,
    l.timeline ? `Project timeline: ${l.timeline}` : null, `Notes: ${l.message || 'No additional notes provided.'}`, '',
    `Consent: submitted with the call/SMS consent disclosure shown on the form.`,
    `Source: ${l.source || 'website'} ${l.page || ''}`.trim(), `Submitted: ${new Date().toISOString()}`,
  ].filter((x) => x !== null).join('\n');
}
const fallbackLinks = (l, win, text) => ({
  mailto: `mailto:info@allstarreno.com?subject=${encodeURIComponent(`Consultation request: ${l.firstName} ${l.lastName}, ${l.service}, ${l.city}`)}&body=${encodeURIComponent(text)}`,
  sms: `sms:+15015043398?&body=${encodeURIComponent(`Hi All-Star Renovations, this is ${l.firstName} ${l.lastName}. I requested a free consultation for ${l.service} in ${l.city} on ${l.date} (${win.label}). My number is ${l.phone}.`)}`,
});

async function createEvent(l, win, text) {
  const summary = `Consultation: ${l.firstName} ${l.lastName}, ${l.service}, ${l.city}`;
  const ev = win.flexible
    ? { summary: summary + ' (flexible time)', start: { date: l.date }, end: { date: new Date(Date.parse(l.date + 'T12:00:00Z') + 864e5).toISOString().slice(0, 10) }, transparency: 'transparent' }
    : { summary, start: { dateTime: zoned(l.date, win.start).toISOString(), timeZone: TZ }, end: { dateTime: zoned(l.date, win.end).toISOString(), timeZone: TZ } };
  const j = await google(`/calendars/${encodeURIComponent(CALENDAR_ID())}/events`, { ...ev, description: text, location: `${l.city}, AR` });
  return j.id;
}
async function sendEmail(l, text) {
  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST', headers: { authorization: 'Bearer ' + process.env.RESEND_API_KEY, 'content-type': 'application/json' },
    body: JSON.stringify({ from: LEAD_FROM(), to: [LEAD_TO()], reply_to: l.email, subject: `New web lead: ${l.firstName} ${l.lastName} (${l.service}, ${l.city})`,
      text, html: `<pre style="font:14px/1.5 ui-monospace,monospace;white-space:pre-wrap">${esc(text)}</pre>` }),
    signal: AbortSignal.timeout(8000),
  });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(`resend ${r.status} ${j.message || ''}`);
  return j.id;
}

export default async function handler(req, res) {
  res.setHeader('X-Robots-Tag', 'noindex');
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); return res.status(405).json({ ok: false, error: 'method' }); }
  const b = await readBody(req);
  const wantsHtml = !String(req.headers['content-type'] || '').includes('json');
  const reply = (code, obj) => {
    if (!wantsHtml) return res.status(code).json(obj);
    if (obj.ok) { res.statusCode = 303; res.setHeader('Location', '/thank-you'); return res.end(); }
    res.status(code).setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.end(`<!doctype html><meta charset="utf-8"><meta name="robots" content="noindex"><title>Please check your request</title><body style="font-family:system-ui;max-width:36rem;margin:3rem auto;padding:0 1rem"><h1>Please check your request</h1><ul>${Object.values(obj.errors || { x: 'Something went wrong.' }).map((e) => `<li>${esc(e)}</li>`).join('')}</ul><p><a href="javascript:history.back()">Go back to the form</a> or call <a href="tel:+15015043398">${PHONE}</a>.</p>`);
  };

  // Spam: honeypot must be empty; JS clients send the time the form was shown.
  const t = Number(b.t || 0), elapsed = Date.now() - t;
  if (clean(b.company)) { console.warn('[lead] honeypot hit'); return reply(200, { ok: true }); }
  if (t && (elapsed < MIN_FILL_MS || elapsed > MAX_FILL_MS)) { console.warn('[lead] fill-time reject', elapsed); return reply(200, { ok: true }); }

  const { lead, errors, win } = validate(b);
  if (Object.keys(errors).length) return reply(422, { ok: false, errors });
  const text = summaryText(lead, win) + (t ? '' : '\n(Submitted without JavaScript; fill-time check not applied.)');
  const result = { ok: true, calendar: 'skipped', email: 'skipped', fallback: false };

  if (googleConfigured()) {
    try {
      if (!win.flexible) {
        const list = await busy(zoned(lead.date, win.start), zoned(lead.date, win.end));
        if (overlaps(list, zoned(lead.date, win.start), zoned(lead.date, win.end))) {
          console.log('[lead] slot taken', JSON.stringify(lead));
          return reply(409, { ok: false, error: 'slot_taken', errors: { window: 'That time was just booked. Please pick another window.' } });
        }
      }
      result.eventId = await createEvent(lead, win, text); result.calendar = 'created';
    } catch (e) { result.calendar = 'failed'; console.error('[lead] calendar', e.message); }
  }
  if (process.env.RESEND_API_KEY) {
    try { result.emailId = await sendEmail(lead, text); result.email = 'sent'; }
    catch (e) { result.email = 'failed'; console.error('[lead] email', e.message); }
  }
  // Never lose the lead: always log it; ask the visitor to send a copy if nothing reached the office.
  console.log('[lead] ' + JSON.stringify({ ...lead, calendarStatus: result.calendar, emailStatus: result.email }));
  if (result.email !== 'sent' && result.calendar !== 'created') { result.fallback = true; Object.assign(result, fallbackLinks(lead, win, text)); }
  else if (result.email !== 'sent' || result.calendar !== 'created') { Object.assign(result, fallbackLinks(lead, win, text)); }
  return reply(200, { ...result, lead: { ...lead, windowLabel: win.label } });
}
