const bycrpt = require("bcrypt");
const express = require("express");
const router = express.Router();
const User = require("../models/user.model");

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
router.post("/", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    email: email,
  });

  console.log(user);

  // if (user) {
  //   console.log("User is found? ", user);
  // } else {
  //   return res.status(400).json({ message: "Invalid input" });
  // }

  // if (!email || !password) {
  //   return res.status(400).json({ message: "Invalid input" });
  // } else {
  //   console.log(email, password);

  //   const loginUser = await User.findOne(email, password);
  //   console.log("loginUser", loginUser);

  //   loginUser.filter((user) => {
  //     if (user.email === email && user.password === password) {
  //       console.log("session status:", req.session);

  //       // Create a session
  //       req.session.user = user;

  //       console.log("session status: ", user, req.session.status);
  //       res.redirect(`/dashboard`);
  //     }
  //   });

  //   res.render("login", { message: "Invalid credentials" });
  // }

  // return res.status(200).json({
  //   message: `Welcome back, ${firstname}`,
  //   loginUser: {
  //     username: loginUser.username,
  //     firstname: loginUser.firstname,
  //     lastname: loginUser.lastname,
  //     email: loginUser.email,
  //     password: updateUser.password,
  //   },
  // });
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
