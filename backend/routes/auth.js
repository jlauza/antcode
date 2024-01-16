const express = require("express");
const router = express.Router();
const User = require("../models/user.model");

// Login logic
router.post("/", async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);

  const user = await User.findOne({ email, password });

  if (user) {
    console.log("user found", user);
  }
});

// Logout logic
router.post("/logout", (req, res) => {
  // Clear user session or token
  req.session.destroy(function (err) {
    if (err) {
      res.status(500).json({ message: "Logout failed" });
    } else {
      res.status(200).json({ message: "Logout successful" });
      res.redirect("/");
    }
  });
});

module.exports = router;
