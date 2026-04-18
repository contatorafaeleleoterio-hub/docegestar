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
| G-5 | Play Store setup — conta Google Play + EAS Build Android | ⏳ Em andamento (2026-04-18) — conta criada, eas.json configurado (commit 00b9faf), aguardando `eas login` + build | @devops |
| G-6 | Store listing — screenshots + descrição + privacy policy | ⏳ | @ux-design-expert + @dev |
| G-7 | Publicação — submit para revisão | ⏳ | @devops |

**Estimativa total:** 3 sessões restantes para publicação na Google Play Store (G-5 parcial + G-6 + G-7).

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
