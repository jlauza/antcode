import React from "react";
import useAuthService from "../Auth/useAuthService";
import { message } from "antd";

const Dashboard = () => {
  const { authenticate, unauthenticate, isLoading, error } = useAuthService();

  const handleLogout = async () => {
    try {
      await authenticate();
    } catch (error) {
      message.error("Logout failed!");
      console.error(error);
    }
  };
  return (
    <div>
      <h1>Welcome to Dashboard</h1>
      {/* Add your content here */}
      <button onClick={handleLogout} disabled={isLoading}>
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
