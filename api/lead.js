// POST /api/lead: validate -> spam checks -> email the office via Resend. The visitor then
// books an exact time on the Google Calendar appointment page. Email failure never loses the lead:
// the full lead is always written to the function log and the client gets success plus
// a prefilled mailto/sms fallback. Accepts JSON (JS form) or urlencoded (no-JS form).
import { resolveService, TIMELINES, PHONE, LEAD_TO, LEAD_FROM, readBody } from './_lib.js';

const ATTR = ['utm_source','utm_medium','utm_campaign','utm_term','utm_content','gclid','gbraid','wbraid','msclkid','fbclid','landing'];
const platformOf = (a) => a.gclid || a.gbraid || a.wbraid ? 'Google Ads' : a.msclkid ? 'Microsoft Ads' : a.fbclid ? 'Meta' : a.utm_source || '';
const MIN_FILL_MS = 3000, MAX_FILL_MS = 24 * 3600e3;
const clean = (v, n = 200) => String(v ?? '').replace(/[\u0000-\u001f\u007f]/g, ' ').trim().slice(0, n);
const cleanNotes = (v) => String(v ?? '').replace(/[\u0000-\u0009\u000b-\u001f\u007f]/g, ' ').trim().slice(0, 2000);
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

// Lead-magnet downloads: lighter form (name, email, city, optional phone), own thank-you page.
export const DOWNLOADS = {
  'planning-checklist': { title: 'Tub-to-Shower & Walk-In Shower Planning Checklist', thanks: '/checklist-thank-you' },
};

