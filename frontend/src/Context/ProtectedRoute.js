import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { useAuth } from "react-auth-verification-context";
import { useAuth } from "./AuthContext";
import useAuthService from "../Features/Auth/useAuthService";

const ProtectedRoute = ({ children }) => {
  // const { isAuthenticated, login, logout } = useAuth();
  const { authenticate, unauthenticate, isLoading, error } = useAuthService();

  const navigate = useNavigate();

  if (!authenticate) {
    navigate("/login");
  }
  return children;
};

export default ProtectedRoute;
