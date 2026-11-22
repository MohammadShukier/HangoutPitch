# Screen flow

This diagram shows how you move between the screens of the app.

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
    Profile -- "Logout and confirm (replace)" --> Login

    Home -- "tap a card (push with id)" --> Details
    Home -- "New outing or Pitch an outing" --> AddForm
    Home -- "Clear filters" --> Home

    Details -- "Edit (push with id)" --> EditForm
    Details -- "Delete, confirm, then back" --> Home
    Details -- "RSVP buttons (stays here)" --> Details
    Details -- "unknown id" --> NotFound
    NotFound -- "Back" --> Home

    AddForm -- "Add outing, tap OK, then back" --> Home
    EditForm -- "Save changes, then back" --> Details
    EditForm -- "unknown id" --> NotFound

    Home -. "not logged in" .-> Login
    Details -. "not logged in" .-> Login
    AddForm -. "not logged in" .-> Login
```

Push is the normal way of going forward. The Android back button takes you back to the screen before.

Replace removes the old screen, so you can't go back to it. After logging in, pressing back on Home closes the app instead of going back to the login screen. After logging out, pressing back doesn't take you back into the app.

The back buttons in the app go to the previous screen if there is one. If there isn't, they take you to Home.

The dotted lines show that these screens check if someone is logged in, and send you to the login screen if not.
