# Screen flow

```mermaid
flowchart TD
    Welcome["Welcome<br/>src/app/index.jsx"]
    Login["Login<br/>src/app/login.jsx"]
    Home["Home tab<br/>(tabs)/index.jsx"]
    Profile["Profile tab<br/>(tabs)/profile.jsx"]
    Details["Outing details<br/>outing/[id].jsx"]
    AddForm["New outing<br/>outing/form.jsx"]
    EditForm["Edit outing<br/>outing/form.jsx?id="]
    NotFound["Outing not found"]

    Welcome -- "Get started (push)" --> Login
    Login -- "valid login (replace)" --> Home
    Home <-- "tab bar" --> Profile
    Profile -- "Logout + confirm (replace)" --> Login

    Home -- "tap a card (push id)" --> Details
    Home -- "New outing / Pitch an outing" --> AddForm
    Home -- "Clear filters" --> Home

    Details -- "Edit (push id)" --> EditForm
    Details -- "Delete + confirm → back" --> Home
    Details -- "RSVP buttons (stays)" --> Details
    Details -- "unknown id" --> NotFound
    NotFound -- "Back" --> Home

    AddForm -- "Add outing → Alert OK → back" --> Home
    EditForm -- "Save changes → back" --> Details
    EditForm -- "unknown id" --> NotFound

    Home -. "no user (guard)" .-> Login
    Details -. "no user (guard)" .-> Login
    AddForm -. "no user (guard)" .-> Login
```

- **push** = normal forward navigation, Android back returns to the previous screen.
- **replace** = the old screen is removed, so back can't return to it (after login: back on Home exits the app; after logout: back can't re-enter the app).
- Back buttons use `router.back()` when possible, otherwise `router.replace("/(tabs)")`.
