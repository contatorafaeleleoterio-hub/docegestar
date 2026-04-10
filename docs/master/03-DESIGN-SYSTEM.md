# DOCEGESTAR — DESIGN SYSTEM DOCUMENT
**Versão:** 1.0 | **Data:** 2026-04-09
**Tema:** Maternidade Acolhedora — Paleta Pastel

---

## 1. FILOSOFIA DE DESIGN

**Princípios:**
- **Acolhimento:** Cores suaves, nada agressivo. A gestante está vulnerável — o app deve parecer seguro e gentil.
- **Clareza:** Informação médica em linguagem simples, hierarquia visual clara.
- **Leveza:** Sem sobrecarga visual. Cada módulo respira com padding adequado.
- **Progresso:** Elementos que comunicam jornada (barra de trimestre, timeline).

---

## 2. PALETA DE CORES

**Arquivo:** `src/theme/colors.ts`

### Cores Primárias
| Token | Hex | Uso |
|---|---|---|
| `primary` | `#E8A0BF` | Rosa pink pastel — botões principais, destaques, semana atual na timeline |
| `primaryLight` | `#FFF0F5` | Lavanda rosada — fundo de telas, backgrounds suaves |

### Cores Secundárias
| Token | Hex | Uso |
|---|---|---|
| `secondary` | `#C8A2D0` | Lilás pastel — acentos secundários |

### Cor de Acento
| Token | Hex | Uso |
|---|---|---|
| `accent` | `#A8D8B9` | Verde menta pastel — nutrientes, elementos positivos |
| `accentLight` | `#E8F5ED` | Verde menta claro — fundo de cards de nutrientes |

### Cores por Trimestre
| Token | Hex | Trimestre | Semanas |
|---|---|---|---|
| `trimester1` | `#FFD6E0` | 1º Trimestre | 1-13 |
| `trimester2` | `#D4C5F9` | 2º Trimestre | 14-27 |
| `trimester3` | `#B5EAD7` | 3º Trimestre | 28-40 |

### Neutrals
| Token | Hex | Uso |
|---|---|---|
| `background` | `#FEFCFD` | Branco quente — fundo geral das telas |
| `surface` | `#FFFFFF` | Branco puro — fundo dos cards/modais |

### Texto
| Token | Hex | Uso |
|---|---|---|
| `text` | `#4A3B47` | Cinza-marrom escuro — texto principal |
| `textSecondary` | `#8B7D87` | Cinza-marrom médio — texto secundário, labels |
| `textLight` | `#B8A9B4` | Cinza-marrom claro — placeholders, textos terciários |

### Estados Semânticos
| Token | Hex | Uso |
|---|---|---|
| `success` | `#7BC8A4` | Verde — confirmações, conclusões, sucesso |
| `warning` | `#F5D76E` | Amarelo — avisos, alertas não críticos |
| `error` | `#E88B8B` | Vermelho suave — erros, alertas críticos (ex: padrão 3-1-1) |
| `info` | `#89C4E1` | Azul claro — informações neutras |

### Bordas e Divisores
| Token | Hex | Uso |
|---|---|---|
| `border` | `#F0E4EC` | Rosa muito claro — bordas de cards e inputs |
| `divider` | `#F5EEF2` | Divisor entre seções |
| `disabled` | `#E0D6DC` | Estado desabilitado |
| `overlay` | `rgba(74,59,71,0.5)` | Overlay de modal/backdrop |

---

## 3. TIPOGRAFIA

**Arquivo:** `src/theme/typography.ts`

| Token | Tamanho | Peso | Line Height | Uso |
|---|---|---|---|---|
| `h1` | 28px | 700 (Bold) | 36 | Títulos principais de telas |
| `h2` | 22px | 600 (SemiBold) | 28 | Subtítulos de telas, semana em destaque no dashboard |
| `h3` | 18px | 600 (SemiBold) | 24 | Títulos de seções/módulos dentro do WeekCard |
| `body` | 16px | 400 (Regular) | 24 | Texto corrido, listas, conteúdo |
| `bodySmall` | 14px | 400 (Regular) | 20 | Texto auxiliar, notas, histórico de ferramentas |
| `caption` | 12px | 400 (Regular) | 16 | Legendas, labels pequenas, datas |
| `label` | 14px | 600 (SemiBold) | 20 | Labels de campos, badges, rótulos de botões |

