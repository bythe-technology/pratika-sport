import catalog from '../data/illustrations.json' with { type: 'json' };

const escapeHtml = value => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

export function illustrationForPath(path) {
  if (/manutencao.*beach/.test(path)) return 'servico-beach';
  if (/manutencao/.test(path)) return 'servico-manutencao';
  if (/reforma/.test(path)) return 'servico-reforma';
  if (/grama-sintetica/.test(path)) return 'material-grama';
  if (/campo-de-futebol/.test(path)) return 'servico-society';
  if (/beach/.test(path)) return 'servico-beach';
  if (/tenis/.test(path)) return 'servico-tenis';
  if (/melhor-piso/.test(path)) return 'material-modular';
  if (/quadras?-poliesportiva|medidas-oficiais/.test(path)) return 'servico-poliesportiva';
  if (/quanto-custa|sobre|contato/.test(path)) return 'institucional-planejamento';
  return 'institucional-complexo';
}

export function renderIllustration(id, { priority = false } = {}) {
  const item = catalog[id];
  if (!item) throw new Error(`Ilustração desconhecida: ${id}`);
  const srcset = format => [360, 720, 1080].map(width => `${item.base}-${width}.${format} ${width}w`).join(', ');
  return `<figure class="concept-figure"><picture><source type="image/avif" srcset="${srcset('avif')}" sizes="(max-width: 767px) 100vw, 45vw"><img src="${item.src}" srcset="${srcset('webp')}" sizes="(max-width: 767px) 100vw, 45vw" width="1080" height="720" loading="${priority ? 'eager' : 'lazy'}" ${priority ? 'fetchpriority="high"' : ''} decoding="async" alt="${escapeHtml(item.alt)}"></picture><figcaption>Ilustração conceitual</figcaption></figure>`;
}

const navigation = '<a href="/#servicos">Serviços</a><a href="/#superficies">Superfícies</a><a href="/#processo">Como funciona</a><a href="/pages/blog.html">Guias</a><a href="/pages/estados/sao-paulo">São Paulo</a>';
export const illustratedHeader = `<header class="illustrated-header"><a class="illustrated-brand" href="/" aria-label="Pratika Sport — Início"><img src="/images/logo-header.png" alt="Pratika Sport" width="186" height="62"></a><nav class="illustrated-nav" aria-label="Navegação principal">${navigation}</nav><a class="illustrated-quote" href="https://wa.me/5515997157642" target="_blank" rel="noopener noreferrer">Solicitar orçamento</a><details class="illustrated-mobile-nav"><summary aria-label="Abrir navegação">Menu</summary><nav aria-label="Navegação móvel">${navigation}<a href="/pages/contato.html">Contato</a></nav></details></header>`;
export const illustratedFooter = `<footer class="illustrated-footer"><div><a href="/" aria-label="Pratika Sport — Início"><img src="/images/logo-header.png" alt="Pratika Sport" width="186" height="62" loading="lazy"></a><p>Construção, reforma e manutenção de quadras esportivas.<br>Atendimento nacional, com prioridade em São Paulo.</p><a href="tel:+5515997157642">(15) 99715-7642</a></div><nav aria-label="Serviços e informações"><a href="/#servicos">Tipos de quadra</a><a href="/pages/servicos/manutencao-de-quadras.html">Manutenção</a><a href="/pages/blog.html">Guias e orientações</a><a href="/pages/sobre.html">Sobre a Pratika</a><a href="/pages/contato.html">Contato</a></nav><nav aria-label="Redes e privacidade"><a href="https://www.instagram.com/pratikasport.com.br/" target="_blank" rel="noopener noreferrer">Instagram</a><a href="https://wa.me/5515997157642" target="_blank" rel="noopener noreferrer">WhatsApp</a><a href="/politica-privacidade.html">Privacidade</a><a href="/termos-servico.html">Termos de uso</a><a href="https://bythe.tech" target="_blank" rel="noopener noreferrer">Desenvolvido por BYTHE Tech</a></nav><small>© ${new Date().getFullYear()} Pratika Sport. Ilustrações conceituais são representações esquemáticas.</small></footer>`;

export function enhanceIllustratedPage(html, path) {
  if (html.includes('data-illustrated-page')) return html;
  const legal = /politica-privacidade|termos-servico/.test(path);
  let result = html.replace(/<body([^>]*)>/i, `<body$1 data-illustrated-page="true"${legal ? ' data-legal-page="true"' : ''}>`);
  // Do not carry the former provider's unsolicited CRM pixel into the public rebuild.
  result = result.replace(/<script\b[^>]*>(?:(?!<\/script>)[\s\S])*?crm\.shalub\.com\.br(?:(?!<\/script>)[\s\S])*?<\/script>/gi, '');
  result = result.replace('</head>', '<link rel="stylesheet" href="/illustrated-pages.css"></head>');
  if (/<header\b/i.test(result)) result = result.replace(/<header\b[^>]*>[\s\S]*?<\/header>/i, illustratedHeader);
  else result = result.replace(/(<body[^>]*>)/i, `$1${illustratedHeader}`);
  if (/<footer\b/i.test(result)) result = result.replace(/<footer\b[^>]*>[\s\S]*?<\/footer>/i, illustratedFooter);
  else result = result.replace('</body>', `${illustratedFooter}</body>`);
  if (!legal) {
    result = result.replace(/<table\b[\s\S]*?<\/table>/gi, table => `<div class="illustrated-table-scroll" role="region" tabindex="0" aria-label="Tabela comparativa; role horizontalmente para ver todas as colunas">${table}</div>`);
    const image = renderIllustration(illustrationForPath(path), { priority: true });
    result = result.replace(/(<section\b[^>]*class="[^"]*\bpage-header\b[^"]*"[^>]*>)([\s\S]*?)(<\/section>)/i, (_match, open, body, close) => `${open}${body}<div class="illustrated-heading-art">${image}</div>${close}`);
    result = result.replace(/<article class="blog-card">[\s\S]*?<\/article>/g, card => {
      const href = card.match(/href="([^"]+)"/)?.[1] ?? '';
      return card.replace(/<div class="blog-image">[\s\S]*?<\/div>/, renderIllustration(illustrationForPath(href)));
    });
    if (path.includes('/servicos/')) {
      const materialIds = /beach/.test(path) ? ['material-areia', 'etapa-base'] : /tenis/.test(path) ? ['material-saibro', 'material-acrilico'] : /futebol/.test(path) ? ['material-grama', 'material-base'] : ['material-modular', 'material-acrilico'];
      const gallery = `<section class="illustrated-materials"><div><span>ENTENDA SEU PROJETO</span><h2>Da estrutura à superfície de jogo</h2><p>Estas ilustrações ajudam a visualizar as soluções. Materiais, camadas e equipamentos são definidos conforme a avaliação técnica de cada espaço.</p></div><div class="illustrated-material-grid">${materialIds.map(id => `<div>${renderIllustration(id)}<h3>${escapeHtml(catalog[id].title)}</h3></div>`).join('')}</div><a class="illustrated-quote" href="https://wa.me/5515997157642" target="_blank" rel="noopener noreferrer">Conversar sobre meu projeto</a></section>`;
      result = result.replace('</main>', `${gallery}</main>`);
    }
  }
  return result;
}
