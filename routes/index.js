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
      ROOT_URL: process.env.ROOT_URL,
      title: "Express",
    });
  }
);

/* GET home page. */
router.get("/", redirectToDashboardIfAuthenticated, function (req, res, next) {
  res.render("index", { ROOT_URL: process.env.ROOT_URL, title: "Express" });
});

router.get(
  "/register",
  redirectToDashboardIfAuthenticated,
  function (req, res, next) {
    res.render("register", {
      ROOT_URL: process.env.ROOT_URL,
      title: "Register",
    });
  }
);

router.get(
  "/users/profile/:id",
  ensureAuthenticated,
  async function (req, res, next) {
    const user = req.session.user;

    const ini_fname = user.firstname;
    const ini_lname = user.lastname;
    const ini_name = ini_fname.charAt(0) + ini_lname.charAt(0);

    res.render("profile", {
      ROOT_URL: process.env.ROOT_URL,
      title: "My Profile",
      id: user._id,
      avatar: user.avatar
        ? user.avatar
        : `https://placehold.co/40x40?text=${ini_name}`,
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

    const ini_fname = user.firstname;
    const ini_lname = user.lastname;
    const ini_name = ini_fname.charAt(0) + ini_lname.charAt(0);

    res.render("profile", {
      ROOT_URL: process.env.ROOT_URL,
      title: "My Profile",
      id: user._id,
      avatar: user.avatar
        ? user.avatar
        : `https://placehold.co/40x40?text=${ini_name}`,
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

    const ini_fname = user.firstname;
    const ini_lname = user.lastname;
    const ini_name = ini_fname.charAt(0) + ini_lname.charAt(0);

    res.render("profile-edit", {
      ROOT_URL: process.env.ROOT_URL,
      title: "Edit Profile",
      id: user._id,
      avatar: user.avatar
        ? user.avatar
        : `https://placehold.co/40x40?text=${ini_name}`,
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
      ROOT_URL: process.env.ROOT_URL,
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

  const ini_fname = user.firstname;
  const ini_lname = user.lastname;
  const ini_name = ini_fname.charAt(0) + ini_lname.charAt(0);

  res.render("dashboard", {
    ROOT_URL: process.env.ROOT_URL,
    title: "Welcome to dashboard",
    id: user._id,
    avatar: user.avatar
      ? user.avatar
      : `https://placehold.co/40x40?text=${ini_name}`,
    username: user.username,
    firstname: user.firstname,
    lastname: user.lastname,
  });
});

module.exports = router;