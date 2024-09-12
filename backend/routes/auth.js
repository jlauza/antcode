const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
const generateToken = require("../utils/token");

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

        // res.status(200).json({ message: "Login successful!" });
        res.redirect("/dashboard");

        const token = generateToken(user);
        const userSession = {
          token,
          user: {
            id: user.id,
            email: user.email,
            fname: user.firstname,
            lname: user.lastname,
            username: user.username,
            role: user.role,
            createdAt: user.createdAt,
          },
        };

        return userSession;
      } else {
        return res.status(401).json({ error: "Invalid credentials!" });
      }
    } else {
      return res.status(404).json({ error: "User not found!" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
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
