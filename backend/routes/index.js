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

router.get("/users/profile/:id", async function (req, res, next) {
  // Logic to fetch and send details of a specific user
  const user = await User.findById(req.params.id).select("-password").exec();

  res.render("profile", {
    title: "My Profile",
    id: user._id,
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    avatar: user.avatar
      ? user.avatar
      : "https://placehold.co/120x120?text=No+Photo",
    bio: user.bio ? user.bio : "No bio",
    role: user.role,
  });
});

module.exports = router;
