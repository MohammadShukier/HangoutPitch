# Class conventions (from the professor's "MyTasks" example — follow these)

## Stack & layout
- Expo SDK 58 (class example was 57 — same patterns), Expo Router, **JavaScript (.jsx) — no TypeScript**, React 19.
- Routes in `src/app/`. Reusable components in `src/components/`. Other code in `src/<folder>/` (outside `src/app/`).
- Imports are relative (`../components/AppButton`). Default exports, one component per file.
- Icons: `import { Ionicons } from "@react-native-vector-icons/ionicons";`
- Install packages only with `npx expo install <pkg>`.

## Components
- App-prefixed base components: `AppScreen`, `AppButton`, `AppTextInput` (copy their shape from the class).
  - `AppScreen`: View (bg) + ScrollView with `keyboardShouldPersistTaps="handled"`, padding 20, optional `centered` prop.
  - `AppButton`: Pressable with `text`, `onPress`, optional `style`; minHeight 44, radius 12.
  - `AppTextInput`: TextInput forwarding props (value, onChangeText, placeholder, keyboardType, secureTextEntry, autoCapitalize, autoCorrect, autoComplete, style).
- Feature components receive data + callbacks via props, e.g. `TaskItem({ task, onOpen, onDelete })`, `TaskFilters({ selected, onChange })`.
- Both `function X(props)` and destructured props are used. Prefer destructuring for new components.
- Lists: `items.map(item => <Item key={item.id} ... />)` inside AppScreen (no FlatList).

## Style
- `StyleSheet.create` at the bottom of every file. Arrays for conditional styles: `[styles.title, done && styles.done]`.
- Class palette for reference: dark green #203B35, button #285548, muted text #61736b, background #F5F3EE, border #A9BCAF, error #A03026, cards white with radius 16.
- Headings 28–34 bold, body 16–18, labels 16.
- Header styling is set once in the root `_layout.jsx` via `Stack screenOptions` (headerStyle bg + headerTintColor); titles via `<Stack.Screen name=… options={{ title }} />`.

## Functions & state
- Named handlers declared with `function`: `function handleLogin() {}`, `function openTaskDetails(task) {}`.
- `useState` for state. Updates use the functional form with immutable array ops:
  add → `[...current, newItem]`, delete → `current.filter(t => t.id !== id)`, edit → `current.map(...)`.
- IDs: numbers, `Math.max(0, ...current.map(t => t.id)) + 1`. Route params arrive as strings → compare with `Number(id)`.
- Short teaching comments explaining *why* are welcome (the student must explain the code in a video). No huge comment blocks.

## Navigation
- `import { router, useLocalSearchParams } from "expo-router";`
- `router.push("/details")` forward, `router.replace("/login")` when back must not return (login, logout).
- Back with fallback: `if (router.canGoBack()) router.back(); else router.replace("/...")`.
- Pass params as `router.push({ pathname, params: { ... } })`.

## Validation (Zod v4)
- `import * as z from "zod";` — `z.email("…")`, `z.string().min(6, "…")`.
- `const result = schema.safeParse(values); if (result.success === false) { …show message…; return; }`
- Class shows the first issue (`result.error.issues[0].message`) in a red `<Text>` under the form.
- Mock login: compare against constants after Zod passes → "Email or password is incorrect."

## AsyncStorage (class pattern)
- `import AsyncStorage from "@react-native-async-storage/async-storage";`
- Load in `useEffect(() => {...}, [])` with `getItem` + `JSON.parse` + `Array.isArray` check, inside try/catch.
- Save in `useEffect(() => {...}, [items])` with `setItem(KEY, JSON.stringify(items))` inside try/catch.

## Loading / errors
- `const [loading, setLoading] = useState(false)`, `{loading && <ActivityIndicator size="large" />}`, guard `if (loading) return;`.
- Errors kept in a string state and shown in red `<Text>`. `Alert.alert(title, msg, [{text:"Cancel",style:"cancel"},{text:"Remove",style:"destructive",onPress}])` for confirmations.
