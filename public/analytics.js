/* Load Google measurement destinations only after the matching opt-in. */
(() => {
  'use strict';
  const measurementId = 'G-FFZKDZTE9M';
  const adsMeasurementId = 'AW-18558191618';
  const analyticsPreferenceKey = 'pratika-analytics-consent-v1';
  const adsPreferenceKey = 'pratika-ads-consent-v1';
  const readPreference = (key) => {
    try {
      const value = localStorage.getItem(key);
      return value === 'granted' || value === 'denied' ? value : null;
    } catch { return null; }
  };
  const savePreference = (key, value) => {
    try { localStorage.setItem(key, value); } catch { /* Session-only choice. */ }
  };
  let analyticsEnabled = readPreference(analyticsPreferenceKey) === 'granted';
  let adsEnabled = readPreference(adsPreferenceKey) === 'granted';
  let loaded = false;
  let analyticsConfigured = false;
  let adsConfigured = false;

  // Use the vendor's documented command envelope (Arguments, not an Array).
  // eslint-disable-next-line prefer-rest-params -- required by the Google tag queue format
  function gtag() { window.dataLayer.push(arguments); }

  const consentState = () => ({
    analytics_storage: analyticsEnabled ? 'granted' : 'denied',
    ad_storage: adsEnabled ? 'granted' : 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  });

  const safeReferrer = () => {
    try { return new URL(document.referrer).origin; } catch { return ''; }
  };

  const safeAdsPageLocation = () => {
    const currentUrl = new URL(location.href || location.origin + location.pathname);
    const allowed = new URLSearchParams();
    for (const key of ['gclid', 'gbraid', 'wbraid']) {
      const value = currentUrl.searchParams.get(key);
      if (value && value.length <= 512) allowed.set(key, value);
    }
    const isPratikaCampaign = currentUrl.searchParams.get('utm_source') === 'google'
      && currentUrl.searchParams.get('utm_medium') === 'cpc'
      && currentUrl.searchParams.get('utm_campaign') === 'sp_quadras_teste_300';
    if (isPratikaCampaign) {
      allowed.set('utm_source', 'google');
      allowed.set('utm_medium', 'cpc');
      allowed.set('utm_campaign', 'sp_quadras_teste_300');
    }
    const query = allowed.toString();
    return currentUrl.origin + currentUrl.pathname + (query ? '?' + query : '');
  };

  const configureDestinations = () => {
    if (!loaded) return;
    if (analyticsEnabled && !analyticsConfigured) {
      const campaign = new URL(location.href || location.origin + location.pathname).searchParams;
      const paidCampaign = campaign.get('utm_source') === 'google'
        && campaign.get('utm_medium') === 'cpc'
        && campaign.get('utm_campaign') === 'sp_quadras_teste_300';
      gtag('config', measurementId, {
        page_location: location.origin + location.pathname,
        page_referrer: safeReferrer(),
        allow_google_signals: false,
        allow_ad_personalization_signals: false,
        send_page_view: true,
        ...(paidCampaign ? {
          campaign_source: 'google',
          campaign_medium: 'cpc',
          campaign_name: 'sp_quadras_teste_300',
        } : {}),
      });
      analyticsConfigured = true;
    }
    if (adsEnabled && !adsConfigured) {
      gtag('config', adsMeasurementId, {
        page_location: safeAdsPageLocation(),
        page_referrer: safeReferrer(),
        allow_ad_personalization_signals: false,
      });
      adsConfigured = true;
    }
  };

  const start = () => {
    if (loaded || (!analyticsEnabled && !adsEnabled)) return;
    loaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = gtag;
    gtag('consent', 'default', {
      analytics_storage: 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
    });
    gtag('consent', 'update', consentState());
    gtag('js', new Date());
    window['ga-disable-' + measurementId] = !analyticsEnabled;
    configureDestinations();
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + (analyticsEnabled ? measurementId : adsMeasurementId);
    document.head.append(script);
  };

  const syncTag = () => {
    window['ga-disable-' + measurementId] = !analyticsEnabled;
    if (!loaded) {
      start();
      return;
    }
    gtag('consent', 'update', consentState());
    configureDestinations();
  };

  const clearCookies = (pattern) => {
    for (const cookie of document.cookie.split(';')) {
      const name = cookie.trim().split('=')[0];
      if (!pattern.test(name)) continue;
      const domains = ['', location.hostname, 'pratikasport.com.br'];
      for (const domain of domains) {
        document.cookie = name + '=; Max-Age=0; path=/' + (domain ? '; domain=' + domain : '');
      }
    }
  };

  const choose = (value) => {
    analyticsEnabled = value === 'both' || value === 'analytics-only';
    adsEnabled = value === 'both' || value === 'ads-only';
    savePreference(analyticsPreferenceKey, analyticsEnabled ? 'granted' : 'denied');
    savePreference(adsPreferenceKey, adsEnabled ? 'granted' : 'denied');
    syncTag();
    if (!analyticsEnabled) clearCookies(/^_ga(?:_|$)/);
    if (!adsEnabled) clearCookies(/^_(?:gcl(?:_|$)|gac_)/);
  };

  const style = document.createElement('style');
  style.textContent = '#pratika-consent{position:fixed;right:16px;bottom:82px;z-index:9998;max-width:420px;width:calc(100% - 24px);box-sizing:border-box;background:#fff;color:#142033;border:1px solid #ccd5df;border-radius:12px;padding:16px;box-shadow:0 4px 24px #0003;font:14px/1.5 system-ui}#pratika-consent p{margin:0 0 12px}#pratika-consent button{font:inherit;padding:8px 12px;margin:4px;border:1px solid #617083;border-radius:6px;background:#fff;color:#142033;cursor:pointer}#pratika-consent button:focus-visible,#pratika-cookie-settings:focus-visible{outline:3px solid #0078d4;outline-offset:3px}#pratika-cookie-settings{position:fixed;bottom:8px;left:8px;z-index:9999;font:12px system-ui;background:#fff;color:#142033;border:1px solid #617083;border-radius:5px;padding:6px;cursor:pointer}@media(max-width:600px){#pratika-consent{left:12px;right:12px;bottom:82px;max-width:none;width:auto;max-height:calc(100dvh - 100px);overflow:auto;padding:10px}#pratika-consent p{margin-bottom:6px}#pratika-consent button{padding:6px 10px;margin:2px}}';
  document.head.append(style);
  const banner = document.createElement('section');
  banner.id = 'pratika-consent';
  banner.setAttribute('aria-label', 'Preferências de medição');
  banner.innerHTML = '<p>Podemos medir visitas e cliques com o Google Analytics e mensurar anúncios com o Google Ads? Cada escolha é opcional. A personalização de anúncios permanece desativada. <a href="/politica-privacidade.html#analytics">Saiba mais</a>.</p><button type="button" data-choice="both">Aceitar Analytics e Google Ads</button><button type="button" data-choice="analytics-only">Só Analytics</button><button type="button" data-choice="ads-only">Só Google Ads</button><button type="button" data-choice="none">Recusar tudo</button>';
  for (const button of banner.querySelectorAll('button')) {
    button.addEventListener('click', () => { choose(button.dataset.choice); banner.hidden = true; settings.focus(); });
  }
  const settings = document.createElement('button');
  settings.id = 'pratika-cookie-settings';
  settings.type = 'button';
  settings.textContent = 'Cookies';
  settings.addEventListener('click', () => { banner.hidden = false; banner.querySelector('button').focus(); });
  document.body.append(banner, settings);

  const analyticsPreference = readPreference(analyticsPreferenceKey);
  const adsPreference = readPreference(adsPreferenceKey);
  banner.hidden = analyticsPreference !== null && adsPreference !== null;
  window['ga-disable-' + measurementId] = !analyticsEnabled;
  if (analyticsEnabled || adsEnabled) start();

  document.addEventListener('click', (event) => {
    if (!analyticsEnabled || !(event.target instanceof Element)) return;
    const anchor = event.target.closest('a[href]');
    if (!anchor) return;
    let url;
    try { url = new URL(anchor.href, location.origin); } catch { return; }
    const channel = ['wa.me', 'api.whatsapp.com', 'web.whatsapp.com'].includes(url.hostname) ? 'whatsapp' : url.protocol === 'tel:' ? 'phone' : url.protocol === 'mailto:' ? 'email' : null;
    if (channel) gtag('event', 'contact_click', { contact_channel: channel, page_path: location.pathname, transport_type: 'beacon' });
  });
  document.addEventListener('pratika-contact-intent', () => {
    if (!analyticsEnabled) return;
    gtag('event', 'contact_click', {
      contact_channel: 'whatsapp',
      contact_origin: 'quote_form',
      page_path: location.pathname,
      transport_type: 'beacon',
    });
  });
})();
