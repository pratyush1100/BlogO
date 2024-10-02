import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token" || ""));
  const [isLoggedIn, setIsLoggedIn] = useState(!!token);

  const storeTokenInLS = (serverToken) => {
    setToken(serverToken);
    // return localStorage.setItem("token", serverToken);
    localStorage.setItem("token", serverToken);
    setIsLoggedIn(true);
  };

  //   let isLoggedIn = !!token;

  //   Logout functionality

  const LogoutUser = async () => {
    try {
      const res = await fetch(
        "https://blogo-backend.onrender.com/blog/logout",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      const data = await res.json();
      if (res.ok) {
        console.log("LogOut Successfully");
        setToken("");
        localStorage.removeItem("token");
        setIsLoggedIn(false);
      }
      window.alert(data.message);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, storeTokenInLS, LogoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth used outside of the provider");
  }
  return authContextValue;
};
