# RF.1 — Plano Técnico Detalhado com Divisão por Agente da Squad AIOX

**Data:** 2026-05-06
**Plano original:** `docs/plans/refatoracao-frontend.md` (aprovado em 2026-05-05)
**Orquestrador:** GESTOR (DoceGestar)
**Workflow aplicado:** Story Development Cycle (SDC)
**Modelo-alvo da execução:** `claude-haiku-4-5-20251001` em etapas mecânicas (instruções cirúrgicas), `claude-sonnet-4-6` em etapas de lógica/refactor

---

## Context

O plano RF.1 foi escrito como documento de alto nível, sem instruções tecnicamente executáveis por agente. Quando uma etapa cair na sessão de um modelo Haiku (sem contexto da sessão atual), ele precisa de:

1. **Path absoluto** dos arquivos a tocar.
2. **Line numbers** dos blocos a alterar.
3. **Texto exato (old → new)** para Edit/Replace.
4. **Comando de validação** após cada bloco.
5. **Critério de aceite binário** (PASS/FAIL determinístico).

Esta revisão converte o plano em runbook executável. As 9 etapas técnicas continuam, mas agora cada uma é auto-contida.

---

## Auditoria do Plano Original — achados

| # | Achado | Severidade | Ação |
|---|--------|------------|------|
| A1 | Sem story file em `docs/stories/` (`RF.1.story.md`) | Alta | @sm cria antes da execução |
| A2 | Plano não cita validação 10-pontos do @po | Alta | @po valida antes do @dev |
| A3 | Sugestão de rename `RevistaCard.tsx`→`FeedCard.tsx` ficou ambígua | Média | **Decisão:** rename FORA de escopo (refactor separado) |
| A4 | Tokens citados no plano (`primaryTint`, `errorContainer`, `shadows.editorial`) — ✅ todos existem em `src/theme/colors.ts` (verificado) | OK | Sem ação |
| A5 | Etapa 1 (timeline) é trabalho substantivo, não cosmético | Média | @qa valida visualmente |
| A6 | Plano não menciona validação Web Preview (último bug crítico) | Baixa | @qa testa `npx expo export --platform web` |
| A7 | Card "Registro rápido" é remoção de feature visível | Baixa | @po confirma na validação |
| A8 | Cores hardcoded `#FFE5E5`/`#E5F5E5` em `RevistaCard.tsx` L485, L494 → `colors.errorContainer` existe (`#FEE2E2`); falta token verde — **adicionar `successContainer: '#DCFCE7'`** ao theme | Média | @ux-design-expert adiciona token na Fase 3 |
| A9 | `revistaAdapter.ts` usa caracteres acentuados em chave (`bebê`, `você`, `nutrição`, `ação`) — funciona em TS, mas vale documentar | Baixa | Comentar no rename |
| A10 | `dashboard.tsx` L208 usa `<WeekPeekCard>` mas plano diz "rebrand WeekPeekCard" — confirmado, componente é separado | OK | — |

---

## Tokens validados em `src/theme/colors.ts` (referência rápida)

| Token | Valor | Uso |
|-------|-------|-----|
| `colors.primary` | `#DB2777` | Acento principal |
| `colors.primaryDeep` | `#9D174D` | Estado pressed, gradiente |
| `colors.primaryLight` | `#FCE7F3` | Background suave |
| `colors.primaryTint` | `#FFF5FA` | Tint ultra-suave |
| `colors.surface` | `#FFFFFF` | Card padrão |
| `colors.errorContainer` | `#FEE2E2` | Substitui `#FFE5E5` |
| **NOVO `colors.successContainer`** | `#DCFCE7` | Substitui `#E5F5E5` (a adicionar na Fase 3) |
| `colors.text` / `textSecondary` | `#111827` / `#6B7280` | Tipografia |
| `shadows.editorial` | (export do tema) | Sombra padrão |

`borderRadius` disponíveis (de `borderRadius.ts`): `xl`, `lg`, `pill`, `full`. Usar **literal `20`** quando o plano pedir card padrão (mais explícito do que `borderRadius.xl`).

---

## Workflow SDC — Pipeline por Agente

```
Fase 1: @sm    → cria RF.1.story.md (Draft)
Fase 2: @po    → validate 10-pontos       ┐
Fase 3: @ux    → adiciona successContainer ├─ paralelo
Fase 4: @arch  → grep imports órfãos       ┘
Fase 5: @dev   → executa 9 etapas (3 commits)
Fase 6: @qa    → QA Gate (typecheck + visual + web bundle)
Fase 7: @devops → git push
Fase 8: GESTOR → Protocolo Final
```

---

## Fase 1 — `@sm` (River) — Criação da Story

**Comando AIOX:** `*create-story` em modo Pre-Flight com base em `docs/plans/refatoracao-frontend.md`.

**Output esperado:** `docs/stories/RF.1.story.md`.

**Conteúdo do story file (template):**

```markdown
# Story RF.1 — Refatoração Front-End: feed moderno, sem revista

**Status:** Draft
**Epic:** Refatoração / UX Polish
**Estimate:** 8 pts
**Created:** 2026-05-06
**Author:** @sm (River)

## Description
Realinhar o front-end do app DoceGestar ao conceito original: **feed moderno e dinâmico**.
Remover camadas de linguagem editorial ("revista", "capítulos", "abertura/fechamento"),
deletar 3 arquivos órfãos em `app/(tabs)/`, padronizar card style entre telas e remover
redundâncias visuais (título duplicado no dashboard, card "Registro rápido" duplicado com FAB).

## Acceptance Criteria

1. **GIVEN** o app rodando, **WHEN** o usuário acessar Início, **THEN** não verá título
   "DoceGestar" duplicado dentro do scroll (apenas no header da tab bar).
2. **GIVEN** o app rodando, **WHEN** o usuário acessar Explorar, **THEN** nenhum card
   exibirá badge de capítulo (`Abertura`, `Bebê`, `Você`, `Nutrição`, `Ação Prática`,
   `Psicologia`, `Mito vs. Fato`, `Fechamento`) e o header dirá "Sua Semana".
3. **GIVEN** `app/(tabs)/`, **THEN** existirão exatamente 5 arquivos: `_layout.tsx`,
   `dashboard.tsx`, `explorar.tsx`, `ferramentas.tsx`, `perfil.tsx`.
4. **GIVEN** o WeekPeekCard renderizado, **THEN** badge = "DESTAQUES DA SEMANA" e
   CTA = "Ver conteúdo completo".
5. **GIVEN** `npm run typecheck`, **THEN** retorna 0 erros.
6. **GIVEN** `app/timeline-detail.tsx`, **THEN** preserva pulse animation, auto-scroll
   e progress bar por trimestre que estavam em `timeline.tsx`.
7. **GIVEN** o dashboard, **THEN** o Card "Registro rápido" foi removido (FAB cobre).
8. **GIVEN** `grep -i "revista" app/ src/components/`, **THEN** zero matches em strings
   de UI/labels (apenas paths/imports residuais aceitos para refactor futuro).

## Scope IN
- Etapa 1–9 da seção 8 do plano técnico
- Adição de `colors.successContainer` ao theme
- 3 commits lógicos com mensagens conventional

## Scope OUT
- Rename de arquivos (`RevistaCard.tsx` → `FeedCard.tsx`) — refactor separado
- Edição de conteúdo editorial (textos das semanas)
- Novas features

## Dependencies
Nenhuma.

## Risks
- Regressão visual no timeline (mitigado por @qa manual + screenshot before/after)
- Rotas Expo Router fantasma se imports residuais (mitigado por grep da Fase 4)

## Tasks
- [ ] T1: Absorver melhorias de `timeline.tsx` em `timeline-detail.tsx` (@dev)
- [ ] T2: Deletar 3 órfãos: `config.tsx`, `semana.tsx`, `timeline.tsx` (@dev)
- [ ] T3: Adicionar `colors.successContainer` em `src/theme/colors.ts` (@ux)
- [ ] T4: Refatorar `revistaAdapter.ts` (rename + remove CHAPTER_COLORS) (@dev)
- [ ] T5: Refatorar `RevistaCard.tsx` (remove badges, hardcoded colors) (@dev)
- [ ] T6: Refatorar `explorar.tsx` (header, remove progress bar) (@dev)
- [ ] T7: Refatorar `WeekPeekCard.tsx` (rebrand) (@dev)
- [ ] T8: Refatorar `dashboard.tsx` (remove título duplicado, remove Card 5, reorder) (@dev)
- [ ] T9: Padronizar `ferramentas.tsx` (card style) (@dev)
- [ ] T10: `npm run typecheck` PASS + `npx expo export --platform web` PASS (@qa)

## File List
(a preencher pelo @dev durante execução)

## Change Log
| Date | Author | Change |
|------|--------|--------|
| 2026-05-06 | @sm | Story criada a partir de docs/plans/refatoracao-frontend.md |
```

