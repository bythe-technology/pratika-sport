# Rodada diária de SEO — Pratika Sport — 19/10/2026

## Evidências

- Pesquisas atuais por construção, reforma e manutenção de quadras em São Paulo e no Brasil encontraram páginas de concorrentes que separam modalidades/serviços e mostram área de atendimento. Isso é referência editorial, não comprova volume de busca, desempenho ou alegações dos concorrentes.
- A página inicial ao vivo mantém o título nacional, descreve construção, reforma e manutenção e já destaca os dados confirmados pela empresa: mais de 850 projetos e mais de 10 anos de operação.
- A página de São Paulo ao vivo contém conteúdo específico da região e não mostra depoimentos ou valores monetários. Um resultado da busca ainda apresentou trecho antigo sobre depoimentos; ele não corresponde ao conteúdo atual aberto e pode estar desatualizado no índice.
- Desktop conferido no Chrome. Em viewport móvel de 390 × 844, a página não apresentou overflow horizontal. O aviso de medição ocupava 148 px e cobria links sociais/faixa de confiança do hero na primeira visita.

## Melhoria aplicada

- Encurtado o texto do aviso para preservar as informações essenciais — Google Analytics, medição de visitas e cliques de contato, opcionalidade e link de privacidade — reduzindo a área ocupada no celular.
- Não houve mudança no comportamento de consentimento, no ID `G-J5RD6CP1YY` nem nas tags: a medição permanece desativada até aceite explícito.

## Verificações e limitações

- Build de produção concluído.
- `npm run test:seo`: 11/11 testes passaram.
- `node --test tests/analytics.test.mjs`: 4/4 testes passaram.
- `oxlint` do teste passou. A verificação do script `public/analytics.js` apontou um aviso preexistente sobre `arguments` na linha 14; essa rotina não foi alterada.
- O Google Analytics abriu uma janela de preferências de comunicação por e-mail. Nenhuma opção foi alterada; não foi possível confirmar um relatório ou atribuir números ao site.
- A conta conectada ao Search Console não tem acesso à propriedade `pratikasport.com.br`.
- Portanto, não há números reais de visitas, cliques orgânicos ou conversões nesta rodada. Cliques de contato não equivalem a vendas.

## Fontes consultadas

- [Busca: construção de quadras esportivas em São Paulo](https://www.abcquadras.com.br/)
- [ADS Quadras — construção e reforma em São Paulo](https://adsquadras.com.br/)
- [Polyesportiva](https://polyesportiva.com.br/)
- [JV Quadras](https://jvquadra.com/)
- [Página inicial da Pratika Sport](https://www.pratikasport.com.br/)
- [Atendimento da Pratika Sport em São Paulo](https://www.pratikasport.com.br/pages/estados/sao-paulo)
