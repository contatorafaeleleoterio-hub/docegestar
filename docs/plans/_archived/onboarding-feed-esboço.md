# Esboço — Onboarding v2.1 + Feed (Revista Digital)
**Data:** 2026-05-07
**Status:** Plano inicial — aguarda execução

---

## Track A — Onboarding v2.1 (12 stories)

| Story | Escopo resumido | Arquivos principais |
|-------|-----------------|---------------------|
| ONB-1 | Migration + Schema (relationship, plan, plan_expires_at) | `src/db/schema.ts`, `src/types/index.ts` |
| ONB-2 | Utils de data (calcDPPFromLMP, calcDPPFromConception, calcGestationMetrics) | `src/utils/dateUtils.ts` |
| ONB-3 | Componentes base (FloatingLabelInput, FloatingLabelSelect, MethodCard, ProgressDots, PrimaryButton, GradientButton) | `src/components/onboarding/` |
| ONB-4 | BottomSheet + GestationCounter (Animated — sem lib externa) | `src/components/onboarding/` |
| ONB-5 | OnboardingContext — draft preservation + back navigation | `src/context/OnboardingContext.tsx` |
| ONB-6 | Tela 1: Welcome + stub ComingSoon | `app/onboarding/Welcome.tsx`, `app/onboarding/ComingSoon.tsx` |
| ONB-7 | Tela 2: Profile (nome + parentesco) | `app/onboarding/Profile.tsx` |
| ONB-8 | Tela 3: DueDate + seleção método + date picker + error state | `app/onboarding/DueDate.tsx` |
| ONB-9 | Modal: CongratulationsSheet (BottomSheet + GestationCounter) | renderizado sobre DueDate via state |
| ONB-10 | Tela 4: Plans stub (array configurável, sem pagamento) | `app/onboarding/Plans.tsx` |
| ONB-11 | Gate de navegação + GestationCounter no Dashboard | `app/index.tsx`, `app/(tabs)/dashboard.tsx` |
| ONB-12 | QA Gate completo (fluxo primário + "Definir depois" + back navigation) | — |

**Spec completa:** `docs/master/onboarding_spec_v2.md`
**Story ONB-1:** `docs/stories/ONB-1.story.md` (Ready — validada @po 10/10)

---

## Track B — Feed / Revista Digital (4 stories)

| Story | Escopo resumido | Arquivos principais |
|-------|-----------------|---------------------|
| R.1 | Tipos + dados revista para semanas 16 e 17 | `src/types/index.ts`, `src/data/weeks/weeks-14-27.ts` |
| R.2 | Componente RevistaCard (5 layouts: Hero / Stat / Lista / Pergunta / Checklist) | `src/components/RevistaCard.tsx` |
| R.3 | Tela `app/revista/[week].tsx` — FlatList de cards | `app/revista/[week].tsx` |
| R.4 | Entry point no dashboard + copiar assets das semanas 16 e 17 | `app/(tabs)/dashboard.tsx`, `assets/revista/` |

**Proposta completa:** `memory/revista_feed_proposta.md`

---

## Sequência de execução

```
ONB-1 → ONB-2 → ONB-3 → ONB-4 → ONB-5
→ ONB-6 → ONB-7 → ONB-8 → ONB-9 → ONB-10
→ ONB-11 → ONB-12 (QA Gate)
→ R.1 → R.2 → R.3 → R.4
```

**Fluxo por story:** @sm draft → @po valida → @dev implementa → @qa gate → @devops push

---

## Decisões em aberto (resolver com @po antes de ONB-10)

- Quais funcionalidades são free vs premium na Tela de Planos?
- Conteúdo do carrossel de features na Tela 4

---

## Estimativa

| Track | Stories | Sessões estimadas |
|-------|---------|-------------------|
| Onboarding v2.1 | 12 | 6–8 sessões |
| Feed / Revista | 4 | 3–4 sessões |
| **Total** | **16** | **~10–12 sessões** |
