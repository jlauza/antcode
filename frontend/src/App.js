import React from "react";
import ComponentRouter from "./ComponentRouter";
import { AuthProvider } from "./Context/AuthContext";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <ComponentRouter />
      </AuthProvider>
    </div>
  );
}

export default App;
