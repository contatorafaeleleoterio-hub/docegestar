# SESSION_HANDOFF — DoceGestar | 2026-05-21 (B)

## Story Ativa
- **ID:** UR-S3-PLAN (planejamento) → próxima execução = UR-S3
- **Título:** Reorganização Início ↔ Explorar — plano detalhado
- **Status:** Plano Done; execução pendente
- **Arquivo:** `docs/plans/pendentes/ur-s3-reorganizacao-inicio-explorar.md`

## O que foi implementado nesta sessão
- `docs/plans/pendentes/ur-s3-reorganizacao-inicio-explorar.md` — plano completo UR-S3 (contexto, escopo IN/OUT, implementação por arquivo, riscos, verificação E2E)
- `memory/pending_plan_ur_s3.md` — pointer + decisões aprovadas
- `memory/MEMORY.md` — entrada nova no index
- `memory/project_status.md` — sessão 2026-05-21 (B) registrada
- `docs/stories/LAUNCH-TRACK.md` — linha UR-S3-PLAN ✅ + UR-S3 reformulada

## Decisões aprovadas (críticas para execução)
1. **Conteúdo da semana no Início = FeedSnap embutido** — refatorar raiz do `dashboard.tsx` de `ScrollView` para `FlatList` com `ListHeaderComponent` (header = topo atual; data = `buildWeeklyFeed`). Evita warning `VirtualizedLists nested in ScrollView`.
2. **Nova Explorar = hub Biblioteca Plus** — 3 cards (Álbum, Artigo, Chat) → `router.push('/album'|'/article'|'/chat')`. Rotas root já existem (RD-7).
3. **Remover CTA "Conteúdo da semana"** do dashboard.
4. `WeekCard.tsx` (980L) e rotas hidden (`bebe`, `saude`, `diario`) intocadas.
5. Reusos obrigatórios: `buildWeeklyFeed`, `CardShell`, `NoteSheet`, `useFeedDimensions`, `useCardMeta`, `useCurrentWeek`, `useWeekData`, `useBottomSpacing`.

## Próxima ação ao retomar
Rodar `/gestor` → executar UR-S3:
1. @po valida story (10-point checklist)
2. @dev em 2 trilhas paralelas: (A) refator `dashboard.tsx`; (B) reescrita `explorar.tsx`
3. @qa typecheck baseline 15 + smoke 4 abas + 3 rotas Plus
4. @devops commit + push

## Arquivos a tocar na execução
| Arquivo | Status |
|---------|--------|
| `app/(tabs)/dashboard.tsx` | ⏳ refator ScrollView→FlatList+ListHeader, remover CTA Conteúdo da semana |
| `app/(tabs)/explorar.tsx` | ⏳ reescrita completa como hub Plus |

## Cota EAS
Continua zerada até 2026-06-01. Validação UR-S3 = `npm run web`. Build G-7 = 2026-06-01.
