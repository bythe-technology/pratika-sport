# Pratika Sport

Novo site institucional da Pratika Sport, produzido e mantido pela BYTHE.

## Estado atual

Site institucional publicado em https://www.pratikasport.com.br, com home e São Paulo em React/Vinext e páginas históricas preparadas pelo gerador estático. A coleção de 18 ilustrações conceituais e a abertura interativa foram incorporadas em outubro de 2026. A cópia técnica do site anterior permanece preservada em `legacy-site/`.

## Build e verificações

Execute `npm run build` e depois `node scripts/build-vercel.mjs`, na mesma ordem usada pela Vercel. Rode `node --test tests/analytics.test.mjs tests/seo-output.test.mjs tests/illustrations.test.mjs` para conferir conteúdo, privacidade e imagens. O teste visual `node tests/illustrated-site.browser.mjs` usa Playwright disponível no ambiente e Chrome instalado; suas capturas ficam em `work/illustration-qa/`.

O catálogo de imagens está em `data/illustrations.json`, os prompts em `artwork/generation.json` e as versões publicadas em `public/images/illustrations/`. Os PNGs originais ficam no arquivo local ignorado `artwork/source/`. Para recodificá-los, use `node scripts/prepare-illustrations.mjs`.

## Segurança de migração

- Preservar URLs públicas, canônicas e redirecionamentos existentes.
- Conferir as páginas indexáveis e imagens no sitemap gerado.
- Manter orçamento personalizado sem preços publicados.
- Não remover o inventário histórico até o fim da migração.