---

## 4. SISTEMA DE ESPAÇAMENTO

| Valor | Uso |
|---|---|
| 4px | Micro — espaço mínimo entre elementos inline |
| 8px | XS — padding interno de badges, separação entre checkboxes |
| 12px | SM — padding de elementos compactos, gap entre nutrientes |
| 16px | MD — padding padrão de cards e seções (mais usado) |
| 20px | LG — espaçamento entre módulos do WeekCard |
| 24px | XL — padding de telas, margens maiores |
| 32px | 2XL — separações de seções principais |

---

## 5. PADRÕES DE COMPONENTES

### 5.1 Card (Surface)
```
background:   colors.surface       (#FFFFFF)
borderRadius: 16
padding:      16
shadow: {
  color:      colors.primary       (#E8A0BF)
  opacity:    0.08
  offset:     { width: 0, height: 2 }
  radius:     8
  elevation:  3
}
marginBottom: 16
```

### 5.2 Botão Primário
```
background:      colors.primary    (#E8A0BF)
borderRadius:    12
paddingVertical: 14
paddingHorizontal: 24
text:            colors.surface, typography.label
activeOpacity:   0.8
```

### 5.3 Botão Secundário (outline)
```
background:      transparent
border:          1.5px solid colors.primary
borderRadius:    12
paddingVertical: 12
paddingHorizontal: 20
text:            colors.primary, typography.label
```

### 5.4 Input de Texto
```
background:       colors.background  (#FEFCFD)
border:           1px solid colors.border  (#F0E4EC)
borderRadius:     10
padding:          14
fontSize:         typography.body (16px)
color:            colors.text
placeholderColor: colors.textLight
foco:             border color → colors.primary
```

### 5.5 CheckItem (Checkbox + Label)
```
Estrutura: [checkbox 20×20] [label text]

Checkbox unchecked:
  border: 1.5px colors.border
  background: transparent

Checkbox checked:
  background: colors.primary
  checkmark: branco (✓)

Label unchecked:
  color: colors.text
  style: typography.body

Label checked:
  color: colors.textSecondary
  textDecorationLine: 'line-through'

activeOpacity: 0.7
```

### 5.6 OptionPicker (Seleção de opções — náusea, humor, apetite)
```
Container:
  flexDirection: row
  flexWrap: wrap
  gap: 8

Opção não selecionada:
  border: 1px colors.border
  background: surface
  padding: 8px 12px
  borderRadius: 20

Opção selecionada:
  background: colors.primary
  border: colors.primary
  text: colors.surface
```

### 5.7 SectionTitle
```
fontSize:     typography.h3 (18px, weight 600)
color:        colors.text
marginBottom: 12
paddingBottom: 8
borderBottom: 1px colors.divider
```

### 5.8 Badge / Tag
```
background:       colors.primaryLight
borderRadius:     12
paddingVertical:  4
paddingHorizontal: 10
text:             colors.primary, typography.label (14px, weight 600)
```

### 5.9 Progress Bar (Trimestre)
```
Container:
  height: 8
  background: colors.border
  borderRadius: 4
  overflow: hidden

Fill:
  height: 100%
  background: trimesterColor
  borderRadius: 4
  width: via percentage (getTrimesterProgress)
```

### 5.10 Timeline Cell
```
Tamanho: 52×52px
borderRadius: 12

Estados:
  Semana atual:
    background: colors.primary (#E8A0BF)
    text: branco, bold
    indicador: ponto inferior

  Semana concluída:
    background: trimesterColor, opacity 0.9
    ícone: checkmark (✓)

  Semana passada não concluída:
    background: trimesterColor, opacity 0.4

  Semana futura:
    background: colors.surface
    border: 1px colors.border
```