**Modelo:** `claude-haiku-4-5-20251001` — geração mecânica.
**Tokens:** ~3K.

---

## Fase 2 — `@po` (Pax) — Validação

**Comando AIOX:** `*validate-story-draft RF.1`.

**Checklist 10-pontos:**

| # | Check | Verdict |
|---|-------|---------|
| 1 | Título claro | ✅ |
| 2 | Descrição completa | ✅ |
| 3 | AC testáveis (Given/When/Then) | ✅ 8 critérios |
| 4 | Escopo IN/OUT explícito | ✅ |
| 5 | Dependências mapeadas | ✅ nenhuma |
| 6 | Estimativa | ✅ 8 pts |
| 7 | Valor de negócio | ✅ alinhamento à identidade |
| 8 | Riscos | ✅ 2 listados + mitigações |
| 9 | DoD | ✅ AC #5 + #8 |
| 10 | Alinhamento Launch Track | ✅ próxima da fila |

**Decisões explícitas do @po:**
- (a) Confirma remoção do Card "Registro rápido" — FAB cobre as 3 ações (achado A7).
- (b) Confirma rename de arquivos fora de escopo (achado A3).
- (c) Aprova adição do token `successContainer` (achado A8).

**Ação ao final:** atualizar story file `Status: Draft → Ready` e adicionar entrada no Change Log:
```
| 2026-05-06 | @po | Validate: GO 10/10. Status Draft → Ready. |
```

**Modelo:** `claude-haiku-4-5-20251001` — validação por checklist.
**Tokens:** ~2K.

---

## Fase 3 — `@ux-design-expert` (Uma) — Token Patch (paralelizável com Fase 2)

**Único arquivo a tocar:** `src/theme/colors.ts`.

**Edit literal:**

```
OLD:
  errorContainer: '#FEE2E2',       // error-soft
  onError: '#FFFFFF',
  info: '#1D4ED8',

NEW:
  errorContainer: '#FEE2E2',       // error-soft
  successContainer: '#DCFCE7',     // success-soft (verde claro p/ FAQ "Fato")
  onError: '#FFFFFF',
  info: '#1D4ED8',
```

**Validação:**
```bash
cd /c/Users/USUARIO/Desktop/GESTANTE/meu-projeto
npm run typecheck
# esperado: 0 erros
```

**Output adicional para o story file (Dev Notes):**

| Mapeamento de cor antiga → novo token (para usar em T4 e T5) |
|--------------------------------------------------------------|
| `CHAPTER_COLORS.abertura` `#b30064`  → `colors.primary` |
| `CHAPTER_COLORS.bebê` `#e91e8c`     → `colors.primary` |
| `CHAPTER_COLORS.você` `#7b5ea7`     → `colors.secondary` |
| `CHAPTER_COLORS.nutrição` `#4a7c59` → `colors.success` |
| `CHAPTER_COLORS['sinais-de-alerta']` `#c0392b` → `colors.error` |
| `CHAPTER_COLORS.ação` `#2471a3`     → `colors.info` |
| `CHAPTER_COLORS.psicologia` `#8e44ad` → `colors.accent` |
| `CHAPTER_COLORS.faq` `#d35400`      → `colors.secondary` |
| `CHAPTER_COLORS.fechamento` `#b30064` → `colors.primary` |
| `RevistaCard.tsx` L485 `#FFE5E5`    → `colors.errorContainer` |
| `RevistaCard.tsx` L494 `#E5F5E5`    → `colors.successContainer` |
| `timeline.tsx` L35 `'#8e44ad'`      → `colors.accent` (mas arquivo será deletado em T2) |

**Modelo:** `claude-haiku-4-5-20251001` — edição cirúrgica + tabela de referência.
**Tokens:** ~3K.

---

## Fase 4 — `@architect` (Aria) — Sign-off de Rotas (paralelizável)

**Comandos a executar (read-only):**

```bash
cd /c/Users/USUARIO/Desktop/GESTANTE/meu-projeto
# 1. Confirmar tabs oficiais
grep -E "name: '" app/\(tabs\)/_layout.tsx | head
# Esperado: dashboard, explorar, ferramentas, perfil

# 2. Buscar imports de config.tsx (não-perfil)
grep -rn "from.*['\"].*\(tabs\)/config['\"]" app src
# Esperado: 0 matches

# 3. Buscar push para /config ou /(tabs)/config
grep -rn "router.push.*['\"].*config['\"]" app src
# Esperado: 0 matches

# 4. Buscar imports de timeline.tsx (não-detail)
grep -rn "from.*['\"].*\(tabs\)/timeline['\"]" app src
# Esperado: 0 matches

# 5. Buscar push para /timeline (não-detail)
grep -rEn "router\.push\(['\"]/timeline(?!-detail)" app src
# Esperado: 0 matches (deve ser apenas /timeline-detail)

# 6. Buscar imports de semana.tsx (não-detail)
grep -rn "from.*['\"].*\(tabs\)/semana['\"]" app src
# Esperado: 0 matches

# 7. Buscar push para /(tabs)/semana
grep -rEn "router\.push\(['\"]\/?\(tabs\)\/semana['\"]" app src
# Esperado: 0 matches
```

**Decisão:** se algum grep retornar match, bloquear T2 e listar imports a corrigir antes da deletion. Caso contrário: **GO** para Fase 5.

**Output:** comentário no story file:
```markdown
### Architect Sign-off
- 4 tabs confirmadas em _layout.tsx ✅
- 0 imports residuais aos 3 órfãos ✅
- GO para deletion em T2.
```

**Modelo:** `claude-haiku-4-5-20251001` — apenas grep determinístico.
**Tokens:** ~2K.

