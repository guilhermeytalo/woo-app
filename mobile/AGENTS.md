# Expo HAS CHANGED

Read the exact versioned docs at https://docs.expo.dev/versions/v56.0.0/ before writing any code.

---

# Project Structure

When creating new screens, components, or any new code, strictly follow the structure below:

```
AwesomeProject
  └── src
      ├── assets
      │   ├── fonts
      │   │   └── <<Your Fonts>>
      │   └── images
      │       └── <<Your Images>>
      │
      ├── route
      │   ├── screenName
      │   │   ├── index.js
      │   │   ├── styles.ts
      │   │   ├── helper.ts
      │   │   ├── screenName.tsx
      │   │   ├── screenName.test.tsx
      │   │   ├── useAnimated.ts       (Optional)
      │   │   └── components           (Optional)
      │   │
      │   └── screenName2
      │       ├── index.js
      │       ├── styles.ts
      │       ├── helper.ts
      │       ├── screenName.tsx
      │       ├── screenName.test.tsx
      │       ├── useAnimated.ts       (Optional)
      │       └── components           (Optional)
      │
      ├── navigation
      │   ├── NavigationContainer
      │   ├── Route
      │   ├── NavigationService
      │   └── linking
      │
      ├── networking
      │   ├── apiclient
      │   ├── requestInterceptor       (Assuming axios)
      │   ├── responseInterceptor      (Assuming axios)
      │   ├── urls
      │   └── UserApi                  (Group related API calls per domain)
      │
      ├── components
      │   ├── Button
      │   │   ├── index.ts
      │   │   ├── Button.tsx
      │   │   ├── styles.ts
      │   │   ├── helper.ts
      │   │   └── useAnimated.ts       (Optional)
      │   └── <<Any other component>>
      │
      ├── hooks
      │   ├── useBackHandler.ts
      │   ├── useKeyboard.ts
      │   ├── useUploadImage.ts
      │   ├── useCamera.ts
      │   └── <<Any other hook>>
      │
      ├── types
      │   ├── UserInterface
      │   ├── MediaInterface
      │   └── AppConfigInterface
      │
      ├── redux
      │   ├── store.ts
      │   └── slices
      │       ├── UserSlice
      │       ├── IntermittentSlice
      │       └── ToastSlice
      │
      └── utils
          ├── Analytics.ts
          ├── CommonUtils.ts
          ├── Logger.ts
          ├── ErrorManager.ts
          ├── DateTimeUtils.ts
          ├── EncryptedStore.ts
          ├── string.ts
          ├── constants.ts
          └── enums.ts

---

# Rules for Creating a New Screen

1. Create a new folder under `src/route/<screenName>/`
2. The folder must contain:
   - `index.js` — re-exports the screen component
   - `<screenName>.tsx` — the screen component
   - `styles.ts` — all StyleSheet definitions (runtime-computed values only)
   - `helper.ts` — pure helper functions (no hooks, no JSX)
   - `<screenName>.test.tsx` — unit/component tests
3. Optionally add:
   - `useAnimated.ts` — animation logic specific to this screen
   - `components/` — sub-components used only by this screen
4. Never put business logic or styles directly inside the `.tsx` file; extract them to `helper.ts` and `styles.ts`.
5. Register the new screen in `src/app/` (Expo Router file-based routing). The `src/app/<screen>.tsx` file should only re-export the screen: `export { default } from '@/route/<screenName>';`

---

# Tech Stack

## Routing — Expo Router
- File-based routing via `src/app/`. Each file in `src/app/` maps to a route.
- Screen **logic and UI live in `src/route/<screenName>/`**, not in `src/app/`.
- `src/app/<screen>.tsx` contains only the re-export: `export { default } from '@/route/screenName';`
- Never write UI or business logic directly in `src/app/`.

## Styling — NativeWind
- Use `className` (NativeWind/Tailwind) for **all static styles**.
- Use `StyleSheet.create()` **only** for values computed at runtime (e.g. dynamic widths, animated transforms).
- Never use inline style objects `style={{ ... }}` for static values.
- Brand colors are defined as Tailwind tokens in `tailwind.config.js`. Use token names (`bg-woo-cream`, `text-woo-coral`), never raw hex in JSX.

## State Management — Zustand
- Use Zustand for **cross-screen global state** only: auth, user profile, app config, UI flags that persist across navigation.
- Use `useState` / `useReducer` for **UI-only local state** (modal open, form input).
- **Never store server/API data in Zustand** — that belongs in TanStack Query's cache.
- One slice per domain: `UserSlice`, `IntermittentSlice`, `ToastSlice` (under `src/redux/slices/`).

## Data Fetching — TanStack Query
- All API calls go through `useQuery` / `useMutation`. Never fetch directly inside a component.
- Each API domain gets a custom hook in `src/networking/` (e.g. `useUserApi.ts`).
- Query keys must be typed constants, not inline strings.
- Configure a single `QueryClient` in `src/app/_layout.tsx`.

## TypeScript
- Strict mode is on. No `any`.
- Use `interface` for object shapes, `type` for unions and primitives.
- Props types are defined in the same file as the component (no separate `types/` file for component props).
- Shared domain types live in `src/types/`.

## Colors / Design Tokens
- All brand colors are defined in `tailwind.config.js` (NativeWind) and mirrored in `src/constants/theme.ts` for non-NativeWind usage.
- Components consume token names, never raw hex values.

---

# Wöo Brand Colors

| Token | Hex | Usage |
|---|---|---|
| `woo-principal` | `#FAF7F5` | All screen backgrounds |
| `woo-red` | `#792C2D` | Primary accent, buttons, titles |
| `woo-yellow` | `#F4B740` | Secondary accent |
| `woo-dark-text` | `#2E2E2E` | Primary text |
| `woo-light-gray` | `#6B6B6B` | Secondary / label text |
| `woo-white-cards` | `#FFFFFF` | Card backgrounds |
