# Cowork Plan — Revista Feed (Explorar Tab)
**Data:** 2026-05-03
**Objetivo:** Transformar a tab "Explorar" em feed nativo de cards semanais

---

## Arquitetura alvo

```
Tab "Explorar"
  └── app/(tabs)/explorar.tsx
        └── FlatList vertical (cards da semana atual)
              ├── Card Hero        — Abertura celebração
              ├── Card Stat        — Bebê: tamanho / peso / fruta
              ├── Card Lista       — Bebê: marcos do desenvolvimento
              ├── Card Lista       — Você: sintomas da semana
              ├── Card Lista       — Nutrição: top 3 nutrientes
              ├── Card Lista       — Sinais de alerta (warningSignals)
              ├── Card Checklist   — Ação prática (weeklyChecklist)
              ├── Card Pergunta    — Psicologia: prompt interativo
              ├── Card FAQ         — MythBuster (mito vs. fato)
              └── Card Hero        — Fechamento: conquista + CTA share
```

**Stack:** dados de `WeekContent` (já existentes em src/data/) sem conteúdo novo no MVP.

---

## Etapa 1 — Tipos e adaptador de dados
**Arquivo alvo:** `src/types/index.ts` + novo `src/utils/revistaAdapter.ts`
**Pode iniciar:** imediatamente (sem dependências)
**Agente:** @dev
**Modelo recomendado:** `claude-haiku-4-5-20251001`
**Justificativa:** Tarefa mecânica — adicionar tipos estáticos e mapear campos A→B sem lógica complexa.
**Tokens estimados:** Baixo (~3K)

### Prompt para o cowork:
```
@dev você irá adicionar tipos para o feed Revista e criar um adaptador de dados.

CONTEXTO:
- Projeto: DoceGestar (React Native + Expo + TypeScript)
- Arquivo de tipos: src/types/index.ts
- Dados das semanas: src/data/index.ts → getWeek(n) → WeekContent

TAREFA 1 — Adicionar ao src/types/index.ts (após WeekCompletion):

export type RevistaCardLayout = 'hero' | 'stat' | 'lista' | 'checklist' | 'pergunta' | 'faq';

export interface RevistaCard {
  id: string;
  layout: RevistaCardLayout;
  chapter: string;        // ex: "Bebê", "Nutrição"
  chapterColor: string;   // hex
  title: string;
  subtitle?: string;
  items?: string[];       // para layout lista/checklist
  question?: string;      // para layout pergunta
  myth?: string;          // para layout faq
  fact?: string;          // para layout faq
  statValue?: string;     // para layout stat (ex: "~11,6 cm")
  statLabel?: string;     // para layout stat (ex: "tamanho do bebê")
  emoji?: string;
  cta?: string;           // texto do botão opcional
}

TAREFA 2 — Criar src/utils/revistaAdapter.ts:
Função que recebe WeekContent e retorna RevistaCard[]:
- Card Hero "Abertura": usa motivationalPhrase como subtitle, emoji 🌸
- Card Stat "Bebê" (tamanho): baby.sizeCm, baby.comparison como emoji fallback
- Card Stat "Bebê" (batimentos): baby.heartbeatBpm
- Card Lista "Bebê" (marcos): baby.milestones
- Card Lista "Você": symptoms (máx 5 itens)
- Card Lista "Nutrição": nutrients[0..2] → cada item = name + foods[0]
- Card Lista "Sinais de Alerta": warningSignals?.map(w => w.description) — skip se undefined
- Card Checklist "Ação": weeklyChecklist — skip se undefined
- Card Pergunta "Psicologia": question fixo por trimestre (T1: "Como você está se sentindo?", T2: "Que sonho você tem para o bebê?", T3: "O que mais a emociona nessa reta final?")
- Card FAQ "Mito": mythBuster?.myth + mythBuster?.fact — skip se undefined
- Card Hero "Fechamento": title="Semana X concluída!", subtitle=weeklyTip, emoji 🏆, cta="Compartilhar"

Cores dos capítulos:
- Abertura: '#b30064'
- Bebê: '#e91e8c'
- Você: '#7b5ea7'
- Nutrição: '#4a7c59'
- Sinais de Alerta: '#c0392b'
- Ação: '#2471a3'
- Psicologia: '#8e44ad'
- FAQ: '#d35400'
- Fechamento: '#b30064'

Exportar: export function buildRevistaFeed(week: WeekContent): RevistaCard[]
```

---

## Etapa 2 — Componente RevistaCard
**Arquivo alvo:** `src/components/RevistaCard.tsx`
**Pode iniciar:** após Etapa 1 (precisa dos tipos RevistaCard)
**Agente:** @dev
**Modelo recomendado:** `claude-sonnet-4-6`
**Justificativa:** 6 layouts visuais distintos com lógica condicional, AsyncStorage e integração com o sistema de tema — complexidade moderada.
**Tokens estimados:** Médio (~10K)

