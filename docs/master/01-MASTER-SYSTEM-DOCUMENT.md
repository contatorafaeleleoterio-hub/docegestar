# DOCEGESTAR — MASTER SYSTEM DOCUMENT
**Versão:** 2.0 | **Data:** 2026-05-07
**Status:** MVP Completo — Play Store Ready | **Deploy:** Cloudflare Pages + EAS (Android)

---

## 1. VISÃO E MISSÃO

**Nome do produto:** DoceGestar
**Tagline:** Seu acompanhamento gestacional semana a semana

**Visão:** Ser o aplicativo de referência para gestantes brasileiras que querem acompanhar sua gravidez de forma informada, organizada e emocionalmente acolhida — sem depender de conexão constante com a internet ou de planos pagos.

**Missão:** Entregar às gestantes informações médicas confiáveis, ferramentas de monitoramento clínico e um espaço para registrar memórias afetivas, tudo em um único aplicativo gratuito, offline-first e desenvolvido com linguagem acessível.

---

## 2. PROPOSTA DE VALOR

**Para quem:** Mulheres grávidas, principalmente primíparas, no Brasil.

**O problema que resolve:**
1. Informação fragmentada — gestantes precisam buscar em múltiplos sites o que acontece em cada semana da gravidez
2. Falta de organização pessoal — não há ferramentas simples para registrar sintomas, peso, sono e humor
3. Ferramentas clínicas inacessíveis — contador de chutes e cronômetro de contrações geralmente são apps separados, pagos ou em inglês
4. Memórias perdidas — não há espaço centralizado para registrar momentos especiais da gestação
5. Dependência de internet — muitos apps exigem login/nuvem para funcionar

**O que entrega:**
- 40 semanas de conteúdo curado por trimestre (desenvolvimento do bebê, sintomas, cuidados, nutrição, exames)
- Acompanhamento pessoal semanal (peso, sono, humor, náusea, apetite)
- Contador de chutes (padrão clínico: 10 movimentos)
- Cronômetro de contrações com detecção do padrão 3-1-1
- Timeline visual das 40 semanas com progresso
- Registro de momentos especiais (texto + foto)
- 100% offline — sem conta, sem login, sem internet obrigatória

**Diferencial competitivo:** Gratuito + offline-first + idioma português + conteúdo médico em linguagem acessível + todas as ferramentas em um único app.

---

## 3. PÚBLICO-ALVO

**Primário:**
- Mulheres entre 18–40 anos, grávidas pela primeira vez
- Brasileiras, usuárias de smartphones Android e iOS
- Sem necessidade de acesso técnico a computadores
- Renda média/baixa (sensíveis a apps pagos ou com assinatura)

**Secundário:**
- Gestantes de segunda gravidez que querem registrar memórias desta nova jornada
- Parceiros/familiares que acompanham a gravidez e querem se informar

---

## 4. PERSONAS

### Persona 1 — Ana, 26 anos, primeira gravidez
- Professora do ensino fundamental, mora no interior de SP
- Descobriu a gravidez na 6ª semana, sem planejamento
- Acessa o app no celular Android (entrada)
- Dúvidas frequentes: "o bebê está crescendo certo?", "esse sintoma é normal?"
- Motivação para usar o app: entender o que está acontecendo semana a semana sem precisar googlar tudo
- Frustrações: conteúdo em inglês, apps que pedem cadastro, informações contraditórias na internet

### Persona 2 — Carla, 32 anos, segunda gravidez
- Designer autônoma, mora em BH
- Já passou por uma gestação, mas quer registrar melhor essa segunda
- iPhone, acessa o app à noite antes de dormir
- Motivação: ter um "diário gestacional digital" com fotos e registros
- Usa o módulo Momento Especial e o acompanhamento semanal ativamente

### Persona 3 — Juliana, 29 anos, grávida de 8 meses
- Atendente de farmácia, turno rotativo
- Ansiosa com contrações Braxton Hicks vs. contrações de parto
- Acessa o app para usar o Cronômetro de Contrações e verificar o padrão 3-1-1
- Não tem plano de saúde, depende de UBS

---

## 5. CONTEXTO DE MERCADO

**Mercado:** Apps de saúde materna no Brasil
**Concorrentes diretos:** BabyCenter, Ovia Pregnancy, What to Expect, Glow Nurture
**Gap identificado:** Nenhum concorrente oferece a combinação (gratuito + offline + português nativo + ferramentas clínicas integradas + sem login obrigatório)

