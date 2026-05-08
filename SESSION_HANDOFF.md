# SESSION_HANDOFF — DoceGestar | 2026-05-08

## Sessão Atual
- **Track:** Onboarding v2.1 — Sessão 2 (ONB-4 + ONB-5)
- **Objetivo:** BottomSheet + GestationCounter + OnboardingContext + saveOnboardingProfile
- **Status:** ✅ Done — 2 stories concluídas, 4 commits pushados

---

## Story Ativa
- **ID:** ONB-4 ✅ Done | ONB-5 ✅ Done
- **Próxima:** ONB-6 + ONB-7 (Sessão 3)

## O que foi implementado nesta sessão

### ONB-4 — commit `155363d`
- `src/components/ui/BottomSheet.tsx` — Modal transparent + Animated overlay (0→0.4, 300ms) + sheet (translateY 300→0, 350ms), ambos useNativeDriver:true. Handle visual 32×4px. Fecha com animação reversa e chama onDismiss() no callback.
- `src/components/ui/GestationCounter.tsx` — usa `calcGestationMetrics()`. Modo full: 3 rows (decorrido / restante / DPP formatada). Modo compact: badge "Sem N" + subtexto.
- `src/components/ui/index.ts` — 4 exports adicionados (BottomSheet + GestationCounterProps)

### ONB-5 — commit `616d843`
- `src/context/OnboardingContext.tsx` — OnboardingProvider + useOnboarding(). Draft: {name, relationship, dueDateMethod, inputDate, estimatedDueDate}. clearDate() preserva name+relationship.
- `src/hooks/useUserProfile.ts` — getProfile() expandido (+ relationship, plan, planExpiresAt). Nova função saveOnboardingProfile({ name, relationship, dueDate, plan }) — UPSERT sem tocar saveProfile().

---

## QA Gates

| Gate | Resultado |
|------|-----------|
| ONB-4+5: `npm run typecheck` | ✅ 0 erros |
| ONB-4+5: `npm test` | ✅ 10/10 PASS |
| ONB-4+5: `npx expo export --platform web` | ✅ Bundle PASS |

---

## Push

- 4 commits pushados para `origin/master`:
  - `4cbf69a` feat(onb2)
  - `15587ab` feat(onb3)
  - `155363d` feat(onb4)
  - `616d843` feat(onb5)

---

## Próxima ação ao retomar

```
/gestor → Sessão 3 → ONB-6 (Welcome + Stub _layout) + ONB-7 (Profile)
```

**Fluxo Sessão 3:**
1. **ONB-6** — `app/onboarding/_layout.tsx` (wraps com OnboardingProvider) + `app/onboarding/index.tsx` (tela Welcome com CTA)
2. **ONB-7** — `app/onboarding/profile.tsx` (inputs nome + quem usa + RelationshipCard)

**Plano-mestre:** `C:\Users\USUARIO\.claude\plans\me-mostre-o-plano-cached-ocean.md` (seções ONB-6 e ONB-7)

---

## Arquivos tocados nesta sessão

| Arquivo | Status |
|---------|--------|
| `src/components/ui/BottomSheet.tsx` | ✅ Criado (ONB-4) |
| `src/components/ui/GestationCounter.tsx` | ✅ Criado (ONB-4) |
| `src/components/ui/index.ts` | ✅ Modificado (+4 exports) |
| `src/context/OnboardingContext.tsx` | ✅ Criado (ONB-5) |
| `src/hooks/useUserProfile.ts` | ✅ Modificado (getProfile + saveOnboardingProfile) |
| `docs/stories/ONB-4.story.md` | ✅ Criado (Done) |
| `docs/stories/ONB-5.story.md` | ✅ Criado (Done) |

## Decisões desta sessão

- **BottomSheet usa `colors.text` (not colors.overlay)** como base da overlay — `colors.overlay` já inclui alpha fixo, mas precisamos animar de 0 até 0.4 via `Animated.Value`. Solução: backgroundColor=colors.text (preto opaco) + opacity animada.
- **`src/context/` (singular):** seguindo convenção do plano técnico aprovado (não `contexts/`).
- **saveOnboardingProfile separado de saveProfile:** `saveProfile` é usado em `perfil.tsx` com assinatura diferente — não tocar para evitar regressão.
