import React from "react";
import useAuthService from "../Auth/useAuthService";
import useAuthProvider from "../../Context/useAuthProvider";
import { message } from "antd";
import { redirect, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { signOut } = useAuthProvider();

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      message.error("Logout failed!");
      console.error(error);
    }
  };
  return (
    <div>
      <h1>Welcome to Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
