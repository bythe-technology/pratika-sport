# Preparação do teste Google Ads — 05/11/2026

## Estado e arquitetura

Objetivo: pedidos de orçamento de construção e reforma de quadras em SP. O valor de R$ 300 é verba de mídia, sem publicação de preços no site. Confirmado pelo usuário: R$ 300 no total para o primeiro teste; não é verba mensal recorrente. Campanha deve permanecer rascunho/pausada até pagamento e revisão final.

Site existente → consentimento opcional → GA4 G-FFZKDZTE9M → contact_click (intenção, não venda). Implementação adiciona atribuição manual exclusivamente para a combinação fixa google / cpc / sp_quadras_teste_300. Não transmite parâmetros arbitrários, dados de formulário ou IDs de clique. Sem novas dependências ou alterações visuais. Risco: visitas sem consentimento não são mensuradas e atribuição não persiste após navegação/recarregamento sem parâmetros; não usar esse relatório como total de clientes.

Analytics consultado hoje: fluxo 16166127760, propriedade 559764094, ID correto; interface informa ausência de dados nas últimas 48h. Não considerar coleta real validada apenas porque testes locais passam.

Google Ads acessível sob login administrativo Bythe. Assistente identificou conta 869-831-0599 com empresa e Perfil da Empresa Bythe pré-preenchidos. Alterados apenas nome do rascunho para Pratika Sport e destino para página SP, selecionando site em vez do Perfil da Bythe. Não houve publicação, pagamento ou associação do Perfil da Bythe. Confirmar separação da conta anunciante antes de concluir. Aceite de termos autorizado pelo usuário nesta sessão. Assistente avançou até a escolha da ação de conversão; opções exibiram textos ausentes/inf, ainda sem campanha concluída.

## Configuração proposta

- Uma campanha de Pesquisa, apenas São Paulo, opção de presença física habitual; idioma português. Não diluir R$ 300 em várias mídias ou cobertura nacional inicialmente.
- Desativar Display, parceiros de pesquisa e expansões automáticas inicialmente, se disponíveis. Correspondências exata e de frase; sem ampla no primeiro teste.
- Dois grupos: Construção e Reforma. Priorizar reforma se volume/custo e capacidade comercial justificarem, sem presumir serviço mais lucrativo.
- Lance inicial: maximizar cliques com teto por clique definido após Planejador; sem CPA/ROAS inventados e sem otimizar automaticamente para vendas com evento de clique.
- Nenhum CPC, volume de busca, quantidade de leads ou retorno foi estimado como dado real.
- R$ 300 total: preferir orçamento total com período se modalidade permitir; caso contrário definir duração, controle de gastos e pausa manual, sem tratar orçamento diário como teto total.
- R$ 300 mensal: referência média diária R$ 9,86 (9,86 × 30,4 = R$ 299,744 para maioria das campanhas). Gastos diários podem variar; não garante teto vitalício, saldo pré-pago nem cobre impostos eventualmente aplicáveis.
- Meta secundária: contact_click. Lead qualificado/venda apenas mediante confirmação comercial. Importação de GA4 para Ads depende de vínculo e eventos reais validados; não realizada ainda.

## Anúncios preparados

Títulos (até 30 caracteres):
- Pratika Sport
- Construção de Quadras em SP
- Reforma de Quadras em SP
- Quadras Para Condomínios
- Solicite Seu Orçamento
- Quadras Para Clubes e Escolas
- Construção e Manutenção
- Conheça Projetos Reais

Descrições (até 90 caracteres):
- Construção e reforma de quadras em São Paulo. Solicite uma proposta para seu espaço.
- Quadras para condomínios, clubes e escolas. Converse com a equipe da Pratika Sport.
- Conheça os serviços e projetos reais. Orçamento personalizado para sua quadra.

Destino principal: https://www.pratikasport.com.br/pages/estados/sao-paulo

Sufixo final de URL: utm_source=google&utm_medium=cpc&utm_campaign=sp_quadras_teste_300

Links complementares: quadras poliesportivas, reforma de quadras, beach tennis e projetos reais. Usar rotas existentes, nomes coerentes e o mesmo sufixo.

## Palavras-chave iniciais

Construção, exatas e de frase: construção de quadras esportivas; construção de quadra poliesportiva; empresa de construção de quadras; construção de quadras em são paulo.

Reforma, exatas e de frase: reforma de quadra esportiva; reforma de quadra de condomínio; pintura de quadra esportiva; manutenção de quadras esportivas.

Negativas iniciais: emprego, vaga, salário, curso, apostila, pdf, desenho, jogo online, aluguel, alugar, reservar, reserva de quadra. Não negativar preço/orçamento: são intenções comerciais válidas, embora o site não exponha valores. Revisar termos reais antes de expandir negativas.

## Plano de execução e validação

1. Testar atribuição fixa, ausência de Google antes do aceite, recusa e eventos sem dados pessoais em tests/analytics.test.mjs.
2. Build Vercel e testes SEO; publicar somente mudança de medição segura e conferir analytics.js em produção.
3. Confirmar termos, titularidade/conta separada e período da verba; concluir rascunho, localização e orçamento.
4. Validar uma sessão técnica consentida no Realtime/DebugView e distinguir o teste do tráfego comercial; importar evento somente após coleta confirmada.
5. Vincular Ads à propriedade exclusiva Pratika, configurar conversões secundárias e revisar anúncio/destinos. Preservar consentimento de publicidade negado; remarketing e personalização fora deste teste.
6. Revisão pelo usuário, pagamento pelo usuário e ativação somente depois. Possível verificação de anunciante e análise de anúncios pelo Google podem impedir início imediato.
7. Monitorar termos, gastos, cliques de contato e qualidade dos pedidos diariamente durante teste. Manter SEO nas páginas úteis existentes e atualizar casos reais sem criar páginas locais repetidas.

Fontes: https://support.google.com/google-ads/answer/6385083 ; https://support.google.com/google-ads/answer/9376662