### Prompt para o cowork:
```
@dev você irá criar o componente RevistaCard para o feed Explorar.

CONTEXTO:
- Projeto: DoceGestar (React Native + Expo + TypeScript)
- Tema: src/theme/index.ts (cores, typography, spacing, borderRadius, shadows)
- Cores principais: primary '#b30064', background '#f8f4f9', text '#2d1b35'
- Design: Glassmorphism com bordas arredondadas (borderRadius.xl = 20)
- Tipo RevistaCard já existe em src/types/index.ts

TAREFA — Criar src/components/RevistaCard.tsx:

Props: { card: RevistaCard; weekNumber: number }

Layouts a implementar:

1. HERO (layout='hero')
   - Container: gradiente suave usando chapterColor com 15% opacity de fundo
   - Borda esquerda 4px sólida na chapterColor
   - Badge do capítulo no topo (texto pequeno, cor do capítulo)
   - Emoji grande centralizado (48px)
   - Title em typography.h2 (bold)
   - Subtitle em typography.body (textSecondary)
   - Se cta: botão outline na chapterColor no final

2. STAT (layout='stat')
   - Badge do capítulo no topo
   - statValue em fonte 36px bold, cor do capítulo
   - statLabel em typography.caption, textSecondary
   - emoji à direita como decoração

3. LISTA (layout='lista')
   - Badge do capítulo no topo
   - Title em typography.h3
   - items como lista com bullet "•" em chapterColor
   - Máx 6 itens, resto truncado com "+ N mais"

4. CHECKLIST (layout='checklist')
   - Igual LISTA mas bullets substituídos por ☐ (não interativo no MVP)
   - Fundo ligeiramente diferente (chapterColor + 8% opacity)

5. PERGUNTA (layout='pergunta')
   - Badge do capítulo
   - Ícone 💭 grande
   - question em typography.h3 centralizado
   - Área de resposta: TextInput multiline, placeholder "Escreva aqui..."
   - Salvar resposta em AsyncStorage key: `revista_q_${weekNumber}_${card.id}`
   - Botão "Guardar" na chapterColor

6. FAQ (layout='faq')
   - Badge "Mito vs. Fato"
   - Seção MITO: fundo vermelho claro, ❌ + myth em itálico
   - Seção FATO: fundo verde claro, ✅ + fact normal

GERAL:
- Todos os cards: borderRadius.xl, shadow suave, marginHorizontal 16, marginVertical 8
- backgroundColor: colors.surface ou 'rgba(255,255,255,0.85)'
- Padding interno: 20px
- Nenhum card deve ser interativo além do PERGUNTA
```

---

## Etapa 3 — Tela Explorar (feed)
**Arquivo alvo:** `app/(tabs)/explorar.tsx`
**Pode iniciar:** após Etapa 2 (precisa do RevistaCard)
**Agente:** @dev
**Modelo recomendado:** `claude-haiku-4-5-20251001`
**Justificativa:** Orquestração simples — montar FlatList com componentes prontos e hooks já existentes, sem nova lógica.
**Tokens estimados:** Baixo (~4K)

### Prompt para o cowork:
```
@dev você irá transformar a tela Explorar em um feed nativo de cards semanais.

CONTEXTO:
- Projeto: DoceGestar (React Native + Expo + TypeScript)
- Arquivo atual: app/(tabs)/explorar.tsx (placeholder vazio)
- Hook de semana atual: src/hooks/useCurrentWeek.ts → { currentWeek }
- Hook de perfil: src/hooks/useUserProfile.ts → { profile } (profile.dueDate)
- Dados da semana: src/data/index.ts → getWeek(weekNumber)
- Adaptador já existe: src/utils/revistaAdapter.ts → buildRevistaFeed(week)
- Componente já existe: src/components/RevistaCard.tsx

TAREFA — Reescrever app/(tabs)/explorar.tsx:

1. Header fixo no topo (não scrollável):
   - Título "Revista da Semana" em typography.h2
   - Subtitle "Semana {N} • {trimester}° Trimestre" em typography.caption, textSecondary
   - Barra de progresso fina (View com width proporcional) mostrando % da gestação

2. Corpo: FlatList
   - data: buildRevistaFeed(weekData) — array de RevistaCard
   - keyExtractor: card.id
   - renderItem: <RevistaCard card={item} weekNumber={currentWeek} />
   - showsVerticalScrollIndicator: false
   - contentContainerStyle: paddingBottom 40

3. Estado de loading: se profile?.dueDate não existir, mostrar:
   - Ícone 📅 grande
   - Texto "Configure sua data prevista do parto no Perfil para ver a revista da sua semana"
   - Botão "Ir para Perfil" → router.push('/(tabs)/perfil')

4. Estado vazio: se weekData não encontrado, mostrar texto amigável.

5. SafeAreaView + StatusBar configurados.

IMPORTS necessários:
- useCurrentWeek de src/hooks/useCurrentWeek
- useUserProfile de src/hooks/useUserProfile  
- getWeek de src/data/index
- buildRevistaFeed de src/utils/revistaAdapter
- RevistaCard de src/components/RevistaCard
- colors, typography, spacing de src/theme
```

---

## Sequência de execução no cowork

```
SESSÃO 1 (paralelo possível):
  ├── Agente A: Etapa 1 (tipos + adaptador) — ~15 min
  └── [aguardar Etapa 1 antes de iniciar Etapa 2]

SESSÃO 2 (sequencial):
  ├── Agente A: Etapa 2 (RevistaCard) — ~20 min
  └── [aguardar Etapa 2 antes de iniciar Etapa 3]

SESSÃO 3:
  └── Agente A: Etapa 3 (explorar.tsx) — ~10 min

VERIFICAÇÃO FINAL:
  └── npm run web → abrir Explorar → confirmar feed
```

---

## Critérios de aceite

- [ ] Tab "Explorar" mostra FlatList de cards (não placeholder)
- [ ] Cards Hero, Stat, Lista, Checklist e FAQ renderizam sem erro
- [ ] Card Pergunta salva e recupera resposta do AsyncStorage
- [ ] Sem DPP configurada: tela de onboarding com botão para Perfil
- [ ] `npm run web` sem erro de TypeScript

---

## Notas para o executor

- **Não criar novas semanas de conteúdo** — usar apenas dados de `WeekContent` existentes
- **Não modificar** `src/data/weeks/*.ts` — só ler
- **Não modificar** `src/types/index.ts` além dos tipos `RevistaCard*`
- Card Pergunta usa AsyncStorage nativo (já é dependência do projeto)
- O layout PERGUNTA não precisa de sincronização — só local no MVP
