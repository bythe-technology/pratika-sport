# Abertura editorial — Pratika Sport

## Direção e motivo

O usuário pediu uma abertura mais profissional e menos genérica, com uso explícito de ui-ux-pro-max. Foram consultados o design system para construção esportiva/arquitetura/editorial e as orientações React de acessibilidade. A aplicação prioriza hierarquia, espaço de respiro, contraste, imagem protagonista e CTA imediato. Foram mantidas as cores da Pratika e a fonte existente; nenhuma estimativa de engajamento da base de recomendações foi tratada como dado da empresa.

## Mudanças

- Quatro cenas ganharam fundo transparente, sem painel, borda, cantos arredondados ou sombra de cartão. A imagem se integra ao fundo da página.
- A quadra pronta aparece primeiro por 1,8 s; depois ocorre a reprodução única das etapas. Interações manuais cancelam o início automático pendente.
- Etapas aparecem como uma linha de navegação, com seleção indicada por cor, espessura e sublinhado. Há seleção por teclado, pausa, repetição e tratamento de movimento reduzido.
- Título, descrição e orçamento ganharam uma hierarquia editorial. Os dados confirmados (+850 projetos, 10+ anos) aparecem uma única vez na abertura; a faixa seguinte apresenta serviços e área de atendimento.
- Celulares usam ordem texto/orçamento/ilustração. Tablets e desktops mantêm texto e imagem lado a lado. A abertura de São Paulo recebe o mesmo tratamento pelo componente compartilhado.

## Arquivos e imagens

As regras da abertura estão isoladas em `app/hero.css`. O catálogo continua com 18 ilustrações; quatro delas possuem uma variante `hero` para as 24 imagens transparentes WebP/AVIF em `public/images/illustrations/hero-v2/`. As versões antigas continuam disponíveis, preservando cache e usos nas outras seções.

As edições foram feitas com image_gen integrado. Prompts e relações entre fontes/saídas estão em `artwork/hero-v2-generation.json`. PNGs originais dos recortes ficam no arquivo local ignorado `artwork/source/hero-v2-*.png`. As 24 versões responsivas somam aproximadamente 1,14 MiB; apenas a variante adequada é escolhida pelo navegador.

## Verificação

Build completo da Vercel, 23 testes de SEO/consentimento/imagens e alpha real passaram, assim como TypeScript e lint dos arquivos alterados. Também passaram 14 verificações da abertura e 40 de navegação geral, com testes de reprodução, pausa, repetição, teclado, formulário e apresentação sem JavaScript. A revisão da abertura cobre 360, 375, 390, 768, 834, 1024 e 1440 px, incluindo primeira visita, ausência de overflow e ausência de moldura no painel. Capturas ficam em `work/hero-editorial-qa/`. Base anterior à alteração: `9708d66c76e2621600639c6093ebb2ca3b7a94b3`.
