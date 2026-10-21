# Repaginada ilustrada — 21/10/2026

## Entrega visual

18 imagens produzidas com a ferramenta integrada image_gen: quatro etapas da construção, seis serviços, seis materiais e duas cenas institucionais. A quadra poliesportiva foi a referência visual das demais. A coleção usa perspectiva isométrica, azul e verde da marca e profissionais cartunescos nas cenas de processo. São representações conceituais e esquemáticas; não são fotografias de obras nem especificações executivas.

Os prompts completos e as associações estão em `artwork/generation.json`. Os PNGs originais foram arquivados localmente em `artwork/source/`; o catálogo público e os textos alternativos estão em `data/illustrations.json`. Foram exportadas 108 variantes WebP/AVIF de 360, 720 e 1080 px, com aproximadamente 3,52 MiB no total. O maior AVIF de 1080 px tem aproximadamente 74 KiB. Cada navegador escolhe apenas a variante adequada.

## Arquitetura e comportamento

A home e a página de São Paulo compartilham `Illustration` e `ConstructionStory`. A abertura apresenta quatro etapas, reproduz uma vez quando entra na tela e oferece seleção, pausa e repetição. O estado entregue sem JavaScript mostra a quadra pronta; preferência por movimento reduzido desativa a reprodução automática. As dimensões das figuras e o espaço do texto são reservados para evitar mudanças de layout.

As páginas antigas recebem a apresentação comum pelo módulo `scripts/illustrated-pages.mjs`, sem editar os arquivos do snapshot. Serviços recebem ilustrações da modalidade e dos materiais; artigos usam a figura correspondente ao assunto; páginas legais recebem navegação e rodapé comuns, mantendo apresentação sóbria. Foram preservadas URLs, metadados de SEO, conteúdo técnico, dados comerciais, favicon e consentimento do Analytics `G-FFZKDZTE9M`.

Foram corrigidos transbordamentos em e-mails longos, formulário e tabelas de comparação. Nas páginas antigas, o pixel de CRM do fornecedor anterior (`crm.shalub.com.br`) foi excluído da saída gerada para não transportar rastreamento não solicitado; o snapshot original segue preservado.

## Validação e publicação

Build Vinext e pós-processamento estático da Vercel concluídos. Os 21 testes de SEO/Analytics/ilustrações passaram, assim como 40 verificações de página/viewport em Chrome headless, abrangendo 360, 390, 768 e 1440 px. Também passaram primeira visita com aviso de cookies, menu móvel, teclado, reprodução automática, pausa, repetição, preferência por movimento reduzido e apresentação sem JavaScript. O formulário foi verificado localmente com abertura externa interceptada, sem enviar mensagem. Nenhuma imagem quebrada ou rolagem horizontal foi encontrada nas páginas verificadas. TypeScript e lint dos arquivos alterados passaram. Capturas e resultados ficam em `work/illustration-qa/`.

Base anterior à repaginada: commit `78d4fa0c13e22c2d8a896e30127d93ba8571d4e9`; deployment anterior `dpl_8TF5S7jLa6oqsRYxG2hF8wfdoDqr` (produção, projeto `pratika-sport`, equipe `bythe-tech`). A publicação usa o fluxo GitHub/Vercel existente e pode ser desfeita por revert do commit da repaginada. Mudanças visuais não constituem evidência de aumento de visitas, cliques ou vendas; esses resultados dependem dos relatórios reais posteriores.
