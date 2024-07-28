import React, { createContext, useState, useContext } from "react";
import useAuthProvider from "./useAuthProvider";

// Create context for auth
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const auth = useAuthProvider();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return useContext(AuthContext);
};
