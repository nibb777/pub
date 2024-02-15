const express = require("express");
const router = express.Router();
const {
    createUserController,
    getAllUsersController,
    getUserById,
    updateUser,
    deleteUser
} = require("../controllers/usercontroller");

router.route("/").post(createUserController)
                 .get(getAllUsersController);
router.route("/:id").get(getUserById)
                    .delete(deleteUser)
                    .patch(updateUser);


module.exports = router;