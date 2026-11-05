# WhatsApp Ads conversion implementation plan

## Scope

Add a dedicated, consent-aware WhatsApp click event to the site's existing measurement layer and route that event to the newly created Google Ads conversion action. Keep the existing campaign configuration unchanged.

## Architecture

`public/analytics.js` remains the single instrumentation layer. A small helper receives a fixed origin (`site_link` or `quote_form`) and independently sends:

- GA4 `whatsapp_click` and legacy `contact_click` only with Analytics consent.
- Google Ads `conversion` with `send_to: AW-18558191618/WD6bCKjB67IdEIKQnpFF`, zero value, and BRL only with Ads consent.

No personal data, message text, phone number, form contents, or arbitrary query parameters are sent. Existing Consent Mode remains denied for ad user data and personalization.

## Steps

1. Extend the Node test harness to cover WhatsApp link, quote-form handoff, phone/email links, consent combinations, zero conversion value, and data minimization.
2. Run the focused test and confirm new expectations fail before implementation.
3. Add the helper and event dispatches to `public/analytics.js` with no other instrumentation changes.
4. Run focused tests, SEO tests, lint, and production build.
5. Review the diff and Git state; commit and push through the existing GitHub/Vercel flow.
6. Verify the deployed script contains the conversion label and check the production page/script response.
7. In Google Ads, finish only the conversion setup that does not enable enhanced conversions or accept new data-processing terms. Keep the campaign's R$300 total budget and schedule unchanged.

## Risks and limits

- A conversion is a WhatsApp contact click, not a confirmed lead, sale, or revenue event.
- Browser consent refusal, blockers, and attribution limits can prevent Ads measurement.
- The Ads action may display as unverified until a permitted real click is received and reporting finishes processing.
- Do not accept the separate enhanced-conversions/data-processing agreement as part of this work; that feature is outside the requested metrics-only sharing choice.

## Verification

Automated checks assert destination events and payload privacy for consent and channel edge cases. Production checks confirm the published code contains the expected IDs and does not alter the budget. UI inspection confirms the conversion is configured and the campaign remains at R$300 total.
