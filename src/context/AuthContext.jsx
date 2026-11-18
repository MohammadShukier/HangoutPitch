import { createContext, useContext, useState } from "react";
import mockUser from "../data/mockUser";

const AuthContext = createContext(null);

// Keeps the logged-in user for the whole app. Not saved, so a restart means logging in again.
export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Returns true when the email + password match the mock account.
  function login(email, password) {
    const isCorrect =
      email.toLowerCase() === mockUser.email && password === mockUser.password;
    if (!isCorrect) return false;

    // Only keep what the screens need, never the password.
    setUser({ name: mockUser.name, email: mockUser.email });
    return true;
  }

  function logout() {
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
