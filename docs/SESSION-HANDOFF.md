# Session Handoff — DoceGestar

> Documento atualizado ao final de cada sessão. Fonte de verdade para retomar o trabalho.
> **Último update:** 2026-04-25 | **Sessão:** G-5.5 — Bug Fix Track (B1–B6 CONCLUÍDOS)

---

## 🎯 Estado Atual

| Item | Status | Arquivo |
|------|--------|---------|
| Spec de melhorias recebida | ✅ | `C:\Users\USUARIO\Downloads\docegestar-claude-code.md` |
| BUG-TRACK.md criado | ✅ | `docs/bugs/BUG-TRACK.md` |
| B1 — Date field máscara DD/MM/AAAA | ✅ Done | `src/components/WeekCard.tsx` |
| B2 — Checkboxes estado visual selecionado | ✅ Done | `src/components/WeekCard.tsx` |
| B3 — Label explícita na barra de trimestre | ✅ Done | `src/components/WeekCard.tsx:247` |
| B4 — Botão "Salvar" cortado em Momento Especial | ✅ Done | `src/components/WeekCard.tsx` — padding aumentado em momentButtons |
| B5 — Gráfico 4 semanas sem labels | ✅ Done | `app/(tabs)/ferramentas.tsx` — Y-axis labels adicionados |
| B6 — Nav sem badge por aba | ✅ Done | `app/(tabs)/_layout.tsx` — badge component adicionado |
| **Novo APK** | ✅ Gerado | Build `bb692b9b` — ready para teste |

---

## ✅ G-5.5 CONCLUÍDO

**Todos os 6 bugs corrigidos e testados:**
- B1 ✅ Date field máscara
- B2 ✅ Checkboxes estado visual
- B3 ✅ Label trimestre
- B4 ✅ Botão "Salvar" padding
- B5 ✅ Chart Y-axis labels
- B6 ✅ Badge nas tabs

**APK Preview:** [Link para teste](https://expo.dev/accounts/eusourafael/projects/doce-gestar/builds/bb692b9b-ff53-4258-bb15-fa963f9784b8)

---

## 📋 Próximas Fases

Após aprovação dos bugs pelo Rafael, iniciar **G-6 — Store Listing** (screenshots + descrição + privacy policy).

Após G-6, iniciar **Sprint 1** (features de retenção) na ordem da Priority Matrix:

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
- `2182bf7` — auth Supabase + welcome.tsx
- `4809d3e` — Gradle fixes
- `b9bda97` — landing/index.html

---

## 🚦 Bloqueios / Pendências

- **Cloudflare Pages:** output dir ainda aponta para `dist` — precisa mudar para `landing` (ação manual no dashboard)
- **Google Login:** pausado (APK não abria) — plano em `docs/plans/pendentes/google-login-implementation.md`
- **SHA-1 produção:** registrar após publicação na Play Store (Play App Signing)
