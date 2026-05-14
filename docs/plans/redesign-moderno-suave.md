# Redesign Moderno Suave — Plano Simplificado

**Fonte de verdade VISUAL:** `docs/design_system/_archived/design_handoff_docegestar/` (apenas como referência estética — IA segue o Master Doc)
**Fonte de verdade IA/PRODUTO:** `docs/master/01-MASTER-SYSTEM-DOCUMENT.md` §6 — **4 abas canônicas**
**Status:** ⏳ Em execução — substitui DR-1..6 (descartado)
**Data:** 2026-05-14

## Princípio

Cada sessão entrega 1 ou mais telas **estruturalmente** alinhadas à IA canônica do Master Doc (4 abas), com estética inspirada nos protótipos JSX. Os JSX servem como referência **estética**, NÃO como cópia literal de estrutura ou navegação.

## IA Canônica (Master Doc §6)

| # | Aba | Conteúdo principal |
|---|-----|--------------------|
| 1 | **Início** (`dashboard.tsx`) | Hero week card + Bebê hoje + CTAs para Explorar/Ferramentas |
| 2 | **Explorar** (`explorar.tsx`) | Feed semanal com conteúdo editorial (R.1-R.4 done) |
| 3 | **Ferramentas** (`ferramentas.tsx`) | Kick Counter, Contrações, Consultas, Sintomas (M.4 done) |
| 4 | **Perfil** (`perfil.tsx`) | Dados pessoais + notificações + reset |

> **Rotas secundárias acessadas via Dashboard/Stack:** `bebe.tsx` (detalhe semanal do bebê com SVG circle), `saude.tsx` (placeholder → Ferramentas), `diario.tsx` (stub RD-3).

## Sessões

| # | Sessão | Telas | Status |
|---|--------|-------|--------|
| RD-1 | Fundação + Home | Tab bar 5-tabs + Hoje | ✅ Visual ok, mas **divergiu da IA canônica** |
| RD-2 | Tracking | Bebê semanal + Saúde da mãe | ✅ Visuais ok, métricas mock removidas no RD-Correct |
| **RD-Correct** | **Realinhamento IA** | **Tab bar 4-abas + trim mock data + CTAs reais no Dashboard** | ⏳ **Esta sessão (2026-05-14)** |
| RD-3 | Pessoal | Diário + Eu/Perfil refit visual | ⏳ Próxima |
| RD-4 | Entrada/Conversão | Onboarding + Login + Paywall | Pendente |
| RD-5 | Preparação | Plano de Parto + Enxoval | Pendente |
| RD-6 | Clínico | Agenda + Chutes + Vitaminas + Exames | Pendente |
| RD-7 | Plus | Chat + Álbum + Artigo | Pendente |

## Regras de Execução

1. **Reescrever** quando a estrutura difere → não editar
2. **Verificação visual obrigatória** ao final de cada sessão (npm run web → user confirma)
3. **1 commit por sessão** com mensagem `feat(rd-N): <telas>`
4. **typecheck deve passar** (zero novos erros vs baseline)
5. **Tokens canônicos** já existem em `src/theme/` — usar sempre

## Tokens-chave (referência rápida)

| Token | Valor | Uso |
|-------|-------|-----|
| `pink500` | `#EC3779` | CTA, ativos |
| `pink400→pink600` | gradient | hero card |
| `ink` | `#1F1A2E` | tab bar bg, texto principal |
| `bg` | `#FBF7FA` | app background |
| `lav100`, `lav200` | lavanda | acentos secundários |

## Componentes a Criar (reutilizáveis)

- `HeroWeekCard` — pink gradient com display 56px (Home + Bebê)
- `BabyTodayCard` — card "Seu bebê hoje" com gradient quadrado lav→pink
- `CareCard` + `CareRow` — 3 cards horizontais de cuidados
- `TabBar5` — ink bg, pill ativa pink500, 5 tabs
- `MoodPicker` — emojis → ícones (Diário)
- `MetricCard` — métricas 2×2 (Saúde)
- `WeightChart` — sparkline SVG (Saúde)
- `SectionCard` — item de seção com check (Plano de Parto, Enxoval)

## Docs Desalinhadas — Ação

| Arquivo | Ação | Motivo |
|---------|------|--------|
| `docs/plans/design-system-migration.md` | Mover para `_archived/` | DS-1..6 concluído, plano stale |
| `docs/plans/onboarding-feed-esboço.md` | Mover para `_archived/` | Onboarding será refeito em RD-4 |
| `docs/plans/sessao-1-onb-2-onb-3.md` | Mover para `_archived/` | Sessões ONB obsoletas |
| `docs/plans/refatoracao-frontend.md` | Mover para `_archived/` | RF.1 concluído |
| `docs/plans/R1-R4-feed-nativo.md` | Mover para `_archived/` | R.1..R.4 concluído |
| `docs/plans/cowork-revista-feed.md` | Mover para `_archived/` | Revista pivotou para feed (R.x done) |
| `docs/plans/fix-dpp-bug-and-design-system-replication.md` | Mover para `_archived/` | Fix aplicado, DS replicada |
| `docs/plans/RF.1-execucao-squad.md` | Mover para `_archived/` | RF.1 concluído |
| `docs/stories/LAUNCH-TRACK.md` | Atualizar — adicionar seção RD, mover DR para "Cancelado" | DR substituído por RD |

## Próximos Passos

1. ✅ Arquivar planos obsoletos
2. ✅ Atualizar LAUNCH-TRACK
3. ⏳ **Iniciar RD-1** (Tab bar 5 + Home)
