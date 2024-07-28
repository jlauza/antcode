import React, { useState } from "react";
import useAuthService from "../Features/Auth/useAuthService";

function useAuthProvider() {
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState([]);
  const { authenticate, unauthenticate, error, isLoading } = useAuthService();

  async function signIn(values) {
    await authenticate(values);
  }
  function signUp() {}
  async function signOut() {
    await unauthenticate();
  }
  function autoSignIn() {}

  return {
    user,
    signIn,
    signUp,
    signOut,
    autoSignIn,
    errors,
    isLoading,
  };
}

export default useAuthProvider;