### 5.11 Botão Grande — Contador de Chutes
```
Tamanho:        160×160px (círculo)
borderRadius:   80
background:     colors.primary
texto "+":      56px, bold, branco
shadow:         primary opacity 0.3
activeOpacity:  0.7
feedback:       Haptics.impactAsync(ImpactFeedbackStyle.Medium)
```

### 5.12 Alerta Crítico (Padrão 3-1-1)
```
background: colors.error  (#E88B8B)
borderRadius: 12
padding: 16
text: colors.surface, typography.body
ícone: ⚠️
```

---

## 6. TEMA POR TRIMESTRE

| Trimestre | Cor de Fundo | Cor de Texto | Semanas |
|---|---|---|---|
| 1º (T1) | `#FFD6E0` (Rosa suave) | `#4A3B47` | 1-13 |
| 2º (T2) | `#D4C5F9` (Lilás suave) | `#4A3B47` | 14-27 |
| 3º (T3) | `#B5EAD7` (Verde suave) | `#4A3B47` | 28-40 |

**Constante no código (WeekCard.tsx):**
```typescript
const TRIMESTER_COLORS = {
  1: colors.trimester1,  // #FFD6E0
  2: colors.trimester2,  // #D4C5F9
  3: colors.trimester3,  // #B5EAD7
}
const TRIMESTER_LABELS = {
  1: '1º Trimestre',
  2: '2º Trimestre',
  3: '3º Trimestre',
}
```

---

## 7. PADRÕES DE LAYOUT

### Tela Padrão (ScrollView)
```
background: colors.background (#FEFCFD)
SafeAreaView → ScrollView → padding horizontal 16
```

### Tela com Header Fixo
```
SafeAreaView
├── Header: padding 20, background primary, título h2 branco
└── ScrollView: flex 1, padding 16
```

### Grid de Nutrientes (2 colunas)
```
flexDirection: row
flexWrap: wrap
gap: 8
Célula: width ~48%, background accentLight, borderRadius 12, padding 12
```

### Lista de Checkboxes
```
gap: 8 entre itens
Cada item: flexDirection row, alignItems center, gap 10
```

### Seção de Módulo no WeekCard
```
Card container: surface, borderRadius 16, padding 16, marginBottom 16
SectionTitle: h3, borderBottom divider, marginBottom 12
Conteúdo: body, gap 8-12 entre itens
```

---

## 8. MÓDULOS DO WEEKCARD — MAPA VISUAL

