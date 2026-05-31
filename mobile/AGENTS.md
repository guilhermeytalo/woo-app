# DON'T PANIC

> *"A Guide to the Wöo Codebase — more helpful than the Vogon Constructor Fleet, and considerably less destructive."*

This document is your copy of the **Hitchhiker's Guide to the Wöo Galaxy**. It is carried by all developers, agents, and sentient beings who interact with this repository. Keep it with you at all times — much like a towel, you will be glad you have it.

The project has been described as **"Mostly Harmless"** by those who have survived shipping to production. Do not let this fool you. It is a deeply thoughtful micro-adventure platform built on the remains of a backend that was, regrettably, demolished to make way for a hyperspace bypass.

---

## The Guide Entry for Wöo

*Wöo (pronounced "Woo", though the umlaut is considered spiritually significant by its creators) is a mobile application for the planet Earth, designed to encourage its inhabitants to stop staring at their screens and go do something absurd outside.*

*Users select a mode of adventure — Individual, Couple, Family, or Group — receive up to four randomised missions of varying absurdity, and are invited to log their experience for posterity. The data is stored locally on their device, which the Guide notes is "arguably safer than storing it in the Magrathean data archives, which have not been accessible since a small thermonuclear device was accidentally triggered during a routine backup."*

---

## BEFORE YOU WRITE A SINGLE LINE OF CODE

The Expo SDK has changed. It will change again. The universe is in a constant state of flux, and Expo follows this principle enthusiastically.

**Read the exact versioned docs before writing any code:**
https://docs.expo.dev/versions/v56.0.0/

Failure to do so will result in code that behaves as if it was written by the Sirius Cybernetics Corporation — technically functional, yet inexplicably wrong.

---

## The Topology of the Galaxy (Project Structure)

*"Space," says the Guide, "is big. Really big. You just won't believe how vastly, hugely, mind-bogglingly big it is. The Wöo codebase is somewhat smaller, but follows a similarly hierarchical arrangement."*

```
woo/mobile
  └── src
      ├── assets              ← visual matter; handle with care
      │   ├── fonts
      │   └── images
      │
      ├── app                 ← Expo Router. Files here are routes. Nothing else lives here.
      │   ├── _layout.tsx     ← the root of all things
      │   ├── index.tsx       ← home planet (ModeSelection)
      │   └── *.tsx           ← each file re-exports from src/route/. No logic. No UI.
      │
      ├── route               ← actual screen logic; the meat of the galaxy
      │   └── screenName
      │       ├── index.ts            ← re-export only
      │       ├── ScreenName.tsx      ← the screen component
      │       ├── styles.ts           ← StyleSheet (runtime values only)
      │       ├── helper.ts           ← pure functions, no hooks, no JSX
      │       ├── ScreenName.test.tsx ← tests (do not delete these again)
      │       ├── useAnimated.ts      ← optional: animation logic
      │       └── components/         ← optional: screen-local sub-components
      │
      ├── components          ← shared components, reusable across the galaxy
      │   └── ComponentName
      │       ├── index.ts
      │       ├── ComponentName.tsx
      │       └── styles.ts
      │
      ├── store               ← Zustand state management
      │   └── slices          ← one slice per domain
      │       ├── UserSlice.ts
      │       ├── AdventureLogSlice.ts
      │       └── ToastSlice.ts
      │
      ├── networking          ← future API layer; currently a placeholder dimension
      │   ├── apiClient.ts
      │   ├── urls.ts
      │   └── *Api.ts         ← one file per API domain
      │
      ├── hooks               ← reusable hooks that cross screen boundaries
      ├── types               ← shared TypeScript interfaces and types
      ├── constants           ← theme, colors, spacing tokens
      ├── utils               ← pure utility functions and helpers
      └── logs                ← ErrorLogger; errors recorded here, never transmitted
```

---

## Laws of New Screen Creation

*"The major difference between a thing that might go wrong and a thing that cannot possibly go wrong is that when a thing that cannot possibly go wrong goes wrong it usually turns out to be impossible to get at or repair."* — apply this to your `index.ts` files accordingly.

1. Create a new folder under `src/route/<screenName>/`
2. The folder **must** contain:
   - `index.ts` — re-exports the screen component. One line. Nothing else.
   - `<ScreenName>.tsx` — the screen component
   - `styles.ts` — all `StyleSheet.create()` definitions (runtime-computed values only)
   - `helper.ts` — pure helper functions (no hooks, no JSX, no side effects)
   - `<ScreenName>.test.tsx` — tests. **Do not delete these.** The last crew that did so met the same fate as the Vogon Constructor Fleet's poetry critics.
