var express = require("express");
var User = require("../models/user.model");
var router = express.Router();
const bcrypt = require("bcrypt");
const e = require("express");
const saltRounds = 10;

// GET all users
router.get("/", function (req, res, next) {
  // Logic to fetch and send list of users
  res.send("Respond with a resource");
});

// GET a specific user by ID
router.get("/:id", (req, res) => {
  // Logic to fetch and send details of a specific user
  // Access the user ID with req.params.id
  res.send("Get user with ID: " + req.params.id);
});

// POST a new user
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
    if (password != password2) {
      return true;
    } else {
      return false;
    }
  }

  try {
    // Check if email is valid
    if (!validateEmail(req.body.email)) {
      return res.status(400).json({ message: "Invalid Email" });
    }

    // Check if email already exists
    const EmailExist = await validateEmailExists(req.body.email);
    if (EmailExist) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Check if passwords match
    if (passwordNotMacth(req.body.password, req.body.password2)) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

    // Create a new user
    const newUser = await User.create({
      ...req.body,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: hashedPassword,
    });
    return res.status(201).json({
      message: "User created successfully",
      newUser,
    });
  } catch (error) {
    if (!res.headersSent) {
      return res.status(500).json({ message: error.message });
    }
  }
});

// PUT update a specific user by ID
router.put("/:id", (req, res) => {
  // Logic to update a user identified by req.params.id with data from req.body
  res.send("Update user with ID: " + req.params.id);
});

// DELETE a specific user by ID
router.delete("/:id", (req, res) => {
  // Logic to delete a user identified by req.params.id
  res.send("Delete user with ID: " + req.params.id);
});

module.exports = router;
