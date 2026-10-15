/* Basic consent mode: no Google request before explicit acceptance. */
(() => {
  'use strict';
  const measurementId = 'G-J5RD6CP1YY';
  const preferenceKey = 'pratika-analytics-consent-v1';
  let enabled = false;
  let loaded = false;
  const readPreference = () => {
    try { return localStorage.getItem(preferenceKey); } catch { return null; }
  };
  const savePreference = (value) => {
    try { localStorage.setItem(preferenceKey, value); } catch { /* Session-only choice. */ }
  };
  const gtag = function () { window.dataLayer.push(arguments); };
  const start = () => {
    if (loaded) return;
    loaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = gtag;
    gtag('consent', 'default', { analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
    gtag('consent', 'update', { analytics_storage: 'granted' });
    gtag('js', new Date());
    let referrer = '';
    try { referrer = new URL(document.referrer).origin; } catch { /* No referrer. */ }
    gtag('config', measurementId, {
      page_location: location.origin + location.pathname,
      page_referrer: referrer,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      send_page_view: true,
    });
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + measurementId;
    document.head.append(script);
  };
  const choose = (value) => {
    savePreference(value);
    enabled = value === 'granted';
    window['ga-disable-' + measurementId] = !enabled;
    if (enabled) {
      if (loaded) gtag('consent', 'update', { analytics_storage: 'granted' });
      else start();
    }
    else if (loaded) gtag('consent', 'update', { analytics_storage: 'denied' });
    if (!enabled) {
      for (const cookie of document.cookie.split(';')) {
        const name = cookie.trim().split('=')[0];
        if (!/^_ga(?:_|$)/.test(name)) continue;
        const domains = ['', location.hostname, 'pratikasport.com.br'];
        for (const domain of domains) document.cookie = name + '=; Max-Age=0; path=/' + (domain ? '; domain=' + domain : '');
      }
    }
  };
  const style = document.createElement('style');
  style.textContent = '#pratika-consent{position:fixed;bottom:76px;left:12px;z-index:10000;max-width:460px;width:calc(100% - 24px);box-sizing:border-box;background:#fff;color:#142033;border:1px solid #ccd5df;border-radius:12px;padding:16px;box-shadow:0 4px 24px #0003;font:14px/1.5 system-ui}#pratika-consent p{margin:0 0 12px}#pratika-consent button{font:inherit;padding:8px 12px;margin:4px;border:1px solid #617083;border-radius:6px;background:#fff;color:#142033;cursor:pointer}#pratika-consent button:focus-visible,#pratika-cookie-settings:focus-visible{outline:3px solid #0078d4;outline-offset:3px}#pratika-cookie-settings{position:fixed;bottom:8px;left:8px;z-index:9999;font:12px system-ui;background:#fff;color:#142033;border:1px solid #617083;border-radius:5px;padding:6px;cursor:pointer}';
  document.head.append(style);
  const banner = document.createElement('section');
  banner.id = 'pratika-consent';
  banner.setAttribute('aria-label', 'Preferências de medição');
  banner.innerHTML = '<p>Podemos usar o Google Analytics para entender visitas e cliques de contato e melhorar o site? A medição é opcional. <a href="/politica-privacidade.html#analytics">Saiba mais</a>.</p><button type="button" data-choice="granted">Aceitar medição</button><button type="button" data-choice="denied">Recusar medição</button>';
  for (const button of banner.querySelectorAll('button')) {
    button.addEventListener('click', () => { choose(button.dataset.choice); banner.hidden = true; settings.focus(); });
  }
  const settings = document.createElement('button');
  settings.id = 'pratika-cookie-settings';
  settings.type = 'button';
  settings.textContent = 'Cookies';
  settings.addEventListener('click', () => { banner.hidden = false; banner.querySelector('button').focus(); });
  document.body.append(banner, settings);
  const preference = readPreference();
  banner.hidden = preference === 'granted' || preference === 'denied';
  if (preference === 'granted') choose('granted');
  document.addEventListener('click', (event) => {
    if (!enabled || !(event.target instanceof Element)) return;
    const anchor = event.target.closest('a[href]');
    if (!anchor) return;
    let url;
    try { url = new URL(anchor.href, location.origin); } catch { return; }
    const channel = ['wa.me', 'api.whatsapp.com', 'web.whatsapp.com'].includes(url.hostname) ? 'whatsapp' : url.protocol === 'tel:' ? 'phone' : url.protocol === 'mailto:' ? 'email' : null;
    if (channel) gtag('event', 'contact_click', { contact_channel: channel, page_path: location.pathname, transport_type: 'beacon' });
  });
})();
