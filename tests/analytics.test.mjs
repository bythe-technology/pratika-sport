import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { test } from 'node:test';
import { runInNewContext } from 'node:vm';

const source = await readFile(new URL('../public/analytics.js', import.meta.url), 'utf8');
function browser(preference) {
  class Element {
    listeners = {};
    children = [];
    dataset = {};
    addEventListener(type, callback) { this.listeners[type] = callback; }
    append(...items) { this.children.push(...items); }
    setAttribute() {}
    focus() {}
    querySelectorAll() {
      return this.buttons ??= ['granted', 'denied'].map((choice) => Object.assign(new Element(), { dataset: { choice } }));
    }
    querySelector() { return this.querySelectorAll()[0]; }
  }
  const document = Object.assign(new Element(), {
    head: new Element(), body: new Element(), cookie: '', referrer: 'https://www.google.com/search?q=private',
    createElement: (tag) => Object.assign(new Element(), { tag }),
  });
  const storage = new Map(preference ? [['pratika-analytics-consent-v1', preference]] : []);
  const window = {};
  runInNewContext(source, { document, window, Element, URL, Date, location: { origin: 'https://www.pratikasport.com.br', pathname: '/', hostname: 'www.pratikasport.com.br' }, localStorage: { getItem: (key) => storage.get(key), setItem: (key, value) => storage.set(key, value) } });
  const banner = document.body.children[0];
  return { document, window, Element, banner, choose: (choice) => banner.querySelectorAll().find((button) => button.dataset.choice === choice).listeners.click(), scripts: () => document.head.children.filter((element) => element.tag === 'script'), events: () => (window.dataLayer ?? []).map((args) => Array.from(args)) };
}

test('no Google requests or tracking before consent, including refusal', () => {
  const page = browser();
  assert.equal(page.scripts().length, 0);
  page.choose('denied');
  assert.equal(page.scripts().length, 0);
  assert.equal(page.events().length, 0);
});
test('acceptance loads correct ID only once and strips referrer queries', () => {
  const page = browser();
  page.choose('granted');
  page.choose('granted');
  assert.equal(page.scripts().length, 1);
  assert.match(page.scripts()[0].src, /G-J5RD6CP1YY$/);
  const config = page.events().find(([command]) => command === 'config');
  assert.equal(config[2].page_referrer, 'https://www.google.com');
  assert.equal(config[2].allow_google_signals, false);
});
test('saved refusal stays private; saved acceptance initializes analytics', () => {
  assert.equal(browser('denied').scripts().length, 0);
  assert.equal(browser('granted').scripts().length, 1);
});
test('contact click is not a sale and does not include WhatsApp message', () => {
  const page = browser('granted');
  const target = new page.Element();
  target.closest = () => ({ href: 'https://wa.me/5515997157642?text=private-message' });
  page.document.listeners.click({ target });
  const event = page.events().find(([command]) => command === 'event');
  assert.equal(event[1], 'contact_click');
  assert.equal(event[2].contact_channel, 'whatsapp');
  assert.doesNotMatch(JSON.stringify(event), /private-message|5515997157642|generate_lead|purchase/);
  page.choose('denied');
  page.document.listeners.click({ target });
  assert.equal(page.events().filter(([command]) => command === 'event').length, 1);
  page.choose('granted');
  assert.equal(page.window['ga-disable-G-J5RD6CP1YY'], false);
  assert.equal(page.scripts().length, 1);
});
