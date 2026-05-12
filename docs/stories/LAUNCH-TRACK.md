# DoceGestar — Launch Track

## Pesquisa de Mercado (Sessão G-1)
**Data:** 2026-04-14  
**Conduzida por:** GESTOR (agente CEO)

---

## Apps Analisados

| App | Origem | Downloads | Rating |
|-----|--------|-----------|--------|
| Gravidez+ (Philips) | Global | 50-80M | ⭐⭐⭐⭐⭐ |
| BabyCenter | Global (BR desde 2008) | Líder BR | ⭐⭐⭐⭐⭐ |
| Ovia Pregnancy | Global | 10M+ | ⭐⭐⭐⭐ |
| Sprout Pregnancy | Global | 5M+ | ⭐⭐⭐⭐ |
| Canguru Gravidez | Brasil | Nacional | ⭐⭐⭐⭐ |

---

## Features TOP 5 (presentes em TODOS os apps líderes)

1. **Acompanhamento semana a semana** — desenvolvimento fetal detalhado por semana
2. **Comparação de tamanho do bebê** — frutas, objetos ou animais para visualização
3. **Contador de kicks + Timer de contrações** — ferramentas de monitoramento fetal
4. **Rastreamento de sintomas / bem-estar** — log de como a mãe está se sentindo
5. **Dicas e informações personalizadas** — conteúdo relevante por semana gestacional

---

## Diferenciais dos Melhores Apps

| Diferencial | Apps | Complexidade | Para DoceGestar |
|-------------|------|--------------|-----------------|
| Visualização 3D fetal | Gravidez+, Sprout | Alta | Pós-launch |
| Comunidade de mães | BabyCenter, Canguru | Alta (backend) | Pós-launch |
| Chat com profissional | Canguru | Alta (backend+plano) | Pós-launch |
| Lembretes/Notificações | Todos | Média | **v1 — obrigatório** |
| Galeria fotos da barriga | BabyCenter, Gravidez+ | Baixa | Desejável v1 |
| Agenda de consultas | Canguru | Média | **v1 — obrigatório** |
| Rastreamento de peso | Ovia, Gravidez+ | Baixa | Pós-launch |
| Busca de nomes de bebê | BabyCenter | Baixa | Pós-launch |
| Suporte pós-parto | Ovia | Alta | Pós-launch |

---

## MVP Feature Set — Decisão do GESTOR

### OBRIGATÓRIO para lançar (bloqueia publicação)

| Feature | Status DoceGestar | Sessão |
|---------|------------------|--------|
| Acompanhamento semana a semana | ✅ BUILT | — |
| Comparação de tamanho do bebê | ✅ BUILT (cards swipeáveis) | — |
| Kick Counter | ✅ BUILT (ferramentas) | — |
| Timer de contrações | ✅ BUILT (ferramentas) | — |
| Tracker de sintomas visual | ✅ BUILT | — |
| Dicas diárias por semana | ✅ BUILT | — |
| Timeline 40 semanas | ✅ BUILT | — |
| Onboarding completo (nome, DPP, tipo, etc.) | ✅ BUILT | — |
| Redesign visual completo (Ferramentas + Config) | ⏳ M.4 NEXT | G-3 |
| Notificações básicas (lembretes de consultas) | ✅ BUILT | G-4 ✅ |

### DESEJÁVEL para v1 (não bloqueia publicação)

| Feature | Status DoceGestar | Notas |
|---------|------------------|-------|
| Fotos da barriga (Momento Especial) | ⚠️ BASE BUILT | Story 2.2 tem expo-image-picker |
| Notificações de marcos gestacionais | ❌ MISSING | Epic 3.4 |

### PÓS-LANÇAMENTO (não bloqueia — backlog)

- Rastreamento de peso
- Comunidade/fórum de mães
- Chat com profissional de saúde
- Visualização 3D fetal
- Busca de nomes de bebê
- Segurança alimentar e medicamentos
- Suporte pós-parto (módulo pós-nascimento)
- Agendamento automático de exames por trimestre
- Notificações de agendamento local (Epic 3.2 completo)