---

## Fase 5 — `@dev` (Dex) — Implementação

**Modo:** Pre-Flight. Status story: `Ready → InProgress`.

### Commit lógico A — Timeline (T1 + T2)

#### T1 — Absorver melhorias em `timeline-detail.tsx`

**Arquivo:** `app/timeline-detail.tsx`
**Estratégia:** substituir o conteúdo atual (134 linhas) por uma versão derivada do `timeline.tsx` órfão (311 linhas), adaptando apenas onde necessário.

**Operação concreta (Write completo do novo `timeline-detail.tsx`):**

```typescript
import { useRef, useEffect } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  ActivityIndicator, Animated, Easing,
} from 'react-native';
import { useRouter } from 'expo-router';
import { colors, typography, borderRadius } from '../src/theme';
import { useCurrentWeek } from '../src/hooks/useCurrentWeek';
import { useAllCompletions } from '../src/hooks/useAllCompletions';

const TRIMESTER_SECTIONS = [
  {
    label: '1º Trimestre',
    range: 'Semanas 1–13',
    weeks: Array.from({ length: 13 }, (_, i) => i + 1),
    color: colors.primary,
    bg: colors.trimester1,
    icon: '🌱',
  },
  {
    label: '2º Trimestre',
    range: 'Semanas 14–27',
    weeks: Array.from({ length: 14 }, (_, i) => i + 14),
    color: colors.secondary,
    bg: colors.trimester2,
    icon: '🌸',
  },
  {
    label: '3º Trimestre',
    range: 'Semanas 28–40',
    weeks: Array.from({ length: 13 }, (_, i) => i + 28),
    color: colors.accent,
    bg: colors.trimester3,
    icon: '✨',
  },
] as const;

function PulseCell({ onPress, children }: {
  onPress: () => void;
  children: React.ReactNode;
}) {
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const anim = Animated.loop(
      Animated.sequence([
        Animated.timing(scale, { toValue: 1.08, duration: 700, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        Animated.timing(scale, { toValue: 1, duration: 700, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
      ])
    );
    anim.start();
    return () => anim.stop();
  }, []);

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <TouchableOpacity style={styles.cellCurrent} onPress={onPress} activeOpacity={0.8}>
        {children}
      </TouchableOpacity>
    </Animated.View>
  );
}

export default function TimelineDetailScreen() {
  const router = useRouter();
  const currentWeek = useCurrentWeek();
  const completions = useAllCompletions();
  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (currentWeek === null) return;
    const trimesterIdx = currentWeek <= 13 ? 0 : currentWeek <= 27 ? 1 : 2;
    const sectionHeaderH = 72;
    const gridRowH = CELL_SIZE + 8;
    const rowsPerTrimester = [3, 4, 3];
    let offset = 220;
    for (let i = 0; i < trimesterIdx; i++) {
      offset += sectionHeaderH + rowsPerTrimester[i] * gridRowH + 24;
    }
    const weekInTrimester = currentWeek <= 13 ? currentWeek - 1
      : currentWeek <= 27 ? currentWeek - 14
      : currentWeek - 28;
    const rowIdx = Math.floor(weekInTrimester / 5);
    offset += sectionHeaderH + rowIdx * gridRowH;
    setTimeout(() => scrollRef.current?.scrollTo({ y: Math.max(0, offset - 80), animated: true }), 300);
  }, [currentWeek]);

  if (currentWeek === null) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
        <ActivityIndicator color={colors.primary} />
      </View>
    );
  }

  const totalCompleted = Object.values(completions).filter(Boolean).length;

  function handleWeekPress(week: number) {
    router.push(`/semana/${week}`);
  }

  return (
    <ScrollView ref={scrollRef} style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>Jornada da Gestação</Text>

      <View style={styles.progressBadge}>
        <Text style={styles.progressText}>{totalCompleted} de 40 semanas concluídas</Text>
      </View>

      <View style={styles.legend}>
        <LegendItem color={colors.primary} label="Atual" />
        <LegendItem color={colors.secondaryContainer} label="Concluída ✓" />
        <LegendItem color={colors.surfaceContainerHighest} label="Futura 🔒" />
      </View>

      {TRIMESTER_SECTIONS.map(({ label, range, weeks, color, bg, icon }) => {
        const completed = weeks.filter(w => completions[w]).length;
        const pct = Math.round((completed / weeks.length) * 100);
        const isCurrent = weeks.includes(currentWeek as (typeof weeks)[number]);

        return (
          <View key={label} style={styles.section}>
            <View style={[styles.sectionHeader, { backgroundColor: bg, borderLeftColor: color }]}>
              <View style={styles.sectionHeaderTop}>
                <Text style={styles.sectionIcon}>{icon}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.sectionTitle, { color }]}>{label}</Text>
                  <Text style={styles.sectionRange}>{range}</Text>
                </View>
                {isCurrent && (
                  <View style={[styles.currentBadge, { backgroundColor: color }]}>
                    <Text style={styles.currentBadgeText}>Você está aqui</Text>
                  </View>
                )}
              </View>
              <View style={styles.sectionProgressTrack}>
                <View style={[styles.sectionProgressFill, { width: `${pct}%` as any, backgroundColor: color }]} />
              </View>
              <Text style={[styles.sectionProgressLabel, { color }]}>{pct}% concluído</Text>
            </View>

            <View style={styles.grid}>
              {weeks.map(week => {
                const isCur = week === currentWeek;
                const isDone = !!completions[week] && !isCur;
                const isPast = currentWeek !== null && week < currentWeek && !completions[week];
                const isFuture = currentWeek !== null && week > currentWeek;

                if (isCur) {
                  return (
                    <PulseCell key={week} onPress={() => handleWeekPress(week)}>
                      <Text style={styles.cellCurrentText}>{week}</Text>
                      <Text style={styles.currentDot}>●</Text>
                    </PulseCell>
                  );
                }

                return (
                  <TouchableOpacity
                    key={week}
                    style={[
                      styles.cell,
                      isDone && { backgroundColor: colors.secondaryContainer },
                      isPast && { backgroundColor: bg, opacity: 0.5 },
                      isFuture && styles.cellFuture,
                    ]}
                    onPress={() => handleWeekPress(week)}
                    activeOpacity={0.7}
                  >
                    <Text style={[
                      styles.cellText,
                      isDone && { color: colors.text },
                      isFuture && { color: colors.textLight },
                    ]}>
                      {week}
                    </Text>
                    {isDone && <Text style={styles.checkmark}>✓</Text>}
                    {isFuture && <Text style={styles.lockIcon}>🔒</Text>}
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        );
      })}

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <View style={styles.legendItem}>
      <View style={[styles.legendDot, { backgroundColor: color }]} />
      <Text style={styles.legendText}>{label}</Text>
    </View>
  );
}

const CELL_SIZE = 52;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: 16, paddingBottom: 40 },
  title: { ...typography.h2, color: colors.text, marginBottom: 8 },
  progressBadge: {
    backgroundColor: colors.secondaryContainer,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  progressText: { ...typography.label, color: colors.secondary },
  legend: { flexDirection: 'row', gap: 16, marginBottom: 20, flexWrap: 'wrap' },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  legendDot: { width: 12, height: 12, borderRadius: 6 },
  legendText: { ...typography.caption, color: colors.textSecondary },
  section: { marginBottom: 24 },
  sectionHeader: {
    borderLeftWidth: 5,
    borderRadius: borderRadius.xl,
    padding: 14,
    marginBottom: 12,
  },
  sectionHeaderTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  sectionIcon: { fontSize: 24 },
  sectionTitle: { ...typography.h3, marginBottom: 2 },
  sectionRange: { ...typography.caption, color: colors.textSecondary },
  currentBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 10 },
  currentBadgeText: { fontSize: 10, fontWeight: '700', color: '#fff' },
  sectionProgressTrack: {
    height: 4,
    backgroundColor: 'rgba(0,0,0,0.08)',
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 4,
  },
  sectionProgressFill: { height: '100%', borderRadius: 2 },
  sectionProgressLabel: { fontSize: 11, fontWeight: '600' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  cell: {
    width: CELL_SIZE, height: CELL_SIZE, borderRadius: 12,
    alignItems: 'center', justifyContent: 'center',
    backgroundColor: colors.surfaceContainerHighest,
  },
  cellFuture: { backgroundColor: colors.surfaceContainerHighest, opacity: 0.45 },
  cellText: { ...typography.label, color: colors.textSecondary },
  cellCurrent: {
    width: CELL_SIZE, height: CELL_SIZE, borderRadius: 12,
    alignItems: 'center', justifyContent: 'center',
    backgroundColor: colors.primary,
    borderWidth: 2, borderColor: colors.onPrimary,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4, shadowRadius: 6,
    elevation: 4,
  },
  cellCurrentText: { ...typography.label, color: colors.onPrimary, fontWeight: '700' },
  checkmark: { fontSize: 10, color: colors.secondary, position: 'absolute', top: 4, right: 6 },
  currentDot: { fontSize: 7, color: colors.onPrimary, position: 'absolute', bottom: 4 },
  lockIcon: { fontSize: 9, position: 'absolute', bottom: 3 },
});
```

