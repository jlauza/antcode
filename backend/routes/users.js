var express = require("express");
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
router.post("/", (req, res) => {
  // Logic to create a new user with data from req.body
  res.send("Register user");
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