---

## Auditoria de Features — G-2 (2026-04-14)

**Conduzida por:** GESTOR  
**Resultado:** 9/11 features PASS — 2 MISSING (previstas)

### Resultado por Feature MVP

| # | Feature MVP | Status | Arquivo | Observações |
|---|-------------|--------|---------|-------------|
| 1 | Acompanhamento semana a semana | ✅ PASS | `app/(tabs)/semana.tsx` + `WeekCard.tsx` | WeekCard completo com dados das 40 semanas |
| 2 | Comparação de tamanho do bebê | ✅ PASS | `WeekCard.tsx` + `dashboard.tsx` | `comparison` + `sizeCm` + `weightG` exibidos em card swipeável |
| 3 | Kick Counter | ✅ PASS | `app/(tabs)/ferramentas.tsx` | Start/stop/count + histórico 5 sessões + SQLite + vibração |
| 4 | Timer de contrações | ✅ PASS | `app/(tabs)/ferramentas.tsx` | Duração + intervalo + intensidade + detecção 3-1-1 + SQLite |
| 5 | Tracker de sintomas visual | ✅ PASS | `app/(tabs)/ferramentas.tsx` | Checkboxes por semana + gráfico de barras 4 semanas |
| 6 | Dicas diárias por semana | ✅ PASS | `WeekCard.tsx` | `DAILY_TIPS` com categorias (sono, alimentação, movimento, emocional) |
| 7 | Timeline 40 semanas | ✅ PASS | `app/(tabs)/timeline.tsx` | 3 trimestres, semana atual destacada, completadas com ✓ |
| 8 | Onboarding 5 steps | ✅ PASS | `app/onboarding.tsx` | Nome, DPP, tipo gestação, primeiro filho, nome bebê + persiste SQLite |
| 9 | Redesign visual M.1-M.3 | ✅ PASS | Todas as telas | Paleta magenta #b30064 + teal #00637f aplicada |
| 10 | Redesign M.4 (Ferramentas+Config) | ✅ PASS | `ferramentas.tsx`, `config.tsx` | LinearGradient kickBtn + primaryBtns; glassmorphism; focus inputs — commit 2aa572f |
| 11 | Notificações básicas (consultas) | ✅ PASS | `useNotifications.ts`, `usePrenatalAppointments.ts`, `config.tsx`, `ferramentas.tsx` | expo-notifications + CRUD consultas + lembretes agendáveis |

### Gaps de UX identificados (não bloqueiam MVP)

| Gap | Localização | Severidade | Ação |
|-----|-------------|------------|------|
| Config mostra só nome+DPP — outros campos do onboarding não editáveis | `config.tsx` | Baixa | Adicionar em M.4 ou pós-launch |
| KickCounter: botão sem gradiente (só cor sólida) | `ferramentas.tsx` | Baixa | Resolver em M.4 |
| Share button usa cor sólida (pode ter gradiente para mais destaque) | `dashboard.tsx` | Cosmético | Opcional em M.4 |

### Features built não-MVP (candidatas a simplificar)

**Nenhuma feature built está fora do MVP.** Tudo que foi desenvolvido é funcional e agrega valor. Momento Especial (foto da barriga) está como "DESEJÁVEL" — mantido.

### Decisão de cortes

**NENHUM CORTE NECESSÁRIO.** O DoceGestar está em boa forma funcional. As 2 pendências (M.4 + notificações) já eram previstas no plano.

---

## Status de Auditoria: CONCLUÍDA (2026-04-14)

---

## Sessões Planejadas