**Diferença vs `timeline.tsx` órfão:**
- Imports do `theme` ajustados para `../src/theme` (não `../../src/theme`) — `timeline-detail.tsx` está em `app/`, não `app/(tabs)/`.
- Usa `colors.accent` no 3º trimestre (substitui `'#8e44ad'` hardcoded).
- Mantém `router.push('/semana/${week}')` (rota dinâmica já existe em `app/semana/[week].tsx`).

**Validação:**
```bash
npm run typecheck
# esperado: 0 erros
```

#### T2 — Deletar 3 órfãos

**Comandos:**
```bash
cd /c/Users/USUARIO/Desktop/GESTANTE/meu-projeto
rm "app/(tabs)/config.tsx"
rm "app/(tabs)/semana.tsx"
rm "app/(tabs)/timeline.tsx"
```

**Validação:**
```bash
ls "app/(tabs)/"
# esperado: _layout.tsx, dashboard.tsx, explorar.tsx, ferramentas.tsx, perfil.tsx
npm run typecheck
# esperado: 0 erros
```

**Commit A:**
```bash
git add app/timeline-detail.tsx app/\(tabs\)/config.tsx app/\(tabs\)/semana.tsx app/\(tabs\)/timeline.tsx
git commit -m "refactor(timeline): absorb improvements before deleting orphans

Move pulse animation, auto-scroll and trimester progress headers
from app/(tabs)/timeline.tsx into app/timeline-detail.tsx.
Delete 3 orphan files in app/(tabs)/: config.tsx (duplicate of
perfil.tsx), semana.tsx (replaced by semana-detail.tsx), timeline.tsx
(replaced by timeline-detail.tsx).

Story: RF.1 (T1 + T2)"
```

**Modelo recomendado:** `claude-sonnet-4-6` (T1 envolve adaptação de path); `claude-haiku-4-5-20251001` para T2 (deletes).

---

### Commit lógico B — Feed (T4 + T5 + T6 + T7)

#### T4 — Refatorar `revistaAdapter.ts`

**Arquivo:** `src/utils/revistaAdapter.ts`

**Edits literais:**

```
EDIT 1 — Renomear função e remover CHAPTER_COLORS

OLD:
// DoceGestar — Adaptador de Revista Feed
// Transforma WeekContent em array de RevistaCard para exibição no feed semanal

import type { WeekContent, RevistaCard } from '../types';

// Paleta de cores dos capítulos
const CHAPTER_COLORS = {
  abertura: '#b30064',
  bebê: '#e91e8c',
  você: '#7b5ea7',
  nutrição: '#4a7c59',
  'sinais-de-alerta': '#c0392b',
  ação: '#2471a3',
  psicologia: '#8e44ad',
  faq: '#d35400',
  fechamento: '#b30064',
} as const;

// Mapa de perguntas por trimestre (Psicologia)
const PSYCHOLOGY_QUESTIONS = {
  1: 'Como você está se sentindo com essa gravidez?',
  2: 'Que sonho você tem para o bebê?',
  3: 'O que mais a emociona nessa reta final?',
} as const;

/**
 * Constrói o feed de cards da revista para uma semana
 * Retorna array de RevistaCard na ordem de apresentação
 */
export function buildRevistaFeed(week: WeekContent): RevistaCard[] {

NEW:
// DoceGestar — Adaptador de Feed Semanal
// Transforma WeekContent em array de cards do feed da semana

import type { WeekContent, RevistaCard } from '../types';
import { colors } from '../theme';

// Mapa de perguntas reflexivas por trimestre
const REFLECTION_QUESTIONS = {
  1: 'Como você está se sentindo com essa gravidez?',
  2: 'Que sonho você tem para o bebê?',
  3: 'O que mais a emociona nessa reta final?',
} as const;

/**
 * Constrói o feed semanal — sem hierarquia editorial.
 * Cards independentes, sem "abertura"/"fechamento" nem capítulos.
 */
export function buildWeeklyFeed(week: WeekContent): RevistaCard[] {
```

```
EDIT 2 — Remover Card 1 (HERO Abertura). Cobrir do início da função até o início do Card 2.

OLD:
  const cards: RevistaCard[] = [];
  const weekNum = week.weekNumber;

  // ─────────────────────────────────────────
  // 1. HERO — Abertura (celebração)
  // ─────────────────────────────────────────
  cards.push({
    id: `${weekNum}-abertura`,
    layout: 'hero',
    chapter: 'Abertura',
    chapterColor: CHAPTER_COLORS.abertura,
    title: `Bem-vinda à semana ${weekNum}!`,
    subtitle: week.motivationalPhrase,
    emoji: '🌸',
  });

  // ─────────────────────────────────────────
  // 2. STAT — Bebê (tamanho)
  // ─────────────────────────────────────────
  cards.push({
    id: `${weekNum}-baby-size`,
    layout: 'stat',
    chapter: 'Bebê',
    chapterColor: CHAPTER_COLORS.bebê,
    title: 'Tamanho do bebê',
    statValue: week.baby.sizeCm,
    statLabel: `Comparação: ${week.baby.comparison}`,
    emoji: '👶',
  });

NEW:
  const cards: RevistaCard[] = [];
  const weekNum = week.weekNumber;

  // 1. STAT — Tamanho do bebê
  cards.push({
    id: `${weekNum}-baby-size`,
    layout: 'stat',
    chapter: '',
    chapterColor: colors.primary,
    title: 'Tamanho do bebê',
    statValue: week.baby.sizeCm,
    statLabel: `Comparação: ${week.baby.comparison}`,
    emoji: '👶',
  });
```

