const express = require('express');
const router = express.Router();
const contactController = require('../controller/ContactUs.controller.js');

// Route to save a contact message
router.post('/contact', contactController.saveContactMessage);

// Route to get all contact messages (for admin use)
router.get('/getcontact', contactController.getAllContactMessages);

module.exports = router;
