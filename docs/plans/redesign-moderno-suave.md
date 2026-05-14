# Redesign Moderno Suave — Plano Simplificado

**Fonte de verdade:** `docs/design_system/_archived/design_handoff_docegestar/`
**Status:** ⏳ Em execução — substitui DR-1..6 (descartado)
**Data:** 2026-05-14

## Princípio

Cada sessão entrega 1 ou mais telas **estruturalmente** alinhadas ao protótipo JSX. Reescrever do zero quando o gap for grande — não tentar editar telas antigas.

## 7 Sessões

| # | Sessão | Telas | Origem JSX | Tipo |
|---|--------|-------|------------|------|
| RD-1 | Fundação + Home | Tab bar 5-tabs + Hoje | `direction-b-1.jsx::HomeB` + `TabBarB` | refazer |
| RD-2 | Tracking | Bebê semanal + Saúde da mãe | `direction-b-2.jsx::BabyWeekB` + `HealthB` | refazer + nova |
| RD-3 | Pessoal | Diário + Eu/Perfil | `direction-b-2.jsx::DiaryB` + `direction-b-3.jsx::ProfileB` | nova + refazer |
| RD-4 | Entrada/Conversão | Onboarding + Login + Paywall | `direction-b-1.jsx::OnboardingB,LoginB` + `direction-b-3.jsx::PremiumB` | refazer + nova + refazer |
| RD-5 | Preparação | Plano de Parto + Enxoval | `direction-b-4.jsx::BirthPlanB,NurseryB` | novas |
| RD-6 | Clínico | Agenda + Chutes + Vitaminas + Exames | `direction-b-3.jsx::AppointmentsB,KickCounterB,MedsB` + `direction-b-4.jsx::ExamsB` | refazer + novas |
| RD-7 | Plus | Chat + Álbum + Artigo | `direction-b-4.jsx::ChatB,AlbumB,ArticleB` | novas |

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
