# Plano Técnico de Refatoração — Front-End DoceGestar

**Data:** 2026-05-05  
**Status:** APROVADO — aguardando execução na próxima sessão  
**Executor:** `/gestor` → @dev  
**Contexto:** O app acumulou camadas de features (revista digital, reestruturação de menu, sprints de UX) que deixaram o front-end com arquivos redundantes, linguagem editorial ("revista"), inconsistências visuais e componentes duplicados. O objetivo é realinhar tudo ao conceito original: **feed moderno e dinâmico**, não revista/portal.

---

## 1. ESTRUTURAS A REMOVER

| Arquivo | Motivo | Impacto |
|---------|--------|---------|
| `app/(tabs)/config.tsx` | **Duplicata exata** de `perfil.tsx` (mesmo código, 258 linhas idênticas) | Zero — nenhuma rota aponta para ele |
| `app/(tabs)/semana.tsx` | Órfão — não está no array TABS do `_layout.tsx`. Substituído por `semana-detail.tsx` (stack route) | Zero — `semana-detail.tsx` já cobre |
| `app/(tabs)/timeline.tsx` | Órfão — não está no array TABS. Substituído por `timeline-detail.tsx` (stack route acessada via hero card) | Absorver melhorias visuais (pulse, auto-scroll, progress por trimestre) no `timeline-detail.tsx` antes de deletar |

> **Risco:** Expo Router registra automaticamente qualquer `.tsx` dentro de `(tabs)/` como rota no tab navigator, mesmo sem `<Tabs.Screen>`. Esses arquivos órfãos podem gerar rotas fantasma. Remover elimina esse risco.

---

## 2. VALIDAÇÃO DOS 4 MENUS OFICIAIS

| Tab | Arquivo | Status |
|-----|---------|--------|
| Início | `dashboard.tsx` | OK |
| Explorar | `explorar.tsx` | OK (conteúdo a refatorar) |
| Ferramentas | `ferramentas.tsx` | OK |
| Perfil | `perfil.tsx` | OK |

**`_layout.tsx`** já declara exatamente 4 tabs. Após remoção dos 3 arquivos órfãos, a navegação fica limpa.

---

## 3. ALTERAÇÕES PLANEJADAS

### 3.1 — Dashboard (`app/(tabs)/dashboard.tsx`)

| Alteração | Detalhe |
|-----------|---------|
| **Remover título duplicado** | `appTitle` ("DoceGestar") e `appSubtitle` ("Seu acompanhamento semanal") dentro do scroll — o header do `_layout.tsx` já exibe "DoceGestar" |
| **Remover Card "Registro rápido"** (Card 5) | Duplica a funcionalidade do `QuickLogFAB` — os 3 shortcuts (Sintomas, Consultas, Contador) são os mesmos atalhos do FAB |
| **Rebrand WeekPeekCard** | Trocar badge "REVISTA DA SEMANA" → "DESTAQUES DA SEMANA". Trocar CTA "Ver revista completa" → "Ver conteúdo completo" |
| **Reordenar cards** | Hero → Bebê → Destaques da Semana → Dica do dia → Sintomas → Curiosidade → Próxima consulta → Progresso |

### 3.2 — Explorar (`app/(tabs)/explorar.tsx` + `RevistaCard.tsx` + `revistaAdapter.ts`)

| Alteração | Detalhe |
|-----------|---------|
| **Renomear header** | "Revista da Semana" → "Sua Semana" |
| **Remover capítulos editoriais** | Eliminar badges de capítulo ("Abertura", "Bebê", "Você", etc.) dos cards — conteúdo deve parecer feed, não livro |
| **Simplificar RevistaCard** | Remover `chapter` badge de todos os layouts. Manter título + conteúdo sem a camada editorial |
| **Remover hero "Abertura"** | Card 1 (hero com "Bem-vinda à semana X") é redundante com o hero do dashboard |
| **Remover hero "Fechamento"** | Card final (hero "Semana X concluída!") — linguagem de revista. Substituir por um card simples de progresso |
| **Rebrand revistaAdapter** | Renomear `buildRevistaFeed` → `buildWeeklyFeed`. Remover `CHAPTER_COLORS` — usar cores do tema |
| **Eliminar `border-left` editorial** | `heroBorder` no RevistaCard tem `borderLeftWidth: 4` — padrão editorial, não feed |

