const express = require('express');
const router = express.Router();
const prisma = require("../config/connectDB")
const {
  getAvailableSlots,
  bookAppointment,
} = require('../controller/appointment.controller');

router.get('/available-slots', getAvailableSlots);
router.post('/book-appointment', bookAppointment);
router.get('/organizations', async (req, res) => {
  try {
    const organizations = await prisma.organization.findMany();
    res.status(200).json(organizations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch organizations' });
  }
});

// Get doctors by organization ID
router.get('/doctors/:organizationId', async (req, res) => {
  const { organizationId } = req.params;

  try {
    const doctors = await prisma.doctor.findMany({
      where: { organizationId: parseInt(organizationId) },
    });

    if (doctors.length === 0) {
      return res.status(404).json({ message: 'No doctors found for this organization' });
    }

    res.status(200).json(doctors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch doctors' });
  }
});

module.exports = router;
