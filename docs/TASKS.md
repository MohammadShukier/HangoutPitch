# Tasks

## Handoff (rewritten at the end of every task — max 8 lines)
T0–T5 done. Base: `AppScreen({ children, centered })`, `AppButton({ text, onPress, style, variant, disabled })`, `AppTextInput`; `colors`/`statusColors`/`sizes` in colors.js.
`useOutings()` → `{ outings, isLoaded, error, addOuting(outing) (assigns id), updateOuting(id, changes), deleteOuting(id), setMyResponse(id, name, response) }`; `error` is a string ("" = none).
`useAuth()` → `{ user: { name, email } | null, login, logout }`. Screens outside tabs (`outing/[id]`, `outing/form`) do their own `!user` → `<Redirect href="/login" />`.
Form: `OutingForm({ initialValues, submitText, onSubmit })` validates with `outingSchema` and passes `result.data` (trimmed, cost as number) to `onSubmit`. Empty cost box = 0 (Free).
`outing/form.jsx`: add mode (`emptyOuting`, user added as going, "Outing added" Alert → back) / edit mode (`?id=`, `updateOuting` → back). Title via `<Stack.Screen options={{ title }} />` in every branch.
`error` is shown on Home + Details only (not on the form/profile) — check during T6 save-failure test.
Gotchas: Lint = `CI=1 npx expo lint`. Back on Home → Welcome (still logged in) — fix in T6.
Next (T6): Requirements pass.

---

- [x] **T0 — Base setup**
  - Make sure `src/app/`, `src/components/`, `src/context/`, `src/data/`, `src/utils/`, `src/constants/` exist. Delete any leftover template demo files the app won't use.
  - `src/constants/colors.js`: own HangoutPitch palette (primary, background, card, text, muted, border, error, success) + one color per status (Idea/Voting/Confirmed).
  - Copy the class base components into `src/components/` in the class style, using colors.js: `AppScreen`, `AppButton` (add optional `variant`: primary/secondary/danger, and `disabled`), `AppTextInput`.
  - `src/app/_layout.jsx`: Stack with header style + placeholder `index.jsx` that says "HangoutPitch".
  - Run `npx expo lint` once (it may set up ESLint on first run — accept).
  - Done when: app opens on the phone showing the placeholder with the styled header.

- [x] **T1 — Data layer**
  - `src/data/mockOutings.js`: 8 realistic outings (shape in CLAUDE.md), every status and type used, real places in Lebanon, 3–6 friend responses each.
  - `src/context/OutingsContext.jsx` + `useOutings()` hook, with the API and the persistence rules from CLAUDE.md. Wrap the Stack in `_layout.jsx`.
  - Temporary: placeholder screen shows `outings.length` and a "Delete all" button.
  - Done when: count shows 8; Delete all → fully close and reopen → still 0. Then remove the temp button.

- [x] **T2 — Auth flow**
  - `src/utils/validation.js` → `loginSchema`. `src/data/mockUser.js`. `src/context/AuthContext.jsx` (wrap in `_layout.jsx`).
  - Welcome screen (app name, one-line pitch, "Get started" → login). Login screen like the class one, but errors under each field + "Email or password is incorrect." Success → `router.replace("/(tabs)")`.
  - `(tabs)/_layout.jsx` with guard + Ionicons. Placeholder Home. Profile: name, email, number of outings, Logout with Alert confirm → `router.replace("/login")`.
  - Done when: wrong/invalid input shows errors; login works; logout works; Android back after logout doesn't re-enter the app.

- [x] **T3 — Home list**
  - Components: `OutingCard({ outing, onOpen })` (title, type icon, date, location, `StatusBadge`, "X going"), `StatusBadge({ status })`, `SearchBar({ value, onChangeText })`, `OutingFilters({ options, selected, onChange })` (used twice: status row, type row; "All" option; horizontal scroll), `EmptyState({ title, message, actionText, onAction })`.
  - Search by title (case-insensitive) combined with both filters.
  - Two different empty states: "No outings yet" (+ "Pitch an outing") vs "No outings match your search" (+ "Clear filters").
  - While `isLoaded` is false show ActivityIndicator. Show `error` if set.
  - "New outing" button → `/outing/form`. Card → `/outing/[id]`.

- [x] **T4 — Details screen**
  - Look up by `Number(id)`. All fields; cost "Free" when 0; status badge; RSVP counts (Going/Maybe/Can't) + friend list.
  - `ResponseSelector({ value, onChange })` with 3 buttons, current one highlighted → `setMyResponse`.
  - Edit → `/outing/form?id=…`. Delete → Alert confirm → `deleteOuting` → back (with canGoBack fallback).
  - Unknown id → "Outing not found" + Back button. Header title "Outing details".

- [x] **T5 — Add/Edit form**
  - `outingSchema` in validation.js: title 3–60, type enum, location required ≤80, cost 0–10000 (text input → `z.coerce.number`), date `YYYY-MM-DD` and a real date, status enum, notes ≤300 optional.
  - `OutingForm({ initialValues, submitText, onSubmit })` component used for both modes. Type and status chosen with `OutingFilters`-style chips (reuse it). Errors under each field.
  - Add: user added as "going"; success `Alert` → back. Edit: details screen shows the new data immediately.
  - Header title "New outing" / "Edit outing" (`<Stack.Screen options={{ title }} />` inside the screen).

- [ ] **T6 — Requirements pass**
  - Walk through the checklist below and fix gaps only.
  - Save failure → user sees a message (test by temporarily throwing in the save effect, then remove).
  - Same spacing/typography on all screens; every button works; back navigation is logical everywhere.

- [ ] **T7 — Documentation**
  - README.md: purpose, users, setup (`npm install`, `npx expo start`), tested with Expo Go on <ask user: phone model + Android/iOS version>, mock credentials, features, known limitations (no backend, friends come from mock data, login not remembered after restart, …), folder structure, "Submitted version: git tag `v1.0`".
  - `docs/screen-flow.md`: Mermaid flowchart of all screens and transitions.
  - `docs/VIDEO_NOTES.md`: ~5-minute script in order (login + validation → navigation → add → view → edit → delete with confirm → search/filter → empty states → full app restart for persistence), then the 3 code explanations with file + function names: one reusable component and its props/callbacks, one state update, AsyncStorage save/restore. Plain words the user can read aloud.

## Requirements checklist (for T6)
Welcome · mock login · main screens · details · logout → login · logical back nav · view list · details · add · edit · delete with confirm · search/filter · state consistent across screens · Zod on login + outing form · understandable errors · AsyncStorage persistence incl. empty list · feedback for empty list, no results, loading, failed operation · loading indicator only when actually waiting · components outside src/app · props + callbacks · clear names · consistent UI.