### 3.3 — WeekPeekCard (`src/components/WeekPeekCard.tsx`)

| Alteração | Detalhe |
|-----------|---------|
| **Rebrand** | Badge "REVISTA DA SEMANA" → "DESTAQUES DA SEMANA" |
| **CTA** | "Ver revista completa" → "Ver conteúdo completo" |
| **Estilo** | Manter o card com `borderLeftColor: colors.primary` (acento visual leve, aceitável em feed) |

### 3.4 — Timeline Detail (`app/timeline-detail.tsx`)

| Alteração | Detalhe |
|-----------|---------|
| **Absorver melhorias** de `timeline.tsx` (órfão) antes de deletá-lo: pulse animation na semana atual, auto-scroll, headers visuais com ícone + progress bar por trimestre |
| **Resultado:** `timeline-detail.tsx` fica como a versão canônica |

### 3.5 — Ferramentas (`app/(tabs)/ferramentas.tsx`)

| Alteração | Detalhe |
|-----------|---------|
| **Padronizar card style** | Trocar glassmorphism (`rgba(255,255,255,0.85)` + shadow manual) pelo padrão do dashboard (`colors.surface` + `shadows.editorial`) |
| **Padronizar borderRadius** | `24` → `20` (mesmo do dashboard) |

### 3.6 — Perfil (`app/(tabs)/perfil.tsx`)

| Alteração | Detalhe |
|-----------|---------|
| Nenhuma alteração funcional — apenas padronizar `borderRadius` e spacing se divergirem |

---

## 4. MELHORIAS VISUAIS

| Melhoria | Onde | Detalhe |
|----------|------|---------|
| **Padronizar cards** | Todas as telas | `backgroundColor: colors.surface`, `borderRadius: 20`, `padding: spacing[4]`, `shadows.editorial` |
| **Remover cores hardcoded** | `timeline.tsx` L35: `'#8e44ad'` → `colors.primaryDeep` ou novo token |
| **Remover cores hardcoded** | `revistaAdapter.ts`: `CHAPTER_COLORS` inteiro → usar `colors.primary`, `colors.secondary`, `colors.accent` |
| **Remover cores hardcoded** | `RevistaCard.tsx` L489: `'#FFE5E5'` e `'#E5F5E5'` → `colors.errorContainer` e tokens semânticos |
| **Header sem duplicação** | Dashboard não precisa renderizar "DoceGestar" dentro do scroll — header da tab bar já mostra |

---

## 5. AJUSTES DE UX / FLUXO

| Ajuste | Impacto |
|--------|---------|
| **Remover "Registro rápido" do dashboard** | Menos poluição visual — FAB já cumpre essa função com bottom sheet elegante |
| **Feed do Explorar sem hierarquia editorial** | Cards independentes, cada um autocontido, sem sequência obrigatória de leitura |
| **Explorar sem progress bar de trimestre no header** | Já existe no dashboard (Card 8 Progresso) — redundante |

---

## 6. PROBLEMAS IDENTIFICADOS

| Problema | Severidade | Onde |
|----------|------------|------|
| 3 arquivos órfãos no `(tabs)/` gerando rotas fantasma | Alta | `config.tsx`, `semana.tsx`, `timeline.tsx` |
| Linguagem "revista" em 4 componentes contradiz identidade de feed | Alta | explorar, WeekPeekCard, RevistaCard, revistaAdapter |
| Card style inconsistente (3 variantes) | Média | dashboard vs ferramentas vs RevistaCard |
| `appTitle` duplicado no dashboard (header + scroll) | Média | `dashboard.tsx` L133-134 |
| `QuickLogFAB` + Card "Registro rápido" = redundância | Média | `dashboard.tsx` L237-254 |
| Cores hardcoded fora do design system | Baixa | `timeline.tsx`, `revistaAdapter.ts`, `RevistaCard.tsx` |
| `config.tsx` duplicata exata de `perfil.tsx` (258 linhas) | Alta | `app/(tabs)/config.tsx` |

