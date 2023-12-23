var express = require("express");
var User = require("../../models/user.model");
var router = express.Router();

/**
 * @swagger
 * /users:
 *   get:
 *     tags: [Users]
 *     summary: Get all users
 *     description: Retrieve all users
 *     responses:
 *       200:
 *         description: Users retrieved successfully
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
 *         description: Invalid request
 */
router.get("/", function (req, res, next) {
  // Logic to fetch and send list of users
  res.send("Return with all users . Backend is not yet prepared.");
});

module.exports = router;
