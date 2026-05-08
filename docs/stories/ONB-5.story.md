# Story ONB-5 — OnboardingContext + saveOnboardingProfile

**Status:** Done
**Epic:** Onboarding v2.1
**Estimate:** 3 pts
**Created:** 2026-05-08
**Author:** @sm (River)

## Description

Criar a camada de estado e persistência do onboarding:
- **OnboardingContext**: React Context com draft em memória (name, relationship, dueDateMethod, inputDate, estimatedDueDate). Compartilhado entre todas as telas ONB-6 a ONB-10.
- **saveOnboardingProfile()**: nova função em `useUserProfile.ts` que persiste o perfil completo via UPSERT. Não altera `saveProfile()` existente.
- **getProfile()**: expandido para retornar `relationship`, `plan`, `planExpiresAt` (colunas adicionadas em ONB-1).

## Acceptance Criteria

1. **GIVEN** `useOnboarding()` dentro de `OnboardingProvider`, **THEN** retorna `{ draft, setName, setRelationship, setDueDateMethod, setInputDate, setEstimatedDueDate, clearDate }`.
2. **GIVEN** `useOnboarding()` fora de `OnboardingProvider`, **THEN** lança `Error('useOnboarding must be used inside OnboardingProvider')`.
3. **GIVEN** `clearDate()` chamado, **THEN** `draft.dueDateMethod`, `draft.inputDate`, `draft.estimatedDueDate` são `null`; `draft.name` e `draft.relationship` são preservados.
4. **GIVEN** `saveOnboardingProfile({ name, relationship, dueDate, plan })`, **THEN** UPSERT em `user_profile` WHERE `id=1` com os 4 campos; `saveProfile()` existente permanece inalterado.
5. **GIVEN** `getProfile()`, **THEN** retorna objeto com `relationship`, `plan`, `planExpiresAt` além dos campos já existentes.
6. **GIVEN** `npm run typecheck`, **THEN** 0 erros.
7. **GIVEN** `npm test`, **THEN** 10/10 PASS (testes dateUtils não quebrados).

## Scope IN

- `src/context/OnboardingContext.tsx` (novo diretório + arquivo)
- Modificar `src/hooks/useUserProfile.ts` (`getProfile` + nova `saveOnboardingProfile`)

## Scope OUT

- `app/onboarding/_layout.tsx` (ONB-6 injeta o Provider)
- Persistência do draft antes do modal "Parabéns!" (ONB-9 chama saveOnboardingProfile)
- Remoção do `app/onboarding.tsx` antigo (ONB-6)

## Dependencies

ONB-1 Done ✅ (colunas `relationship`, `plan`, `plan_expires_at` em `user_profile`)
ONB-4 Done ✅ (BottomSheet + GestationCounter prontos para ONB-9)

## Tasks

- [x] T1: Criar `src/context/OnboardingContext.tsx` (Provider + hook + clearDate) (@dev)
- [x] T2: Modificar `getProfile()` em `useUserProfile.ts` (SELECT + retorno expandidos) (@dev)
- [x] T3: Adicionar `saveOnboardingProfile()` em `useUserProfile.ts` (UPSERT 4 campos) (@dev)
- [x] T4: `npm run typecheck` → 0 erros (@qa)
- [x] T5: `npm test` → 10/10 PASS (@qa)
- [x] T6: Commit `feat(onb5): add OnboardingContext and saveOnboardingProfile` (@devops)

## File List

| Arquivo | Ação |
|---------|------|
| `src/context/OnboardingContext.tsx` | CRIAR |
| `src/hooks/useUserProfile.ts` | MODIFICAR |

## Change Log

| Date | Author | Change |
|------|--------|--------|
| 2026-05-08 | @sm | Story criada |
| 2026-05-08 | @po | Validada 10/10 ✅ → Status Draft → Ready |
| 2026-05-08 | @dev | T1–T3 implementados |
| 2026-05-08 | @qa | T4 typecheck 0 erros ✅ + T5 10/10 PASS ✅ |

## Dev Notes

- `src/context/` é diretório novo — criar com o arquivo.
- `clearDate` usa spread: `setDraft(prev => ({ ...prev, dueDateMethod: null, inputDate: null, estimatedDueDate: null }))`.
- `saveOnboardingProfile` aceita `dueDate: string | null` — null = "definir depois".
- Cast: `(row.relationship as UserProfile['relationship'])` para satisfazer o tipo union.
