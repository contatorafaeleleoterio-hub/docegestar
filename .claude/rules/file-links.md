---
paths: "**/*"
---

# File Link Format — Regra de Entrega de Arquivos

## Regra Obrigatória

Sempre que mencionar um arquivo do projeto ou um link local (HTML, pasta, recurso), usar o formato abaixo. Nunca entregar caminho absoluto cru como texto solto.

---

## Contexto técnico

Claude Code Desktop **não abre o Windows Explorer** via links `file:///` — o app tenta ler o arquivo internamente. Por isso o formato correto usa caminhos copiáveis.

---

## Formato para arquivos do projeto

```
📄 **nome-do-arquivo.ext**
📁 `C:\Users\USUARIO\Desktop\GESTANTE\meu-projeto\caminho\da\pasta\`
```

O caminho da pasta vem em bloco de código (backtick) para facilitar copiar e colar na barra de endereço do Explorer.

### Exemplos corretos

📄 **index.ts**
📁 `C:\Users\USUARIO\Desktop\GESTANTE\meu-projeto\src\types\`

📄 **explorar.tsx**
📁 `C:\Users\USUARIO\Desktop\GESTANTE\meu-projeto\app\(tabs)\`

📄 **cowork-revista-feed.md**
📁 `C:\Users\USUARIO\Desktop\GESTANTE\meu-projeto\docs\plans\`

### Exemplos ERRADOS (nunca usar)

- ❌ Caminho absoluto como texto corrido sem formatação
- ❌ Links `file:///` (não funcionam no Claude Code Desktop)
- ❌ Paths relativos sem a raiz do projeto

---

## Formato para múltiplos arquivos na mesma pasta

Quando 2+ arquivos estiverem na mesma pasta:

```
📁 `C:\Users\USUARIO\Desktop\GESTANTE\meu-projeto\src\types\`
  📄 **index.ts** — tipos principais
  📄 **revista.ts** — tipos do feed
```

---

## Formato para links online

Markdown padrão com texto descritivo:

```
[descrição clara do link](https://url-completa.com)
```

Nunca entregar URL crua sem âncora de texto.

---

## Raiz do projeto DoceGestar

`C:\Users\USUARIO\Desktop\GESTANTE\meu-projeto\`
