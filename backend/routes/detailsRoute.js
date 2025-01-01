const express = require("express");
const { addDetails, getUserDetails } = require("../controller/details.controller");
// const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", addDetails);
router.get("/:userId", getUserDetails)

module.exports = router;
