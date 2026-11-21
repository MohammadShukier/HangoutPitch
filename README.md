# HangoutPitch

A small mobile app for a group of friends. Anyone can **pitch an outing idea** (a hike, a dinner, a game night…), friends **RSVP** with Going / Maybe / Can't, and once enough people are in, the outing is marked **Confirmed**.

Individual university project — React Native + Expo SDK 58 + Expo Router, JavaScript.

## Who it is for
Friend groups who keep losing outing ideas in a busy group chat and want one place to see what was suggested, who is going, and what is confirmed.

## Setup
```bash
npm install
npx expo start
```
Scan the QR code with the **Expo Go** app on your phone.

Tested with Expo Go on: **Samsung Galaxy A55 (Android 15)** (Expo SDK 58).

## Mock login
| Email | Password |
|---|---|
| `demo@hangoutpitch.app` | `Pitch2026` |

The logged-in user is **Mohammad**.

## Features
- Welcome screen → login with Zod validation (an error under each field + "Email or password is incorrect.").
- Tabs: **Home** and **Profile**. Logged-out users are always sent back to Login.
- **Home**: list of outing cards (type icon, date, location, status, how many are going).
  - Search by title, plus filter chips for status (Idea / Voting / Confirmed) and type (Hike, Food, Game night, Beach, Movie, Other). Search and filters work together.
  - Different empty states for "No outings yet" and "No outings match your search".
  - Loading spinner while saved data is being read.
- **Details**: all info (cost shows "Free" when 0), RSVP counts + friend list, and your own RSVP buttons.
- **Add / Edit** outing: one shared form, Zod validation with an error under each invalid field. New outings mark you as "going".
- **Delete** with a confirmation dialog.
- **Profile**: name, email, number of outings, Logout with confirmation.
- **Persistence**: outings are saved with AsyncStorage and restored after a full app restart, including an empty list (sample data is never re-added once you deleted everything).
- A red error message is shown if loading or saving fails.

## Known limitations
- No backend: data is stored only on this phone (AsyncStorage). Friends never see your changes.
- Friends and their RSVPs come from mock data; you can't invite real people.
- One mock account only, no sign-up.
- Login is not remembered — after a full restart you log in again (your outings are still saved).
- Dates are typed as `YYYY-MM-DD` (no date picker).
- Status is changed by hand in the Edit form; it does not switch to Confirmed automatically.
- A save/load error message stays visible until the app is restarted.

## Folder structure
```
src/
  app/                 routes only (Expo Router)
    _layout.jsx        AuthProvider + OutingsProvider + Stack (header style)
    index.jsx          Welcome
    login.jsx          Login
    (tabs)/            _layout.jsx (auth guard + tabs), index.jsx (Home), profile.jsx
    outing/            [id].jsx (Details), form.jsx (Add/Edit, edit when ?id=)
  components/          reusable UI: AppScreen, AppButton, AppTextInput, OutingCard,
                       OutingFilters, OutingForm, ResponseSelector, SearchBar,
                       StatusBadge, EmptyState
  context/             OutingsContext.jsx (shared outings + AsyncStorage), AuthContext.jsx
  data/                mockOutings.js, mockUser.js
  utils/               validation.js (Zod schemas)
  constants/           colors.js, outingOptions.js
docs/                  screen-flow.md, VIDEO_NOTES.md
```

## Submitted version
Git tag `v1.0`.