3. Optionally add:
   - `useAnimated.ts` — animation logic specific to this screen
   - `components/` — sub-components used only by this screen
4. **Never** put business logic or styles directly inside the `.tsx` file.
5. Register in `src/app/<screen>.tsx` with only: `export { default } from '@/route/<screenName>';`

---

## The Technology Compendium

### Routing — Expo Router

*The Infinite Improbability Drive of routing solutions. Files become routes. Routes become screens. It is, the Guide notes, "a perfectly normal piece of technology, despite occasional reports of it doing the impossible at inopportune moments."*

- File-based routing via `src/app/`. Each file maps to a route.
- Screen logic and UI live in `src/route/<screenName>/`, **not** in `src/app/`.
- `src/app/<screen>.tsx` contains only the re-export. No UI. No logic. No exceptions.

---

### Styling — NativeWind

*Much like the Babel fish, NativeWind translates one language (Tailwind) into another (React Native styles), and in doing so has caused more arguments than almost anything else in the known universe.*

- Use `className` (NativeWind/Tailwind) for **all static styles**.
- Use `StyleSheet.create()` **only** for values computed at runtime (e.g. dynamic widths, animated transforms, Reanimated animated styles).
- **Never** use inline style objects `style={{ ... }}` for static values.
- Brand colors are Tailwind tokens in `tailwind.config.js`. Use token names (`bg-woo-principal`, `text-woo-red`). Never raw hex in JSX.

---

### State Management — Zustand

*"The answer is 42," said Deep Thought. Zustand, to its credit, is considerably more useful for managing application state, and somewhat less theatrical about it.*

- Use Zustand for **cross-screen global state** only: user profile, app config, UI flags persisted across navigation.
- Use `useState` / `useReducer` for **UI-only local state** (modal open, form input, loading flags).
- **Never store server/API data in Zustand** — when the backend returns from its hyperspace bypass, that data belongs in a proper fetching layer.
- Slices live in `src/store/slices/`. One slice per domain.

---

### Data Fetching — Future Consideration

*The backend was, as the commit history notes, destroyed by an asteroid. A replacement is planned. When it arrives, all API calls must go through custom hooks in `src/networking/`, one file per API domain. Never fetch directly inside a component. The Sirius Cybernetics Corporation fetches directly inside components, and their products are universally loathed.*

---

### TypeScript

*"I may not have gone where I intended to go, but I think I have ended up where I intended to be." TypeScript ensures you at least know where you are.*

- Strict mode is on. **No `any`.** The hitchhiker who uses `any` has, essentially, thrown away their towel.
- Use `interface` for object shapes, `type` for unions and primitives.
- Props types are defined in the same file as the component.
- Shared domain types live in `src/types/`.

---

### Animations — Reanimated 4

- All animation logic runs on the UI thread via Reanimated worklets.
- Splash, drawers, toasts, and skeleton pulses all use `withTiming` / `withRepeat`.
- Never animate on the JS thread for things the user can see.

---

## The Wöo Colour Palette

*Colours, as the Guide observes, are mostly harmless. These specific colours were chosen by beings of taste and discretion, and should not be substituted under any circumstances, regardless of how much you personally feel that a slight adjustment to the red would "really make it pop."*

| Token | Hex | Usage |
|---|---|---|
| `woo-principal` | `#FAF7F5` | All screen backgrounds |
| `woo-red` | `#792C2D` | Primary accent, buttons, titles |
| `woo-yellow` | `#F4B740` | Secondary accent |
| `woo-dark-text` | `#2E2E2E` | Primary text |
| `woo-light-gray` | `#6B6B6B` | Secondary / label text |
| `woo-white-cards` | `#FFFFFF` | Card backgrounds |

---

## The Paranoid Android's Notes on Error Handling

*"I could calculate your chances of survival, but you won't like it."*

- Errors in production are logged via `src/logs/ErrorLogger.ts` to AsyncStorage.
- They are never transmitted anywhere — they simply accumulate, like regrets.
- A Sentry integration is planned for when the project leaves its current "Mostly Harmless" phase.
- For the hackathon restriction, `src/utils/RecipeDebugger.ts` formats adventure logs as culinary recipes. This is canon.

---

## Final Note from the Guide

> *"A common mistake that people make when trying to design something completely foolproof is to underestimate the ingenuity of complete fools."*
>
> Write your code as if the next developer to maintain it knows where their towel is, but has had a very long day. Be kind. Be clear. Be typed.

**So long, and thanks for all the quests.**
