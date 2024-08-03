import React from "react";
import { message } from "antd";

const Dashboard = () => {
  const handleLogout = async () => {
    try {
      // await signOut();
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
