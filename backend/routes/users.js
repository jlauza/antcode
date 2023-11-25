var express = require("express");
var User = require("../models/user.model");
var router = express.Router();

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
  try {
    // const newUser = new User(req.body);
    const newUser = new User({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
      avatar: req.body.avatar,
      bio: req.body.bio,
    });
    await newUser.save();
    res.status(201).json({ message: "User created successfully", newUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
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