---

## 6. ARQUITETURA DO PRODUTO

### Fluxo de Entrada
```
Primeiro acesso
└─ Tela de Onboarding
   ├─ Nome (opcional)
   └─ DPP — Data Prevista do Parto (obrigatória, DD/MM/AAAA)
      └─ Salva no SQLite
         └─ Redireciona para Dashboard

Acessos subsequentes
└─ Verifica user_profile no SQLite
   └─ Existe → Dashboard direto
```

### Navegação Principal (4 abas) — atualizado N.1
```
Início        — Dashboard + WeekPeekCard + FAB Quick-Log
Explorar      — Feed semanal (destaques da semana por card)
Ferramentas   — Kick Counter + Contrações + Consultas Pré-Natais
Perfil        — Configurações do usuário (nome, DPP, lembretes)
```

### Rotas Secundárias (stack)
```
/semana-detail      — Card completo da semana atual (10 módulos)
/timeline-detail    — Grade visual das 40 semanas
```

### Deep Links
```
/semana/[1-40]  — Qualquer semana acessível pela Timeline
```

---

## 7. FUNCIONALIDADES MAPEADAS (COMPLETO)

### 7.1 Onboarding
| Funcionalidade | Status |
|---|---|
| Formulário de boas-vindas | ✅ Implementado |
| Campo nome (opcional) | ✅ Implementado |
| Campo DPP com máscara DD/MM/AAAA | ✅ Implementado |
| Validação de data (formato + range) | ✅ Implementado |
| Persistência no SQLite (`user_profile`) | ✅ Implementado |
| Gate de navegação (onboarding vs dashboard) | ✅ Implementado |

### 7.2 Dashboard (Início)
| Funcionalidade | Status |
|---|---|
| Exibir semana atual calculada automaticamente | ✅ Implementado |
| WeekPeekCard — card compacto com semana/dia/stats + botão "Ver semana →" | ✅ Implementado |
| Comparação de tamanho do bebê com emoji animado por fruta/semana | ✅ Implementado |
| Dias restantes para o parto | ✅ Implementado |
| Banner semanal celebratório com saudação personalizada | ✅ Implementado |
| Botão Share nativo do banner semanal | ✅ Implementado |
| Daily Streak Counter | ✅ Implementado |
| Modular Feed — ScrollView com cards ordenados | ✅ Implementado |
| FAB Quick-Log — abre bottom sheet com 4 atalhos (Sintomas, Chutes, Contrações, Consulta) | ✅ Implementado |
| Notificações contextuais push | ✅ Implementado |

### 7.3 Card Semanal — 10 Módulos (WeekCard)
| Módulo | Funcionalidade | Status |
|---|---|---|
| 1 | Header: semana + botão conclusão | ✅ Implementado |
| 2 | Indicador de trimestre com barra de progresso | ✅ Implementado |
| 3 | Desenvolvimento do bebê (fase, tamanho, peso, comparação, BPM, marcos) | ✅ Implementado |
| 4 | Sintomas (6-8 checkboxes persistidos no SQLite) | ✅ Implementado |
| 5 | Cuidados da semana (checkboxes persistidos) | ✅ Implementado |
| 6 | Nutrientes prioritários (6 nutrientes + lista de alimentos a evitar) | ✅ Implementado |
| 7 | Exames e marcos (agenda de exames por período) | ✅ Implementado |
| 8 | Acompanhamento pessoal (peso, sono, náusea, humor, apetite — salvo no SQLite) | ✅ Implementado |
| 9 | Momento especial (texto + foto da galeria — salvo no SQLite) | ✅ Implementado |
| 10 | Curiosidades + dica da semana + frase motivacional | ✅ Implementado |
| — | Disclaimer médico (rodapé fixo) | ✅ Implementado |

### 7.4 Timeline
| Funcionalidade | Status |
|---|---|
| Grade visual de 40 células (semanas 1-40) | ✅ Implementado |
| Separação em 3 trimestres com cabeçalhos | ✅ Implementado |
| Estado visual: semana atual (destaque rosa) | ✅ Implementado |
| Estado visual: semana concluída (checkmark + cor do trimestre) | ✅ Implementado |
| Estado visual: semana passada não concluída (cor opacidade reduzida) | ✅ Implementado |
| Estado visual: semana futura (cinza neutro) | ✅ Implementado |
| Badge de progresso "X de 40 semanas concluídas" | ✅ Implementado |
| Scroll automático para semana atual | ✅ Implementado |
| Tap na célula → navega para semana específica | ✅ Implementado |

