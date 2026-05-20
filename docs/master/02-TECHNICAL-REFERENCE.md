# 02 — DoceGestar | Referência Técnica

> Versão **resumo** (2026-05-20). Stack, estrutura e contratos principais. Detalhes profundos sob demanda.

---

## Stack

| Camada | Tecnologia | Versão |
|--------|-----------|--------|
| Runtime | React Native + Expo SDK | RN 0.83.6 / Expo 55 |
| Linguagem | TypeScript | 5.9.2 |
| React | React 19.2 / React DOM 19.2 | — |
| Roteamento | expo-router | 55.0.14 |
| Storage local | expo-sqlite (nativo) + Web Storage adapter (web) | — |
| Auth (opcional) | Supabase JS + expo-auth-session | 2.103 / 55 |
| Notificações | expo-notifications | 55.0.23 |
| Fontes | Plus Jakarta Sans + Fraunces (Google Fonts via Expo) | — |
| Ícones | DGIcon custom (react-native-svg 15.15) + @expo/vector-icons | — |
| Imagens | expo-image-picker + expo-file-system | 55 |
| Gestos | react-native-gesture-handler | 2.30 |
| Safe area | react-native-safe-area-context | 5.6 |
| Build | EAS Build (Android focus) | — |
| Web preview | react-native-web 0.21 + Vercel deploy | — |
| Testes | Jest (jest-expo 55) | 29.7 |

**Sem ESLint instalado.** Typecheck via `tsc --noEmit` é o gate.

---

## Estrutura de pastas (alto nível)

```
meu-projeto/
├── app/                          # expo-router file-based routing
│   ├── _layout.tsx               # raiz: SafeAreaProvider + fontes + ErrorBoundary
│   ├── index.tsx                 # gate: onboarding vs tabs
│   ├── (tabs)/                   # 4 abas com tabbar flutuante
│   │   ├── _layout.tsx           # FloatingTabBar custom
│   │   ├── dashboard.tsx         # 🏠 Início
│   │   ├── explorar.tsx          # 🧭 Feed revista digital
│   │   ├── ferramentas.tsx       # 🔧 Kick + contrações + sintomas
│   │   ├── perfil.tsx            # 👤 Perfil + menu
│   │   ├── bebe.tsx · saude.tsx · diario.tsx  # screens stack
│   ├── onboarding/               # welcome, profile, due-date, plans
│   ├── semana/[week].tsx         # detalhe dinâmico de semana
│   └── album · article · chat · birth-plan · nursery · appointments · meds · exams · kick-counter · contraction-timer · symptoms · timeline-detail · semana-detail
├── src/
│   ├── components/               # WeekCard, DGIcon, GestationCounter, feed/* …
│   ├── components/feed/          # CardShell, CardBody, NoteSheet, CardActionBar, FeedTopBar
│   ├── components/ui/            # botões, inputs, BottomSheet, …
│   ├── data/
│   │   ├── weeks/                # weeks-01-13.ts · weeks-14-27.ts · weeks-28-40.ts
│   │   ├── shared/               # care, nutrients, exams compartilhados por trimestre
│   │   ├── fruitImages.ts        # mapa semana → asset 3D
│   │   └── index.ts              # getWeek, getTrimester, ALL_WEEKS
│   ├── hooks/                    # 17 hooks (lista abaixo)
│   ├── db/                       # schema.ts (SQLite) + webStorage.ts (web)
│   ├── theme/                    # colors · typography · spacing · shadows · borderRadius · index
│   ├── types/                    # index.ts (tipos centrais)
│   └── utils/                    # revistaAdapter (WeekContent → RevistaCard), date utils, …
├── assets/
│   ├── fruits/                   # fruta-03.png .. fruta-40.png + celula.png (S1–2)
│   └── welcome-hero.png + ícones
├── docs/
│   ├── master/                   # ESTES 3 DOCS
│   ├── stories/                  # LAUNCH-TRACK + stories
│   ├── docs_40_semanas/reference/ # semana_01.md .. semana_40.md (editorial)
│   └── plans/                    # planos de execução
└── package.json · app.json · tsconfig.json · eas.json
```

---

## Tipos centrais (`src/types/index.ts`)

