const bcrypt = require("bcrypt");
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

  try {
    const user = await User.findOne({
      email: email,
    });

    // If user exists
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);

      // check username and password match
      if (isMatch) {
        req.session.user = user;
        res.redirect("/dashboard");
      } else {
        res.send("Wrong password.");
        // res.redirect("/login");
      }
    } else {
      res.status(401).send("User not found.");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error.");
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
router.get("/logout", (req, res, next) => {
  req.session.destroy(function (err) {
    if (err) {
      console.error("Failed to destroy session", err);
      return next(err);
    }
    res.clearCookie("connect.sid");
    res.redirect("/login");
  });
});

module.exports = router;
