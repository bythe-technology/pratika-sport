import { cp, mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { getServiceSlug, serviceIntent, serviceMetadata } from './service-intent.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const output = resolve(root, 'dist', 'client');
const canonicalBase = 'https://www.pratikasport.com.br';
await mkdir(output, { recursive: true });
const saoPauloOutput = resolve(output, 'pages', 'estados', 'sao-paulo.html');
const saoPauloModernPage = await readFile(saoPauloOutput, 'utf8');
await cp(resolve(root, 'legacy-site', 'snapshot', 'pages'), resolve(output, 'pages'), { recursive: true });
await writeFile(saoPauloOutput, saoPauloModernPage, 'utf8');
await cp(resolve(root, 'legacy-site', 'snapshot', 'css'), resolve(output, 'css'), { recursive: true });
await cp(resolve(root, 'legacy-site', 'snapshot', 'js'), resolve(output, 'js'), { recursive: true });
await cp(resolve(root, 'legacy-site', 'snapshot', 'politica-privacidade.html'), resolve(output, 'politica-privacidade.html'));
await cp(resolve(root, 'legacy-site', 'snapshot', 'termos-servico.html'), resolve(output, 'termos-servico.html'));
await cp(resolve(root, 'static-site', 'site.webmanifest'), resolve(output, 'site.webmanifest'));

const listHtmlFiles = async (directory) => {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(entries.map(async (entry) => {
    const fullPath = resolve(directory, entry.name);
    return entry.isDirectory() ? listHtmlFiles(fullPath) : [fullPath];
  }));
  return files.flat().filter((file) => file.endsWith('.html'));
};

const xmlEscape = (value) => value
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&apos;');

const htmlFiles = await listHtmlFiles(output);

const removePublishedPrices = (html) => html
  .replace(/<li\b[^>]*>(?:(?!<\/li>)[\s\S])*?(?:Investimento|Custo m[eé]dio|Pre[cç]o estimado)(?:(?!<\/li>)[\s\S])*?R\$[^<]*<\/li>/gi, '')
  .replace(
    /<li\b([^>]*)>((?:(?!<li\b|<\/li>)[\s\S])*R\$(?:(?!<li\b|<\/li>)[\s\S])*)<\/li>/gi,
    (_match, attributes, content) => /investimento|custo m[eé]dio|pre[cç]os de|a partir de/i.test(content)
      ? ''
      : `<li${attributes}>${content.includes('</strong>') ? content.slice(0, content.indexOf('</strong>') + 9) : ''} Sob orçamento personalizado.</li>`,
  )
  .replace(
    /<td\b([^>]*)>\s*(?:A partir de\s*)?R\$[^<]*<\/td>/gi,
    '<td$1>Sob orçamento personalizado</td>',
  )
  .replace(
    /"text"\s*:\s*"[^"\n]*R\$[^"\n]*"/gi,
    '"text": "O escopo é definido conforme a avaliação técnica, as condições do local e o orçamento personalizado."',
  );

const updateServicePage = (html, metadata) => {
  let updated = html
    .replace(/<title>[^<]*<\/title>/i, `<title>${metadata.title}</title>`)
    .replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i, `<meta name="description" content="${metadata.description}">`)
    .replace(/<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:title" content="${metadata.title}">`)
    .replace(/<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:description" content="${metadata.description}">`)
    .replace(/<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/i, `<meta name="twitter:title" content="${metadata.title}">`)
    .replace(/<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/i, `<meta name="twitter:description" content="${metadata.description}">`)
    .replace(/\s*<meta\s+name="keywords"\s+content="[^"]*"\s*\/?>/i, '')
    .replace(/<h2>\s*Quanto Custa[^<]*<\/h2>/i, '<h2>Como é definido o orçamento do projeto</h2>')
    .replace(/<p\b[^>]*>(?:(?!<\/p>)[\s\S])*?Com\s+mais\s+de\s+20\s+anos\s+de\s+experiencia,\s+ja\s+construimos\s+centenas\s+de\s+quadras\s+em\s+condominios,\s+clubes,\s+escolas\s+e\s+academias\s+em\s+todo\s+o\s+Brasil\.(?:(?!<\/p>)[\s\S])*?<\/p>/i, '<p>A Pratika Sport desenvolve projetos de quadras poliesportivas para condomínios, clubes, escolas e academias em todo o Brasil.</p>')
    .replace(/<li\b[^>]*>\s*(?:<strong>)?\s*20\+\s*anos(?:<\/strong>)?[^<]*<\/li>/gi, '')
    .replace(/<li\b[^>]*>\s*Durabilidade de 15\+ anos\s*<\/li>/gi, '')
    .replace(/<li\b[^>]*>\s*Garantia de 5 anos\s*<\/li>/gi, '')
    .replace(/<p\b[^>]*>\s*20\+ anos construindo quadras esportivas de excel[eê]ncia\.\s*<\/p>/gi, '')
    .replace(/<p>\s*O <strong>preço[^<]*<\/strong> varia conforme[^<]*<\/p>/i, `<p>${metadata.quote}</p>`)
    .replace(/<p>\s*Os valores incluem[^<]*<\/p>/i, '<p>O escopo pode incluir preparação do terreno, drenagem, piso ou gramado, iluminação, cercamento e os acessórios previstos para o projeto.</p>')
    .replace(/<p>\s*<strong>Valores aproximados:<\/strong>\s*<\/p>\s*<ul>[\s\S]*?<\/ul>/i, `<p>${metadata.quote}</p>`)
    .replace(/<h2>Investimento em Manutenção<\/h2>\s*<table\b[\s\S]*?<\/table>/i, `<h2>Como é definido o orçamento da manutenção</h2><p>${metadata.quote}</p>`)
    .replace(/<li\b[^>]*><strong>Investimento:<\/strong>[\s\S]*?<\/li>/gi, '')
    .replace(/<h2>Fatores que Influenciam o Preço da Quadra Poliesportiva<\/h2>/i, '<h2>Fatores que definem o projeto da quadra poliesportiva</h2>')
    .replace(/O <strong>preço da quadra poliesportiva<\/strong> é determinado por vários fatores\. Entender cada um deles ajuda a fazer um planejamento mais assertivo:/i, 'O projeto precisa considerar diferentes fatores técnicos e de uso:')
    .replace(/<h2>Quanto Custa Construir uma Quadra Poliesportiva: Visão Geral<\/h2>/i, '<h2>O que considerar no planejamento da quadra</h2>')
    .replace(/<h2>Quanto Custa Construir uma Quadra Poliesportiva\?<\/h2>/i, '<h2>Planejamento de uma quadra poliesportiva</h2>')
    .replace(/<h1([^>]*)>Quanto Custa Construir uma Quadra Poliesportiva\?<\/h1>/i, '<h1$1>Planejamento de uma Quadra Poliesportiva: Etapas e Fatores</h1>')
    .replace(/Quanto Custa Construir uma Quadra Poliesportiva\?/gi, 'Planejamento de uma Quadra Poliesportiva');
  updated = updated.replace(/"name"\s*:\s*"Quanto custa construir[^"]*"/gi, '"name": "Como solicitar um orçamento personalizado?"');
  return updated;
};

const sanitizeCompanyClaims = (html) => html
  .replace(/H[aá] mais de 20 anos transformando sonhos em realidade,\s*construindo quadras esportivas\s*de excel[eê]ncia em todo o Brasil\./gi, 'A Pratika Sport atua há mais de 10 anos em projetos de quadras esportivas no Brasil, com prioridade operacional em São Paulo.')
  .replace(/20\+\s*anos\s+de\s+(?:experi[eê]ncia|excel[eê]ncia|opera[cç][ãa]o)/gi, '10+ anos de operação')
  .replace(/mais de 20 anos(?: de experiência)?/gi, 'mais de 10 anos de operação')
  .replace(/20\+ anos construindo quadras esportivas de excelência/gi, 'Mais de 10 anos de operação em projetos de quadras esportivas')
  .replace(/20\+ Anos de Excelência/gi, '10+ anos de operação')
  .replace(/20\+ anos no mercado/gi, '10+ anos de operação')
  .replace(/(?:mais de\s+)?850\+?\s+quadras?\s+constru[ií]das/gi, 'mais de 850 projetos realizados')
  .replace(/(?:mais de\s+)?850\+?\s+campos\s+constru[ií]dos/gi, 'mais de 850 projetos realizados')
  .replace(/(?:em\s+)?26 estados(?: do Brasil| brasileiros)?/gi, 'em todo o Brasil')
  .replace(/26 estados atendidos/gi, 'atendimento nacional')
  .replace(/98% de satisfa[cç][ãa]o[^.]*\.?/gi, 'mais de 850 projetos realizados, conforme informação confirmada pela empresa.')
  .replace(/Todos os nossos projetos possuem garantia estendida\./gi, 'Consulte as condições de garantia na proposta de cada projeto.')
  .replace(/(<strong>Durabilidade:<\/strong>\s*)20\+ anos/gi, '$1A durabilidade varia conforme os materiais, o uso e a manutenção')
  .replace(/há mais de 10 anos de operação\./gi, 'há mais de 10 anos.')
  .replace(/<div class="stat">\s*<div class="stat-number" data-counter="20" data-suffix="\+">20\+<\/div>\s*<div class="stat-label">Anos de Experi[eê]ncia<\/div>\s*<\/div>/gi, '<div class="stat">\n            <div class="stat-number" data-counter="10" data-suffix="+">10+</div>\n            <div class="stat-label">Anos de Operação</div>\n          </div>')
  .replace(/<div class="stat">\s*<div class="stat-number" data-counter="26" data-suffix="">26<\/div>\s*<div class="stat-label">Estados Atendidos<\/div>\s*<\/div>/gi, '')
  .replace(/<div class="stat">\s*<div class="stat-number" data-counter="98" data-suffix="%">98%<\/div>\s*<div class="stat-label">Clientes Satisfeitos<\/div>\s*<\/div>/gi, '');

const updateAboutPage = (html) => html
  .replace(/<meta name="description" content="[^"]*"\s*\/?>/i, '<meta name="description" content="Conheça a Pratika Sport: mais de 850 projetos realizados e mais de 10 anos de operação, com atendimento nacional e prioridade em São Paulo.">')
  .replace(/<meta property="og:description" content="[^"]*"\s*\/?>/i, '<meta property="og:description" content="Mais de 850 projetos realizados e mais de 10 anos de operação. Conheça a Pratika Sport e suas soluções para quadras esportivas.">')
  .replace(/<meta name="twitter:description" content="[^"]*"\s*\/?>/i, '<meta name="twitter:description" content="Mais de 850 projetos realizados e mais de 10 anos de operação. Conheça a Pratika Sport.">')
  .replace(/<p>\s*Fundada em 2004,[\s\S]*?<\/p>/i, '<p>A <strong>Pratika Sport</strong> desenvolve soluções para construção, reforma e manutenção de quadras esportivas, com mais de 10 anos de operação.</p>')
  .replace(/<p>\s*Começamos como uma pequena empresa[\s\S]*?<\/p>/i, '<p>Com mais de <strong>850 projetos realizados</strong>, a empresa atende todo o Brasil, com prioridade operacional no estado de São Paulo.</p>')
  .replace(/<h4>Materiais Premium<\/h4>\s*<p>Utilizamos apenas materiais certificados e de alta durabilidade\.<\/p>/i, '<h4>Materiais conforme o projeto</h4><p>Os materiais são especificados de acordo com as características e necessidades de cada projeto.</p>')
  .replace(/<h4>Garantia de Qualidade<\/h4>/i, '<h4>Condições de garantia</h4>')
  .replace(/<h4>Equipe Especializada<\/h4>\s*<p>Profissionais treinados e experientes em cada etapa\.<\/p>/i, '<h4>Etapas organizadas</h4><p>O trabalho é organizado conforme o escopo definido para cada projeto.</p>')
  .replace(/^\s*"(?:foundingDate|founders|numberOfEmployees)"\s*:\s*(?:\[[^\]]*\]|"[^"]*")(?:,)?\s*$/gim, '')
  .replace(/<div class="about-image-badge-number">20\+<\/div>/i, '<div class="about-image-badge-number">10+</div>')
  .replace(/<div class="about-image-badge-text">Anos de<br>Experi[eê]ncia<\/div>/i, '<div class="about-image-badge-text">Anos de<br>Operação</div>')
  .replace(/<div class="stat-number" data-counter="850" data-suffix="\+">850\+<\/div>\s*<div class="stat-label">Quadras Constru[ií]das<\/div>/i, '<div class="stat-number" data-counter="850" data-suffix="+">850+</div>\n            <div class="stat-label">Projetos Realizados</div>')
  .replace(/<div class="stat">\s*<div class="stat-number" data-counter="20" data-suffix="\+">20\+<\/div>\s*<div class="stat-label">Anos de Experi[eê]ncia<\/div>\s*<\/div>/i, '<div class="stat">\n            <div class="stat-number" data-counter="10" data-suffix="+">10+</div>\n            <div class="stat-label">Anos de Operação</div>\n          </div>')
  .replace(/\s*<div class="stat">\s*<div class="stat-number" data-counter="26" data-suffix="">26<\/div>\s*<div class="stat-label">Estados Atendidos<\/div>\s*<\/div>/i, '<div class="stat">\n            <div class="stat-number">Brasil</div>\n            <div class="stat-label">Atendimento Nacional</div>\n          </div>')
  .replace(/\s*<div class="stat">\s*<div class="stat-number" data-counter="98" data-suffix="%">98%<\/div>\s*<div class="stat-label">Clientes Satisfeitos<\/div>\s*<\/div>/i, '<div class="stat">\n            <div class="stat-number">São Paulo</div>\n            <div class="stat-label">Prioridade Operacional</div>\n          </div>');

await Promise.all(htmlFiles.map(async (file) => {
  const html = await readFile(file, 'utf8');
  const serviceSlug = getServiceSlug(file);
  const metadata = serviceMetadata[serviceSlug];
  let sanitizedHtml = removePublishedPrices(html);
  if (metadata) sanitizedHtml = updateServicePage(sanitizedHtml, metadata);
  if (file === resolve(output, 'pages', 'sobre.html')) sanitizedHtml = updateAboutPage(sanitizedHtml);
  sanitizedHtml = sanitizeCompanyClaims(sanitizedHtml);
  if (file.endsWith('quanto-custa-construir-quadra-poliesportiva.html')) {
    sanitizedHtml = sanitizedHtml
      .replace(/<title>[^<]*<\/title>/i, '<title>Construção de Quadra Poliesportiva: Planejamento | Pratika Sport</title>')
      .replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i, '<meta name="description" content="Entenda como planejar uma quadra poliesportiva: medidas, piso, terreno, drenagem, iluminação e cuidados de manutenção. Solicite uma avaliação técnica personalizada.">')
      .replace(/<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/i, '<meta property="og:title" content="Construção de Quadra Poliesportiva: Planejamento">')
      .replace(/<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i, '<meta property="og:description" content="Veja o que considerar nas medidas, piso, base, drenagem e infraestrutura de uma quadra poliesportiva.">')
      .replace(/<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/i, '<meta name="twitter:title" content="Construção de Quadra Poliesportiva: Planejamento">')
      .replace(/<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/i, '<meta name="twitter:description" content="Medidas, piso, base, drenagem e infraestrutura para planejar uma quadra poliesportiva.">')
      .replace(/\s*<meta\s+name="keywords"\s+content="[^"]*"\s*\/?>/i, '')
      .replace(/<meta\s+property="article:modified_time"\s+content="[^"]*"\s*\/?>/i, '<meta property="article:modified_time" content="2026-10-16">')
      .replace(/"dateModified"\s*:\s*"[^"]*"/i, '"dateModified": "2026-10-16"')
      .replace(/"headline"\s*:\s*"Quanto Custa Construir uma Quadra Poliesportiva\?"/gi, '"headline": "Construção de Quadra Poliesportiva: Planejamento"')
      .replace(/"description"\s*:\s*"Guia completo com preços[^"]*"/gi, '"description": "Orientações sobre medidas, piso, base, drenagem e infraestrutura para planejar uma quadra poliesportiva."')
      .replace(/<h1([^>]*)>Quanto Custa Construir uma Quadra Poliesportiva\?<\/h1>/i, '<h1$1>Planejamento de uma Quadra Poliesportiva: Etapas e Fatores</h1>')
      .replace(/<h2>Quanto Custa Construir uma Quadra Poliesportiva: Visão Geral<\/h2>/i, '<h2>O que considerar no planejamento da quadra</h2>')
      .replace(/O <strong>custo para construir uma quadra poliesportiva<\/strong> depende do terreno, das dimensões, da base, da drenagem, do tipo de piso, da iluminação, dos fechamentos e dos acessórios\. Uma faixa genérica pode induzir a uma decisão errada; a estimativa confiável é feita depois de conhecer o local e o escopo\./i, 'O planejamento técnico considera o terreno, as dimensões, a base, a drenagem, o tipo de piso, a iluminação, os fechamentos e os acessórios. A solução adequada depende da avaliação do local e do uso previsto.')
      .replace(/<h2>Fatores que Influenciam o Preço da Quadra Poliesportiva<\/h2>/i, '<h2>Fatores que definem o projeto da quadra poliesportiva</h2>')
      .replace(/O <strong>preço da quadra poliesportiva<\/strong> é determinado por vários fatores\. Entender cada um deles ajuda a fazer um planejamento mais assertivo:/i, 'O projeto considera diferentes fatores técnicos e de uso, entre eles:')
      .replace(/<p\b([^>]*)>\s*Se você está planejando <strong>construir uma quadra poliesportiva<\/strong>[\s\S]*?<\/p>/i, '<p$1>O planejamento de uma <strong>quadra poliesportiva</strong> começa por definir modalidades, medidas, características do terreno e condições de uso. Este guia reúne os principais pontos para organizar o projeto e preparar as informações para uma avaliação técnica.</p>')
      .replace(/<p\b[^>]*>\s*Lembre-se de que o <strong>preço da quadra poliesportiva<\/strong>[\s\S]*?<\/p>/i, '<p>Antes de escolher a solução, compare o escopo dos serviços, os materiais previstos, as etapas de execução, a manutenção indicada e as referências disponíveis. Uma avaliação do local ajuda a esclarecer as necessidades do projeto.</p>')
      .replace(/<p\b[^>]*>\s*Peça orçamentos de pelo menos 3 empresas especializadas\.[\s\S]*?<\/p>/i, '<p>Ao analisar propostas, compare o escopo, os materiais previstos, as etapas, os prazos apresentados e as referências disponíveis.</p>')
      .replace(/As <strong>medidas da quadra poliesportiva<\/strong> são um dos principais fatores de custo\. Veja as dimensões mais comuns:/i, 'As <strong>medidas da quadra poliesportiva</strong> ajudam a organizar as modalidades e a área de circulação. Veja dimensões de referência:')
      .replace(/O <strong>piso para quadra poliesportiva<\/strong> é o item que mais impacta no valor final\. Cada tipo tem características específicas:/i, 'O <strong>piso para quadra poliesportiva</strong> influencia o desempenho, o conforto e a rotina de conservação. Cada opção tem características próprias:')
      .replace(/Defina quanto pode investir e priorize os itens essenciais\. Lembre-se de reservar 10-15% para imprevistos\./i, 'Organize as necessidades por prioridade e considere as condições do terreno, a segurança e as etapas necessárias para executar o projeto.')
      .replace(/<h2>Como Planejar seu Investimento<\/h2>/i, '<h2>Como planejar as etapas do projeto</h2>')
      .replace(/<h3>3\. Estabeleça um Orçamento<\/h3>/i, '<h3>3. Defina as prioridades do projeto</h3>')
      .replace(/<li>Preços de R\$[^<]*<\/li>/i, '')
      .replace(/<li>Custo m[eé]dio (?:mensal|anual): R\$[^<]*<\/li>/gi, '')
      .replace(/<li><strong>.*?<\/strong>\s*R\$[^<]*<\/li>/gi, '')
      .replace(/<ul>\s*<\/ul>/gi, '')
      .replace(/Quanto custa construir uma quadra poliesportiva de 20x10m\?/gi, 'O que planejar em uma quadra poliesportiva?')
      .replace(/Quanto Custa Construir Quadra Poliesportiva/gi, 'Construção de Quadra Poliesportiva: Planejamento')
      .replace(/<li>\s*Sob orçamento personalizado\.\s*<\/li>/gi, '')
      .replace(/<h2>Quanto Custa Construir uma Quadra Poliesportiva\?<\/h2>/i, '<h2>Planejamento de uma quadra poliesportiva</h2>')
      .replace(/Quanto Custa Construir uma Quadra Poliesportiva\?/gi, 'Planejamento de uma Quadra Poliesportiva');
  }

  if (/R\$/i.test(sanitizedHtml)) {
    throw new Error(`Referência monetária não removida do conteúdo publicado: ${file}`);
  }

  if (sanitizedHtml !== html) {
    await writeFile(file, sanitizedHtml, 'utf8');
  }
}));

const legacyPagesDirectory = resolve(output, 'pages');
const legacyPages = (await listHtmlFiles(legacyPagesDirectory))
  .filter((file) => file !== saoPauloOutput)
  .filter((file) => !file.endsWith('.html.html'));
await Promise.all(legacyPages.map(async (file) => {
  const html = await readFile(file, 'utf8');
  const path = file.slice(output.length).replaceAll('\\', '/');
  const title = html.match(/<title>([^<]+)<\/title>/i)?.[1]?.trim();
  const isIndexable = !/<meta\s+name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(html);
  const breadcrumb = isIndexable && title
    ? `  <script type="application/ld+json">${JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Início', item: `${canonicalBase}/` },
        { '@type': 'ListItem', position: 2, name: title, item: `${canonicalBase}${path}` },
      ],
    }).replaceAll('</', '<\\/')}</script>\n`
    : '';

  const enhancements = [
    html.includes('/css/legacy-modern.css') ? '' : '  <link rel="stylesheet" href="/css/legacy-modern.css">\n',
    html.includes('"@type":"BreadcrumbList"') ? '' : breadcrumb,
  ].join('');
  let enhancedHtml = enhancements ? html.replace('</head>', `${enhancements}</head>`) : html;
  enhancedHtml = enhancedHtml
    .replace(/<link[^>]+rel="(?:icon|apple-touch-icon)"[^>]*>/gi, '')
    .replace('</head>', '<link rel="icon" href="/pratika-sport-favicon-192.png" type="image/png" sizes="192x192">\n</head>')
    .replace(/href="(?:\.\.\/)+index\.html"/g, 'href="/"');

  if (path.startsWith('/pages/servicos/') && !enhancedHtml.includes('id="planejar-orcamento"')) {
    const relatedServices = [
      ['quadras-poliesportivas', 'Construção de quadras poliesportivas'],
      ['quadra-de-tenis', 'Quadras de tênis'],
      ['quadra-de-beach-tennis', 'Quadras de beach tennis'],
      ['campo-de-futebol', 'Campos de futebol'],
      ['reforma-de-quadras', 'Reforma e recuperação de quadras'],
      ['manutencao-de-quadras', 'Manutenção de quadras'],
    ].filter(([slug]) => !path.endsWith(`${slug}.html`));
    const planningSection = `<section class="section" id="planejar-orcamento"><div class="container">
      <h2>Como solicitar um orçamento para seu projeto esportivo</h2>
      <p>Informe a cidade e o estado, a modalidade, as medidas aproximadas e se o espaço precisa de construção, reforma ou manutenção. Fotos atuais ajudam a identificar as condições da base, da drenagem e dos acessórios.</p>
      <p>Para condomínios, clubes, escolas e arenas, descreva também a intensidade de uso e as condições de acesso à obra. A proposta deve definir os serviços previstos, materiais, conservação e cronograma conforme a avaliação do local. A Pratika Sport trabalha com orçamento personalizado, sem tabela de preços.</p>
      <h2>Atendimento no Brasil, com prioridade no estado de São Paulo</h2>
      <p>A Pratika Sport atende projetos em todo o Brasil. No estado de São Paulo, capital, Grande São Paulo, interior e litoral entram no planejamento conforme o endereço, o escopo e a viabilidade logística. Informe sua localização para confirmar o atendimento.</p>
      <p><a href="/pages/estados/sao-paulo">Conheça o atendimento de quadras esportivas em São Paulo</a></p>
      <h2>Soluções relacionadas para seu espaço</h2>
      <ul>${relatedServices.map(([slug, label]) => `<li><a href="/pages/servicos/${slug}.html">${label}</a></li>`).join('')}</ul>
      <p><a class="btn btn-primary" href="https://wa.me/5515997157642?text=${encodeURIComponent('Olá! Gostaria de um orçamento personalizado. Minha cidade e estado são: ')}" target="_blank" rel="noopener noreferrer">Solicitar orçamento personalizado no WhatsApp</a></p>
      </div></section>`;
    enhancedHtml = enhancedHtml.replace('</main>', `${planningSection}</main>`);
  }
  const serviceSlug = path.match(/\/servicos\/([^/]+)\.html$/)?.[1];
  const intent = serviceIntent[serviceSlug];
  if (intent && !enhancedHtml.includes('id="avaliacao-do-espaco"')) {
    enhancedHtml = enhancedHtml.replace('</main>', `<section class="section" id="avaliacao-do-espaco"><div class="container"><h2>${intent[0]}</h2><p>${intent[1]}</p><p><a href="#planejar-orcamento">Veja quais informações enviar para solicitar seu orçamento</a>.</p></div></section></main>`);
  }
  await writeFile(file, enhancedHtml, 'utf8');
}));

// Shared static integration covers both modern exports and legacy entry pages.
await Promise.all(htmlFiles.map(async (file) => {
  let html = await readFile(file, 'utf8');
  if (!html.includes('src="/analytics.js"')) html = html.replace('</body>', '<script defer src="/analytics.js"></script></body>');
  if (file.endsWith('politica-privacidade.html') && !html.includes('id="analytics"')) {
    html = html.replace('</body>', '<section id="analytics" style="max-width:900px;margin:32px auto;padding:20px"><h2>Medição opcional com Google Analytics</h2><p>Somente após aceitar a medição, carregamos o Google Analytics 4 (G-FFZKDZTE9M) para analisar visitas e cliques nos canais de contato. Um clique não significa orçamento recebido ou venda. Não enviamos textos dos formulários, telefones, e-mails ou parâmetros da URL como parte desta integração. O Google pode processar informações técnicas da conexão, como endereço IP e dispositivo, para fornecer o serviço. A medição não é necessária para usar o site. Cookies analíticos podem ser armazenados quando você aceita. Preferências ficam salvas neste navegador e podem ser alteradas no botão Cookies; ao recusar, novos eventos desta integração são bloqueados e tentamos remover os cookies analíticos acessíveis ao site.</p><p><a href="https://policies.google.com/privacy" rel="noopener noreferrer">Política de privacidade do Google</a>.</p></section></body>');
  }
  await writeFile(file, html, 'utf8');
}));

const normalizeRoute = (path) => {
  if (path === '/index.html') {
    return '/';
  }

  if (path.endsWith('/index.html')) {
    return path.slice(0, -'/index.html'.length);
  }

  if (path === '/pages/estados/sao-paulo.html') {
    return '/pages/estados/sao-paulo';
  }

  return path;
};

const urlEntries = (await Promise.all(htmlFiles.map(async (file) => {
  const originalPath = file.slice(output.length).replaceAll('\\', '/');
  const path = normalizeRoute(originalPath);
  const html = await readFile(file, 'utf8');
  const isIndexable = !/<meta\s+name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(html);
  const imageSource = html.match(/<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i)?.[1]
    ?? html.match(/<img[^>]+src=["']([^"']+)["']/i)?.[1];
  const imageUrl = imageSource && !imageSource.startsWith('data:')
    ? new URL(imageSource, `${canonicalBase}${originalPath}`).href
    : null;

  return { path, isIndexable, imageUrl };
})))
  .filter(({ isIndexable }) => isIndexable)
  .filter(({ path }) => !path.includes('/404'))
  .filter(({ path }) => !path.endsWith('.html.html'))
  .filter(({ path }) => !path.startsWith('/pages/estados/') || path === '/pages/estados/sao-paulo')
  .sort((a, b) => a.path.localeCompare(b.path));

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urlEntries.map(({ path, imageUrl }) => `  <url>
    <loc>${xmlEscape(`${canonicalBase}${path}`)}</loc>
    ${imageUrl ? `
    <image:image>
      <image:loc>${xmlEscape(imageUrl)}</image:loc>
    </image:image>` : ''}
  </url>`).join('\n')}
</urlset>
`;

await writeFile(resolve(output, 'sitemap.xml'), sitemap, 'utf8');
await writeFile(resolve(output, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${canonicalBase}/sitemap.xml\n`, 'utf8');
