# HangoutPitch

HangoutPitch is a small mobile app for planning outings with friends. Someone pitches an idea, like a hike, a dinner or a game night, and the others answer with Going, Maybe or Can't. Once enough people are in, the outing can be marked as Confirmed.

This is my individual university project. It is built with React Native, Expo SDK 58 and Expo Router, and written in JavaScript.

## Who it is for

It is for friend groups where outing ideas keep getting lost in the group chat. Instead of scrolling back through old messages, everyone can see in one place what was suggested, who is going and what is already confirmed.

## How to run it

```
npm install
npx expo start
```

Then scan the QR code with the Expo Go app on your phone. I tested it with Expo Go on a Samsung Galaxy A55 (Android 15).

## Login

There is no real sign up, so use the demo account:

- Email: demo@hangoutpitch.app
- Password: Pitch2026

You will be logged in as Mohammad.

## Features

- A welcome screen and a login screen. The login form is checked with Zod, so each field shows its own error, and a wrong email or password shows a message as well.
- Two tabs, Home and Profile. If you are not logged in you get sent back to the login screen.
- The Home screen shows all outings as cards with the type icon, date, location, status and how many people are going.
- You can search by title and filter by status (Idea, Voting, Confirmed) and by type (Hike, Food, Game night, Beach, Movie, Other). Search and filters work together.
- There are two different empty states, one for when there are no outings at all and one for when nothing matches your search.
- A loading spinner shows while the saved outings are being read.
- The details screen shows everything about an outing (the cost shows as Free when it is 0), the RSVP counts, the list of friends with their answers, and buttons to set your own RSVP.
- Adding and editing an outing use the same form, also checked with Zod. When you create an outing you are marked as going automatically.
- Deleting an outing asks for confirmation first.
- Every outing shows who pitched it, and only that person sees the Edit and Delete buttons.
- The Profile screen shows your name, email and number of outings, and has a Logout button that asks before logging you out.
- Outings are saved with AsyncStorage, so they are still there after you close and reopen the app. This also works for an empty list, so the sample data does not come back after you delete everything.
- If loading or saving fails, a red error message is shown.

## Known limitations

- There is no backend. Everything is stored on the phone only, so your friends never actually see your changes.
- The friends and their RSVPs are mock data, you can't invite real people.
- There is only one account and no way to sign up.
- The login is not remembered. After restarting the app you have to log in again, but your outings are still saved.
- Dates are typed in by hand as YYYY-MM-DD, there is no date picker.
- The status is changed by hand in the edit form. It does not switch to Confirmed on its own.
- If a save or load error happens, the message stays on screen until the app is restarted.

## Folder structure

```
src/
  app/              screens and routing (Expo Router)
    _layout.jsx     providers and the main Stack
    index.jsx       Welcome
    login.jsx       Login
    (tabs)/         Home and Profile tabs, plus the login check
    outing/         [id].jsx for details, form.jsx for adding and editing
  components/       reusable parts like buttons, inputs, cards, filters and the outing form
  context/          OutingsContext (shared outings and saving) and AuthContext
  data/             mock outings and the mock user
  utils/            validation.js with the Zod schemas
  constants/        colors and the outing options
docs/               screen flow and screenshots
```

## Screen flow

The screen flow diagram is in [docs/screen-flow.md](docs/screen-flow.md) (it shows up as a diagram on GitHub). There is also an image version in [docs/screen-flow.png](docs/screen-flow.png).

## Screenshots

| Welcome | Login | Home |
|---|---|---|
| ![Welcome](docs/screenshots/01-welcome.png) | ![Login](docs/screenshots/02-login.png) | ![Home](docs/screenshots/03-home.png) |

| Details | Add / Edit | Profile |
|---|---|---|
| ![Details](docs/screenshots/04-details.png) | ![Form](docs/screenshots/05-form.png) | ![Profile](docs/screenshots/06-profile.png) |

| Empty list | No search results |
|---|---|
| ![Empty](docs/screenshots/07-empty.png) | ![No results](docs/screenshots/08-no-results.png) |

## Submitted version

The version I submitted is the commit tagged v1.0 (you can find it under Releases or Tags on GitHub). The ZIP file was made from that same commit with:

```
git archive -o HangoutPitch.zip v1.0
```