| Sessão | Objetivo | Status | Agentes |
|--------|----------|--------|---------|
| G-0 | Criar GESTOR + pivô de objetivo | ✅ Concluído (2026-04-14) | — |
| G-1 | Pesquisa de mercado BR + definir MVP | ✅ Concluído (2026-04-14) | GESTOR + WebSearch |
| G-2 | Auditoria features built vs. MVP + cortes | ✅ Concluído (2026-04-14) — 11/11 PASS | GESTOR + @dev |
| G-3 | Story M.4 — Redesign Ferramentas + Config | ✅ Concluído (2026-04-14) — commit 2aa572f | @sm → @po → @dev → @qa → @devops |
| G-4 | Epic 3 minimal — Notificações consultas (3.1 + 3.2 + 3.3) | ✅ Concluído (2026-04-14) — commits 88e7070, 46a4cfd, 852487e | @po → @dev → @qa → @devops |
| G-5 | Play Store setup — conta Google Play + EAS Build Android | ✅ Concluído (2026-04-19) — APK gerado, build `5f8dddbe` PASS | @devops |
| G-5.5 | Ajustes pós-APK — bugs B1–B6 + Enriquecimento S16 | ✅ Concluído (2026-04-29) — commit feb38af | @dev |
| G-6 | Store listing — screenshots + descrição + privacy policy | ✅ Concluído (2026-04-25) | @ux-design-expert + @dev |
| Sprint 1-B | Animated Baby/Fruit Comparison | ✅ Concluído (2026-04-30) — commit 0a9d088 | @dev |
| Sprint 1-C | Daily Streak Counter | ✅ Concluído (sessão anterior) — commit 679f07e | @dev |
| Sprint 1-D | Contextual Push Notifications | ✅ Concluído (2026-04-30) — commit ed60d73 | @sm → @po → @dev → @qa → @devops |
| Sprint 1-E | Modular Feed / Home Scroll | ✅ Concluído (2026-04-30) — commit a9a2f1e | @sm → @po → @dev → @qa → @devops |
| Web Fix | Resolver tslib bundling em `npm run web` | ✅ Concluído (2026-05-02) — commit 7648343 | @dev + @devops |
| Assets v2 | Substituir ícones do app por logo Paleta v2 (pink) | ✅ Concluído (2026-05-02) — commit 82b689f | Manus IA + @devops |
| Sprint 1-F | FAB Quick-Log (Rank 6 Priority Matrix) | ✅ Concluído (2026-05-02) — commit 54d181f | @dev |
| N.1 | Reestruturação menu 5→4 tabs (Início, Explorar, Ferramentas, Perfil) | ✅ Concluído (2026-05-03) — commit 7173fe8 | @dev → @qa → @devops |
| RF.1 | Refatoração Front-End — feed moderno, remover revista, padronizar visual | ✅ **Concluído (2026-05-07)** — typecheck ✅, bundle ✅, push `2f710fe` | @sm ✅ → @po ✅ → @ux ✅ → @architect ✅ → @dev ✅ → @qa ✅ → @devops ✅ |
| PRD v2.0 | Atualização completa do Master System Document | ✅ **Concluído (2026-05-07)** — commits `79b7f9a` e `b846766` | GESTOR |
| EAS Builds | APK preview + AAB production gerados com código RF.1 | ✅ **Concluído (2026-05-07)** — APK `b9f6758c`, AAB `19b2a74c` | @devops |
| ONB-1 | Migration + Schema (relationship, plan, plan_expires_at) | ✅ **Concluído (2026-05-07)** — commit c92203e | @sm ✅ → @po ✅ → @dev ✅ → @qa ✅ → @devops ✅ |
| ONB-2 | Date Utils — Naegele DPP + jest setup | ✅ **Concluído (2026-05-08)** — commit `4cbf69a`, 10/10 testes PASS | @sm ✅ → @po ✅ → @dev ✅ → @qa ✅ → @devops ✅ |
| ONB-3 | 6 Componentes UI Base (`src/components/ui/`) | ✅ **Concluído (2026-05-08)** — commit `15587ab`, typecheck + bundle PASS | @sm ✅ → @po ✅ → @dev ✅ → @qa ✅ → @devops ✅ |
| ONB-4 + ONB-5 | BottomSheet + GestationCounter + Context (Sessão 2) | ✅ **Concluído (2026-05-08)** — commits `155363d`, `616d843` | @sm ✅ → @po ✅ → @dev ✅ → @qa ✅ → @devops ✅ |
| ONB-6 + ONB-7 | Welcome + Profile (Sessão 3) | ✅ **Concluído (2026-05-08)** — commit `4dbe76c`, typecheck ✅, push ✅ | @sm ✅ → @po ✅ → @dev ✅ → @qa ✅ → @devops ✅ |
| ONB-8 + ONB-9 | DueDate + Modal Parabéns (Sessão 4) | ✅ **Concluído (2026-05-08)** — commit `efc7b31`, typecheck ✅, 10/10 testes ✅, push ✅ | @sm ✅ → @po ✅ → @dev ✅ → @qa ✅ → @devops ✅ |
| ONB-10 | Plans stub (Sessão 5) | ✅ **Concluído (2026-05-08)** — commit `405db51`, typecheck ✅, push ✅ | @sm ✅ → @po ✅ → @dev ✅ → @qa ✅ → @devops ✅ |
| ONB-11 + ONB-12 | Gate + Dashboard + QA Gate completo (Sessão 6) | ✅ **Concluído (2026-05-08)** — commit `7837478`, typecheck ✅, 10/10 testes ✅, 7/7 cenários ✅, push ✅ | @sm ✅ → @po ✅ → @dev ✅ → @qa ✅ → @devops ✅ |
| R.1 + R.2 | Feed: checklist persistence + pergunta "Já refleti" | ✅ **Concluído (2026-05-08)** — commit `780e4d3`, typecheck ✅, bundle ✅ | @dev ✅ → @qa ✅ → @devops ✅ |
| R.3 | Feed: Hero card (abertura narrativa) | ✅ **Concluído (2026-05-08)** — commit `8aa2acf`, typecheck ✅, bundle ✅ | @dev ✅ → @qa ✅ → @devops ✅ |
| R.4 | Feed: WeekPeekCard → Explorar + QA Gate completo | ✅ **Concluído (2026-05-08)** — commit `b7c76fe`, QA Gate R.1–R.4 PASS | @dev ✅ → @qa ✅ → @devops ✅ |
| C-0 | Criar reference doc semana_01.md (15 cards, formato validado) | ✅ **Concluído (2026-05-08)** — `docs/docs_40_semanas/reference/semana_01.md`, Pipeline P1.0 [x] | GESTOR |
| C-1 | Implementar semana 1 + semana 18 no app com campos enriquecidos (milestones, symptoms, weeklyChecklist, warningSignals) | ✅ **Concluído (2026-05-09)** — typecheck PASS | @dev |
| C-2 | semana_02: reference doc (15 cards) + implementar no app (ovulação, fecundação, zigoto) | ✅ **Concluído (2026-05-10)** — commit `3f75d16`, typecheck PASS, push ✅ | GESTOR + @dev + @devops |
| C-3 | semana_03: reference doc (15 cards) + implementar no app (implantação, nidação, beta-hCG) + preview aprovado | ✅ **Concluído (2026-05-10)** — commit `98df709`, preview `semana_03.html` ✅ | GESTOR + @dev + @devops |
| G-7 | Publicação — EAS Build production (AAB) + eas submit Play Store | ⏸️ **Suspenso** — aguardando conteúdo 40 semanas completo | @devops |

