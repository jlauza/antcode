var express = require("express");
var User = require("../../models/user.model");
var router = express.Router();
const bcrypt = require("bcrypt");
const saltRounds = 10;

function generateRandomUsername() {
  const adjectives = ["Cool", "Super", "Mighty", "Happy", "Crazy", "Wild"];
  const nouns = ["Lion", "Dragon", "Tiger", "Eagle", "Panther", "Wolf"];
  const numbers = Math.floor(Math.random() * 9999); // Random number between 0 and 9999

  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];

  return `${adjective}${noun}${numbers}`;
}

/**
 * @swagger
 * /users:
 *   post:
 *     tags: [Users]
 *     summary: Create a new user
 *     description: Adds a new user to the system
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstname
 *               - lastname
 *               - email
 *               - password
 *               - password2
 *               - role
 *               - avatar
 *               - bio
 *               - username
 *             properties:
 *               firstname:
 *                 type: string
 *                 example: John
 *               lastname:
 *                 type: string
 *                 example: Doe
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 example: 12345678
 *               password2:
 *                 type: string
 *                 example: 12345678
 *               role:
 *                 type: string
 *                 example: user/admin
 *               avatar:
 *                 type: string
 *                 example: https://www.example.com/image.jpg
 *               bio:
 *                 type: string
 *                 example: Hello, I am John Doe
 *               username:
 *                 type: string
 *                 example: johndoe
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Invalid input
 */

router.post("/", async (req, res) => {
  function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  async function validateEmailExists(email) {
    const user = await User.findOne({ email: email }).exec();
    return user !== null;
  }

  function passwordNotMacth(password, password2) {
    return password !== password2;
  }

  function passwordLength(password) {
    return password.length < 8;
  }

  try {
    // Check if email is valid
    if (!validateEmail(req.body.email)) {
      return res.status(400).json({ message: "Invalid email" });
    }

    // Check if email already exists
    const EmailExist = await validateEmailExists(req.body.email);
    if (EmailExist) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Check if passwords match
    if (passwordNotMacth(req.body.password, req.body.password2)) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // Check if password is at least 8 characters long
    if (passwordLength(req.body.password)) {
      return res.status(400).json({ message: "Password is too short" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

    // Create a new user
    const newUser = await User.create({
      ...req.body,
      username: generateRandomUsername(),
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: hashedPassword,
    });

    return res.status(201).json({
      message: "User created successfully",
      newUser: {
        firstname: newUser.firstname,
        lastname: newUser.lastname,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    if (!res.headersSent) {
      return res.status(500).json({ message: error.message });
    }
  }
});

module.exports = router;