export function validate(b) {
  const dl = DOWNLOADS[clean(b.download, 40)] ? clean(b.download, 40) : '';
  const lead = {
    download: dl,
    firstName: clean(b.firstName, 80), lastName: clean(b.lastName, 80), email: clean(b.email, 160).toLowerCase(),
    phone: clean(b.phone, 40), service: clean(b.service, 80), category: clean(b.category, 80), city: clean(b.city, 80),
    timeline: clean(b.timeline, 40), message: cleanNotes(b.message),
    source: clean(b.source, 120), page: clean(b.page, 200),
    smsConsent: ['yes','on','true'].includes(clean(b.smsConsent, 10).toLowerCase()),
    attribution: Object.fromEntries(ATTR.map((k) => [k, clean(b['a_' + k], 200)]).filter(([, v]) => v)),
    trustedForm: /^https:\/\/cert\.trustedform\.com\/[A-Za-z0-9]+$/.test(clean(b.xxTrustedFormCertUrl, 200)) ? clean(b.xxTrustedFormCertUrl, 200) : '',
  };
  const errors = {};
  if (!lead.firstName) errors.firstName = 'Please enter your first name.';
  if (!lead.lastName && !dl) errors.lastName = 'Please enter your last name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(lead.email)) errors.email = 'Please enter a valid email address.';
  const digits = lead.phone.replace(/\D/g, '').replace(/^1(?=\d{10}$)/, '');
  if (dl && !digits) lead.phone = '';
  else if (digits.length !== 10) errors.phone = 'Please enter a 10-digit phone number.';
  else lead.phone = `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  const rs = dl ? { category: 'Lead magnet', service: 'Download: ' + DOWNLOADS[dl].title } : resolveService(lead.category, lead.service);
  if (!rs) errors.service = 'Please choose a service.'; else Object.assign(lead, rs);
  if (!lead.city) errors.city = 'Please enter your city.';
  if (!TIMELINES.includes(lead.timeline)) lead.timeline = '';
  return { lead, errors };
}

const label = (l) => (l.category && l.category !== l.service ? `${l.category}: ${l.service}` : l.service);
function summaryText(l) {
  return [
    `NEW WEB LEAD: ${l.firstName} ${l.lastName} (${label(l)})`, '',
    l.download ? 'Type: checklist download (warm lead; no consultation requested yet). Follow up by email, or by phone only if given.' : null,
    `Name: ${l.firstName} ${l.lastName}`, `Phone: ${l.phone || 'Not provided'}`, `Email: ${l.email}`, `City / Region: ${l.city}, AR`,
    `Category: ${l.category || 'Not specified'}`, `Service: ${l.service}`, `Consultation time: customer is shown the Google Calendar booking page next (check the calendar for their booking; call if none).`,
    l.timeline ? `Project timeline: ${l.timeline}` : null, `Notes: ${l.message || 'No additional notes provided.'}`, '',
    `SMS consent: ${l.smsConsent ? 'YES, checked the optional SMS opt-in box' : 'NO, did not opt in to text messages (do not text)'}`,
    `TrustedForm certificate: ${l.trustedForm || 'Not captured'}`,
    `Source: ${l.source || 'website'} ${l.page || ''}`.trim(),
    Object.keys(l.attribution).length ? `Ad platform: ${platformOf(l.attribution) || 'unknown'}` : 'Ad platform: none (organic/direct)',
    ...Object.entries(l.attribution).map(([k, v]) => `  ${k}: ${v}`), `Submitted: ${new Date().toISOString()}`,
  ].filter((x) => x !== null).join('\n');
}
const fallbackLinks = (l, text) => ({
  mailto: `mailto:info@allstarreno.com?subject=${encodeURIComponent(`Consultation request: ${l.firstName} ${l.lastName}, ${label(l)}, ${l.city}`)}&body=${encodeURIComponent(text)}`,
  sms: `sms:+15015043398?&body=${encodeURIComponent(`Hi All-Star Renovations, this is ${l.firstName} ${l.lastName}. I requested a free consultation for ${l.service} in ${l.city}. My number is ${l.phone}.`)}`,
});

async function sendEmail(l, text) {
  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST', headers: { authorization: 'Bearer ' + process.env.RESEND_API_KEY, 'content-type': 'application/json' },
    body: JSON.stringify({ from: LEAD_FROM(), to: [LEAD_TO()], reply_to: l.email, subject: `New web lead: ${l.firstName} ${l.lastName} (${label(l)}, ${l.city})`,
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
  const thanks = (DOWNLOADS[clean(b.download, 40)] || {}).thanks || '/thank-you';
  const wantsHtml = !String(req.headers['content-type'] || '').includes('json');
  const reply = (code, obj) => {
    if (!wantsHtml) return res.status(code).json(obj);
    if (obj.ok) { res.statusCode = 303; res.setHeader('Location', thanks); return res.end(); }
    res.status(code).setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.end(`<!doctype html><meta charset="utf-8"><meta name="robots" content="noindex"><title>Please check your request</title><body style="font-family:system-ui;max-width:36rem;margin:3rem auto;padding:0 1rem"><h1>Please check your request</h1><ul>${Object.values(obj.errors || { x: 'Something went wrong.' }).map((e) => `<li>${esc(e)}</li>`).join('')}</ul><p><a href="javascript:history.back()">Go back to the form</a> or call <a href="tel:+15015043398">${PHONE}</a>.</p>`);
  };

  // Spam: honeypot must be empty; JS clients send the time the form was shown.
  const t = Number(b.t || 0), elapsed = Date.now() - t;
  if (clean(b.company)) { console.warn('[lead] honeypot hit'); return reply(200, { ok: true }); }
  if (t && (elapsed < MIN_FILL_MS || elapsed > MAX_FILL_MS)) { console.warn('[lead] fill-time reject', elapsed); return reply(200, { ok: true }); }

  const { lead, errors } = validate(b);
  if (Object.keys(errors).length) return reply(422, { ok: false, errors });
  const text = summaryText(lead) + (t ? '' : '\n(Submitted without JavaScript; fill-time check not applied.)');
  const result = { ok: true, email: 'skipped', fallback: false };

  if (process.env.RESEND_API_KEY) {
    try { result.emailId = await sendEmail(lead, text); result.email = 'sent'; }
    catch (e) { result.email = 'failed'; console.error('[lead] email', e.message); }
  }
  // Never lose the lead: always log it; ask the visitor to send a copy if nothing reached the office.
  console.log('[lead] ' + JSON.stringify({ ...lead, emailStatus: result.email }));
  if (result.email !== 'sent') { result.fallback = true; Object.assign(result, fallbackLinks(lead, text)); }
  return reply(200, { ...result, lead, redirect: thanks });
}
