var express = require("express");
var User = require("../../models/user.model");
var router = express.Router();

/**
 * @swagger
 * /users/username/{username}:
 *   get:
 *     tags: [Users]
 *     summary: Get user by username
 *     description: Retrieve a user by their unique username
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         description: Username of the user to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - firstname
 *                 - lastname
 *                 - email
 *                 - role
 *                 - avatar
 *                 - bio
 *                 - username
 *               properties:
 *                 firstname:
 *                   type: string
 *                   example: John
 *                 lastname:
 *                   type: string
 *                   example: Doe
 *                 email:
 *                   type: string
 *                   example: johndoe@example.com
 *                 role:
 *                   type: string
 *                   example: user/admin
 *                 avatar:
 *                   type: string
 *                   example: https://www.example.com/image.jpg
 *                 bio:
 *                   type: string
 *                   example: Hello, I am John Doe
 *                 username:
 *                   type: string
 *                   example: johndoe
 *       400:
 *         description: Invalid input
 */
router.get("/username=:username", async (req, res) => {
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

module.exports = router;
