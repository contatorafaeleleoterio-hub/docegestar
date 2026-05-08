# ONB-11 — Gate de Navegação + GestationCounter no Dashboard

**Epic:** Onboarding v2.1
**Status:** Ready
**Estimativa:** 1 pt
**Dependências:** ONB-10 Done

---

## Descrição

Corrigir o gate de navegação em `app/index.tsx` para que usuários com perfil mas sem DPP sejam enviados ao dashboard (estado vazio) e não ao onboarding. Integrar `GestationCounter` em modo compacto no Card 8 do dashboard quando `dueDateISO` estiver disponível.

---

## Acceptance Criteria

- [ ] Usuário sem perfil → redireciona para `/onboarding`
- [ ] Usuário com perfil e sem `due_date` → redireciona para `/(tabs)/dashboard`
- [ ] Usuário com perfil e com `due_date` → redireciona para `/(tabs)/dashboard`
- [ ] Card 8 do dashboard exibe `<GestationCounter compact />` quando `dueDateISO` não é nulo
- [ ] `npm run typecheck` → 0 erros

---

## Scope IN

- `app/index.tsx` — remover `&& !!profile.dueDate` da condição do gate
- `app/(tabs)/dashboard.tsx` — import GestationCounter + renderização condicional no Card 8

## Scope OUT

- Lógica de plano (free/premium) — Epic 3+
- Qualquer alteração em outras telas do onboarding

---

## File List

| Arquivo | Ação |
|---------|------|
| `app/index.tsx` | Modificar |
| `app/(tabs)/dashboard.tsx` | Modificar |

---

## Change Log

| Data | Agente | Ação |
|------|--------|------|
| 2026-05-08 | @sm | Story criada |
| 2026-05-08 | @po | Status Draft → Ready (GO) |
