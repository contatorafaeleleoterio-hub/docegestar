# DoceGestar — Bug Track (Product Improvement Spec)

> Fonte: `C:\Users\USUARIO\Downloads\docegestar-claude-code.md`  
> Sequência obrigatória: resolver bugs ANTES de qualquer nova feature.

---

## Status dos Bugs

| # | Bug | Fix Especificado | Status | Arquivo |
|---|-----|-----------------|--------|---------|
| B1 | Date field sem máscara/validação | Máscara DD/MM/AAAA + validação em tempo real | ✅ Done | `src/components/WeekCard.tsx` |
| B2 | Checkboxes (náusea/humor/apetite/sintomas) sem estado visual selecionado | Estado ativo: ícone preenchido + cor + micro-animação | ✅ Done | `src/components/WeekCard.tsx` |
| B3 | Barra do trimestre mostra "15% do trimestre" sem indicar qual trimestre | Label explícita: "2º Trimestre — Semana 16 · 15% do trimestre" | ✅ Done | `src/components/WeekCard.tsx` linha 247 |
| B4 | Botão "Salvar" cortado (overflow) em "Momento Especial" | Fix padding + safe-area; testar em 3 tamanhos de tela | ✅ Done | `src/components/WeekCard.tsx` |
| B5 | Gráfico "Últimas 4 semanas": 4 zeros, sem labels de sintoma | Labels no eixo Y + tooltip por barra ao tocar | ✅ Done | `app/(tabs)/ferramentas.tsx` |
| B6 | Nav inferior sem badge/indicador de conteúdo novo ou ações pendentes | Badge numérico + ponto de novidade por aba | ✅ Done | `app/(tabs)/_layout.tsx` |

---

## Fix B3 — Detalhe Técnico

**Antes:** `{progress}% do trimestre atual`  
**Depois:** `{TRIMESTER_LABELS[weekData.trimester]} — Semana {weekNumber} · {progress}% do trimestre`

Resultado: "2º Trimestre — Semana 16 · 15% do trimestre"  
Deixa claro qual trimestre está ativo, eliminando ambiguidade visual.

---

## Próxima Ação

**B4** — Botão "Salvar" em Momento Especial está cortado.  
Arquivo: `src/components/WeekCard.tsx` — buscar seção `Momento Especial` / `handleSaveMoment`.  
Fix: adicionar `paddingBottom` + `SafeAreaView` ou `marginBottom` suficiente antes do fim do ScrollView.  
Testar viewport: 375px / 390px / 428px.

---

## Fonte Completa

O arquivo original com todas as features (Sprint 1, Sprint 2, novas features, matriz de prioridade) está em:  
`C:\Users\USUARIO\Downloads\docegestar-claude-code.md`

Após B6 concluído, iniciar **Sprint 1 de Features** na ordem da Priority Matrix (seção 6 do spec).
