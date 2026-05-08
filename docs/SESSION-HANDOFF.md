# Session Handoff — DoceGestar

> Documento atualizado ao final de cada sessão. Fonte de verdade para retomar o trabalho.
> **Último update:** 2026-05-08 | **Sessão:** ONB-6 + ONB-7 (Sessão 3)

## Story Ativa
- **ID:** ONB-6 + ONB-7
- **Título:** Welcome + ComingSoon + Profile screens
- **Status:** Done
- **Commit:** `4dbe76c`

## O que foi implementado nesta sessão

- `app/onboarding/_layout.tsx` — Stack navigator + OnboardingProvider wrapper
- `app/onboarding/index.tsx` — Tela Welcome (botão primário → Profile, botão secundário → ComingSoon, footer legal)
- `app/onboarding/coming-soon.tsx` — Stub "Em breve" com botão Voltar
- `app/onboarding/profile.tsx` — Tela Profile (FloatingLabelInput nome + FloatingLabelSelect relacionamento + ProgressDots + PrimaryButton desabilitado até relationship selecionado)
- `app/_layout.tsx` — removido `presentation: 'modal'` do onboarding
- `app/onboarding.tsx` — **deletado** (v1 substituído pela pasta multi-route)

## Próxima ação ao retomar
**Sessão 4 — ONB-8 + ONB-9:**
- `app/onboarding/due-date.tsx` — Tela DueDate (MethodCard + FloatingLabelInput com date picker + animação + validação + error state)
- `app/onboarding/congratulations.tsx` (ou state sobre DueDate) — Modal "Parabéns!" com BottomSheet + GestationCounter

## Arquivos tocados
| Arquivo | Status |
|---------|--------|
| `app/onboarding/_layout.tsx` | ✅ Criado |
| `app/onboarding/index.tsx` | ✅ Criado |
| `app/onboarding/coming-soon.tsx` | ✅ Criado |
| `app/onboarding/profile.tsx` | ✅ Criado |
| `app/_layout.tsx` | ✅ Atualizado |
| `app/onboarding.tsx` | 🗑️ Deletado (v1) |

## Decisões desta sessão
- Onboarding v1 (`onboarding.tsx`) deletado — substituído por estrutura multi-route em pasta
- `presentation: 'modal'` removido do root layout (não compatível com stack interno)
- Profile screen navega para `/onboarding/due-date` (rota da ONB-8 — próxima sessão)
- Typecheck: 0 erros | Push: `4dbe76c` ✅