```
┌─────────────────────────────────────────────────────┐
│  MÓDULO 1: HEADER                                   │
│  ┌───────────────────────────────────────────────┐  │
│  │  Semana 12        [1º Trimestre]  [✓ Concluir]│  │
│  └───────────────────────────────────────────────┘  │
│                                                     │
│  MÓDULO 2: PROGRESSO DO TRIMESTRE                   │
│  ┌───────────────────────────────────────────────┐  │
│  │  [████████████] [░░░░░░░░░░░░] [░░░░░░░░░░░░] │  │
│  │   T1  ██████████████ 92%                      │  │
│  └───────────────────────────────────────────────┘  │
│                                                     │
│  MÓDULO 3: DESENVOLVIMENTO DO BEBÊ                  │
│  ┌───────────────────────────────────────────────┐  │
│  │  [badge: Feto]                                │  │
│  │  📏 5.4cm   ⚖️ 14g   🍋 Limão                 │  │
│  │  ❤️ 160 bpm                                   │  │
│  │  • Marco de desenvolvimento 1                 │  │
│  │  • Marco de desenvolvimento 2 ...             │  │
│  └───────────────────────────────────────────────┘  │
│                                                     │
│  MÓDULO 4: SINTOMAS DA MAMÃE                        │
│  ┌───────────────────────────────────────────────┐  │
│  │  [✓] ~~Enjoos matinais~~                      │  │
│  │  [ ] Sensibilidade nas mamas                  │  │
│  │  [✓] ~~Cansaço~~  ...                         │  │
│  └───────────────────────────────────────────────┘  │
│                                                     │
│  MÓDULO 5: CUIDADOS DA SEMANA                       │
│  ┌───────────────────────────────────────────────┐  │
│  │  [ ] Tomar vitaminas pré-natais               │  │
│  │  [✓] ~~Beber 2L de água por dia~~             │  │
│  └───────────────────────────────────────────────┘  │
│                                                     │
│  MÓDULO 6: NUTRIENTES PRIORITÁRIOS                  │
│  ┌───────────────────────────────────────────────┐  │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐    │  │
│  │  │Ác. Fólico│  │  Ferro   │  │Vitamina C│    │  │
│  │  │400mcg/d  │  │ 27mg/dia │  │ 85mg/dia │    │  │
│  │  │feijão... │  │carne...  │  │laranja...│    │  │
│  │  └──────────┘  └──────────┘  └──────────┘    │  │
│  │  ─────────────────────────────────────        │  │
│  │  Evitar: álcool · sushi · queijo brie...      │  │
│  └───────────────────────────────────────────────┘  │
│                                                     │
│  MÓDULO 7: EXAMES E MARCOS                          │
│  ┌───────────────────────────────────────────────┐  │
│  │  • Ultrassom morfológico (11-14 semanas)       │  │
│  │  • Beta HCG quantitativo                      │  │
│  └───────────────────────────────────────────────┘  │
│                                                     │
│  MÓDULO 8: ACOMPANHAMENTO PESSOAL                   │
│  ┌───────────────────────────────────────────────┐  │
│  │  Peso: [_____] kg      Sono: [_____] horas    │  │
│  │  Náusea:  [Sem] [Leve] [Média] [Forte]        │  │
│  │  Humor:   [Bem] [Oscilando] [Difícil]         │  │
│  │  Apetite: [Normal] [Pouco] [Muito]            │  │
│  │  [           Salvar           ]               │  │
│  └───────────────────────────────────────────────┘  │
│                                                     │
│  MÓDULO 9: MOMENTO ESPECIAL                         │
│  ┌───────────────────────────────────────────────┐  │
│  │  [Escreva algo especial desta semana...      ] │  │
│  │  [                                           ] │  │
│  │  [📷 Adicionar Foto]          [Salvar]        │  │
│  └───────────────────────────────────────────────┘  │
│                                                     │
│  MÓDULO 10: CURIOSIDADES                            │
│  ┌───────────────────────────────────────────────┐  │
│  │  💡 Fato curioso 1                            │  │
│  │  💡 Fato curioso 2                            │  │
│  │  💡 Fato curioso 3                            │  │
│  │  ┌─────────────────────────────────────────┐  │  │
│  │  │ 💡 Dica da semana: texto da dica        │  │  │
│  │  └─────────────────────────────────────────┘  │  │
│  │  "Frase motivacional em itálico"              │  │
│  └───────────────────────────────────────────────┘  │
│                                                     │
│  ─────────────────────────────────────────────────  │
│  As informações contidas neste material são         │
│  educativas e complementares. Não substituem o      │
│  acompanhamento médico profissional. Sempre         │
│  consulte seu obstetra.                             │
└─────────────────────────────────────────────────────┘
```

---

## 9. ÍCONES DAS ABAS (Tabs)

| Aba | Ícone sugerido | Cor ativa |
|---|---|---|
| Dashboard | `home` | `colors.primary` (#E8A0BF) |
| Semana | `calendar-today` | `colors.primary` |
| Timeline | `timeline` | `colors.primary` |
| Ferramentas | `build` | `colors.primary` |
| Configurações | `settings` | `colors.primary` |

---

## 10. ANIMAÇÕES E FEEDBACK

| Elemento | Comportamento |
|---|---|
| Pressable checkboxes | `activeOpacity: 0.7` |
| Botões primários | `activeOpacity: 0.8` |
| Botão "+" Kick Counter | `Haptics.impactAsync(ImpactFeedbackStyle.Medium)` |
| Timer display | Formato `MM:SS` via `padStart(2,'0')` |
| Alerta 3-1-1 | Background `error` (#E88B8B), texto branco, ícone ⚠️ |

---

> **Nota de Atualização:** Atualizar sempre que novos componentes forem adicionados ao sistema, ou quando houver mudanças na paleta de cores, tipografia ou padrões de layout.
