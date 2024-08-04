import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import { Menu } from "antd";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Login from "./Features/Auth/Login";
import Dashboard from "./Features/Dashboard/Dashboard";
import UserAccount from "./Features/UserAccount/UserAccount";
import UserContext from "./Context/UserContext";

function NavigationMenu() {
  const { user, login, logout } = useContext(UserContext);
  return (
    <Menu
      mode="horizontal"
      style={{ display: "flex", justifyContent: "space-between" }}
    >
      <Menu.Item key="/">
        <Link to="/">Home</Link>
      </Menu.Item>
      <Menu.Item key="/about">
        <Link to="/about">About</Link>
      </Menu.Item>

      {/* Test code */}
      <Menu.Item style={{ marginLeft: "auto" }}>
        {user ? (
          <>
            <Link onClick={logout}>Logout</Link>
          </>
        ) : (
          <>
            <Link onClick={login}>Login</Link>
          </>
        )}
      </Menu.Item>

      {/* Orignial code */}
      {/* <Menu.Item key="/login" style={{ marginLeft: "auto" }}>
        <Link to="/login">Login</Link>
      </Menu.Item> */}
    </Menu>
  );
}

const ExcludeHomenavMenu = () => {
  let location = useLocation();

  const excludeFromMenu = ["/login", "/dashboard", "/account"];

  const shouldExclude = excludeFromMenu.includes(location.pathname);

  return !shouldExclude ? <NavigationMenu /> : null;
};

const ComponentRouter = () => {
  return (
    <Router>
      <ExcludeHomenavMenu />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        {/* Add a Route for the login page if you have one */}
        <Route path="/login" element={<Login />} />

        {/* Protected Pages */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/account" element={<UserAccount />} />
      </Routes>
    </Router>
  );
};

export default ComponentRouter;
