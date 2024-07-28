import React, { createContext, useState, useContext } from "react";

// Create context for auth
const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

function AuthProvider() {
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState([]);
  const [iseLoading, setLoading] = useState(false);

  function signIn() {}
  function signUp() {}
  function signOut() {}
  function AutoSignIn() {}
}
