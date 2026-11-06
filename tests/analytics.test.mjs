import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { test } from 'node:test';
import { runInNewContext } from 'node:vm';

const source = await readFile(new URL('../public/analytics.js', import.meta.url), 'utf8');
function browser(preferences = {}, href = 'https://www.pratikasport.com.br/') {
  class Element {
    listeners = {};
    children = [];
    dataset = {};
    addEventListener(type, callback) { this.listeners[type] = callback; }
    append(...items) { this.children.push(...items); }
    prepend(...items) { this.children.unshift(...items); }
    setAttribute() {}
    focus() {}
    querySelectorAll() {
      return this.buttons ??= [
        'both', 'analytics-only', 'ads-only', 'none',
      ].map((choice) => Object.assign(new Element(), { dataset: { choice } }));
    }
    querySelector() { return this.querySelectorAll()[0]; }
  }
  const body = new Element();
  const pageContent = Object.assign(new Element(), { tag: 'main' });
  body.append(pageContent);
  let cookieJar = '_ga=ga-cookie; _gcl_au=ads-cookie; _gcl_aw=ads-click; _gac_G-FFZKDZTE9M=ads-measurement';
  const cookieWrites = [];
  const document = Object.assign(new Element(), {
    head: new Element(), body, referrer: 'https://www.google.com/search?q=private',
    createElement: (tag) => Object.assign(new Element(), { tag }),
  });
  Object.defineProperty(document, 'cookie', {
    get: () => cookieJar,
    set: (value) => {
      cookieWrites.push(value);
      const name = value.split('=')[0];
      if (value.includes('Max-Age=0')) cookieJar = cookieJar.split('; ').filter((cookie) => !cookie.startsWith(name + '=')).join('; ');
    },
  });
  const storage = new Map();
  if (preferences.analytics) storage.set('pratika-analytics-consent-v1', preferences.analytics);
  if (preferences.ads) storage.set('pratika-ads-consent-v1', preferences.ads);
  const window = {};
  const url = new URL(href);
  const location = { href, origin: url.origin, pathname: url.pathname, hostname: url.hostname };
  runInNewContext(source, {
    document, window, Element, URL, URLSearchParams, Date, location,
    localStorage: {
      getItem: (key) => storage.get(key),
      setItem: (key, value) => storage.set(key, value),
    },
  });
  const banner = document.body.children[1];
  return {
    document, window, Element, banner, storage, cookieWrites,
    choose: (choice) => banner.querySelectorAll().find((button) => button.dataset.choice === choice).listeners.click(),
    scripts: () => document.head.children.filter((element) => element.tag === 'script'),
    commands: () => Array.from(window.dataLayer ?? []),
    events: () => Array.from(window.dataLayer ?? [], (args) => Array.from(args)),
    configs: () => Array.from(window.dataLayer ?? [], (args) => Array.from(args)).filter(([command]) => command === 'config'),
    consents: () => Array.from(window.dataLayer ?? [], (args) => Array.from(args)).filter(([command]) => command === 'consent'),
  };
}

test('new visitors get no Google requests before an explicit measurement choice', () => {
  const page = browser();
  assert.equal(page.scripts().length, 0);
  assert.equal(page.events().length, 0);
  assert.equal(page.document.body.children[0].tag, 'main');
  assert.equal(page.document.body.children[1], page.banner);
  assert.match(page.banner.innerHTML, /Google Analytics.*Google Ads.*opcional/);
  assert.match(page.banner.innerHTML, /personalização de anúncios permanece desativada/i);
  page.choose('none');
  assert.equal(page.scripts().length, 0);
  assert.equal(page.events().length, 0);
});

test('legacy Analytics consent does not enable Google Ads without a separate Ads choice', () => {
  const page = browser({ analytics: 'granted' });
  assert.equal(page.scripts().length, 1);
  assert.match(page.scripts()[0].src, /id=G-FFZKDZTE9M$/);
  assert.deepEqual(page.configs().map((config) => config[1]), ['G-FFZKDZTE9M']);
  assert.equal(page.banner.hidden, false);
  const consent = page.consents().find((entry) => entry[1] === 'update')[2];
  assert.equal(consent.analytics_storage, 'granted');
  assert.equal(consent.ad_storage, 'denied');
  page.choose('both');
  assert.equal(page.scripts().length, 1);
  assert.deepEqual(page.configs().map((config) => config[1]), ['G-FFZKDZTE9M', 'AW-18558191618']);
});

