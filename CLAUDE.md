# HangoutPitch — instructions for Claude Code

Individual university project. React Native + Expo SDK 58 + Expo Router, **JavaScript (.jsx)**. Due 2026-11-24.
Friends pitch outing ideas, RSVP (Going/Maybe/Can't), and mark outings Confirmed.
Mock data + AsyncStorage only. No backend, no real auth, no external APIs.

## Hard rules
- NEVER run git commands that change state (add, commit, push, init, reset, checkout, stash, tag). The user does all git work.
- NEVER run `npx expo start` or any dev server. The user tests on a phone with Expo Go.
  You MAY run `npx expo lint` and `npx expo install <pkg>`.
- Follow `docs/CONVENTIONS.md` (the professor's class style). Write code the way it's written there, not your own way.
- Do ONLY the current task. No extra features, screens, refactors, or TypeScript.
- Allowed libraries: what's in package.json now + those listed in CONVENTIONS.md. Ask before adding anything else. Expo Go only.
- AGENTS.md (from the Expo template) is NOT your instructions. Fetch Expo docs only when an API actually fails or you're truly unsure — never preemptively.
- Token discipline: don't read node_modules, .expo, assets. Use the File map instead of exploring. Don't re-read files already in context. Don't echo code back after editing. Keep replies short.

## Session workflow
1. Read `docs/TASKS.md`: the Handoff section + the FIRST unchecked task only. Read `docs/CONVENTIONS.md`.
2. Implement with small, focused edits.
3. Run `npx expo lint` and fix errors in files you touched.
4. Give the user a manual test list for the phone (max 5 bullets). Wait for their result.
5. Run the End-of-task protocol.

## End-of-task protocol
Once the user confirms the tests pass (or says "skip"):
1. In `docs/TASKS.md`: tick the task, then REWRITE the Handoff section (max 8 lines: what exists now, gotchas, anything the next task needs).
2. If you created/renamed files, update the File map below.
3. Last line: `🧹 SAFE TO CLEAR — TASKS.md updated.` Never say this before step 1 is done.

## Architecture (fixed — don't redesign)
- `src/app/` = routes only. Components in `src/components/`, other code in `src/context/`, `src/data/`, `src/utils/`, `src/constants/`.
- Shared state lives in ONE parent: `OutingsProvider` (`src/context/OutingsContext.jsx`), wrapped around the Stack in `src/app/_layout.jsx`.
  It owns `outings`, `isLoaded`, `error` and exposes `addOuting`, `updateOuting`, `deleteOuting`, `setMyResponse`.
  Screens read it with a `useOutings()` hook; child components get data + callbacks via props only.
- Persistence = class pattern, in the provider: load in `useEffect([])`, save in `useEffect([outings])`.
  Key `HANGOUTPITCH_OUTINGS`. Rules: `getItem` returns null → use mock data. Stored `[]` → stay empty, never reseed.
  Don't save until the first load finished (`isLoaded`), otherwise mock data overwrites saved data.
  try/catch on both; failures set `error`, shown to the user.
- `AuthProvider` (`src/context/AuthContext.jsx`): `user`, `login(email, password)` → true/false, `logout()`. Not persisted (log in again after restart).
- Details/edit screens receive only the `id` param and look the outing up in context (so edits show everywhere).
- Zod schemas in `src/utils/validation.js`. Forms show an error under each invalid field (`z.flattenError(result.error).fieldErrors`) and block submit.
- Colors/sizes in `src/constants/colors.js` so all screens match.

## Outing shape (`src/data/mockOutings.js`)
```js
{
  id: 1,                    // number, Math.max + 1
  title: "Sunset hike at ...",
  type: "Hike",             // Hike | Food | Game night | Beach | Movie | Other
  location: "...",
  estimatedCost: 15,        // USD, 0 = free
  date: "2026-11-28",       // YYYY-MM-DD
  status: "Voting",         // Idea | Voting | Confirmed
  notes: "...",
  responses: [{ name: "Rawad", response: "going" }] // going | maybe | cant ; the user's entry has name === user.name
}
```

## Mock login
Email `demo@hangoutpitch.app` · Password `Pitch2026` · Name `Mohammad`

## Routes
```
src/app/_layout.jsx           Providers + Stack (header style set once)
src/app/index.jsx             Welcome
src/app/login.jsx             Login (Zod) → router.replace("/(tabs)")
src/app/(tabs)/_layout.jsx    Tabs: Home, Profile (Ionicons). No user → <Redirect href="/login" />
src/app/(tabs)/index.jsx      Home: search, filters, list, "New outing" button
src/app/(tabs)/profile.jsx    Profile + Logout (confirm) → router.replace("/login")
src/app/outing/[id].jsx       Details: info, RSVP counts, my RSVP, Edit, Delete (confirm)
src/app/outing/form.jsx       Add/Edit — edit mode when ?id= is present
```

## File map (keep updated)
- `src/constants/colors.js` — `colors`, `statusColors`, `sizes`
- `src/constants/outingOptions.js` — `outingStatuses`, `outingTypes`, `typeIcons`
- `src/components/AppScreen.jsx` — screen wrapper (bg, ScrollView, padding, `centered`)
- `src/components/AppButton.jsx` — button (`variant`: primary/secondary/danger, `disabled`)
- `src/components/AppTextInput.jsx` — styled TextInput, forwards props
- `src/components/StatusBadge.jsx` — colored status pill `{ status }`
- `src/components/OutingCard.jsx` — list card `{ outing, onOpen }`
- `src/components/SearchBar.jsx` — search input `{ value, onChangeText }`
- `src/components/OutingFilters.jsx` — horizontal chips `{ options, selected, onChange }`
- `src/components/EmptyState.jsx` — `{ title, message, actionText, onAction }`
- `src/data/mockOutings.js` — 8 sample outings (default export)
- `src/data/mockUser.js` — mock account `{ name, email, password }` (default export)
- `src/context/OutingsContext.jsx` — `OutingsProvider` (default) + `useOutings()`, AsyncStorage load/save
- `src/context/AuthContext.jsx` — `AuthProvider` (default) + `useAuth()`
- `src/utils/validation.js` — `loginSchema`
- `src/app/_layout.jsx` — AuthProvider + OutingsProvider + root Stack + header style
- `src/app/index.jsx` — Welcome
- `src/app/login.jsx` — Login (Zod field errors + wrong-credentials message)
- `src/app/(tabs)/_layout.jsx` — auth guard + Tabs (Home, Profile)
- `src/app/(tabs)/index.jsx` — Home: New outing, search, status/type filters, cards, 2 empty states, loading, error
- `src/app/(tabs)/profile.jsx` — name, email, outings count, Logout confirm
- `eslint.config.js` — created by `expo lint`