---

## 7. IMPACTO TÉCNICO

| Efeito | Detalhe |
|--------|---------|
| **Arquivos deletados** | 3 (`config.tsx`, `semana.tsx`, `timeline.tsx`) |
| **Arquivos modificados** | 5 (`dashboard.tsx`, `explorar.tsx`, `RevistaCard.tsx`, `WeekPeekCard.tsx`, `timeline-detail.tsx`) |
| **Arquivos renomeados** | 0 |
| **Util modificado** | 1 (`revistaAdapter.ts` — rename function + remove chapter colors) |
| **Novos arquivos** | 0 |
| **Dependências** | Nenhuma adição/remoção |
| **Breaking changes** | Nenhum — todas as rotas ativas continuam funcionando |

---

## 8. ESTRATÉGIA DE EXECUÇÃO

| Ordem | Ação | Justificativa |
|-------|------|---------------|
| 1 | Absorver melhorias de `timeline.tsx` no `timeline-detail.tsx` | Preservar funcionalidade antes de deletar |
| 2 | Deletar 3 arquivos órfãos | Limpar navegação |
| 3 | Refatorar `revistaAdapter.ts` | Base de dados do feed — muda antes dos componentes |
| 4 | Refatorar `RevistaCard.tsx` | Componente depende do adapter |
| 5 | Refatorar `explorar.tsx` | Depende de RevistaCard |
| 6 | Refatorar `WeekPeekCard.tsx` | Rebrand independente |
| 7 | Refatorar `dashboard.tsx` | Remove redundâncias, reordena cards |
| 8 | Padronizar `ferramentas.tsx` | Card style |
| 9 | `npm run typecheck` | Validação |

---

## 9. PADRONIZAÇÃO VISUAL — Design Tokens Canônicos

```
Card padrão:
  backgroundColor: colors.surface (#FFFFFF)
  borderRadius: 20
  padding: spacing[4] (16px)
  shadow: shadows.editorial
  marginBottom: spacing[3] (12px)

Card destaque (accent):
  backgroundColor: colors.primaryTint (#FFF5FA)
  borderLeftWidth: 4
  borderLeftColor: colors.primary

Texto título card: typography.h3
Texto corpo card: typography.body / typography.bodySmall
Texto caption: typography.caption, color: colors.textSecondary
```

---

## 10. FLUXO FINAL ESPERADO

### Início (dashboard)
Hero gradiente → Bebê da semana → Destaques da semana (CTA p/ Explorar) → Dica do dia → Sintomas → Curiosidade → Próxima consulta → Progresso + FAB flutuante

### Explorar
Header "Sua Semana" (sem progress bar redundante) → Feed de cards independentes (stat, lista, checklist, pergunta, faq) sem capítulos ou hierarquia editorial → Conteúdo rápido e consumível

### Ferramentas
Título → Consultas Pré-Natais → Meu Corpo esta Semana → Contador de Chutes → Temporizador de Contrações (cards padronizados)

### Perfil
Dados pessoais → Notificações → Reset → Disclaimer

---

## 11. VERIFICAÇÃO

1. `npm run typecheck` — zero erros
2. Verificar visualmente no preview (web ou emulador):
   - 4 tabs funcionando
   - Nenhuma rota fantasma
   - Cards com estilo uniforme
   - Nenhuma menção a "revista" na UI
   - Feed do Explorar sem capítulos/hierarquia editorial
   - Dashboard sem título duplicado
   - FAB funcional, card "Registro rápido" removido
   - Timeline acessível via hero card
