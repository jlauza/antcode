import React, { useContext } from "react";
import UserContext from "../Context/UserContext";

const Home = () => {
  const { user } = useContext(UserContext);
  return (
    <div>
      <h1>Home</h1>
      {/* Add your content here */}
      <p>Welcome {user ? user : "guest"}!</p>
    </div>
  );
};

export default Home;
