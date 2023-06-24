const express = require("express")
const userController = require("../controller/userController");
const requireAuth = require("../middleware/requireAuth");


const router = express.Router();

router.route("/register").post(userController.registerUser)
router.route("/login").post(userController.loginUser)
router.route("/check-auth").get(requireAuth, userController.checkAuth)
router.route("/logout").get(userController.logoutUser)


// module.exports = router;
module.exports = router;