# Wöo — O Guia do Mochileiro das Micro-Aventuras

> *"No princípio, o Universo foi criado. Isso deixou muita gente furiosa e foi amplamente considerado uma péssima ideia."*
> *O app Wöo foi criado logo em seguida, como medida corretiva.*

**NÃO ENTRE EM PÂNICO.** Este guia contém tudo o que você precisa saber para rodar o app, entender sua arquitetura e depurá-lo usando metáforas culinárias.

---

## O Que É Isso?

Wöo é um **app de micro-aventuras gamificadas** para iOS, Android e Web. O usuário escolhe um modo social (Individual, Casal, Família, Amigos), recebe até quatro desafios absurdos aleatórios, os realiza no mundo real e registra a experiência com anotações e uma nota de estrelas.

Todos os dados são armazenados localmente no dispositivo. O backend que um dia existiu foi, conforme o histórico do git registra, *"demolido para dar lugar a um desvio de hiperespaço."* Um substituto está planejado.

---

## Pré-requisitos

Antes de começar, certifique-se de que sabe onde está sua toalha. E também:

- **Node.js** ≥ 18
- **npm** ≥ 9
- **iOS:** Xcode + Simulador (apenas macOS)
- **Android:** Android Studio + emulador, ou dispositivo físico com Expo Go instalado
- **Web:** qualquer navegador moderno

---

## Primeiros Passos

### 1. Instalar dependências

```bash
npm install
```

### 2. Iniciar o servidor de desenvolvimento

```bash
npm start
# ou
npx expo start
```

O Metro bundler inicia e exibe um QR code. A partir daí, escolha sua plataforma.

---

## Rodando em Cada Plataforma

### Simulador iOS

```bash
npm run ios
# ou pressione `i` no terminal do Metro
```

Requer Xcode instalado no macOS. O simulador abre automaticamente.

### Emulador Android / Dispositivo Físico

```bash
npm run android
# ou pressione `a` no terminal do Metro
```

Requer Android Studio com um emulador rodando, ou um dispositivo físico com depuração USB ativada e o **Expo Go** instalado.

> **Dispositivo físico:** escaneie o QR code exibido no terminal com o app Expo Go (disponível na App Store e no Google Play).

### Web

```bash
npm run web
# ou pressione `w` no terminal do Metro
```

Abre em `http://localhost:8081` no navegador padrão. A animação de splash renderiza como animação CSS na web.

---

## Arquitetura do Projeto

*"O Guia descreve a arquitetura do Wöo como 'enganosamente simples, como um planeta que parece desabitado até você perceber a cerimônia do chá senciente acontecendo logo abaixo da superfície.'"*

```
src/
├── app/              ← Rotas Expo Router (só re-exportam, sem lógica)
│   ├── _layout.tsx   ← layout raiz: tema, splash, toast
│   ├── index.tsx     ← / → ModeSelection
│   ├── adventure.tsx ← /adventure → MicroAdventure
│   ├── adventure-log.tsx      ← /adventure-log → AdventureLog
│   ├── adventure-detail.tsx   ← /adventure-detail → AdventureDetail
│   ├── my-adventures.tsx      ← /my-adventures → MyAdventures
│   └── settings.tsx           ← /settings → Settings
│
├── route/            ← lógica das telas (UI + hooks ficam aqui, não em app/)
│   ├── modeSelection/
│   ├── microAdventure/
│   ├── adventureLog/
│   ├── adventureDetail/
│   ├── myAdventures/
│   └── settings/
│
├── components/       ← componentes compartilhados
│   ├── Drawer/         ← menu lateral de navegação
│   ├── Toast/          ← notificações de sucesso/erro
│   ├── ScreenHeader/   ← botão voltar + logo
│   └── DiceBearAvatar/ ← avatar do usuário (DiceBear, cache em disco)
│
├── store/            ← estado global com Zustand
│   └── slices/
│       ├── UserSlice.ts         ← nome, avatarSeed (persistido)
│       ├── AdventureLogSlice.ts ← aventuras concluídas (persistido)
│       └── ToastSlice.ts        ← estado das notificações (apenas memória)
│
├── utils/
│   ├── quests.ts          ← 22 quests + Fisher-Yates pickRandom
│   └── RecipeDebugger.ts  ← modo debug: imprime logs como receitas 🍽️
│
├── logs/
│   └── ErrorLogger.ts     ← registro de erros no AsyncStorage
│
└── constants/
    └── theme.ts           ← WooColors, Fonts, Spacing
```

### Convenções principais

| Regra | Motivo |
|---|---|
| `src/app/*.tsx` só re-exporta | Separa roteamento de lógica |
| NativeWind `className` para estilos estáticos | `StyleSheet` apenas para valores em tempo de execução / animações |
| Zustand para estado global, `useState` para estado local de UI | Dados do servidor não entram no Zustand |
| Sem `any` no TypeScript | Strict mode ativado |
| `interface` para objetos, `type` para unions | Consistência |

