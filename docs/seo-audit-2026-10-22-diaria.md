# Rodada orgânica — 22/10/2026

## Evidências e limites

- Repositório limpo e sincronizado no início: `6fb3990`.
- Consultas atuais por construção/reforma/manutenção de quadras em São Paulo encontraram ABC Quadras, JV Quadras e Polyesportiva. Os sites destacam modalidade, manutenção e atendimento regional. Isto é observação editorial, não volume de busca nem posição medida.
- A busca ainda retornou título duplicado e trecho antigo de depoimento para São Paulo. O conteúdo aberto do site atual não corresponde a esse trecho; não republicar depoimentos para acompanhar um índice desatualizado.
- Analytics consultado diretamente no Chrome: propriedade Pratika Sport `559764094`, ID `G-FFZKDZTE9M`, mostrou “Nenhum dado foi recebido do seu site ainda”, 0 usuários ativos/visualizações/eventos/eventos principais no card dos últimos 7 dias (15–21/10), e 0 usuários nos últimos 30 minutos. São zeros do relatório, não comprovação de ausência de visitas reais, contatos ou vendas. A propriedade foi criada em 20/10; consentimento continua obrigatório.
- Search Console respondeu “você não tem acesso a esta propriedade” para `sc-domain:pratikasport.com.br`. Não houve solicitação de novo acesso ou alteração de DNS.
- Corrigida a instrução da automação diária para consultar o ID separado da Pratika, sem alterar o agendamento. O ID anterior continua histórico da propriedade Byte Technology.

## Requisitos, riscos e estratégia antes da implementação

Funcionais: dar acesso direto à galeria real pelo menu, como complemento à valorização das fotos pedida na última revisão. O destino anterior `#diferenciais` existe, mas leva à faixa genérica de serviços na home, não à galeria. Incluir no sitemap as fotografias reais já publicadas em cada página, além da imagem principal.

Não funcionais: sem mudança de marca/layout/URLs de páginas, sem novas bibliotecas ou dados comerciais, manter consentimento, preços ausentes, acessibilidade e tamanho do JavaScript. Riscos: links sem destino, duplicação de imagens no sitemap, imagens externas/data URLs e regressão de canonical. Validar com testes específicos e suíte existente.

Arquitetura: substituir apenas o destino/rótulo dos dois links do menu compartilhado; helper puro de extração de imagens no processo de build, com normalização, deduplicação e limite. O sitemap deve listar fotos presentes no HTML, não imagens inventadas ou variantes repetidas. Nenhuma API ou banco adicional.

Referências: [ABC Quadras](https://www.abcquadras.com.br/), [JV Quadras](https://jvquadra.com/), [Polyesportiva](https://polyesportiva.com.br/sobre/), [Google — sitemap de imagens](https://developers.google.com/search/docs/crawling-indexing/sitemaps/image-sitemaps), [Pratika](https://www.pratikasport.com.br/).

O sitemap ajuda a descoberta de imagens, sem garantia de indexação ou ranking. Cliques não equivalem a vendas. Não houve contato com cliente, anúncios ou gastos.

## Verificações locais

Build completo e montagem da Vercel aprovados. 29 testes de SEO/Analytics/imagens/navegação passaram, incluindo deduplicação do sitemap, rejeição de imagens externas/data URLs, seis fotos reais em cada página de entrada e existência de todos os destinos de âncora das páginas modernas. TypeScript e lint dos arquivos alterados passaram. Nenhuma alteração ao código de medição ou à configuração de consentimento.

As diretrizes React foram usadas para manter a alteração do menu sem estado ou dependências adicionais. O fluxo de publicação da Vercel é o mesmo já autorizado. A revisão não introduz nova estética nem conteúdo comercial.