### 7.5 Ferramentas — Contador de Chutes
| Funcionalidade | Status |
|---|---|
| Iniciar sessão de monitoramento | ✅ Implementado |
| Timer automático (MM:SS) | ✅ Implementado |
| Botão "+" grande com feedback háptico (vibração) | ✅ Implementado |
| Meta de 10 movimentos com mensagem de sucesso | ✅ Implementado |
| Salvar sessão no SQLite (`kick_records`) | ✅ Implementado |
| Histórico das últimas 5 sessões | ✅ Implementado |

### 7.6 Ferramentas — Cronômetro de Contrações
| Funcionalidade | Status |
|---|---|
| Iniciar/parar contração com timer | ✅ Implementado |
| Seletor de intensidade (Leve/Média/Forte) | ✅ Implementado |
| Timer de intervalo entre contrações | ✅ Implementado |
| Cálculo automático: frequência, duração, intervalo médio | ✅ Implementado |
| Detecção do padrão 3-1-1 (alerta vermelho) | ✅ Implementado |
| Salvar no SQLite (`contraction_records`) | ✅ Implementado |
| Histórico das últimas 10 contrações | ✅ Implementado |

### 7.7 Explorar (Feed Semanal)
| Funcionalidade | Status |
|---|---|
| FlatList de cards da semana atual (destaques) | ✅ Implementado |
| 5 layouts de card: stat, lista, checklist, pergunta, faq | ✅ Implementado |
| Header "Sua Semana" simplificado | ✅ Implementado |
| Conteúdo dinâmico por semana gestacional | ✅ Implementado |

### 7.8 Perfil (ex-Configurações)
| Funcionalidade | Status |
|---|---|
| Editar nome | ✅ Implementado |
| Editar DPP (com recálculo automático da semana) | ✅ Implementado |
| Toggle de notificações de lembretes | ✅ Implementado |
| Configuração de consultas pré-natais com CRUD completo | ✅ Implementado |

---

## 8. CONTEÚDO DE DADOS (40 Semanas)

### Volume de Conteúdo
- **40 semanas** de conteúdo completo
- **3 trimestres:** T1 (semanas 1-13), T2 (14-27), T3 (28-40)
- **Por semana:** desenvolvimento do bebê + sintomas + cuidados + nutrientes + exames + 3 curiosidades + dica + frase motivacional

### Dados Compartilhados (todas as semanas)
- **9 alimentos a evitar** (álcool, peixes crus, queijos não pasteurizados, cafeína >200mg, embutidos, ovos crus, carnes cruas, leite não pasteurizado, peixes com mercúrio)
- **11 nutrientes mapeados** com dosagens diárias e fontes alimentares
- **Sintomas por trimestre:** T1 (11 sintomas), T2 (11 sintomas), T3 (11 sintomas)
- **Cuidados por trimestre:** base (7 itens) + específicos por trimestre
- **Exames:** agenda completa do pré-natal brasileiro

### Desenvolvimento do Bebê (por semana)
- Fase: "embrião" (semanas 1-8) ou "feto" (semanas 9-40)
- Tamanho em cm, peso em gramas, comparação com objeto/fruta
- Batimentos cardíacos (BPM, quando disponível)
- 5-7 marcos de desenvolvimento

---

## 9. BANCO DE DADOS — ESTRUTURA FUNCIONAL

**8 tabelas SQLite (`docegestar.db`):**

| Tabela | Finalidade |
|---|---|
| `user_profile` | Nome e DPP do usuário (1 registro fixo) |
| `weekly_tracking` | Peso, sono, náusea, humor, apetite por semana |
| `symptom_checks` | Estado dos checkboxes de sintomas por semana |
| `care_checks` | Estado dos checkboxes de cuidados por semana |
| `week_completion` | Se a semana foi marcada como concluída |
| `special_moments` | Texto e foto de momento especial por semana |
| `kick_records` | Histórico de sessões do contador de chutes |
| `contraction_records` | Histórico de contrações registradas |

