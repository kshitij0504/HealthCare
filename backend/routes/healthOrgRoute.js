const express = require('express')
const { authenticateHealthOrg } = require('../middleware/authMiddleware')
const { healthOrgSignin, addDoctor, getDoctors, getPatient } = require('../controller/healthorg.controller')
const router = express.Router()

router.post('/signin',healthOrgSignin)
router.post("/add-doctor", authenticateHealthOrg, addDoctor);
router.get('/getDoctor',authenticateHealthOrg,getDoctors)
router.get('/getPatient',authenticateHealthOrg,getPatient)
module.exports = router