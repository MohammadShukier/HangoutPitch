import { createContext, useContext, useState } from "react";
import mockUser from "../data/mockUser";

const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  function login(email, password) {
    const isCorrect =
      email.toLowerCase() === mockUser.email && password === mockUser.password;
    if (!isCorrect) return false;

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
