# UI-2 · Ferramenta de IA + Prompt para as Imagens

**Data:** 2026-05-16
**Sessão:** UI-2 (pesquisa)

## Ferramenta recomendada — Google Gemini (grátis)

**gemini.google.com** — grátis, sem marca d'água.

Ponto crítico: gerar a **1ª fruta como âncora de estilo**, depois fazer upload
dela e pedir "mesmo estilo, mas X" para as outras 37. Isso garante consistência —
o difícil em um set de 38 imagens. O projeto já usou Gemini (há
`Gemini_Generated_Image_*.png` em `assets/`).

### Alternativa — Leonardo.ai

Free tier (~150 créditos/dia) — tem exportação PNG transparente nativa +
"Style Reference" para travar o estilo em lote.

## Prompt (template — trocar só o nome da fruta)

```
A single [FRUTA], soft 3D rendered illustration, Pixar-style clay
texture, smooth matte finish, gentle soft studio lighting, warm
pastel color palette, centered composition filling 80% of frame,
fully transparent background, no text, no extra objects, cohesive
icon-set style, friendly and cute mood. Square 1:1, high detail.
```

## Fluxo de trabalho

1. Gerar primeiro a **semana 7 (mirtilo)** como âncora de estilo.
2. Aprovar a âncora.
3. Para cada fruta seguinte: subir a imagem âncora e escrever
   *"same exact rendering style, lighting and finish as this reference image,
   but a [FRUTA]"*.
