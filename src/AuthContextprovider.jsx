import { createContext, useState } from "react";

export const AuthContext = createContext();
function AuthContextProvider({ children }) {
  const [isAuth, setIsAuth] = useState(() => {
    return localStorage.getItem("user") ? true : false;
  });
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = async (username, email) => {
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      const users = await res.json();

      const match = users.find(
        (u) => u.username === username && u.email === email
      );
      if (match) {
        setIsAuth(true);
        setUser(match);
        localStorage.setItem("user", JSON.stringify(match));
        return true;
      }
    } catch (err) {
      console.error("Login error:", err);
      return false;
    }
  };
  const logout = () => {
    setIsAuth(false);
    setUser(null);
    localStorage.removeItem("user");
  };
  const value = { isAuth, login, logout, user };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