```
EDIT 3 — Substituir todos os usos de CHAPTER_COLORS.* por tokens. Aplicar replaceAll:

REPLACE:
    chapterColor: CHAPTER_COLORS.bebê,
WITH:
    chapterColor: colors.primary,

REPLACE:
    chapterColor: CHAPTER_COLORS.você,
WITH:
    chapterColor: colors.secondary,

REPLACE:
    chapterColor: CHAPTER_COLORS.nutrição,
WITH:
    chapterColor: colors.success,

REPLACE:
    chapterColor: CHAPTER_COLORS['sinais-de-alerta'],
WITH:
    chapterColor: colors.error,

REPLACE:
    chapterColor: CHAPTER_COLORS.ação,
WITH:
    chapterColor: colors.info,

REPLACE:
    chapterColor: CHAPTER_COLORS.psicologia,
WITH:
    chapterColor: colors.accent,

REPLACE:
    chapterColor: CHAPTER_COLORS.faq,
WITH:
    chapterColor: colors.secondary,
```

```
EDIT 4 — Trocar `chapter: 'XXX'` por string vazia em todos os cards. Aplicar replaceAll:

REPLACE: chapter: 'Bebê',           WITH: chapter: '',
REPLACE: chapter: 'Você',           WITH: chapter: '',
REPLACE: chapter: 'Nutrição',       WITH: chapter: '',
REPLACE: chapter: 'Sinais de Alerta', WITH: chapter: '',
REPLACE: chapter: 'Ação Prática',   WITH: chapter: '',
REPLACE: chapter: 'Psicologia',     WITH: chapter: '',
REPLACE: chapter: 'Mito vs. Fato',  WITH: chapter: '',
```

```
EDIT 5 — Trocar referência à constante renomeada PSYCHOLOGY_QUESTIONS:

OLD:
  const trimesterQuestion =
    PSYCHOLOGY_QUESTIONS[week.trimester as keyof typeof PSYCHOLOGY_QUESTIONS];

NEW:
  const trimesterQuestion =
    REFLECTION_QUESTIONS[week.trimester as keyof typeof REFLECTION_QUESTIONS];
```

```
EDIT 6 — Remover Card 11 (HERO Fechamento). Localizar e deletar:

DELETE (incluindo comentário e bloco completo):
  // ─────────────────────────────────────────
  // 11. HERO — Fechamento (conquista + CTA share)
  // ─────────────────────────────────────────
  cards.push({
    id: `${weekNum}-fechamento`,
    layout: 'hero',
    chapter: 'Fechamento',
    chapterColor: CHAPTER_COLORS.fechamento,
    title: `Semana ${weekNum} concluída!`,
    subtitle: week.weeklyTip,
    emoji: '🏆',
    cta: 'Compartilhar',
  });
```

**Validação após T4:**
```bash
npm run typecheck
# esperado: 0 erros
grep -n "CHAPTER_COLORS" src/utils/revistaAdapter.ts
# esperado: 0 matches
grep -n "buildRevistaFeed" src/utils/revistaAdapter.ts
# esperado: 0 matches
```

**Modelo:** `claude-haiku-4-5-20251001` — series of mechanical replaceAll.

---

#### T5 — Refatorar `RevistaCard.tsx`

**Arquivo:** `src/components/RevistaCard.tsx`

**Edits literais:**

```
EDIT 1 — Atualizar import para incluir colors completo (já presente, sem mudança).

EDIT 2 — Remover renderização do HERO layout. Substituir:

OLD (linhas 62-103, layout 'hero' inteiro):
  // ─────────────────────────────────────────
  // LAYOUT: HERO
  // ─────────────────────────────────────────
  if (card.layout === 'hero') {
    return (
      <View style={[...containerStyle, styles.heroContainer]}>
        <View
          style={[
            styles.heroBorder,
            { borderLeftColor: card.chapterColor },
          ]}
        >
          <Text style={[styles.badge, { color: card.chapterColor }]}>
            {card.chapter}
          </Text>

          {card.emoji && (
            <Text style={styles.heroEmoji}>{card.emoji}</Text>
          )}

          <Text style={styles.heroTitle}>{card.title}</Text>

          {card.subtitle && (
            <Text style={styles.heroSubtitle}>{card.subtitle}</Text>
          )}

          {card.cta && (
            <TouchableOpacity
              style={[
                styles.heroButton,
                { borderColor: card.chapterColor },
              ]}
            >
              <Text style={[styles.heroButtonText, { color: card.chapterColor }]}>
                {card.cta}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }

NEW:
  // Layout 'hero' removido — feed sem abertura/fechamento editoriais
  if (card.layout === 'hero') {
    return null;
  }
```

```
EDIT 3 — Remover badges de capítulo de TODOS os layouts restantes. Aplicar replaceAll:

REPLACE (4 ocorrências em layouts stat, lista, checklist, pergunta, faq):
          <Text style={[styles.badge, { color: card.chapterColor }]}>
            {card.chapter}
          </Text>

WITH:
          (vazio — remover bloco inteiro incluindo a tag de fechamento)

NOTA para Haiku: usar Edit com replace_all=true. As 6 ocorrências são idênticas.
```

```
EDIT 4 — Substituir cores hardcoded em styles. Localizar:

OLD:
  faqMitoContainer: {
    backgroundColor: '#FFE5E5',

NEW:
  faqMitoContainer: {
    backgroundColor: colors.errorContainer,

OLD:
  faqFatoContainer: {
    backgroundColor: '#E5F5E5',

NEW:
  faqFatoContainer: {
    backgroundColor: colors.successContainer,
```

```
EDIT 5 — Remover heroContainer/heroBorder/heroEmoji/heroTitle/heroSubtitle/heroButton/heroButtonText do StyleSheet (não mais usados após Edit 2).

DELETE bloco completo (linhas ~308-366):

  // ─────────────────────────────────────────
  // HERO
  // ─────────────────────────────────────────
  heroContainer: { ... },
  heroBorder: { ... },
  heroEmoji: { ... },
  heroTitle: { ... },
  heroSubtitle: { ... },
  heroButton: { ... },
  heroButtonText: { ... },
```

```
EDIT 6 — Remover badge style (não mais usado).

DELETE:
  // ─────────────────────────────────────────
  // Badge (capítulo)
  // ─────────────────────────────────────────
  badge: {
    ...typography.caption,
    fontWeight: '600',
    marginBottom: spacing[3],
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
```

```
EDIT 7 — Trocar background do container de rgba para token. Atualizar:

OLD:
  container: {
    borderRadius: borderRadius.xl,
    ...shadows.editorial,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    overflow: 'hidden',
  },

NEW:
  container: {
    borderRadius: 20,
    ...shadows.editorial,
    backgroundColor: colors.surface,
    overflow: 'hidden',
  },
```

**Validação após T5:**
```bash
npm run typecheck
# esperado: 0 erros
grep -n "styles.badge\|styles.hero" src/components/RevistaCard.tsx
# esperado: 0 matches
grep -n "#FFE5E5\|#E5F5E5" src/components/RevistaCard.tsx
# esperado: 0 matches
```

