# Mais cor e fotografia real — Pratika Sport

## Direção e arquitetura

Complemento do hero editorial publicado no commit `788ee8a`, sem reintroduzir uma moldura em volta da quadra ilustrada. Azul e verde da marca organizam as etapas, botões, faixa de serviços e fundos alternados. A galeria verde-clara e o guia de pisos azul-profundo quebram o excesso de branco.

Catálogo tipado de fotografias em `data/project-photos.json`, renderização reutilizável em `components/ProjectPhoto.tsx` e galeria/atalho em `components/ProjectGallery.tsx`. São componentes de servidor, sem biblioteca ou estado adicional no navegador. As seis fotografias são arquivos já existentes no acervo do site; não foram geradas por IA. Nenhum local, cliente, data ou característica não confirmada foi atribuído às imagens.

As fotos voltaram aos seis cards de serviços na home e em São Paulo, a uma galeria de quatro modalidades e ao atalho próximo da abertura. Ilustrações continuam nos materiais e no processo, identificadas como conceituais. As imagens reais já presentes nas páginas antigas permanecem intactas.

## Correções de contraste

- Removida regra antiga em `app/globals.css` que forçava texto branco na área de pisos independentemente do fundo.
- Cores explícitas no guia de pisos, agora com fundo azul-escuro e cards claros.
- Corrigidos os cards do processo em São Paulo: antes eram brancos com texto branco herdado da seção escura.
- Links do rodapé mantêm contraste no estado de hover.
- Botões principais usam azul/verde mais escuros para preservar a leitura do texto branco, em vez de verde-limão sob o texto.

## Performance e segurança

`scripts/prepare-project-photos.mjs` faz apenas recorte proporcional, redução e codificação de 36 variantes AVIF/WebP, preservando os originais. Imagens com dimensões reservadas e carregamento sob demanda. Recursos repetidos são reutilizados pelo navegador. Nenhum novo serviço, API, formulário, integração, dado pessoal ou dependência foi adicionado. URLs, contatos, Analytics, consentimento e regra de ausência de preços permanecem.

## Critérios de validação

Build completo e montagem da Vercel; TypeScript e lint dos arquivos alterados; testes de SEO/Analytics/ilustrações; teste das dimensões e origem das fotos; navegação, animação, menu e formulário existentes. Revisão visual em 360, 390, 768, 834 e 1440 px, primeira visita, ausência de imagens quebradas/rolagem horizontal e contraste mínimo de 4,5:1 nos textos críticos e nas áreas corrigidas. Capturas locais em `work/brand-visual-qa/`.

UI/UX Pro Max orientou a separação entre explicação ilustrada e prova fotográfica, o uso consistente da marca e a hierarquia de ações. Web Interface Guidelines orientou contraste, dimensões das imagens, foco e semântica. Não foram adotadas promessas de aumento de vendas ou métricas de conversão sem evidência.

Resultado local: build completo aprovado, TypeScript/lint aprovados, 25 testes de conteúdo/SEO/Analytics/imagens, 10 verificações de marca/fotos/contraste, 14 verificações do hero e 40 combinações de páginas/larguras aprovados. Fluxos de animação, pausa/repetição, formulário interceptado localmente e conteúdo sem JavaScript aprovados. As verificações no navegador bloquearam serviços de terceiros e não enviaram formulários reais.
