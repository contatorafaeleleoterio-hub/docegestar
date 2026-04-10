# Epic 3 — Notificações e Lembretes Gestacionais

**ID:** Epic 3
**Agente criador:** @pm
**Data de criação:** 2026-04-10
**Status:** Planning
**Estimativa total:** 23 story points

---

## Objetivo

Permitir que a gestante configure lembretes personalizados e receba notificações automáticas sobre marcos gestacionais importantes — consultas pré-natais, movimentos do bebê, exames programados e marcos semanais — de forma offline-first, sem necessidade de conta ou login.

## Proposta de valor

A gestante não precisa lembrar manualmente de cada consulta ou marco. O app notifica ela no momento certo, com informações contextuais da semana gestacional atual.

## Escopo

### Dentro do Epic 3
- Configuração de tipos de lembrete (quais ativar/desativar)
- Agendamento de notificações locais via `expo-notifications`
- CRUD de consultas pré-natais com lembretes associados
- Notificações automáticas por marco gestacional (baseadas na semana atual)

### Fora do escopo (próximos epics)
- Notificações push remotas (servidor)
- Sincronização entre dispositivos
- Calendário externo (Google Calendar, iCal)

---

## Stories

| ID | Título | Complexidade | Pontos | Dependência |
|----|--------|-------------|--------|-------------|
| 3.1 | Configuração de Lembretes | M | 5 pts | — |
| 3.2 | Agendamento de Notificações Locais | L | 8 pts | 3.1 |
| 3.3 | Lembretes de Consulta Pré-Natal | M | 5 pts | 3.2 |
| 3.4 | Marcos Gestacionais Automáticos | M | 5 pts | 3.2 |

**Total:** 23 story points

---

## Detalhamento das Stories

### Story 3.1 — Configuração de Lembretes
**Como** gestante, **quero** escolher quais tipos de lembrete desejo receber e em que horário, **para que** o app notifique apenas o que é relevante para mim.

**Resumo de ACs:**
- Tela de configuração de notificações (nova aba em Configurações ou modal)
- Toggles por tipo: consultas pré-natais, marcos semanais, kick counter, contrações
- Seletor de horário padrão para lembretes diários
- Persistência em SQLite (tabela `notification_settings`)

---

### Story 3.2 — Agendamento de Notificações Locais
**Como** gestante, **quero** que o app solicite permissão para enviar notificações e as agende automaticamente, **para que** eu seja lembrada sem precisar abrir o app.

**Resumo de ACs:**
- Solicitar permissão via `expo-notifications` na primeira configuração
- Fallback gracioso se permissão negada (modo silencioso, UI indica estado)
- Agendar/cancelar notificações por ID (cancelamento ao editar/deletar)
- Reagendar ao abrir o app (notificações expiradas)

**Dependência técnica:** `expo-notifications` — verificar se já está em `package.json`; se não, instalar via `npx expo install expo-notifications`

---

### Story 3.3 — Lembretes de Consulta Pré-Natal
**Como** gestante, **quero** cadastrar minhas consultas pré-natais com data, hora e tipo, **para que** o app me lembre com antecedência e eu não perca nenhuma consulta.

**Resumo de ACs:**
- CRUD completo de consultas (criar, listar, editar, deletar)
- Campos: tipo (Obstetra / Ultrassom / Exames / Outro), data, hora, observação opcional
- Lembrete configurável: 1 dia antes, 2 horas antes (padrão), na hora
- Persistência em SQLite (tabela `prenatal_appointments`)
- Lista ordenada por data (próximas primeiro)

---

### Story 3.4 — Marcos Gestacionais Automáticos
**Como** gestante, **quero** receber notificações automáticas sobre marcos importantes da minha gestação, **para que** eu acompanhe o desenvolvimento do bebê sem precisar consultar o app manualmente.

**Resumo de ACs:**
- Notificação semanal ao entrar em nova semana gestacional (ex: "Você está na semana 12!")
- Notificações especiais em marcos fixos: semanas 12, 20, 28, 36 (com mensagem contextual)
- Notificação ao completar cada trimestre
- Baseado em `useCurrentWeek` (DPP persistida no SQLite)
- Agendamento recalculado sempre que DPP for editada

---

## Restrições Técnicas

| Restrição | Detalhe |
|-----------|---------|
| Offline-first | Todas as notificações são locais (`expo-notifications`). Sem servidor. |
| SQLite | Novas tabelas adicionadas via `runMigrations()` em `src/db/index.ts`. NÃO alterar `schema.ts`. |
| Permissões | iOS exige permissão explícita. Android 13+ também. Tratar graciosamente. |
| Web | `expo-notifications` não funciona em web. Funcionalidade de notificações desabilitada na versão web (Cloudflare Pages). |
| DPP editável | Se a gestante editar a DPP em Configurações, todos os marcos automáticos devem ser reagendados. |

---

## Critério de Aceite do Epic

Epic 3 considerado **Done** quando:
- [ ] Stories 3.1, 3.2, 3.3 e 3.4 com Status = Done
- [ ] QA Gate PASS (ou CONCERNS aceitos) em todas as 4 stories
- [ ] `npm run typecheck` zero erros
- [ ] Notificações funcionando em dispositivo real (iOS ou Android)
- [ ] Versão web não quebrada (notificações silenciosas/desabilitadas)

---

## Definition of Done (por story)

Segue o padrão AIOX:
1. @po valida — Score ≥ 7/10 (Draft → Ready)
2. @dev implementa — typecheck PASS (Ready → InProgress → InReview)
3. @qa gate — veredicto PASS ou CONCERNS aceitos (InReview → Done)
4. @devops push (Done → GitHub)

---

## Change Log

| Data | Agente | Ação |
|------|--------|------|
| 2026-04-10 | @pm | Epic 3 criado — Planning. 4 stories, 23pts estimados. |
