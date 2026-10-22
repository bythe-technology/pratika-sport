/** Preserve the primary image and expose real portfolio photos present in the HTML. */
export function getSitemapImages(html, pageUrl) {
  const primary = html.match(/<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i)?.[1]
    ?? html.match(/<img[^>]+src=["']([^"']+)["']/i)?.[1];
  const photographs = [...html.matchAll(/<img\b[^>]*\bsrc=["']([^"']*\/images\/projects\/[^"']+)["']/gi)].map(match => match[1]);
  const origin = new URL(pageUrl).origin;
  const images = new Set();
  for (const source of [primary, ...photographs]) {
    if (!source) continue;
    try {
      const url = new URL(source.replaceAll('&amp;', '&'), pageUrl);
      if (url.origin !== origin || !['https:', 'http:'].includes(url.protocol)) continue;
      images.add(url.href);
    } catch { /* Invalid image URLs must not invalidate the entire sitemap. */ }
  }
  return [...images].slice(0, 1000);
}
