# WhatsApp click conversion design — 2026-11-05

## Intent

Measure a WhatsApp contact click as a distinct GA4 event and a Google Ads conversion, so the Pratika Sport test campaign can report WhatsApp leads separately from calls and website form submissions.

## Requirements and constraints

- Track real user clicks on WhatsApp links and the quote form's WhatsApp handoff.
- Emit GA4 `whatsapp_click` only after Analytics consent; keep existing `contact_click` unchanged.
- Emit the Ads conversion only after the separate Ads consent, using the existing Google tag and the Ads conversion label created for this action.
- Do not send WhatsApp number, prefilled message, form fields, query string, or other personal data.
- Preserve existing consent defaults, opt-out controls, and ad personalization/user-data denial.
- Keep campaign budget, dates, regions, and activation state unchanged.

## Approaches considered

1. Import the existing GA4 `contact_click` event. Rejected because that event groups WhatsApp, telephone, and email and cannot cleanly represent WhatsApp alone.
2. Add a dedicated `whatsapp_click` event in GA4 and a direct Ads conversion event through the existing consent-aware Google tag. Selected because it provides a clear GA4 metric and direct Ads optimization while respecting the account's separate consent choices.

## Architecture

The existing `public/analytics.js` remains the sole measurement layer. Its delegated link-click handler and quote-form intent handler call one small WhatsApp tracking function. That function emits a privacy-minimal GA4 event when Analytics is allowed and the Ads conversion event when Ads is allowed. No UI, URL, React component, or dependency changes are needed.

## Risks and verification

- The conversion label must match the Ads action exactly.
- Consent is checked independently for GA4 and Ads; neither destination may receive the event when its consent is denied.
- Automated tests verify WhatsApp versus other contact channels, form handoff, consent combinations, and absence of personal data.
- Production verification confirms the deployed event implementation and Google tag. Ads may need time to update conversion status after its first real click; a click is not a sale.
