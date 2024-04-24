const express = require("express");
const router = express.Router();
const authController = require("../controller/user")

router.post("/register",authController.registerUser)
router.post("/login",authController.loginuser)

module.exports = router;