```ts
type Trimester = 1 | 2 | 3;
type BabyStage = 'embrião' | 'feto';

interface BabyDevelopment {
  stage: BabyStage;
  sizeCm: string;              // "~5,4 cm" | "Microscópico"
  size?: { value, unit, display };  // estruturado, piloto S16
  weightG: string;             // "~14g" | "< 1g"
  comparison: string;          // "Ameixa", "Limão-siciliano"… (travado às imagens)
  heartbeatBpm: string;        // "120–160 bpm"
  milestones: string[];        // 5-7 marcos do bebê
  clinicalMilestone: string;   // frase única — destaque do Painel Início
}

interface WeekContent {
  weekNumber: number;          // 1–40
  trimester: Trimester;
  baby: BabyDevelopment;
  symptoms: string[];          // 6-8 sintomas da semana
  care: string[];              // compartilhados por trimestre (CARE_T1/T2/T3)
  nutrients: NutrientEntry[];  // compartilhados por trimestre
  exams: ExamEntry[];
  curiosities: string[];       // 3 fatos curtos
  weeklyTip: string;
  motivationalPhrase: string;
  // opcionais (enriquecidos):
  maternalChanges?: string[];
  warningSignals?: WarningSigns[];  // { description, severity: 'urgent'|'monitor' }
  dailyFocus?: DailyFocus[];
  weeklyChecklist?: string[];
  mythBuster?: MythBuster;
}

interface UserProfile {
  id, name, dueDate, createdAt,
  gestationType, firstChild, babyName,
  relationship: 'mae'|'parceiro'|'outro',
  plan: 'free'|'premium', planExpiresAt
}

interface RevistaCard {           // saída do adapter, consumida pelo feed
  id, layout: 'stat'|'lista'|'checklist'|'pergunta'|'faq'|'hero',
  chapter, weekNumber, title, items?, content?,
  question?, myth?, fact?, statValue?, statLabel?, emoji?, cta?
}
```

---

## Schema SQLite (versões aplicadas via ALTER no boot)

| Tabela | Colunas principais | Origem |
|--------|--------------------|--------|
| `user_profile` | id, name, dueDate, createdAt, gestationType, firstChild, babyName, photo_uri, relationship, plan, planExpiresAt | v1 + v2 ALTER |
| `weekly_tracking` | week, weightKg, sleepHours, nausea, humor, appetite, dateFilled | v1 |
| `symptom_checks` / `care_checks` | week, item, checked | v1 |
| `week_completions` | week, completed, dateLabel | v1 |
| `special_moments` | week, textContent, photoUri, createdAt | v1 |
| `saved_tips` | id, week, tip_text, category, saved_at | v3 |
| `notification_settings` | id, type, enabled, default_time | v4 |
| `prenatal_appointments` | id, type, appointment_date, appointment_time, notes, reminder_offset, created_at | v5 |
| `daily_logs` | log_date (PK) — streak | v6 |
| `bookmarks` | card_id (PK), created_at | v7 (Feed Snap) |
| `card_notes` | card_id (PK), note, updated_at | v7 (Feed Snap) |

**Adapter:** `src/db/index.ts` → `getDatabase()` retorna `DatabaseAdapter`. Web usa fallback Web Storage; nativo usa expo-sqlite.

---

## Hooks (17 ao todo)

📁 `src/hooks/`

| Hook | O que faz |
|------|-----------|
| `useUserProfile` | CRUD do perfil + estado global do usuário |
| `useCurrentWeek` | calcula semana atual a partir do DPP |
| `useWeekData` | retorna `WeekContent` da semana |
| `useWeekTracking` | salva peso/sono/náusea/humor da semana |
| `useSymptomChecks` / `useCareChecks` | checkboxes persistidos por semana |
| `useWeekCompletion` / `useAllCompletions` | marca semana como concluída |
| `useSpecialMoment` | foto + texto por semana |
| `useNotifications` / `useNotificationSettings` | scheduling + preferências |
| `useContextualPush` | lembretes inteligentes por estado |
| `usePrenatalAppointments` | CRUD consultas + lembretes |
| `useStreak` | dias consecutivos de uso |
| `useCardMeta` / `useCardNote` | bookmark e nota por card do feed |
| `useBottomSpacing` | folga inferior dinâmica (tab bar + safe area) |

---

## Pipeline de conteúdo

```
reference doc (docs_40_semanas/reference/semana_NN.md, 15 cards verificados)
       │
       ▼
WeekContent (src/data/weeks/*.ts) — campos transcritos do doc
       │
       ▼
buildWeeklyFeed() (src/utils/revistaAdapter.ts) — transforma em ~10 RevistaCards
       │
       ▼
explorar.tsx → CardShell → CardBody (despacha layout) → render
```

**Estado atual:** S01–S24 totalmente alinhados (docs + TS + imagens 3D). S25–S40 docs em geração via Manus IA.

---

## Scripts úteis

```bash
npm run web         # preview no navegador (porta 8081)
npm run android     # Expo Go Android
npm run typecheck   # tsc --noEmit (gate de qualidade)
npm run test        # Jest
npm run build:web   # export estático para Vercel
eas build --platform android --profile production   # AAB para Play Store
eas submit --platform android                        # submit
```

---

## Deploy

- **Android:** EAS Build → AAB → eas submit (Play Store)
- **Web preview:** Vercel via `expo export -p web && vercel dist --prod`
- **Domínio:** docegestar.com.br (Cloudflare Pages + landing estática)
