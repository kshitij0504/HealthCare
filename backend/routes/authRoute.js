const express = require("express");
const { register, verifyOtp, login, GoogleAuth } = require("../controller/user.controller");
const { doctorSignin } = require("../controller/doctor.controller");

const router = express.Router();

router.post("/register", register);
router.post("/verify-otp", verifyOtp);
router.post("/login", login);
router.post("/google-auth",GoogleAuth)

router.post("/doctor-signin",doctorSignin)
module.exports = router;
