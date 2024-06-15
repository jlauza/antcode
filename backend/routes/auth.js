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
  console.log(req.session);

  const { email, password } = req.body;

  try {
    const user = await User.findOne({
      email: email,
    });

    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);

      if (isMatch) {
        console.log(user);
        res.redirect("/dashboard");
        res.status(200).send("Login successful!");
      } else {
        res.status(401).send("Invalid email or password.");
      }
    } else {
      res.status(401).send("Invalid email or password.");
    }
  } catch (error) {
    console.error(error);
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
  req.session.destroy(function () {
    console.log("User logged out!");
    res.status(200).send("User has been logged out!");
  });

  res.redirect("/login");
});

module.exports = router;
