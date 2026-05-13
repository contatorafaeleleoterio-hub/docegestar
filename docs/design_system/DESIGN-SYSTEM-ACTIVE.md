# Design System Ativo — DoceGestar "Moderno Suave"

**Versão:** v3 canônica (2026-05-12)

## Tokens

| Token | Valor |
|-------|-------|
| Primary | `#EC3779` (pink500) |
| Background | `#FBF7FA` (creme rosado) |
| Text | `#1F1A2E` (ink) |
| Secondary | `#C9B8E8` (lavanda) |

## Fontes

- **UI:** Plus Jakarta Sans (500, 600, 700, 800)
- **Editorial:** Fraunces 500 Italic (pull quotes)

## Sistema de Ícones

- **Componente:** `DGIcon` em `src/components/DGIcon.tsx`
- **Ícones disponíveis:** 38 (36 originais + `compass` + `tool` adicionados em DS-6)
- **Variantes:** `outline` (default) | `tinted` | `solid` | `premium`
- **PROIBIDO:** `@expo/vector-icons/Ionicons` em código de produto
  - **Exceção única:** `logo-google` no botão OAuth de `app/welcome.tsx` (brand Google)

## Regras

| Regra | Detalhe |
|-------|---------|
| Emojis | **BANIDOS** em todo código de produção (JSX, strings de label, textos de UI) |
| Ícones | Usar exclusivamente `DGIcon` com `DGIconName` tipado |
| Branding parceiro | Manter biblioteca original do parceiro (ex: Google logo = Ionicons) |
| Cores hardcoded | Usar sempre tokens de `colors.*` — `#fff` → `colors.onPrimary` ou `colors.surface` |

## Arquivos de referência

- Tokens: `src/theme/colors.ts`, `spacing.ts`, `borderRadius.ts`, `shadows.ts`
- Tipografia: `src/theme/typography.ts`
- Ícones: `src/components/DGIcon.tsx` (38 ícones, 4 variants)

## Handoff arquivado

`docs/design_system/_archived/design_handoff_docegestar/`
