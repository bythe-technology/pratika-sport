# Google Ads tag consent implementation plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Install the Pratika Google Ads tag `AW-18558191618` site-wide after explicit ad-measurement consent, while preserving the existing separate GA4 consent and keeping ad personalization disabled.

**Architecture:** Extend the existing shared `public/analytics.js` consent controller with a second persisted choice for Google Ads. Load one `gtag.js` library and configure only the destinations allowed by the saved choices; update the generated privacy section and tests alongside it. The base Ads tag will not claim to record leads or sales; no conversion label was supplied.

**Tech Stack:** Existing browser JavaScript, Node.js `node:test`, static site build with Vite/Vinext.

**Spec:** User-provided Google tag snippet and request in the current conversation; official Google consent guide at https://developers.google.com/tag-platform/security/guides/consent and gtag configuration guide at https://developers.google.com/tag-platform/gtagjs/configure.

## Global Constraints

- Keep GA4 `G-FFZKDZTE9M` and Ads `AW-18558191618` as separate destinations of one `gtag.js` loader.
- Default `analytics_storage`, `ad_storage`, `ad_user_data`, and `ad_personalization` to denied.
- Never enable `ad_user_data` or `ad_personalization` through this integration.
- Only configure the AW destination after an explicit Ads-measurement choice; never infer it from legacy Analytics consent.
- Preserve GA4 `contact_click` as an intent event and never send form values, contact details, free-form query parameters, or WhatsApp text.
- Do not invent conversion events or sales; the provided snippet is the base tag only.
- Avoid new dependencies and keep consent controls accessible and usable on mobile.

## Review Focus

- Returning visitor with existing Analytics acceptance must not get Ads cookies without a new Ads choice.
- Rejecting Ads must leave AW unconfigured and clean accessible first-party Ads cookies.
- Ads-only choice must not activate GA4 or emit GA4 contact events.
- Granting/revoking choices must update all four Consent Mode states correctly and load one tag script at most once.
- Ads page URLs must not forward arbitrary query data; only recognized attribution identifiers may pass after Ads consent.

---

### Task 1: Lock down consent and tag behavior with tests

**Files:**
- Modify: `tests/analytics.test.mjs`
- Test: `tests/analytics.test.mjs`

**Interfaces:**
- Consumes the current `public/analytics.js` browser-script contract.
- Produces tests that define separate Analytics and Ads preferences before implementation.

- [x] Add tests for no request without consent, legacy GA-only acceptance without AW configuration, explicit Ads consent, both destinations sharing one loader, refusal/revocation, and URL-parameter filtering.
- [x] Run `node --test tests/analytics.test.mjs` and verify the new assertions fail for the missing AW behavior.

### Task 2: Integrate the Ads destination through consent

**Files:**
- Modify: `public/analytics.js`
- Modify: `scripts/build-vercel.mjs`
- Modify: `legacy-site/snapshot/politica-privacidade.html`

**Interfaces:**
- Consumes independent consent states stored under the existing Analytics key and a new Ads key.
- Produces one shared loader with conditional `config` calls for `G-FFZKDZTE9M` and `AW-18558191618`.

- [x] Add the opt-in choice for Ads attribution, preserving existing Analytics decisions and defaulting Ads storage off.
- [x] Configure each allowed destination once, retain the existing fixed GA4 campaign attribution, pass only approved Ads click identifiers, and remove accessible `_gcl*` cookies on Ads refusal.
- [x] Update generated and source privacy copy to describe optional Ads measurement and the non-personalized setting.
- [x] Run `node --test tests/analytics.test.mjs` and verify the consent cases pass.

### Task 3: Build and publish the verified site

**Files:**
- Verify: all generated public pages and production `analytics.js`

**Interfaces:**
- Consumes the tested integration from Task 2.
- Produces a production build with the Ads tag available only after Ads consent.

- [x] Run the Analytics, SEO-output, illustration, hero, project-photo, and completed-project test files plus the production build.
- [ ] Confirm production homepage and `/analytics.js` return HTTP 200 and the script exposes both expected IDs without duplicate loaders.
- [ ] Merge/push through the existing GitHub/Vercel flow, confirm the deployment, and use Google Ads “Test installation” without publishing or changing budget settings.
