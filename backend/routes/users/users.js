const express = require("express");
const router = express.Router();
const deleteUser = require("./users-delete");
const getAllUsers = require("./users-get-all");
const getUserById = require("./users-get-by-id");
const getUserByUsername = require("./users-get-by-username");
const createUser = require("./users-post");
const updateUser = require("./users-update");

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.get("/username/:username", getUserByUsername);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
