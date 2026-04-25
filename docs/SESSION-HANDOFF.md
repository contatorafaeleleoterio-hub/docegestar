# Session Handoff — DoceGestar

> Documento atualizado ao final de cada sessão. Fonte de verdade para retomar o trabalho.
> **Último update:** 2026-04-22 | **Sessão:** G-5.5 — Bug Fix Track (B1–B3 concluídos)

---

## 🎯 Estado Atual

| Item | Status | Arquivo |
|------|--------|---------|
| Spec de melhorias recebida | ✅ | `C:\Users\USUARIO\Downloads\docegestar-claude-code.md` |
| BUG-TRACK.md criado | ✅ | `docs/bugs/BUG-TRACK.md` |
| B1 — Date field máscara DD/MM/AAAA | ✅ Done | `src/components/WeekCard.tsx` |
| B2 — Checkboxes estado visual selecionado | ✅ Done | `src/components/WeekCard.tsx` |
| B3 — Label explícita na barra de trimestre | ✅ Done | `src/components/WeekCard.tsx:247` |
| B4 — Botão "Salvar" cortado em Momento Especial | ⏳ **PRÓXIMO** | `src/components/WeekCard.tsx` |
| B5 — Gráfico 4 semanas sem labels | ⏳ Pendente | `app/(tabs)/ferramentas.tsx` |
| B6 — Nav sem badge por aba | ⏳ Pendente | `app/(tabs)/_layout.tsx` |

---

## ⚡ PRÓXIMA AÇÃO IMEDIATA

### B4 — Botão "Salvar" clipped em Momento Especial

**Problema:** O botão "Salvar" em Momento Especial está cortado por overflow.  
**Fix:** `src/components/WeekCard.tsx` — localizar seção Momento Especial (perto de `handleSaveMoment`).  
Adicionar `paddingBottom` adequado antes do fim do ScrollView + verificar `safeAreaInsets`.  
**Teste:** Verificar em 3 viewports: 375px (SE), 390px (14), 428px (14 Plus).

---

## 📋 Sequência Completa pós-bugs

Após B6 concluído, iniciar **Sprint 1** na ordem da Priority Matrix:

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
