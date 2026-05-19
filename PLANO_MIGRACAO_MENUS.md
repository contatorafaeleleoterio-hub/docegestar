# 🚀 Plano de Execução: Reestruturação "Ferramentas" & "Configurações"

Este plano visa migrar funcionalidades de acompanhamento para o menu dedicado de **Ferramentas**, seguindo um padrão de lista/grid moderno, e elevar o menu **Perfil/Config** para padrões de mercado focados em gestão de conta e personalização.

## 📍 Fase 1: Redesenho do Menu "Ferramentas" (Tab Ferramentas)

Atualmente, esta tela exibe todos os cards abertos. A nova versão será um **Catálogo de Ferramentas** organizado e limpo.

### 🎨 Design & Layout (Prompt Visual)
> "Crie uma tela de 'Ferramentas' para um app de gestantes. O layout deve ser uma lista vertical de cards elegantes ou um grid de 2 colunas. Cada item deve conter: um ícone minimalista em container circular pastel, um título claro (ex: 'Contador de Chutes') e uma breve descrição (ex: 'Registre os movimentos do bebê'). Use a paleta #E8A0BF (rosa) e #C8A2D0 (lilás). Adicione categorias como 'Monitoramento', 'Saúde' e 'Memórias'."

### 🛠️ Itens da Nova Lista de Ferramentas
Deverão ser migrados do menu Config para cá:
1.  **Consultas Pré-natais** (Agenda e lembretes)
2.  **Exames & Laudos** (Repositório de resultados)
3.  **Vitaminas & Remédios** (Controle de doses)
4.  **Plano de Parto** (Editor de preferências)
5.  **Enxoval** (Checklist de compras)
6.  **Álbum de Fotos** (Galeria da barriga/marcos)
7.  **Meu Diário** (Registro de humor e notas)
8.  **Biblioteca/Artigos** (Conteúdo educativo)
9.  **Chat com Obstetriz** (Suporte Plus)

**Ferramentas que já estavam e permanecem:**
10. **Contador de Chutes**
11. **Temporizador de Contrações**
12. **Rastreador de Sintomas**

---

## ⚙️ Fase 2: Upgrade do Menu "Configurações" (Tab Perfil)

Com a saída das ferramentas, o foco agora é a **Mãe e a Conta**.

### 🎨 Design & Layout (Prompt Visual)
> "Crie uma tela de 'Configurações/Perfil' seguindo o padrão Apple/Airbnb. No topo, uma seção de Perfil proeminente com foto circular (avatar), nome e um botão 'Editar Perfil'. Abaixo, listas agrupadas por: 'Gestação' (DPP, Tipo de Parto), 'Preferências' (Notificações, Unidades), 'Suporte' (Ajuda, Sobre) e 'Conta' (Sair). Use ícones de linha fina e setas (chevron-right) para navegação."

### ✨ Novas Funcionalidades Sugeridas (Práticas de Mercado)
1.  **Gestão de Identidade:**
    *   Alterar foto de perfil (integração com galeria/câmera).
    *   Edição de Nome e Apelido do Bebê.
2.  **Configurações de Notificação Avançadas:**
    *   Chaves (switches) individuais para cada tipo de lembrete.
    *   Definição de horário de "Não Perturbe".
3.  **Personalização da Experiência:**
    *   Seleção de Unidades (kg/lb, cm/in).
    *   Modo de visualização (se prefere ver idade em semanas ou meses).
4.  **Segurança e Dados:**
    *   Backup em Nuvem (Sync).
    *   Exportar Dados (PDF do histórico da gestação).
5.  **Central de Ajuda:**
    *   FAQ (Dúvidas frequentes).
    *   Fale Conosco / Suporte técnico.

---

## 🏗️ Fase 3: Estrutura Técnica (Arquitetura de Arquivos)

Para manter o código limpo, cada ferramenta deve ser uma tela independente (`app/screens/`), e não apenas um componente dentro da tab.

### 📝 Roadmap de Desenvolvimento
1.  **Refatoração de `ferramentas.tsx`:** Converter o conteúdo atual em um menu de navegação usando `FlatList`.
2.  **Criação de Novas Rotas:** Criar arquivos específicos para as ferramentas que ainda estão embutidas (ex: `app/kick-counter.tsx`).
3.  **Limpeza de `perfil.tsx`:** Remover os `MENU_ITEMS` de ferramentas e implementar as novas seções de configuração.
4.  **Implementação do ImagePicker:** Adicionar biblioteca para permitir a troca da foto de perfil.
