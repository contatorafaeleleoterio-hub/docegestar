# UI-2 · Modelo de Imagens de Fruta

**Data:** 2026-05-16
**Sessão:** UI-2 (pesquisa)

## Quantas e quais

**39 imagens no total:**
- 38 imagens — 1 por semana, semanas 3 a 40
- 1 imagem genérica "aglomerado de células" para as semanas 1–2 (sem fruta)

Lista oficial (já no app, em `src/data/weeks/*.ts`), por período:

| Período | Semanas → item |
|---|---|
| **1º tri (S1–13)** | S1–2 célula · S3 grão de areia · S4 papoula · S5 gergelim · S6 lentilha · S7 mirtilo · S8 framboesa · S9 uva · S10 morango · S11 limão · S12 ameixa · S13 pêssego |
| **2º tri (S14–27)** | S14 limão siciliano · S15 maçã · S16 abacate · S17 pera · S18 batata-doce · S19 manga · S20 banana · S21 cenoura · S22 mamão papaia · S23 toranja · S24 espiga de milho · S25 couve-flor · S26 alface · S27 couve-flor grande |
| **3º tri (S28–40)** | S28 berinjela · S29 abóbora · S30 repolho · S31 coco · S32 jicama · S33 abacaxi · S34 melão cantaloupe · S35 melão honeydew · S36 alface americana · S37 acelga · S38 alho-poró · S39 mini melancia · S40 melancia |

> Economia opcional: S25/S27 (couve-flor) e S39/S40 (melancia) podem reusar a
> mesma imagem → caem para 37 imagens únicas.

## Tipo de imagem — recomendação

**Render 3D suave (estilo "clay"/Pixar), NÃO foto literal.**

Motivo: foto de fruta real em cada tela faz o app parecer um app de supermercado
e briga com o visual macio + glassmorphism magenta da DoceGestar. Um set 3D coeso
parece premium e "desenhado de propósito" — é o que os apps líderes usam.
Foto realista fica como plano B se o usuário preferir.

## Especificação técnica

- **Formato:** PNG com fundo transparente
- **Master:** 1024×1024 px (proporção 1:1)
- **No app:** exportar 512×512 px
- Objeto **centralizado**, ocupando ~80% do quadro
- **Sem sombra embutida** (o card aplica a sombra → mais flexível)
- Peso alvo: < 60 KB por imagem (otimizar no TinyPNG)
- Nomeação: `fruta-03.png` … `fruta-40.png` + `celula.png`
- Pasta: `assets/fruits/`
