# Session Handoff — DoceGestar

> Documento atualizado ao final de cada sessão. Fonte de verdade para retomar o trabalho.
> **Último update:** 2026-04-25 | **Sessão:** G-6 CONCLUÍDO — G-7 PAUSADO (bugs pendentes a revisar)

---

## 🎯 Estado Atual

| Item | Status | Arquivo |
|------|--------|---------|
| G-5.5 — B1–B6 corrigidos | ✅ Done | commits ff0e21b, ddc10dd, 11ab9ca |
| G-6 — Privacy policy + Store listing | ✅ Done | commit 040ff7c |
| APK Preview | ✅ Gerado | Build `bb692b9b` |
| G-7 — Publicação | 🔒 **PAUSADO** | Rafael identificou bugs adicionais a resolver |
| Bug: tslib não resolve no web (supabase) | 🚨 Blocker web | `app/welcome.tsx` → `src/utils/supabase.ts` importa tslib ausente |

---

## ⚡ PRÓXIMA AÇÃO IMEDIATA

**G-7 está pausado.** Rafael precisa revisar o app (APK bb692b9b) e listar os bugs encontrados.
Após lista de bugs → corrigir → novo APK → G-7.

### Blocker técnico — web preview (tela preta)
**Causa:** `app/welcome.tsx` importa `src/utils/supabase.ts` que depende de `tslib` (não instalado).
**Fix:** `npm install tslib` ou remover supabase.ts do welcome.tsx (preferível — app usa SQLite local).

---

## ✅ Sessões Concluídas

| Sessão | Status | Detalhe |
|--------|--------|---------|
| G-5.5 — B1–B6 | ✅ | 6 bugs corrigidos, APK bb692b9b gerado |
| G-6 — Store Listing | ✅ | `landing/privacidade.html` + `docs/store-listing/play-store-texts.md` |

---

## 📋 Próximas Fases

Após resolução dos bugs, iniciar **Sprint 1** (features de retenção) na ordem da Priority Matrix:

| Rank | Item | ROI |
|------|------|-----|
| 1 | Daily Streak Counter (D) | S+ |
| 2 | Animated Baby/Fruit Comparison (B) | S+ |
| 3 | Contextual Push (E) | S+ |
| 4 | Modular Feed / Home Scroll (A) | S |
| 5 | FAB Quick-Log (C) | S |

Spec completa em `C:\Users\USUARIO\Downloads\docegestar-claude-code.md` seção 6.

---

## 🛠️ Contexto Técnico

### Arquivo principal de bugs: `src/components/WeekCard.tsx`
- B3 fix (linha 247): `{TRIMESTER_LABELS[weekData.trimester]} — Semana {weekNumber} · {progress}% do trimestre`
- Checkboxes de sintomas: linhas ~324–360
- Momento Especial: linhas ~430–460 (aproximado)

### Stack
- React Native + Expo SDK 55
- SQLite local (`src/db/index.ts`)
- Expo Notifications configurado
- EAS Build: projeto `@eusourafael/doce-gestar`
- APK preview gerado: build `5f8dddbe` ✅

### Commits recentes
- `040ff7c` — G-6: privacy policy + store listing texts
- `e84a12e` — SESSION-HANDOFF atualizado
- `ff0e21b` — fix B4, B5, B6
- `ddc10dd` — fix ícone e splash
- `11ab9ca` — logo oficial DoceGestar

---

## 🚦 Bloqueios / Pendências

- **Cloudflare Pages:** output dir ainda aponta para `dist` — precisa mudar para `landing` (ação manual no dashboard)
- **Google Login:** pausado (APK não abria) — plano em `docs/plans/pendentes/google-login-implementation.md`
- **SHA-1 produção:** registrar após publicação na Play Store (Play App Signing)
