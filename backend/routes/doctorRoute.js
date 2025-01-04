const express = require("express");
const { doctorAppointment } = require("../controller/doctor.controller");
const { doctorAuthMiddleware } = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/appointments", doctorAuthMiddleware, doctorAppointment);

module.exports = router;