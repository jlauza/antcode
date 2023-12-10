var express = require("express");
var User = require("../models/user.model");
var router = express.Router();
const bcrypt = require("bcrypt");
const e = require("express");
const saltRounds = 10;

function generateRandomUsername() {
  const adjectives = ["Cool", "Super", "Mighty", "Happy", "Crazy", "Wild"];
  const nouns = ["Lion", "Dragon", "Tiger", "Eagle", "Panther", "Wolf"];
  const numbers = Math.floor(Math.random() * 9999); // Random number between 0 and 9999

  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];

  return `${adjective}${noun}${numbers}`;
}

// GET all users
router.get("/", function (req, res, next) {
  // Logic to fetch and send list of users
  res.send("Respond with a resource");
});

// GET a specific user by ID
router.get("/id/:id", async (req, res) => {
  // Logic to fetch and send details of a specific user
  try {
    const user = await User.findById(req.params.id).exec();

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    } else {
      return res.status(200).json({
        message: "User Info",
        user: {
          username: user.username,
          avatar: user.avatar,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          role: user.role,
        },
      });
    }
  } catch (error) {
    if (!res.headersSent) {
      return res.status(500).json({ message: error.message });
    }
  }
});

// GET a specific user by username
router.get("/username/:username", async (req, res) => {
  // Logic to fetch and send details of a specific user
  try {
    const user = await User.findOne({
      username: req.params.username,
    }).exec();

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    } else {
      return res.status(200).json({
        message: "User Info",
        user: {
          username: user.username,
          avatar: user.avatar,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          role: user.role,
        },
      });
    }
  } catch (error) {
    if (!res.headersSent) {
      return res.status(500).json({ message: error.message });
    }
  }
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

// PUT update a specific user by ID
router.put("/:id", async (req, res) => {
  console.log("Response received: ", res.body);

  // function validateEmail(email) {
  //   var re = /\S+@\S+\.\S+/;
  //   return re.test(email);
  // }

  // async function validateEmailExists(email) {
  //   const user = await User.findOne({ email: email }).exec();
  //   return user !== null;
  // }

  // function passwordNotMacth(password, password2) {
  //   return password !== password2;
  // }

  // function passwordLength(password) {
  //   return password.length < 8;
  // }

  // try {
  //   if (!validateEmail(req.body.email)) {
  //     return res.status(400).json({ message: "Invalid email" });
  //   }

  //   const EmailExist = await validateEmailExists(req.body.email);
  //   if (EmailExist) {
  //     return res.status(400).json({ message: "User already exists" });
  //   }

  //   let updatedData = {
  //     ...req.body,
  //   };

  //   if (req.body.password) {
  //     if (passwordNotMacth(req.body.password, req.body.password2)) {
  //       return res.status(400).json({ message: "Passwords do not match" });
  //     }

  //     if (passwordLength(req.body.password)) {
  //       return res.status(400).json({ message: "Password is too short" });
  //     }

  //     const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
  //     updatedData.password = hashedPassword;
  //   }

  //   const updateUser = await User.findByIdAndUpdate(
  //     req.params.id,
  //     updatedData,
  //     { new: true }
  //   );

  //   return res.status(200).json({
  //     message: "User updated successfully",
  //     updateUser: {
  //       username: updateUser.username,
  //       firstname: updateUser.firstname,
  //       lastname: updateUser.lastname,
  //       email: updateUser.email,
  //       role: updateUser.role,
  //     },
  //   });
  // } catch (error) {
  //   if (!res.headersSent) {
  //     return res.status(500).json({ message: error.message });
  //   }
  // }
});

// DELETE a specific user by ID
router.delete("/:id", (req, res) => {
  // Logic to delete a user identified by req.params.id
  res.send("Delete user with ID: " + req.params.id);
});

module.exports = router;