**Modelo:** `claude-sonnet-4-6` — múltiplas remoções com risco de quebrar TS.

---

#### T6 — Refatorar `explorar.tsx`

**Arquivo:** `app/(tabs)/explorar.tsx`

**Edits literais:**

```
EDIT 1 — Renomear import:

OLD:
import { buildRevistaFeed } from '../../src/utils/revistaAdapter';

NEW:
import { buildWeeklyFeed } from '../../src/utils/revistaAdapter';
```

```
EDIT 2 — Atualizar uso da função:

OLD:
    return buildRevistaFeed(weekData);

NEW:
    return buildWeeklyFeed(weekData);
```

```
EDIT 3 — Substituir RevistaHeader por SimpleHeader. OLD (linhas 35-54):

OLD:
function RevistaHeader({
  weekNumber,
  trimester,
  trimesterProgress,
}: {
  weekNumber: number;
  trimester: 1 | 2 | 3;
  trimesterProgress: number;
}) {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Revista da Semana</Text>
      <Text style={styles.headerSubtitle}>
        Semana {weekNumber} {'·'} {TRIMESTER_LABEL[trimester]}
      </Text>
      <ProgressBar progress={trimesterProgress} />
      <Text style={styles.progressLabel}>{trimesterProgress}% do trimestre</Text>
    </View>
  );
}

NEW:
function FeedHeader({
  weekNumber,
  trimester,
}: {
  weekNumber: number;
  trimester: 1 | 2 | 3;
}) {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Sua Semana</Text>
      <Text style={styles.headerSubtitle}>
        Semana {weekNumber} {'·'} {TRIMESTER_LABEL[trimester]}
      </Text>
    </View>
  );
}
```

```
EDIT 4 — Remover ProgressBar e variável trimesterProgress. OLD:

OLD:
function ProgressBar({ progress }: { progress: number }) {
  return (
    <View style={styles.progressTrack}>
      <View style={[styles.progressFill, { width: `${progress}%` as any }]} />
    </View>
  );
}

NEW:
(remover bloco completo)

OLD (no componente principal):
  const trimester = weekNumber ? getTrimester(weekNumber) : null;
  const trimesterProgress = weekNumber ? getTrimesterProgress(weekNumber) : 0;

NEW:
  const trimester = weekNumber ? getTrimester(weekNumber) : null;
```

```
EDIT 5 — Atualizar uso do header no FlatList:

OLD:
        ListHeaderComponent={
          trimester ? (
            <RevistaHeader
              weekNumber={weekNumber}
              trimester={trimester}
              trimesterProgress={trimesterProgress}
            />
          ) : null
        }

NEW:
        ListHeaderComponent={
          trimester ? (
            <FeedHeader weekNumber={weekNumber} trimester={trimester} />
          ) : null
        }
```

```
EDIT 6 — Remover import getTrimesterProgress (não mais usado):

OLD:
import { getTrimester, getTrimesterProgress } from '../../src/data';

NEW:
import { getTrimester } from '../../src/data';
```

```
EDIT 7 — Atualizar EmptyState text:

OLD:
      <Text style={styles.emptySubtitle}>
        Para ver a Revista da Semana, informe sua data prevista do parto.
      </Text>

NEW:
      <Text style={styles.emptySubtitle}>
        Para ver o conteúdo da semana, informe sua data prevista do parto.
      </Text>
```

```
EDIT 8 — Remover styles não utilizados (progressTrack, progressFill, progressLabel):

DELETE blocos do StyleSheet:
  progressTrack: { ... },
  progressFill: { ... },
  progressLabel: { ... },
```

**Validação após T6:**
```bash
npm run typecheck
# esperado: 0 erros
grep -ni "revista" app/\(tabs\)/explorar.tsx
# esperado: 0 matches
```

**Modelo:** `claude-sonnet-4-6` — múltiplos edits com remoção de imports.

---

#### T7 — Refatorar `WeekPeekCard.tsx`

**Arquivo:** `src/components/WeekPeekCard.tsx`

**Edits literais:**

```
EDIT 1 — Trocar texto do badge:

OLD:
          <Text style={styles.badgeText}>REVISTA DA SEMANA</Text>

NEW:
          <Text style={styles.badgeText}>DESTAQUES DA SEMANA</Text>
```

```
EDIT 2 — Trocar CTA:

OLD:
        <Text style={styles.ctaText}>Ver revista completa</Text>

NEW:
        <Text style={styles.ctaText}>Ver conteúdo completo</Text>
```

**Validação após T7:**
```bash
npm run typecheck
# esperado: 0 erros
grep -ni "revista" src/components/WeekPeekCard.tsx
# esperado: 0 matches
```

**Modelo:** `claude-haiku-4-5-20251001` — 2 edits triviais.

**Commit B:**
```bash
git add src/utils/revistaAdapter.ts src/components/RevistaCard.tsx \
  app/\(tabs\)/explorar.tsx src/components/WeekPeekCard.tsx \
  src/theme/colors.ts
git commit -m "refactor(feed): rebrand revista→weekly feed, remove editorial chapters

Rename buildRevistaFeed → buildWeeklyFeed. Drop CHAPTER_COLORS constant
and map all chapterColor references to design tokens (primary, secondary,
success, error, info, accent). Remove HERO layout (abertura/fechamento)
and chapter badges from all card layouts. Replace hardcoded #FFE5E5/
#E5F5E5 with colors.errorContainer/successContainer (new token).

Explorar header: 'Revista da Semana' → 'Sua Semana'. Remove redundant
trimester progress bar (already shown in dashboard Card 8).

WeekPeekCard: 'REVISTA DA SEMANA' → 'DESTAQUES DA SEMANA',
'Ver revista completa' → 'Ver conteúdo completo'.

Story: RF.1 (T3 + T4 + T5 + T6 + T7)"
```

---

### Commit lógico C — Home + Tools (T8 + T9)

#### T8 — Refatorar `dashboard.tsx`

**Arquivo:** `app/(tabs)/dashboard.tsx`

**Edits literais:**

```
EDIT 1 — Remover título e subtítulo duplicados:

OLD (linhas 133-134):
      <Text style={styles.appTitle}>DoceGestar</Text>
      <Text style={styles.appSubtitle}>Seu acompanhamento semanal</Text>

NEW:
(remover ambas as linhas)
```

```
EDIT 2 — Remover estilos appTitle/appSubtitle do StyleSheet (linhas 343-352):

DELETE:
  appTitle: {
    ...typography.h1,
    color: colors.primary,
    marginBottom: spacing[1],
  },
  appSubtitle: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginBottom: spacing[6],
  },
```

```
EDIT 3 — Remover SHORTCUT_ITEMS const (linhas 35-39):

DELETE:
const SHORTCUT_ITEMS = [
  { icon: 'fitness-outline' as const, label: 'Sintomas', tab: '/(tabs)/ferramentas' },
  { icon: 'calendar-outline' as const, label: 'Consultas', tab: '/(tabs)/ferramentas' },
  { icon: 'radio-button-on-outline' as const, label: 'Contador', tab: '/(tabs)/ferramentas' },
];
```