---

## 10. EPIC E STORIES — STATUS ATUAL

### Epic 0 — Fundação (Done)
Configuração do projeto, estrutura, banco de dados, tema, tipos.

### Epic 1 — Dados (Done)
Conteúdo estático das 40 semanas, dados compartilhados.

### Epic 2 — MVP Funcional (100% Done)

| Story | Descrição | Status | Pontos |
|---|---|---|---|
| 2.1 | Onboarding: Nome + DPP | ✅ Done | 5 |
| 2.2 | Card Semanal: 10 Módulos | ✅ Done | 13 |
| 2.3 | Timeline: Grade 40 Semanas | ✅ Done | 5 |
| 2.4 | Ferramentas: Kick + Contrações | ✅ Done | 8 |
| — | Configurações: Editar DPP | ✅ Done | — |

**Total Epic 2:** 31 story points entregues

### Epic 3 — Notificações e Lembretes Gestacionais (Done)

| Story | Descrição | Status | Pontos |
|---|---|---|---|
| 3.1 | Configuração de Lembretes | ✅ Done — commit 88e7070 | 5 |
| 3.2 | Agendamento via expo-notifications | ✅ Done — commit 46a4cfd | 8 |
| 3.3 | Lembretes de Consulta Pré-Natal | ✅ Done — commit 852487e | 5 |
| 3.4 | Marcos Gestacionais Automáticos | ⏳ Backlog pós-lançamento | 5 |

**Total Epic 3:** 18 story points entregues (3.4 movido para pós-lançamento)

### Epic 4 — MVP UX Enhancement (100% Done)

| Story | Descrição | Status | Pontos |
|---|---|---|---|
| 4.1 | Onboarding 5 steps (nome, DPP, tipo, primeiro filho, nome bebê) | ✅ Done — commit 4aad655 | 5 |
| 4.2 | Banner semanal + Share nativo | ✅ Done — commit 050791e | 3 |
| 4.3 | Cards swipeáveis do bebê | ✅ Done — commit bb4f4bb | 3 |
| 4.4 | Timeline visual trimestral | ✅ Done — commit 076f566 | 3 |
| 4.5 | Dica diária com categorias | ✅ Done | 5 |
| 4.6 | Tracker de sintomas visual | ✅ Done | 5 |

**Total Epic 4:** 24 story points entregues

### Redesign Visual (Done)

| Story | Descrição | Status |
|---|---|---|
| M.1 | Design Tokens — paleta magenta/teal | ✅ Done — commit 0d18d75 |
| M.2 | Tab Navigation + Header | ✅ Done — commit b2fa784 |
| M.3 | Dashboard, WeekCard, Timeline, Onboarding | ✅ Done — commit 076f566 |
| M.4 | Ferramentas + Configurações | ✅ Done — commit 2aa572f |

### Sprints de Features (Done)

| Sprint | Descrição | Status |
|---|---|---|
| Sprint 1-B | Animated Baby/Fruit emoji comparison | ✅ Done — commit 0a9d088 |
| Sprint 1-C | Daily Streak Counter | ✅ Done — commit 679f07e |
| Sprint 1-D | Contextual Push Notifications | ✅ Done — commit ed60d73 |
| Sprint 1-E | Modular Feed / Home Scroll | ✅ Done — commit a9a2f1e |
| Sprint 1-F | FAB Quick-Log (4 atalhos) | ✅ Done — commit 54d181f |
| N.1 | Reestruturação menu 5→4 tabs | ✅ Done — commit 7173fe8 |
| RF.1 | Refatoração Front-End — feed moderno, visual padronizado | ✅ Done — commit 2f710fe |
| G-5.5 | Bug fixes B1–B7 + Enriquecimento Semana 16 | ✅ Done — commit feb38af |

### Play Store Track (Em Andamento)

| Sessão | Descrição | Status |
|---|---|---|
| G-5 | EAS Build + conta Google Play Developer | ✅ Done — APK `5f8dddbe` |
| G-6 | Store listing — textos, screenshots, privacy policy | ✅ Done — commit 040ff7c |
| G-7 | Publicação — eas submit | ⏸️ Suspenso (decisão estratégica) |

