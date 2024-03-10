const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
const resultUser = [User];

/**
 * @swagger
 * /auth:
 *   post:
 *     tags: [Auth]
 *     summary: Create a new session
 *     description: Adds a new session to the system
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 example: 12345678
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Invalid input
 */
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Invalid input" });
  } else {
    console.log("email and password are present");

    resultUser.filter((user) => {
      if (user.email === email && user.password === password) {
        console.log("user found line 47: ", user);

        // Create a session
        req.session.user = user;
        console.log("session created line 51: ", user);

        // res.redirect(`/users/profile/id=${user._id}`);
        res.redirect(`/dashboard`);
      }
    });
    res.render("login", { message: "Invalid credentials" });
  }
});

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     tags: [Auth]
 *     summary: Exits a session
 *     description: Exits a session to the system
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Invalid input
 */
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
