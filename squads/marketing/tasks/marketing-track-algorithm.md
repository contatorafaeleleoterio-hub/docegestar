---
task: Marketing Track Algorithm
responsavel: "@mkt-chief"
responsavel_type: agent
atomic_layer: task
elicit: false
Entrada: [MARKETING-TRACK.md, LAUNCH-TRACK.md]
Saida: [marketing-plan, actions-list]
---

# Marketing Track Algorithm

Tarefa para analisar o estado do marketing e do produto para definir as prioridades da squad.

## Procedimento
1. Ler o arquivo `docs/marketing/MARKETING-TRACK.md` para entender o estado atual.
2. Ler o arquivo `docs/LAUNCH-TRACK.md` para alinhar as acoes de marketing com o lancamento do produto.
3. Aplicar a logica de prioridade:
   - **BLOCKER** → Resolver imediatamente.
   - **SETUP** → Configurar se pendente.
   - **PESQUISA** → Executar se necessario.
   - **CAMPANHA ATIVA** → Otimizar.
   - **NOVA CAMPANHA** → Planejar.
   - **ASO** → Revisar listing.
   - **RELATORIO** → Gerar KPI report semanal.
4. Gerar um plano de acoes para a squad e uma lista de acoes humanas para a Gabriela.

## Checklist
- [ ] Estado do marketing lido.
- [ ] Estado do lancamento do produto verificado.
- [ ] Prioridades definidas conforme algoritmo.
- [ ] Acoes delegadas para os agentes da squad.
- [ ] Acoes humanas sinalizadas explicitamente.
