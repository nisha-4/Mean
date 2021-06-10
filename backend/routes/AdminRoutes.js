const express = require("express");
const { Login,Register,CreateUser,DeleteUser,getAllUsers,getUserById} = require("../controllers/AdminController");
const router = express.Router();

router.route("/register").post(Register);
router.route("/login").post(Login);

router.use(require ("../Authentication/AuthAdmin"))
router.route("/createUser").post(CreateUser);
router.route("/getUser/:userId").get(getUserById)
router.route("/deleteUser/:userId").delete(DeleteUser)
router.route("/allUsers").get(getAllUsers)
module.exports = router;