**Plano técnico ONB-2–12:** `C:\Users\USUARIO\.claude\plans\me-mostre-o-plano-cached-ocean.md` — 6 sessões, arquitetura multi-route, todos os arquivos e abordagens
**Esboço do plano:** `docs/plans/onboarding-feed-esboço.md`
**Spec Onboarding v2.1:** `docs/master/onboarding_spec_v2.md`
**Plano RF.1 técnico:** `docs/plans/refatoracao-frontend.md` — 9 etapas, 3 deletions, 6 refatorações, 0 novos arquivos.
**Plano RF.1 execução squad:** `docs/plans/RF.1-execucao-squad.md` — runbook detalhado por agente (paths absolutos, edits literais, comandos PASS/FAIL, atribuição Haiku/Sonnet por subtarefa).

---

## G-5 — Progresso Detalhado (2026-04-18)

### O que foi feito nesta sessão

| Etapa | Status | Detalhe |
|-------|--------|---------|
| Conta Expo criada | ✅ | `@eusourafael` via Google OAuth em expo.dev |
| `eas login` | ✅ | Autenticado com `contatorafaeleleoterio@gmail.com` |
| `eas build:configure` | ✅ | Projeto `@eusourafael/doce-gestar` criado no EAS |
| `projectId` em `app.json` | ✅ | `9890d16e-0012-42b7-a29d-1c3adb521f56` (commit cd9147f) |
| Keystore Android | ✅ | Gerada automaticamente nos servidores Expo |
| `eas build --platform android --profile preview` | ❌ | Gradle build failed (2 tentativas) |

