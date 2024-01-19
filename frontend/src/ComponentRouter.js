import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Menu } from "antd";
import Home from "./Pages/Home";

const ComponentRouter = () => {
  return (
    <Router>
      <Menu mode="horizontal">
        <Menu.Item key="home">
          <Link to="/">Home</Link>
        </Menu.Item>
      </Menu>

      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default ComponentRouter;
