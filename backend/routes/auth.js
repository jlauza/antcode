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
  console.log(req.body);

  const user = await User.findOne({ email, password });

  if (user) {
    console.log("user found", user);
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
