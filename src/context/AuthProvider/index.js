import React, { createContext, useEffect, useState } from "react";
import {
  getUserLocalStorage,
  LoginRequest,
  setUserLocalStorage,
  SignupRequest,
} from "./util";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getUserLocalStorage());

  useEffect(() => {
    const user = getUserLocalStorage();

    if (user) {
      setUser(user);
    }
  }, []);

  function authenticate(email, password) {
    const response = LoginRequest(email, password).then((r) => {
      console.log(r.data);
      const payload = r.data;
      setUser(payload);
      setUserLocalStorage(payload);
    });
    return response;
  }

  function signup(user) {
    const response = SignupRequest(user);
    return response;
  }

  function logout() {
    setUser(null);
    setUserLocalStorage(null);
  }

  return (
    <AuthContext.Provider value={{ user, authenticate, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};