test('Ads-only consent configures Ads without activating GA4 or contact events', () => {
  const page = browser();
  page.choose('ads-only');
  assert.equal(page.scripts().length, 1);
  assert.match(page.scripts()[0].src, /id=AW-18558191618$/);
  assert.deepEqual(page.configs().map((config) => config[1]), ['AW-18558191618']);
  const consent = page.consents().find((entry) => entry[1] === 'update')[2];
  assert.equal(consent.analytics_storage, 'denied');
  assert.equal(consent.ad_storage, 'granted');
  assert.equal(consent.ad_user_data, 'denied');
  assert.equal(consent.ad_personalization, 'denied');
  page.document.listeners.click({ target: Object.assign(new page.Element(), { closest: () => ({ href: 'https://wa.me/5515997157642' }) }) });
  const events = page.events().filter(([command]) => command === 'event');
  assert.equal(events.length, 1);
  assert.equal(events[0][1], 'conversion');
  assert.equal(events[0][2].send_to, 'AW-18558191618/WD6bCKjB67IdEIKQnpFF');
  assert.equal(events[0][2].value, 0);
  assert.equal(events[0][2].currency, 'BRL');
  assert.equal(events[0][2].transport_type, 'beacon');
});

test('both destinations share one loader and configure each destination once', () => {
  const page = browser();
  page.choose('both');
  page.choose('both');
  assert.equal(page.scripts().length, 1);
  assert.deepEqual(page.configs().map((config) => config[1]), ['G-FFZKDZTE9M', 'AW-18558191618']);
  assert.equal(Object.prototype.toString.call(page.commands()[0]), '[object Arguments]');
  assert.equal(page.configs().filter((config) => config[1] === 'G-FFZKDZTE9M').length, 1);
  assert.equal(page.configs().filter((config) => config[1] === 'AW-18558191618').length, 1);
});

test('Ads tag does not manually forward click identifiers or arbitrary URL data', () => {
  const href = 'https://www.pratikasport.com.br/?gclid=click-123&utm_source=google&utm_medium=cpc&utm_campaign=sp_quadras_teste_300&utm_term=private-keyword&email=private@example.com';
  const page = browser({}, href);
  page.choose('ads-only');
  const config = page.configs().find((entry) => entry[1] === 'AW-18558191618')[2];
  assert.equal(Object.hasOwn(config, 'page_location'), false);
  assert.doesNotMatch(JSON.stringify(config), /gclid|gbraid|wbraid|private-keyword|private%40example.com|email=/);
});

test('revoking Ads consent denies ad storage and clears first-party Ads cookies', () => {
  const page = browser({ analytics: 'granted', ads: 'granted' });
  assert.equal(page.scripts().length, 1);
  page.choose('analytics-only');
  const update = page.consents().filter((entry) => entry[1] === 'update').at(-1)[2];
  assert.equal(update.analytics_storage, 'granted');
  assert.equal(update.ad_storage, 'denied');
  assert.equal(update.ad_user_data, 'denied');
  assert.equal(update.ad_personalization, 'denied');
  assert.ok(page.cookieWrites.some((value) => value.startsWith('_gcl_au=; Max-Age=0')));
  assert.ok(page.cookieWrites.some((value) => value.startsWith('_gac_G-FFZKDZTE9M=; Max-Age=0')));
  assert.equal(page.storage.get('pratika-ads-consent-v1'), 'denied');
});

