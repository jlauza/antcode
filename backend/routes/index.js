var express = require("express");
var router = express.Router();
const User = require("../models/user.model");
var multer = require("multer");
var upload = multer();
require("dotenv").config();

const {
  ensureAuthenticated,
  redirectToDashboardIfAuthenticated,
} = require("./authMiddleware");

router.get(
  "/login",
  redirectToDashboardIfAuthenticated,
  async function (req, res) {
    res.render("login", {
      LOCAL: process.env.LOCAL,
      title: "Express",
    });
  }
);

/* GET home page. */
router.get("/", redirectToDashboardIfAuthenticated, function (req, res, next) {
  res.render("index", { LOCAL: process.env.LOCAL, title: "Express" });
});

router.get(
  "/register",
  redirectToDashboardIfAuthenticated,
  function (req, res, next) {
    res.render("register", { LOCAL: process.env.LOCAL, title: "Register" });
  }
);

router.get(
  "/users/profile/:id",
  ensureAuthenticated,
  async function (req, res, next) {
    const user = req.session.user;

    res.render("profile", {
      LOCAL: process.env.LOCAL,
      title: "My Profile",
      id: user._id,
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      role: user.role,
    });
  }
);

router.get(
  "/users/profile/:username",
  ensureAuthenticated,
  async function (req, res, next) {
    const user = req.session.user;

    res.render("profile", {
      LOCAL: process.env.LOCAL,
      title: "My Profile",
      id: user._id,
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      role: user.role,
    });
  }
);

router.get(
  "/users/profile/edit/:id",
  ensureAuthenticated,
  async function (req, res, next) {
    const user = req.session.user;

    res.render("profile-edit", {
      LOCAL: process.env.LOCAL,
      title: "Edit Profile",
      id: user._id,
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      role: user.role,
    });
  }
);

router.get(
  "/users/profile/delete/:id",
  ensureAuthenticated,
  async function (req, res, next) {
    const user = req.session.user;

    res.render("confirm-delete", {
      LOCAL: process.env.LOCAL,
      title: "Delete Account",
      subtitle: "Are you sure you want to delete your account?",
      id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
    });
  }
);

// Get Dashboard page
router.get("/dashboard", ensureAuthenticated, async function (req, res, next) {
  const user = req.session.user;

  res.render("dashboard", {
    LOCAL: process.env.LOCAL,
    title: "Welcome to dashboard",
    id: user._id,
    username: user.username,
    firstname: user.firstname,
    lastname: user.lastname,
  });
});

module.exports = router;
