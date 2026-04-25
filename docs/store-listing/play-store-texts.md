# DoceGestar — Textos para Google Play Store

## Informações básicas

| Campo | Valor |
|-------|-------|
| Nome do app | DoceGestar |
| Categoria | Saúde e fitness |
| Classificação de conteúdo | Everyone (PEGI 3 / Livre) |
| Idioma principal | Português (Brasil) |
| E-mail de suporte | contatorafaeleleoterio@gmail.com |
| Site | https://docegestar.com.br |
| Política de Privacidade | https://docegestar.com.br/privacidade |

---

## Título do app (30 chars máx.)

```
DoceGestar
```

---

## Descrição curta (80 chars máx.)

```
Acompanhe sua gravidez semana a semana com dicas, ferramentas e muito amor 🌸
```

*Alternativa (sem emoji, mais formal):*
```
App de acompanhamento gestacional completo para mães brasileiras.
```

---

## Descrição completa (4000 chars máx.)

```
Sua gravidez, semana a semana — com carinho e cuidado.

O DoceGestar é o companheiro de gestação feito especialmente para mães brasileiras. Do primeiro trimestre ao parto, você tem ao lado tudo o que precisa: informação confiável, ferramentas práticas e uma experiência linda que faz cada semana parecer especial.

✨ ACOMPANHAMENTO SEMANA A SEMANA
Saiba exatamente o que está acontecendo com você e com o bebê em cada semana. Comparação de tamanho (seu bebê do tamanho de um abacate? um coco?), marcos de desenvolvimento, curiosidades fascinantes e muito mais — tudo em português, para mães brasileiras.

📅 TIMELINE VISUAL DA GRAVIDEZ
Visualize sua jornada completa: os 3 trimestres, semanas concluídas e quanto falta para o grande dia. Uma linha do tempo bonita que você vai querer mostrar para todo mundo.

🩺 FERRAMENTAS DE MONITORAMENTO
- Contador de chutes do bebê com histórico
- Timer de contrações com detecção do padrão 3-1-1
- Rastreador de sintomas com gráfico das últimas semanas
- Agenda de consultas pré-natais com lembretes automáticos

💡 DICAS E CONTEÚDO PERSONALIZADOS
Receba dicas diárias adaptadas à sua semana gestacional — sobre sono, alimentação, movimento e saúde emocional. Sem excesso de informação: só o que importa, quando você precisa.

📝 MOMENTO ESPECIAL
Registre memórias, sentimentos e fotos da barriga. Cada semana é única — o DoceGestar ajuda você a guardar para sempre.

🔒 100% PRIVADO E OFFLINE
Todos os seus dados ficam apenas no seu celular. Nada vai para servidores externos. Sua privacidade é total.

🌺 PERSONALIZADO PARA VOCÊ
Configure o app com seu nome, a Data Prevista do Parto, o nome do bebê e o tipo de gestação. A experiência é sua.

---

Disclaimer: O DoceGestar é um aplicativo de apoio informativo e não substitui o acompanhamento médico profissional. Sempre consulte seu obstetra ou médico de confiança para orientações de saúde.
```

---

## Notas do desenvolvedor (para revisão da Play Store)

- O app armazena todos os dados localmente no dispositivo (SQLite)
- Não há coleta de dados pessoais em servidores externos
- Notificações são 100% locais (sem Firebase Cloud Messaging)
- O app não contém anúncios, compras in-app nem assinaturas
- Conteúdo médico é de caráter informativo, com disclaimer obrigatório visível

---

## Tags / Palavras-chave (ASO)

```
gravidez, gestação, gestante, bebê, acompanhamento gravidez, semanas de gravidez,
desenvolvimento fetal, contador de chutes, timer contrações, pré-natal,
app gestação, gravidez semana a semana, dicas de gravidez, maternidade
```

---

## Screenshots necessárias (1080×1920 px, 9:16)

| # | Tela | Descrição |
|---|------|-----------|
| 1 | Dashboard | Banner semanal + semana atual + streak counter |
| 2 | Semana (WeekCard) | Cards swipeáveis do bebê com tamanho e desenvolvimento |
| 3 | Timeline | Visualização dos 3 trimestres |
| 4 | Ferramentas | Kick counter + timer de contrações |
| 5 | Ferramentas | Agenda de consultas pré-natais |
| 6 | Semana | Rastreador de sintomas com gráfico |
| 7 | Onboarding | Tela de boas-vindas personalizada |
| 8 | Semana | Dicas diárias com categorias |

*Mínimo exigido: 2 screenshots. Recomendado: 8.*

---

## Ícone do app

- Tamanho: 512×512 px
- Arquivo: `assets/icon.png` (já preparado no projeto)
- Fundo: sem fundo transparente (Play Store exige fundo sólido)

---

## Feature Graphic (banner da Play Store)

- Tamanho: 1024×500 px
- Criar com: fundo gradiente magenta (#b30064 → #8c004e) + logo DoceGestar centralizado + tagline

---

## Checklist de publicação

- [x] Privacy Policy URL configurada (docegestar.com.br/privacidade)
- [ ] Screenshots geradas (8 telas 1080×1920)
- [ ] Feature Graphic criado (1024×500)
- [ ] Conta Google Play Developer ativa
- [ ] AAB de produção gerado (`eas build --platform android --profile production`)
- [ ] App Bundle submetido via Play Console
