var express = require("express");
var User = require("../../models/user.model");
var router = express.Router();

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     tags: [Users]
 *     summary: Deletes a user
 *     description: Deletes a user by their unique ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to delete.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - firstname
 *                 - lastname
 *                 - email
 *                 - role
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
 *                 username:
 *                   type: string
 *                   example: johndoe
 *       400:
 *         description: Error deleting user
 */
router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id).exec();

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "User has been deleted successfully!",
    });
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