### Status Geral
- **Último commit:** `2f710fe` — RF.1 completo
- **Branch:** master
- **Deploy web:** [docegestar.pages.dev](https://docegestar.pages.dev) (Cloudflare Pages, auto-deploy no push)
- **Domínio:** [docegestar.com.br](https://docegestar.com.br) — ativo via Cloudflare Pages
- **APK (preview):** Build `b9f6758c` — disponível em expo.dev
- **AAB (production):** Build `19b2a74c` — pronto para Play Store
- **Repositório:** github.com/contatorafaeleleoterio-hub/docegestar

---

## 11. FRAMEWORK DE DESENVOLVIMENTO — AIOX (Synkra)

O projeto usa o framework Synkra AIOX com agentes de IA especializados:

| Agente | Persona | Responsabilidade |
|---|---|---|
| @sm (River) | Scrum Master | Criar e refinar stories |
| @po (Pax) | Product Owner | Validar stories (checklist 10 pontos) |
| @dev (Dex) | Developer | Implementar código |
| @qa (Quinn) | QA Engineer | Executar QA Gate (7 checks) |
| @devops (Gage) | DevOps | Git push, deploy, CI/CD (exclusivo) |

**Story Lifecycle:**
```
Draft → Ready → InProgress → InReview → Done
```
- Draft → Ready: @po valida (score ≥7/10)
- Ready → InProgress: @dev começa
- InProgress → InReview: @dev conclui
- InReview → Done: @qa PASS + @devops push

**QA Gate (7 checks):** Code review, Unit tests, Acceptance criteria, No regressions, Performance, Security, Documentation

---

## 12. INFRAESTRUTURA E DEPLOY

| Item | Valor |
|---|---|
| URL Pública | https://docegestar.pages.dev |
| Plataforma | Cloudflare Pages (gratuito) |
| Repositório | GitHub (privado) |
| Branch principal | master |
| Trigger de deploy | Automático a cada push no master |
| Build command | `npx expo export --platform web` |
| Output directory | `dist` |
| Framework preset | None |

---

## 13. DÉBITOS TÉCNICOS CONHECIDOS

| ID | Descrição | Prioridade | Status |
|---|---|---|---|
| DT-001 | Jest não configurado — zero cobertura de testes | @dev | Aceito (pós-lançamento) |
| DT-002 | ESLint não configurado | @dev | Aceito (pós-lançamento) |
| DT-003 | `parseDateBR` duplicada | @dev | ✅ Resolvido — Story 4.1 |
| DT-004 | `useCurrentWeek` retorna default=1 durante loading | @dev | Aceito |
| DT-005 | GitHub Actions CI não configurado | @devops | Aceito (pós-lançamento) |
| DT-006 | `expo-splash-screen` + SplashScreen web guard | @dev | ✅ Resolvido |
| DT-007 | Safe zone `android-icon-foreground.png` não validada (símbolo ~85% canvas) | @devops | Pendente — validar pós EAS Build |

---

## 14. INFRAESTRUTURA DE BUILD — EAS (Expo Application Services)

| Perfil | Tipo | Finalidade | Último Build |
|---|---|---|---|
| `preview` | APK | Teste no celular Android | `b9f6758c` — 2026-05-06 ✅ |
| `production` | AAB | Google Play Store | `19b2a74c` — 2026-05-06 ✅ |
| `development` | APK (debug) | Desenvolvimento local | — |

**Conta Expo:** `@eusourafael`
**Projeto EAS:** `@eusourafael/doce-gestar` — ID: `9890d16e-0012-42b7-a29d-1c3adb521f56`

---

## 15. PRÓXIMOS PASSOS

### Imediato
1. Instalar APK preview no celular para validação final (`b9f6758c`)
2. Retomar G-7 — `eas submit --platform android` → submeter AAB à Play Store

### Pós-lançamento (Backlog)
1. R.1–R.4 — Revista Digital como feed nativo enriquecido
2. Epic 3.4 — Marcos Gestacionais Automáticos (notificações)
3. Enriquecimento de conteúdo semanas 17-40 (pipeline docs_40_semanas)
4. Rastreamento de peso
5. Comunidade/fórum de mães
6. Visualização 3D fetal
7. Resolver DT-001 (Jest) e DT-002 (ESLint)

---

> **Nota de Atualização:** Atualizar este documento sempre que um novo Epic ou Story for concluído, quando houver mudanças de produto, ou quando novas decisões forem tomadas.
