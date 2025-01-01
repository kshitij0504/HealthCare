const express = require("express");
const {
  addHealthCareOrganisation,
  getAllHealthCareOrganizations,
  getUsers,
} = require("../controller/admin.controller");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/add", authMiddleware, addHealthCareOrganisation);
router.get("/org", authMiddleware, getAllHealthCareOrganizations);
router.get("/users", authMiddleware, getUsers);

module.exports = router;
