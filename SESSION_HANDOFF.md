# SESSION_HANDOFF — DoceGestar | 2026-05-12

## Story Ativa
- **ID:** DS-1
- **Título:** Token Layer — Migração Design System (Moderno Suave)
- **Status:** ⏳ Pronta para execução (plano revisado e aprovado pela equipe AIOX)
- **Plano completo:** `docs/plans/design-system-migration.md`

## O que foi feito nesta sessão
- Handoff Claude Design analisado (`docs/design_system/design_handoff_docegestar/`)
- Plano de migração DS-1..DS-5 criado e salvo
- **Revisão AIOX completa:** @architect, @dev, @qa, @po, @sm — todos aprovaram
- Plano atualizado com melhorias da revisão (conversão shadows, checklist visual, riscos)
- LAUNCH-TRACK.md atualizado com stories DS-1..5
- project_status.md atualizado
- design_system_migration.md (memory) atualizado

## Melhorias da Revisão AIOX (incorporadas ao plano)
1. **@architect:** Conversão explícita CSS shadows → RN platform-specific (shadowColor/elevation)
2. **@architect:** Sem backward compat para borderRadius — migrar todos usos de pill de uma vez
3. **@dev:** 4 fonts novas vs. 6 atuais — mais leve
4. **@qa:** Checklist visual obrigatório de TODAS as telas em DS-3
5. **@qa:** Testar body 14px em viewport 320px

## Riscos Documentados
| # | Risco | Severidade |
|---|-------|-----------|
| 1 | Shadows CSS incompatível com RN | CRÍTICO — mitigação detalhada no plano |
| 2 | 29 arquivos afetados | ALTO — manter chaves semânticas |
| 3 | Pill 32→100px | ALTO — migrar sem compat |
| 4 | Body 16→14px | MÉDIO — testar 320px |
| 5 | 36 ícones SVG | MÉDIO — react-native-svg |

## Próxima ação ao retomar
Executar **DS-1 + DS-2 + DS-3** em sequência:

```
DS-1: Reescrever src/theme/colors.ts, spacing.ts, borderRadius.ts, shadows.ts
      (shadows: converter CSS → RN platform-specific)
DS-2: npx expo install @expo-google-fonts/plus-jakarta-sans @expo-google-fonts/fraunces
      npm uninstall @expo-google-fonts/noto-serif @expo-google-fonts/manrope
      Reescrever src/theme/typography.ts
      Atualizar app/_layout.tsx (trocar NotoSerif+Manrope → PlusJakartaSans+Fraunces)
DS-3: npm run typecheck → zero erros
      Migrar todos usos de pill (32→100)
      Verificação visual: dashboard, explorar, ferramentas, perfil, onboarding (6 telas)
      Testar body 14px em viewport 320px
```

## Arquivos a tocar (DS-1..3)

| Arquivo | Status |
|---------|--------|
| `src/theme/colors.ts` | ⏳ Reescrever |
| `src/theme/spacing.ts` | ⏳ Adicionar 20, 40, 56 |
| `src/theme/borderRadius.ts` | ⏳ Nova escala xs:8 → pill:100 |
| `src/theme/shadows.ts` | ⏳ Pink-tinted + conversão CSS→RN |
| `src/theme/typography.ts` | ⏳ Plus Jakarta Sans + Fraunces |
| `app/_layout.tsx` | ⏳ Trocar imports de fontes |
| `package.json` | ⏳ Novos pacotes de fonte |

## Decisões desta sessão
- Manter chaves semânticas existentes no colors.ts (sem quebrar componentes) — apenas atualizar valores
- Adicionar aliases novos do design system (pink500, ink, lav50, etc.) como extras
- Shadows: converter notação CSS para React Native (iOS shadowColor + Android elevation)
- Pill: migrar de 32→100 sem backward compat — todos usos de uma vez em DS-3
- DS-4 (ícones) é sessão separada — maior story (36 ícones SVG)
- DS-5 (arquivo docs antigos) somente após DS-4 concluído
- Verificação visual obrigatória de todas as telas em DS-3

## Referência dos Tokens

| Token semântico | Chave nova | Valor |
|-----------------|------------|-------|
| primary | pink500 | `#EC3779` |
| primaryDeep | pink600 | `#C8255F` |
| primaryLight | pink50 | `#FFF1F5` |
| background | bg | `#FBF7FA` |
| surface | surface | `#FFFFFF` |
| text | ink | `#1F1A2E` |
| textSecondary | inkMuted | `#5E5870` |
| border | hairline | `#EDE7F3` |
| success | success | `#3DB57E` |
| warning | warning | `#F0A23A` |
| error | danger | `#E15858` |
| Fonte UI | — | Plus Jakarta Sans |
| Fonte editorial | — | Fraunces italic |

## Handoff files

📁 `C:\Users\USUARIO\Desktop\GESTANTE\meu-projeto\docs\design_system\design_handoff_docegestar\`
- **README.md** — spec completa
- **tokens.jsx** — todos os tokens
- **ds-icons.jsx** — 36 ícones (DS-4)
- **DoceGestar.html** — 17 telas hi-fi (abrir no browser)
- **DesignSystem.html** — documentação visual interativa