### Fluxo de navegação

```
ModeSelection (/)
  └── MicroAdventure (/adventure)
        └── AdventureLog (/adventure-log)
              └── MyAdventures (/my-adventures) ← também via Drawer
                    └── AdventureDetail (/adventure-detail)

Drawer (overlay global) → Settings (/settings)
```

### Persistência de estado

| Store | Chave | Persistido? |
|---|---|---|
| UserSlice | `woo-user` | ✅ AsyncStorage |
| AdventureLogSlice | `adventure-logs` | ✅ AsyncStorage |
| ToastSlice | — | ❌ Apenas memória |

---

## Lint e Verificação de Tipos

```bash
# Lint via Expo
npm run lint

# Checagem TypeScript (sem emitir arquivos)
npx tsc --noEmit
```

---

## Modo Debug — RecipeDebugger 🍽️

*Conforme restrição absurda oficial recebida do cosmos: "O projeto deve ter um modo de debug que imprime os dados em formato de receita culinária." Não tem como escapar.*

O `RecipeDebugger` formata os dados de `AdventureLog` como receitas culinárias e os imprime no console do Metro. Só executa em `__DEV__` — a cozinha de produção está fechada.

### Onde dispara automaticamente

| Tela | Função | Gatilho |
|---|---|---|
| **AdventureDetail** | `debugAsRecipe(log)` | Ao abrir qualquer aventura salva |
| **MyAdventures** | `debugAllAsMenu(logs)` | Ao abrir a tela ou salvar uma nova aventura |

### Onde ver o output

Todo o output vai para o **terminal do Metro bundler** — a mesma janela onde você rodou `npm start`. Procure pelo banner `╔══ RECEITA DE AVENTURA CÓSMICA ══╗`.

### Exemplo de output

```
╔══════════════════════════════════════════════════════════════╗
║              🍽️  RECEITA DE AVENTURA CÓSMICA  🍽️              ║
╚══════════════════════════════════════════════════════════════╝

📖 TIPO DE COZINHA
   Banquete Coletivo — serve até 8 pessoas sem senso de vergonha

🗓️  DATA DE PREPARO
   sábado, 31 de maio de 2026

🥘 INGREDIENTES PRINCIPAIS
   - 1 desafio absurdo (18 palavras, medidas com precisão duvidosa)
   - ⭐⭐⭐⭐⭐ de coragem (nível 5/5)
   - 1 dose generosa de improvisação
   - Comentários do chef (a gosto): "Love"

📋 MODO DE PREPARO
   1. Leia o desafio com seriedade imprópria:
      "Escondam uma batata. Criem uma história épica..."

🍷 COMO SERVIR
   A resposta para esta receita é 42. E também estava deliciosa.
```

### Uso manual

```typescript
import { debugAsRecipe, debugAllAsMenu } from '@/utils/RecipeDebugger';

// receita de uma aventura específica
debugAsRecipe(log);

// menu degustação com todas as aventuras
debugAllAsMenu(logs);
```

---

## Log de Erros

Erros capturados nos fluxos do app são registrados localmente via `src/logs/ErrorLogger.ts`:

```typescript
import { logError } from '@/logs/ErrorLogger';

try {
  // ...
} catch (error) {
  logError('NomeDaTela', 'nomeAcao', error, { contextoExtra: 'valor' });
}
```

Os logs ficam no AsyncStorage sob a chave `@woo:error_logs` (máximo de 100 entradas — os mais antigos são removidos automaticamente). **Nunca são transmitidos.** Para lê-los ou limpá-los:

```typescript
import { getLogs, clearLogs } from '@/logs/ErrorLogger';

const logs = await getLogs(); // lê todos
await clearLogs();            // apaga tudo
```

---

## Cores da Marca

| Token | Hex | Uso |
|---|---|---|
| `woo-principal` | `#FAF7F5` | Fundo de todas as telas |
| `woo-red` | `#792C2D` | Destaque primário, botões, títulos |
| `woo-yellow` | `#F4B740` | Destaque secundário |
| `woo-dark-text` | `#2E2E2E` | Texto principal |
| `woo-light-gray` | `#6B6B6B` | Texto secundário / labels |
| `woo-white-cards` | `#FFFFFF` | Fundo de cards |

Sempre use o nome do token no `className` — nunca hex diretamente no JSX.

---

## Leitura Complementar

- [Expo Router](https://docs.expo.dev/router/introduction/) — roteamento baseado em arquivos
- [NativeWind](https://www.nativewind.dev/) — Tailwind para React Native
- [Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction) — gerenciamento de estado
- [Reanimated](https://docs.swmansion.com/react-native-reanimated/) — animações
- [O Guia do Mochileiro das Galáxias](https://pt.wikipedia.org/wiki/O_Guia_do_Mochileiro_das_Gal%C3%A1xias) — fundação espiritual do projeto

---

*Até logo, e obrigado pelos peixes... quer dizer, pelas quests.*
