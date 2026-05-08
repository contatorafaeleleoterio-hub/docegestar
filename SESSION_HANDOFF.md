# SESSION_HANDOFF — DoceGestar | 2026-05-08

## Sessão Atual
- **Track:** Onboarding v2.1 — Sessão 6 (ONB-11 + ONB-12) ✅ **EPIC CONCLUÍDO**
- **Status:** ✅ Done — commit `7837478` pushado

---

## Story Ativa
- **ID:** ONB-12 ✅ Done (última do Epic Onboarding)
- **Próxima:** R.1–R.4 (Feed Nativo / Revista Digital)

## O que foi implementado nesta sessão

### ONB-11 + ONB-12 — commit `7837478`
- `app/index.tsx` — gate corrigido: `profile !== null` (sem `&& !!profile.dueDate`) → usuário com perfil mas sem DPP vai para dashboard
- `app/(tabs)/dashboard.tsx` — `<GestationCounter estimatedDueDate={dueDateISO} compact />` adicionado no Card 8 (condicional a `dueDateISO`)
- `docs/stories/ONB-11.story.md` + `docs/stories/ONB-12.story.md` criados

---

## QA Gates

| Gate | Resultado |
|------|-----------|
| `npm run typecheck` | ✅ 0 erros |
| `npm test` | ✅ 10/10 PASS |
| `npx expo export --platform web` | ✅ 1.9MB PASS |
| QA 7 cenários | ✅ 7/7 PASS |

---

## Push

- Commit `7837478` pushado para `origin/master`

---

## Próxima ação ao retomar

```
/gestor → R.1–R.4 (Feed Nativo)
```

Epic Onboarding v2.1 ✅ Done (ONB-1 a ONB-12 concluídos).
Próximo: criar plano R.1–R.4 para transformar Revista Digital em feed nativo no app.

---

## Arquivos tocados nesta sessão

| Arquivo | Status |
|---------|--------|
| `app/index.tsx` | ✅ Modificado (ONB-11) |
| `app/(tabs)/dashboard.tsx` | ✅ Modificado (ONB-11) |
| `docs/stories/ONB-11.story.md` | ✅ Criado |
| `docs/stories/ONB-12.story.md` | ✅ Criado |

## Decisões desta sessão

- **Gate sem DPP:** usuário que clicou "Definir depois" tem `due_date=null` no perfil — gate deve enviar ao dashboard, não ao onboarding. Fix cirúrgico em `app/index.tsx`.
- **GestationCounter compact:** renderizado logo acima da barra de progresso no Card 8, condicional a `dueDateISO`. Exibe semana atual + semanas restantes.
