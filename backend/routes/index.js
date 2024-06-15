var express = require("express");
var router = express.Router();
const User = require("../models/user.model");
var session = require("express-session");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var multer = require("multer");
var upload = multer();
const {
  ensureAuthenticated,
  redirectToDashboardIfAuthenticated,
} = require("./authMiddleware");

router.get(
  "/login",
  redirectToDashboardIfAuthenticated,
  async function (req, res) {
    // Render login page
    res.render("login", { title: "Express" });

    // Fetch auth endpoint

    // Render login
    const { email, password } = req.body;

    const user = await User.findOne({ email, password }).exec();

    if (user) {
      req.session.user = user;
      res.redirect(`/dashboard`);
    } else {
      res.render("login", { message: "Invalid credentials" });
    }
  }
);

// function checkSignIn(req, res) {
//   if (req.session?.user) {
//     // next(); //If session exists, proceed to page
//     res.redirect(`/dashboard`);
//     res.render("dashboard", { title: "Dashboard" });
//   } else {
//     // var err = new Error("Not logged in!");
//     // next(err);
//     res.redirect(`/login`);
//     res.render("login", { message: "Invalid credentials" });
//   }
// }

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/register", function (req, res, next) {
  res.render("register", { title: "Register" });
});

router.get(
  "/users/profile/:id",
  ensureAuthenticated,
  async function (req, res, next) {
    // Logic to fetch and send details of a specific user
    const user = await User.findById(req.params.id).select("-password").exec();

    if (!user) {
      // return res.status(404).json({ message: "User not found" });
      return res.render("not-found", {
        title: "User not found",
        message: "The page you are looking for does not exist.",
      });
    }

    res.render("profile", {
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
    // Logic to fetch and send details of a specific user
    const user = await User.findOne({
      username: req.params.username,
    })
      .select("-password")
      .exec();

    res.render("profile", {
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
    // Logic to fetch and send details of a specific user
    const user = await User.findById({
      _id: req.params.id,
    })
      .select("-password")
      .exec();

    res.render("profile-edit", {
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
    const user = await User.findById({
      _id: req.params.id,
    })
      .select("-password")
      .exec();

    res.render("confirm-delete", {
      title: "Delete Account",
      subtitle: "Are you sure you want to delete your account?",
      id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
    });
  }
);

// Get Dashboard page
router.get("/dashboard", ensureAuthenticated, function (req, res, next) {
  res.render("dashboard", { title: "My Dashboard" });
});

module.exports = router;
