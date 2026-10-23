# Lead form + scheduler setup

The form works with no configuration: every lead is logged in Vercel function logs and the visitor gets one-tap email/text fallback buttons. Adding the env vars below turns on live calendar availability, automatic calendar events, and email delivery.

## Environment variables (Vercel → Project "allstar-renovations" → Settings → Environment Variables)
| Name | Required | Value |
|---|---|---|
| GOOGLE_CLIENT_ID | for calendar | OAuth client ID |
| GOOGLE_CLIENT_SECRET | for calendar | OAuth client secret |
| GOOGLE_REFRESH_TOKEN | for calendar | refresh token (step 1.5) |
| GOOGLE_CALENDAR_ID | optional | default `allstarenovations@gmail.com` |
| RESEND_API_KEY | for email | Resend API key |
| LEAD_FROM_EMAIL | optional | default `All-Star Renovations Website <leads@allstarreno.com>` |
| LEAD_TO_EMAIL | optional | default `info@allstarreno.com` |

Never commit these values. After saving, redeploy.

## 1. Google Calendar (signed in as allstarenovations@gmail.com)
1. https://console.cloud.google.com → create project "All-Star Website".
2. APIs & Services → Library → enable **Google Calendar API**.
3. OAuth consent screen: User type **External**; app name "All-Star Renovations Website"; support/developer email allstarenovations@gmail.com; add scopes `https://www.googleapis.com/auth/calendar.events` and `https://www.googleapis.com/auth/calendar.freebusy`; add test user allstarenovations@gmail.com. Then **Publish app → In production** (otherwise the refresh token expires after 7 days). Verification is not needed for your own account; click through the "unverified app" warning when authorizing.
4. Credentials → Create credentials → OAuth client ID → **Web application**; Authorized redirect URI: `https://developers.google.com/oauthplayground`. Copy the Client ID and Client secret.
5. https://developers.google.com/oauthplayground → gear icon → check "Use your own OAuth credentials", paste ID + secret → in "Input your own scopes" paste
   `https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/calendar.freebusy` → Authorize APIs → sign in as allstarenovations@gmail.com → Allow → "Exchange authorization code for tokens" → copy the **Refresh token**.
6. Add GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET / GOOGLE_REFRESH_TOKEN in Vercel, redeploy.
7. Test: open `https://allstarreno.com/api/availability` — it should show `"live": true`.

## 2. Resend email
1. https://resend.com → sign up → Domains → Add domain `allstarreno.com` (region us-east-1).
2. At your DNS host add exactly the records Resend shows: the **MX** and **TXT (SPF)** records on the `send` subdomain, and the **TXT DKIM** record `resend._domainkey`. Recommended: TXT `_dmarc` = `v=DMARC1; p=none; rua=mailto:info@allstarreno.com` (skip if you already have a DMARC record). These do not affect your existing inbox mail.
3. Click Verify (minutes to a few hours).
4. API Keys → Create (permission "Sending access", domain allstarreno.com) → set RESEND_API_KEY in Vercel, redeploy.
5. Submit a test request on /contact; you should get the email and see the calendar event.

## How it behaves
- /api/availability: next 14 days (Mon–Sat, from tomorrow), windows Morning 9–12, Early Afternoon 12–3, Late Afternoon 3–6, Evening 6–7:30 (Central). Busy windows are greyed out.
- /api/lead: validates, spam-checks (hidden honeypot + 3 s minimum fill time), re-checks free/busy (409 if just taken), creates the event "Consultation: Name, Service, City", emails the lead (reply-to = customer). If calendar or email fails, it still succeeds, logs the full lead (Vercel → Logs, search `[lead]`), and shows email/text fallback buttons.
- Without JavaScript the form posts normally and redirects to /thank-you (noindex).
- GA: a `generate_lead` event is pushed to `dataLayer` (and `gtag` if installed).
