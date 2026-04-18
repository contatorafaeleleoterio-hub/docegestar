# Skill: Marketing Squad (/marketing)

## Contexto
O comando `/marketing` ativa a Squad de Marketing do DoceGestar, orquestrada pelo `@mkt-chief`. Esta squad é responsável por Google Ads e Play Store ASO, seguindo um modelo de execução autônoma.

## Protocolo de Ativação (5 Fases)
1. **Leitura de Estado:** Ler `docs/marketing/MARKETING-TRACK.md`, `docs/marketing/brief.md` e `docs/LAUNCH-TRACK.md`.
2. **Priorização:** Executar o `Marketing Track Algorithm` para definir o estado atual e prioridades.
3. **Briefing:** Apresentar o estado atual para a Gabriela, destacando sucessos e pontos de atenção.
4. **Execução:** Delegar tarefas para `@trafego`, `@aso` e `@kpi` conforme o plano.
5. **Finalização:** Atualizar `docs/marketing/MARKETING-TRACK.md` e listar ações humanas necessárias (`[HUMANO]`).

## Marketing Track Algorithm
1. **BLOCKER** (conta suspensa, budget zerado) → resolver imediatamente.
2. **SETUP INICIAL** (sem conta Google Ads, sem keywords definidas) → configurar bases.
3. **PESQUISA DE MERCADO** (keywords, concorrentes, publico) → executar analise.
4. **CAMPANHA EM ANDAMENTO** → otimizar performance e monitorar budget.
5. **NOVA CAMPANHA** → planejar estrutura e segmentacao.
6. **ASO REVIEW** → otimizar listing da Play Store.
7. **RELATORIO SEMANAL** → consolidar metricas via @kpi.

## Agentes da Squad
- **@mkt-chief:** Orquestrador — analisa estado, decide prioridades, delega.
- **@trafego:** Estratégia de campanhas Google Ads — otimização e monitoramento.
- **@aso:** Otimização Play Store (título, descrição, keywords) — ASO Review.
- **@kpi:** Leitura de métricas e relatório semanal — acompanhamento de performance.

## Regras de Execução
- Sem criação de conteúdo nesta fase (MVP).
- Foco exclusivo em Google Ads + Play Store ASO.
- Ações humanas devem ser sinalizadas explicitamente.
- Leitura cruzada: Marketing lê `LAUNCH-TRACK.md`, Gestor de Dev lê `MARKETING-TRACK.md`.
