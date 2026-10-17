# Rodada diária de SEO — Pratika Sport — 17/10/2026

## Evidências observadas
- A busca orgânica por serviços da Pratika ainda mostrou um resultado antigo com “Preço e Projeto 2025”. A página atual pode estar corrigida sem que o Google tenha atualizado o trecho do resultado; não foi possível conferir recrawl no Search Console nesta rodada.
- A página inicial publicada continha seis depoimentos atribuídos a pessoas/organizações, além das alegações “+850 Obras” e “100% Garantia”. Não havia fonte de comprovação no histórico desta rodada.
- A rota antiga /pages/depoimentos.html continuava no sitemap e no pacote estático, expondo avaliações e números sem fonte verificável.
- Uma referência concorrente consultada foi a ABC Quadras, que apresenta construção, reforma e manutenção com foco local. Isso não fornece dados de demanda nem comprova desempenho relativo.

## Ajustes realizados
- Removidos da home e da página de São Paulo os depoimentos sem fonte e os números “+850 Obras” e “100% Garantia”; a faixa passou a destacar escopo e atendimento descritos no próprio site.
- Removidos os links de navegação para a seção excluída; ajustado o exemplo do campo de orçamento para não exibir nome de pessoa fictício.
- A rota legada de depoimentos foi marcada noindex e recebe redirecionamento permanente para a página inicial. O sitemap gerado deixa de listá-la.
- A inspeção visual desktop mostrou que o aviso opcional de Analytics cobria parte do texto e dos botões principais. Ele agora aparece no fluxo da página; a escolha continua opcional e o carregamento segue bloqueado até o aceite.
- Preservados Analytics, consentimento, telefone, orçamento personalizado e ausência de preços.

## Verificações e limitações
- Build de produção local completou; o pré-renderer confirmou as rotas de início e São Paulo.
- npm run test:seo: 10 testes passaram, incluindo novos testes de ausência de depoimentos/alegações sem comprovação e remoção da rota do sitemap.
- A suíte de Analytics passou com 4 testes, cobrindo consentimento, recusa, ID configurado e medição de cliques sem expor mensagens ou tratá-los como vendas.
- O visual foi conferido no desktop. A sessão não forneceu emulação de viewport móvel para inspeção visual real; a faixa mantém largura fluida e não usa mais posicionamento fixo sobre o conteúdo.
- Oxlint focado nos arquivos alterados passou. O lint completo do repositório acusa erros existentes em componentes de UI, snapshot legado e site estático, fora do escopo desta rodada.
- O Google Analytics abriu na sessão do Chrome, mas uma janela obrigatória de preferências bloqueia o relatório. Não salvei configurações nem usei o cartão visível como dado da Pratika. Search Console também não foi confirmado. Portanto, sem números de visitas, origem orgânica, cliques de contato ou vendas nesta rodada.
- O resultado do Google segue sujeito ao tempo de recaptura e reprocessamento; sem Search Console acessível, não foi possível solicitar ou verificar indexação.

## Fontes
- Google Search Essentials: https://developers.google.com/search/docs/essentials
- Conteúdo útil e centrado nas pessoas: https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- Experiência da página, incluindo uso em dispositivos móveis: https://developers.google.com/search/docs/appearance/page-experience
- Referência concorrente: https://www.abcquadras.com.br/
