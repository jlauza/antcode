var express = require("express");
var router = express.Router();
const User = require("../models/user.model");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/register", function (req, res, next) {
  res.render("register", { title: "Register" });
});

router.get("/users/profile/id=:id", async function (req, res, next) {
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
});

router.get(
  "/users/profile/username=:username",
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

router.get("/users/profile/edit/id=:id", async function (req, res, next) {
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
});

router.get("/users/profile/delete/id=:id", async function (req, res, next) {
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
});

module.exports = router;