```
EDIT 4 — Remover Card 5 ("Registro rápido") inteiro (linhas 237-254):

DELETE:
      {/* Card 5 — Registro rápido */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Registro rápido</Text>
        <Text style={styles.cardCaption}>Acesse suas ferramentas</Text>
        <View style={styles.shortcutRow}>
          {SHORTCUT_ITEMS.map((item) => (
            <TouchableOpacity
              key={item.label}
              style={styles.shortcutBtn}
              onPress={() => router.push(item.tab as Parameters<typeof router.push>[0])}
              activeOpacity={0.75}
            >
              <Ionicons name={item.icon} size={22} color={colors.primary} />
              <Text style={styles.shortcutLabel}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
```

```
EDIT 5 — Remover styles shortcutRow/shortcutBtn/shortcutLabel (linhas 508-527):

DELETE:
  // Registro rápido
  shortcutRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: spacing[2],
  },
  shortcutBtn: {
    alignItems: 'center',
    gap: spacing[2],
    backgroundColor: colors.surfaceContainerLow ?? '#FFF0F7',
    borderRadius: 16,
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[4],
    minWidth: 80,
  },
  shortcutLabel: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: '600',
  },
```

```
EDIT 6 — Reordenar cards. Ordem atual: Hero → Bebê → WeekPeekCard → Sintomas → Dica → Curiosidade → Próxima consulta → Progresso. Ordem desejada: Hero → Bebê → Destaques (WeekPeekCard) → Dica → Sintomas → Curiosidade → Próxima consulta → Progresso.

ACTION: trocar a posição dos blocos {/* Card 4 — Sintomas */} (linhas 211-222 atualmente) e {/* Card 4 — Dica do dia */} (linhas 224-235 atualmente).

Após T4 (remoção do Card 5), os blocos a trocar serão:
- Bloco "Sintomas esperados" (precede "Dica do dia")
- Bloco "Dica do dia" (precede "Curiosidade")

Resultado: Dica do dia DEVE aparecer ANTES de Sintomas esperados.

Cuidado: ler todo o arquivo após edits 1-5, identificar as posições atualizadas dos dois blocos, e fazer a troca via duas operações Edit (uma para cada bloco) ou um Edit que cubra ambos os blocos contíguos.
```

```
EDIT 7 — Atualizar comentários numéricos dos cards para refletir nova ordem:

REPLACE: {/* Card 4 — Sintomas esperados */}    WITH: {/* Card 5 — Sintomas esperados */}
REPLACE: {/* Card 4 — Dica do dia */}           WITH: {/* Card 4 — Dica do dia */}
REPLACE: {/* Card 6 — Curiosidade */}           WITH: {/* Card 6 — Curiosidade */}
REPLACE: {/* Card 7 — Próxima consulta */}      WITH: {/* Card 7 — Próxima consulta */}
REPLACE: {/* Card 8 — Progresso */}             WITH: {/* Card 8 — Progresso */}

(Apenas o "Sintomas esperados" muda de Card 4 para Card 5; o resto mantém)
```

**Validação após T8:**
```bash
npm run typecheck
# esperado: 0 erros
grep -n "appTitle\|appSubtitle\|SHORTCUT_ITEMS\|Registro rápido" app/\(tabs\)/dashboard.tsx
# esperado: 0 matches
```

**Modelo:** `claude-sonnet-4-6` — reorder requer leitura contextual.

---

#### T9 — Padronizar `ferramentas.tsx`

**Arquivo:** `app/(tabs)/ferramentas.tsx`

**Edits literais:**

```
EDIT 1 — Adicionar import de shadows:

OLD:
import { colors, typography } from '../../src/theme';

NEW:
import { colors, typography, shadows } from '../../src/theme';
```

```
EDIT 2 — Atualizar style.card (linha ~602):

OLD:
  card: {
    backgroundColor: 'rgba(255,255,255,0.85)',
    borderRadius: 24, padding: 16, marginBottom: 16,

NEW:
  card: {
    backgroundColor: colors.surface,
    borderRadius: 20, padding: 16, marginBottom: 16,
    ...shadows.editorial,
```

NOTA para Haiku: o style atual continua após `marginBottom: 16,` com mais propriedades (shadow manual). Verificar se há `shadowColor`, `shadowOpacity`, `elevation` etc. logo após e remover esses 4-6 linhas (já cobertos por `...shadows.editorial`).

**Validação após T9:**
```bash
npm run typecheck
# esperado: 0 erros
grep -n "rgba(255,255,255,0.85)" app/\(tabs\)/ferramentas.tsx
# esperado: 0 matches (em styles.card; pode haver em outros styles, ok)
```

**Modelo:** `claude-haiku-4-5-20251001` — 2 edits curtos.

**Commit C:**
```bash
git add app/\(tabs\)/dashboard.tsx app/\(tabs\)/ferramentas.tsx
git commit -m "refactor(home): remove duplicates, standardize cards, reorder

Dashboard: drop duplicated 'DoceGestar' title (already in tab bar
header), drop redundant 'Registro rápido' card (FAB covers all 3
shortcuts), reorder so 'Dica do dia' precedes 'Sintomas esperados'.

Ferramentas: standardize card style — surface bg, borderRadius 20,
shadows.editorial (was rgba 0.85 + manual shadow).

Story: RF.1 (T8 + T9)"
```

---

### Encerramento da Fase 5 — `@dev`

Atualizar story file:
- Status: `InProgress → InReview`
- File List: anexar 8 paths tocados + 3 deletados.

**Modelo final do @dev:** maioria Haiku, T1/T5/T6/T8 em Sonnet.
**Tokens estimados totais:** ~30K (com leitura de cada arquivo + edits).

---

## Fase 6 — `@qa` (Quinn) — QA Gate

**Comando AIOX:** `*qa-gate RF.1`.

**Comandos sequenciais:**

```bash
cd /c/Users/USUARIO/Desktop/GESTANTE/meu-projeto

# 1. Typecheck
npm run typecheck
# esperado: 0 erros — FAIL → bloquear

# 2. Web bundle (regressão de tslib bug)
npx expo export --platform web
# esperado: bundle PASS sem "Unable to resolve" — FAIL → bloquear

# 3. Sem menções "revista" na UI
grep -rni "revista" app/\(tabs\)/ src/components/WeekPeekCard.tsx src/components/RevistaCard.tsx | grep -v "import\|from\|//\|RevistaCard\|revistaAdapter\|RevistaCardType"
# esperado: 0 matches — FAIL → flagging para refactor follow-up

# 4. Estrutura de tabs
ls app/\(tabs\)/
# esperado: _layout.tsx dashboard.tsx explorar.tsx ferramentas.tsx perfil.tsx

# 5. Validação manual visual (web preview)
npm run web
# Abrir http://localhost:8081 e validar:
#   - Dashboard sem título "DoceGestar" duplicado dentro do scroll
#   - Sem Card "Registro rápido"
#   - Ordem dos cards: Hero → Bebê → WeekPeekCard → Dica → Sintomas → Curiosidade → Próxima → Progresso
#   - WeekPeekCard mostra "DESTAQUES DA SEMANA" + "Ver conteúdo completo"
#   - Tab Explorar header "Sua Semana", sem progress bar trimestre, sem badges de capítulo
#   - Sem cards de abertura/fechamento no Explorar
#   - Tap no hero do dashboard abre timeline-detail com pulse + auto-scroll
#   - Tab Ferramentas com cards uniformes (surface branco, sombra suave, raio 20)
```