### Blocker — Gradle Build Failure

**Erro:** `Gradle build failed with unknown error`  
**Fase:** "Run gradlew"  
**Build IDs falhados:**
- `ebe0577b-fea4-40c5-b2fc-2bfadcc71658` (tentativa 1 — com monochromeImage)
- `59e52cca-8ec4-4ed5-8436-db07a7e42ea6` (tentativa 2 — sem monochromeImage, favicon restaurado)

**Fixes já tentados:**
- ✅ Removido `monochromeImage` do adaptive icon (poderia causar conflito com minSdkVersion)
- ✅ Restaurado `assets/favicon.png` que havia sido deletado (referenciado em `app.json`)

**Causa raiz:** Desconhecida — log da fase "Run gradlew" não acessível sem autenticação no browser.  
**Próximo passo diagnóstico:** Ver log completo em:
```
expo.dev/accounts/eusourafael/projects/doce-gestar/builds/59e52cca-8ec4-4ed5-8436-db07a7e42ea6
```
Clicar na fase **"Run gradlew"** e copiar o erro exato.

**Hipóteses em aberto:**
1. `expo-notifications` requer configuração adicional no Android (google-services.json?)
2. Incompatibilidade de versão de pacote nativo com Expo SDK 55
3. Permissão `RECORD_AUDIO` no `app.json` sem uso real no app — candidata a remover

---

## G-5.5 — Ajustes Pós-APK / Product Improvement (2026-04-22)

**Status:** 🟡 Em andamento — spec recebida, bugs sendo corrigidos em sequência

### Contexto

Rafael entregou spec completa de melhoria do produto: `C:\Users\USUARIO\Downloads\docegestar-claude-code.md`  
Sequência obrigatória: **Bugs (B1–B6) → Sprint 1 Features → Sprint 2 Features**  
Rastreamento completo em: `docs/bugs/BUG-TRACK.md`

### Status dos Bugs

| # | Bug | Status |
|---|-----|--------|
| B1 | Date field sem máscara DD/MM/AAAA | ✅ Done |
| B2 | Checkboxes sem estado visual selecionado | ✅ Done |
| B3 | Barra trimestre sem label explícita do trimestre | ✅ Done — `WeekCard.tsx:247` |
| B4 | Botão "Salvar" cortado em Momento Especial | ⏳ Próximo |
| B5 | Gráfico "Últimas 4 semanas": zeros sem labels | ⏳ Pendente |
| B6 | Nav inferior sem badge/indicador por aba | ⏳ Pendente |

### Próxima Ação (retomar aqui)

**B4** — Botão "Salvar" cortado (overflow) em Momento Especial.  
Arquivo: `src/components/WeekCard.tsx` — seção Momento Especial / `handleSaveMoment`.  
Fix: padding/safe-area + testar 375px / 390px / 428px.

### Após B6 concluído

Iniciar **Sprint 1 de Features** na ordem da Priority Matrix (seção 6 do spec):
1. Daily Streak Counter (D)
2. Animated Baby/Fruit Comparison (B)
3. Contextual Push (E)
4. Modular Feed / Home Scroll (A)
5. FAB Quick-Log (C)

---

## Landing Page — docegestar.com.br

| Item | Status |
|------|--------|
| `landing/index.html` (8 seções, zero JS, mobile-first) | ✅ Concluído — commit b9bda97 |
| Cloudflare Pages root dir: `dist` → `landing` | ⏳ Pendente (ação manual) |
| `landing/privacidade.html` | ⏳ G-6 |

