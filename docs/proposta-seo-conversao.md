# Proposta de SEO e conversão para Pratika Sport

## Ponto de partida

A página de São Paulo já atende à intenção regional e tem WhatsApp acima da dobra, conforme a auditoria de 14/11 em [docs/seo-audit-2026-11-14.md](seo-audit-2026-11-14.md). O build gera o sitemap e trata páginas legadas. A [especificação de conversão por WhatsApp](superpowers/specs/2026-11-05-whatsapp-ads-conversion-design.md) já distingue consentimento de analytics e de anúncios. O tráfego, as conversões e a qualidade dos leads ainda precisam de uma linha de base validada.

## Proposta

1. **Páginas de entrada.** Manter `/pages/estados/sao-paulo` como destino regional e conferir no HTML final que a variante `.html`, o sitemap e os links internos convergem para a mesma URL canônica. Testar título, descrição, H1 e breadcrumbs por tipo de página. Priorizar links contextuais da página de SP para serviços e casos publicados. Páginas próprias sobre piso modular ou grama sintética dependem de demanda medida e de conteúdo suficientemente distinto.
2. **Pedido de orçamento.** Usar um CTA primário de orçamento no primeiro bloco e junto aos detalhes do serviço. No celular, verificar que o botão flutuante deixa espaço para a navegação e que o mesmo fluxo funciona por teclado. Comunicar cobertura, escopo e etapas usando apenas informações confirmadas. Preservar a URL de destino e os parâmetros de campanha na navegação que antecede o CTA quando necessário.
3. **Medição.** Separar clique no WhatsApp, ligação e formulário concluído de lead qualificado. Reutilizar os eventos definidos no projeto e incluir um identificador estável de posição do CTA apenas se faltar essa dimensão. Disparar uma vez por interação e respeitar o consentimento de cada destino. Excluir telefone, mensagem, campos do formulário e URL com parâmetros dos eventos. Qualificação fica para uma etapa posterior com dados aprovados.

## Critérios de aceite para uma implementação

- Executar `npm run build`, `node scripts/build-vercel.mjs` e `npm run test:seo`. Verificar que sitemap, metadados e destinos dos CTAs gerados correspondem às URLs canônicas e que as páginas legadas continuam acessíveis pelas rotas previstas.
- Cobrir consentimento concedido, negado e revogado, deduplicação e ausência de dados pessoais nos eventos. Conferir foco, teclado e layout móvel nos pontos de contato.
- Comparar CTR orgânico e de campanha, taxa de clique no CTA e proporção de leads qualificados por página de entrada com uma linha de base aprovada. Avaliar mudanças com volume suficiente e manter a conversão por clique separada da qualificação.

Referências: [URLs canônicas no Google Search](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls) e [documentação interna de SEO e Google Ads](seo-google-ads-plan.md).