test('paid attribution accepts only the configured campaign and no arbitrary URL data', () => {
  const href = 'https://www.pratikasport.com.br/?utm_source=google&utm_medium=cpc&utm_campaign=sp_quadras_teste_300&email=private@example.com&gclid=private-click';
  assert.equal(browser({}, href).events().length, 0);
  const config = browser({ analytics: 'granted' }, href).configs().find((entry) => entry[1] === 'G-FFZKDZTE9M')[2];
  assert.equal(config.campaign_source, 'google');
  assert.equal(config.campaign_medium, 'cpc');
  assert.equal(config.campaign_name, 'sp_quadras_teste_300');
  assert.doesNotMatch(JSON.stringify(config), /private|gclid|example\.com/);
  const unknown = browser({ analytics: 'granted' }, href.replace('sp_quadras_teste_300', 'private-name')).configs().find((entry) => entry[1] === 'G-FFZKDZTE9M')[2];
  assert.equal(unknown.campaign_name, undefined);
});

test('WhatsApp link records separate Analytics intent without personal data', () => {
  const page = browser({ analytics: 'granted' });
  const target = new page.Element();
  target.closest = () => ({ href: 'https://wa.me/5515997157642?text=private-message' });
  page.document.listeners.click({ target });
  const events = page.events().filter(([command]) => command === 'event');
  const contact = events.find(([, name]) => name === 'contact_click');
  const whatsapp = events.find(([, name]) => name === 'whatsapp_click');
  assert.equal(events.length, 2);
  assert.equal(contact[2].contact_channel, 'whatsapp');
  assert.equal(whatsapp[2].contact_origin, 'site_link');
  assert.doesNotMatch(JSON.stringify(events), /private-message|5515997157642|generate_lead|purchase/);
  page.choose('none');
  page.document.listeners.click({ target });
  assert.equal(page.events().filter(([command]) => command === 'event').length, 2);
});

test('both consent choices send one zero-value Ads conversion and distinct Analytics event', () => {
  const page = browser();
  page.choose('both');
  const target = new page.Element();
  target.closest = () => ({ href: 'https://api.whatsapp.com/send?phone=5515997157642&text=private-message' });
  page.document.listeners.click({ target });
  const events = page.events().filter(([command]) => command === 'event');
  assert.deepEqual(events.map(([, name]) => name).sort((left, right) => left.localeCompare(right)), ['contact_click', 'conversion', 'whatsapp_click']);
  const conversion = events.find(([, name]) => name === 'conversion');
  assert.equal(conversion[2].send_to, 'AW-18558191618/WD6bCKjB67IdEIKQnpFF');
  assert.equal(conversion[2].value, 0);
  assert.equal(conversion[2].currency, 'BRL');
  assert.doesNotMatch(JSON.stringify(events), /private-message|5515997157642|generate_lead|purchase/);
});

test('phone and email clicks are not counted as WhatsApp Ads conversions', () => {
  const page = browser({ analytics: 'granted', ads: 'granted' });
  for (const href of ['tel:+5515997157642', 'mailto:contato@pratikasport.com.br']) {
    const target = new page.Element();
    target.closest = () => ({ href });
    page.document.listeners.click({ target });
  }
  const events = page.events().filter(([command]) => command === 'event');
  assert.deepEqual(events.map(([, name]) => name), ['contact_click', 'contact_click']);
  assert.ok(events.every(([, , params]) => ['phone', 'email'].includes(params.contact_channel)));
});

test('quote form contact intent is tracked only after Analytics consent and excludes form data', () => {
  const page = browser({ analytics: 'granted' });
  page.document.listeners['pratika-contact-intent']();
  const events = page.events().filter(([command]) => command === 'event');
  const contact = events.find(([, name]) => name === 'contact_click');
  const whatsapp = events.find(([, name]) => name === 'whatsapp_click');
  assert.equal(events.length, 2);
  assert.equal(contact[2].contact_channel, 'whatsapp');
  assert.equal(contact[2].contact_origin, 'quote_form');
  assert.equal(whatsapp[2].contact_origin, 'quote_form');
  assert.doesNotMatch(JSON.stringify(events), /name|phone|city|message|private|purchase|generate_lead/i);

  page.choose('none');
  page.document.listeners['pratika-contact-intent']();
  assert.equal(page.events().filter(([command]) => command === 'event').length, 2);

  const undecidedPage = browser();
  undecidedPage.document.listeners['pratika-contact-intent']();
  assert.equal(undecidedPage.events().filter(([command]) => command === 'event').length, 0);
});