---

## Conclusão da Análise

**O DoceGestar já possui as 5 features fundamentais presentes em TODOS os apps líderes.** A vantagem competitiva para o mercado BR:

1. **Conteúdo 100% em português brasileiro** (nativo, não traduzido)
2. **Design moderno** com glassmorphism e paleta magenta+teal (diferenciado visualmente)
3. **Ferramentas práticas** completas: Kick Counter + Timer de Contrações juntos
4. **Onboarding personalizado** com nome do bebê, tipo de gestação, primeiro filho
5. **Share nativo** do banner semanal — viral sharing de marcos

**Principal gap:** Ausência de notificações locais (Epic 3 mínimo: 3.1 + 3.3).  
**Próximo passo:** G-2 — auditoria detalhada para confirmar qualidade do que está built antes do lançamento.

---

---

## Content Track — Conteúdo Editorial das 40 Semanas

**Decisão (2026-05-07):** O conteúdo atual em `src/data/weeks/*.ts` tem informações genéricas e algumas incorretas. Para um app de saúde, precisão é inegociável. Estratégia aprovada: gerar, testar e implementar **uma semana por vez**, validando cada uma antes de avançar.

**Pipeline de referência:** `docs/docs_40_semanas/Content Pipeline — Protocol v2.0.md`
**Estrutura de capítulos:** `docs/docs_40_semanas/arquitetura_sequencia_capitulos.md`

### Como funciona o fluxo

```
1. Criar documento base da semana (Markdown)
2. Implementar no app (src/data/weeks/*.ts)
3. Testar visualmente no app
4. Aprovar → próxima semana
```

### Status do Content Track

| Sessão | Objetivo | Status |
|--------|----------|--------|
| C-0 | Criar documento de referência: `semana_01.md` — conteúdo base da semana 1 | ✅ **Concluído (2026-05-08)** — 15 cards, formato validado |
| C-1 | Implementar semana_01 no app + validar visualmente | ✅ **Concluído (2026-05-09)** — semana 1 + semana 18 enriquecidas, typecheck PASS |
| C-2 | semana_02: criar + implementar + validar | ✅ **Concluído (2026-05-10)** — commit `3f75d16`, preview aprovado |
| B8 | Bug: semana gestacional errada no GestationCounter compact | ✅ **Concluído (2026-05-10)** — commit `4abad97`, 18/18 testes PASS |
| C-3 | semana_03: criar + implementar + validar | ✅ **Concluído (2026-05-10)** — commit `98df709`, preview aprovado |
| C-4 | semana_04: criar + implementar + validar | ✅ **Concluído (2026-05-10)** — commit `6bea69a`, preview aprovado |
| C-5 | semana_05: criar + implementar + validar | ✅ **Concluído (2026-05-10)** — commit `6aa6d9d`, preview aprovado |
| C-18 | semana_18: corrigir dados + gerar preview | ✅ **Concluído (2026-05-10)** — commit `df53e37`, preview gerado |
| C-6 | semana_06: criar + implementar + validar | ✅ **Concluído (2026-05-12)** — commit `a441a43`, preview `semana_06.html` gerado |
| ... | semanas 07–17, 19–40: repetir padrão | ⏳ |

> **Nota:** Cada sessão cobre 1 semana completa (criar → implementar → validar). Estimativa: 40 sessões para conteúdo completo. Sessões podem ser agrupadas quando o padrão estiver consolidado.

---

## Tarefas Suspensas

> Tarefas aqui não aparecem no briefing do GESTOR. Ao final dos planos ativos, o GESTOR as traz de volta para decisão: **retomar ou deletar**.

| Tarefa | Motivo da Suspensão | Data | Agente |
|--------|---------------------|------|--------|
| G-7 — Publicação (eas build + eas submit --platform android) | Conteúdo das 40 semanas incompleto — publicar somente após todo conteúdo pronto | 2026-05-09 | @devops |
