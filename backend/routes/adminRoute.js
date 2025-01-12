const express = require("express");
const {
  addHealthCareOrganisation,
  getAllHealthCareOrganizations,
  getUsers,
  getDoctors,
  getDashboardAnalytics
} = require("../controller/admin.controller");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/add", authMiddleware, addHealthCareOrganisation);
router.get("/org", authMiddleware, getAllHealthCareOrganizations);
router.get("/users", authMiddleware, getUsers);
router.get("/doctor", authMiddleware, getDoctors);
router.get('/analytics/dashboard', authMiddleware, getDashboardAnalytics);
module.exports = router;