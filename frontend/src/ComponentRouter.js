import React, { useState, useEffect } from "react";
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

function NavigationMenu() {
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

      <Menu.Item key="/login" style={{ marginLeft: "auto" }}>
        <Link to="/login">Login</Link>
      </Menu.Item>
    </Menu>
  );
}

const HideMenuOnLogin = () => {
  let location = useLocation();

  return location.pathname !== "/login" ? <NavigationMenu /> : null;
};

const ComponentRouter = () => {
  return (
    <Router>
      <HideMenuOnLogin />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        {/* Add a Route for the login page if you have one */}
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default ComponentRouter;
