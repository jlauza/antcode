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
    if (user) {
      return true;
    } else {
      return false;
    }
  }

  function passwordNotMacth(password, password2) {
    if (password != password2) {
      return true;
    } else {
      return false;
    }
  }

  try {
    bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
      // Store hash in your password DB.
      req.body.password = hash;
      validateEmail(req.body.email);
      validateEmailExists(req.body.email);
      passwordNotMacth(req.body.password, req.body.password2);

      if (!validateEmail(req.body.email)) {
        res.status(400).json({ message: "Invalid Email" });
      } else if (validateEmailExists(req.body.email)) {
        res.status(400).json({ message: "Email already exists" });
      } else if (passwordNotMacth(req.body.password, req.body.password2)) {
        res.status(400).json({ message: "Passwords do not match" });
      } else {
        const newUser = User.create(req.body);
        res.status(201).json({
          message: "User created successfully",
          newUser,
        });
      }

      // if (req.body.password != req.body.password2) {
      //   res.status(400).json({ message: "Passwords do not match" });
      // } else {
      //   const newUser = User.create(req.body);
      //   res.status(201).json({
      //     message: "User created successfully",
      //     newUser,
      //   });
      // }
    });
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
