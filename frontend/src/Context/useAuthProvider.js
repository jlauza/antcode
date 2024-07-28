import React, { useState } from "react";

function useAuthProvider() {
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState([]);
  const [isLoading, setLoading] = useState(false);

  function signIn() {}
  function signUp() {}
  function signOut() {}
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
