import React, { useState } from "react";
import ComponentRouter from "./ComponentRouter";
import UserContext from "./Context/UserContext";

function App() {
  const [user, setUser] = useState(null);

  const userData = "Jayson Lauza";

  const login = () => {
    setUser(userData);
  };
  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      <div className="App">
        <ComponentRouter />
      </div>
    </UserContext.Provider>
  );
}

export default App;