**Veredito:** PASS / CONCERNS / FAIL / WAIVED.
- PASS → atualizar story Status `InReview → Done` + entrada Change Log + entregar para @devops.
- FAIL → QA Loop (max 5 iterações).

**Modelo:** `claude-sonnet-4-6` — review + análise visual.
**Tokens:** ~10K.

---

## Fase 7 — `@devops` (Gage) — Push (autoridade exclusiva)

**Comando AIOX:** `*push`.

```bash
cd /c/Users/USUARIO/Desktop/GESTANTE/meu-projeto
git log --oneline -5
# esperado ver Commit A, B, C
git status
# esperado: tree limpo
git push origin master
# esperado: PASS (3 commits subindo)
```

**Atualizar story file:**
```markdown
## File List
| File | Action | Commit |
|------|--------|--------|
| app/timeline-detail.tsx | Modified | <hash A> |
| app/(tabs)/config.tsx | Deleted | <hash A> |
| app/(tabs)/semana.tsx | Deleted | <hash A> |
| app/(tabs)/timeline.tsx | Deleted | <hash A> |
| src/theme/colors.ts | Modified (added successContainer) | <hash B> |
| src/utils/revistaAdapter.ts | Modified | <hash B> |
| src/components/RevistaCard.tsx | Modified | <hash B> |
| app/(tabs)/explorar.tsx | Modified | <hash B> |
| src/components/WeekPeekCard.tsx | Modified | <hash B> |
| app/(tabs)/dashboard.tsx | Modified | <hash C> |
| app/(tabs)/ferramentas.tsx | Modified | <hash C> |
```

Status final: `Done`.

**Modelo:** `claude-haiku-4-5-20251001` — comandos determinísticos.
**Tokens:** ~1K.

---

## Fase 8 — GESTOR — Protocolo Final (automático)

**Atualizar:**

1. `memory/project_status.md` — adicionar seção:
```markdown
## Sessão 2026-05-XX — RF.1 Refatoração Front-End ✅

- 9 etapas executadas conforme plano `docs/plans/refatoracao-frontend.md`
- 3 commits: <hash A>, <hash B>, <hash C>
- 3 arquivos órfãos deletados; 7 arquivos modificados
- Token successContainer adicionado ao theme
- Identidade "feed moderno" alinhada — zero menções "revista" na UI
```

2. `docs/stories/LAUNCH-TRACK.md` — atualizar linha RF.1: `⏳ PRÓXIMA → ✅ Concluído (<data>) — commits <hashes>`.

3. `SESSION_HANDOFF.md` — apontar para próxima sessão (R.1–R.4 ou retomada G-7).

**Apresentação ao usuário:**

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ SESSÃO RF.1 CONCLUÍDA — confirme para encerrar

O que foi feito:
• 3 órfãos deletados, 7 arquivos refatorados
• Identidade do app realinhada ao feed moderno
• Tokens canônicos aplicados em todas as telas
• Push origin/master OK (3 commits)

Documentos atualizados:
• memory/project_status.md ✅
• LAUNCH-TRACK.md ✅
• SESSION_HANDOFF.md ✅

PRÓXIMA SESSÃO: R.1–R.4 (Revista Digital → Feed Nativo) ou retomar G-7
Para continuar: /gestor

Confirma encerramento? [OK / ajuste]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## Critical Files (recap)

| Caminho | Status | Quem |
|---------|--------|------|
| `docs/stories/RF.1.story.md` | CREATE | @sm |
| `src/theme/colors.ts` | MODIFY (add 1 token) | @ux |
| `app/timeline-detail.tsx` | REWRITE | @dev |
| `app/(tabs)/config.tsx` | DELETE | @dev |
| `app/(tabs)/semana.tsx` | DELETE | @dev |
| `app/(tabs)/timeline.tsx` | DELETE | @dev |
| `src/utils/revistaAdapter.ts` | MODIFY (rename + replace) | @dev |
| `src/components/RevistaCard.tsx` | MODIFY (remove badges, layout hero) | @dev |
| `app/(tabs)/explorar.tsx` | MODIFY (header, remove progress) | @dev |
| `src/components/WeekPeekCard.tsx` | MODIFY (rebrand) | @dev |
| `app/(tabs)/dashboard.tsx` | MODIFY (remove duplicates, reorder) | @dev |
| `app/(tabs)/ferramentas.tsx` | MODIFY (card style) | @dev |

---

## Verification (end-to-end checklist do @qa)

- [ ] `npm run typecheck` → 0 erros
- [ ] `npx expo export --platform web` → bundle PASS
- [ ] `ls app/(tabs)/` → 5 arquivos
- [ ] `grep -rni "revista" app/(tabs)/` → 0 matches em strings de UI
- [ ] `grep -n "buildRevistaFeed" src/` → 0 matches
- [ ] `grep -n "CHAPTER_COLORS" src/` → 0 matches
- [ ] `grep -n "appTitle" app/(tabs)/dashboard.tsx` → 0 matches
- [ ] `grep -n "Registro rápido" app/(tabs)/dashboard.tsx` → 0 matches
- [ ] WeekPeekCard exibe "DESTAQUES DA SEMANA" + "Ver conteúdo completo" (visual)
- [ ] Explorar header = "Sua Semana", sem progress bar (visual)
- [ ] Explorar sem cards "Bem-vinda à semana X" e "Semana X concluída" (visual)
- [ ] Explorar cards sem badges em maiúsculo (Bebê/Você/Nutrição etc.) (visual)
- [ ] Timeline detail tem pulse + auto-scroll + progress por trimestre (visual)
- [ ] Ferramentas cards uniformes com dashboard (surface branco, raio 20) (visual)
- [ ] Dashboard ordem: Hero, Bebê, Destaques, Dica, Sintomas, Curiosidade, Próxima, Progresso (visual)

---

## Resumo de Modelos Recomendados (cowork-plan-protocol)

| Fase | Modelo | Justificativa | Tokens |
|------|--------|---------------|--------|
| 1 @sm | Haiku | Geração de story por template | ~3K |
| 2 @po | Haiku | Validação por checklist | ~2K |
| 3 @ux | Haiku | Edição cirúrgica + tabela | ~3K |
| 4 @architect | Haiku | Apenas grep determinístico | ~2K |
| 5a T1 @dev | Sonnet | Adaptação de path + refactor | ~5K |
| 5a T2 @dev | Haiku | 3 deletes + ls | ~1K |
| 5b T4 @dev | Haiku | Series of replaceAll | ~4K |
| 5b T5 @dev | Sonnet | Múltiplas remoções com TS | ~6K |
| 5b T6 @dev | Sonnet | Edits + remoção de imports | ~4K |
| 5b T7 @dev | Haiku | 2 edits triviais | ~1K |
| 5c T8 @dev | Sonnet | Reorder requer contexto | ~5K |
| 5c T9 @dev | Haiku | 2 edits curtos | ~2K |
| 6 @qa | Sonnet | Review + análise visual | ~10K |
| 7 @devops | Haiku | Comandos determinísticos | ~1K |

**Total estimado:** ~50K tokens distribuídos.
**Custo otimizado:** ~70% Haiku, ~30% Sonnet, 0% Opus.
