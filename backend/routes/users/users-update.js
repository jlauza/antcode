var express = require("express");
var User = require("../../models/user.model");
var router = express.Router();
const bcrypt = require("bcrypt");
const saltRounds = 10;

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     tags: [Users]
 *     summary: Update a user
 *     description: Updates a user by their unique ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Unique ID of the user to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
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
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Invalid input
 */
router.put("/:id", async (req, res) => {
  function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  function passwordNotMacth(password, password2) {
    return password !== password2;
  }

  function passwordLength(password) {
    return password.length < 8;
  }

  try {
    if (!validateEmail(req.body.email)) {
      return res.status(400).json({ message: "Invalid email" });
    }

    let updatedData = {
      ...req.body,
    };

    if (req.body.password) {
      if (passwordNotMacth(req.body.password, req.body.password2)) {
        return res.status(400).json({ message: "Passwords do not match" });
      }

      if (passwordLength(req.body.password)) {
        return res.status(400).json({ message: "Password is too short" });
      }

      const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
      updatedData.password = hashedPassword;
    }

    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    return res.status(200).json({
      message: "User updated successfully",
      updateUser: {
        username: updateUser.username,
        firstname: updateUser.firstname,
        lastname: updateUser.lastname,
        email: updateUser.email,
        role: updateUser.role,
        password: updateUser.password,
        bio: updateUser.bio,
        avatar: updateUser.avatar,
      },
    });
  } catch (error) {
    if (!res.headersSent) {
      return res.status(500).json({ message: error.message });
    }
  }
});

module.exports = router;
