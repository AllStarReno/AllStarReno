# Lead form + booking setup

Every page with a lead form shows one navy card with two tabs:

- **Request a Quote** (default): the AI Studio form. It posts to `/api/lead`, which emails info@allstarreno.com through Resend and always logs the lead. After the "Request Received!" message there is an optional link: "Want to pick a time now? Book a visit".
- **Book a Time**: the owner's Google Calendar appointment booking page, embedded on its own (no form needed):
  `https://calendar.google.com/calendar/appointments/schedules/AcZssZ0ZRx4CfMx9hmkVVcZm7KSoe_jVz0t6PvVOoKPgbogD28yX4PjouFRxs54v6qmA-gPzzc3hVSfi?gv=true`
  (short link https://calendar.app.google/Yc7uRN5HERDNCgVE8). It also has an "Open in a new tab" button.

To open the Book tab directly, use `/contact#book`, any link to `#book`, a `data-book-time` link, or `<LeadForm defaultTab="book" />`.

Bookings go straight onto the Google Calendar, and Google sends the confirmations. The website needs no Google keys.
To change the booking page, edit `BOOKING_URL` in `src/components/LeadForm.astro`.

## The only owner step: Resend (email delivery)

Until this is done, the form still works. Each lead is saved in Vercel → Logs (search `[lead]`), and the visitor gets one-tap "Email a copy" / "Text us" buttons that are already filled in.

1. Sign up at https://resend.com.
2. Go to Domains → Add domain → `allstarreno.com`.
3. At your DNS host, add exactly the records Resend shows:
   - The **MX** record and the **TXT (SPF)** record on the `send` subdomain.
   - The **TXT DKIM** record `resend._domainkey`.
   - Recommended, if you don't already have one: TXT `_dmarc` = `v=DMARC1; p=none; rua=mailto:info@allstarreno.com`.
   These records don't change how your existing inbox receives mail.
4. Click **Verify**. It can take minutes to a few hours.
5. Go to API Keys → Create. Choose "Sending access" and the domain allstarreno.com.
6. In Vercel → project "allstar-renovations" → Settings → Environment Variables, add `RESEND_API_KEY` for Production and Preview. Then redeploy.
7. Submit a test on /contact. The email arrives from `leads@allstarreno.com`, and Reply goes to the customer.

Optional env vars:
- `LEAD_TO_EMAIL` (default `info@allstarreno.com`)
- `LEAD_FROM_EMAIL` (default `All-Star Renovations Website <leads@allstarreno.com>`)

Never commit keys to the repo.

## Spam protection
- A hidden honeypot field.
- A 3-second minimum fill time.

Both are checked on the server. Spam is silently dropped.
