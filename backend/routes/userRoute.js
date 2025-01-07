const express = require('express');
const router = express.Router();
const prisma = require("../config/connectDB")
const {
  getAvailableSlots,
  bookAppointment,
} = require('../controller/appointment.controller');
const { authMiddleware } = require('../middleware/authMiddleware');
const { getAppointment, userDetails } = require('../controller/details.controller');

router.get('/available-slots', getAvailableSlots);
router.post('/book-appointment', bookAppointment);
router.get("/appointment/:userId",authMiddleware,getAppointment);

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

router.get('/user/:userId', authMiddleware, userDetails);

router.get('/organizations-by-specialty/:selectedSpecialty', async (req, res) => {
  const { selectedSpecialty } = req.params;

  try {
    // Fetch organizations with the specified specialty
    const organizations = await prisma.organization.findMany({
      where: {
        specialities: {
          has: selectedSpecialty, // Matches arrays containing the specialty
        },
      },
      select: {
        id: true,
        name: true,
        address: true,
        contact: true,
        email: true,
        specialities: true,
        services: true,
      },
    });

    // If no organizations are found
    if (organizations.length === 0) {
      return res.status(404).json({ message: 'No organizations found for the selected specialty.' });
    }

    // Respond with the organizations
    res.status(200).json({ organizations });
  } catch (error) {
    console.error('Error fetching organizations by specialty:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.get('/user/doctors/:selectedOrganization/:selectedSpecialty', async (req, res) => {
  const { selectedOrganization, selectedSpecialty } = req.params;

  try {
    // Fetch doctors matching the organization and specialty
    const doctors = await prisma.doctor.findMany({
      where: {
        organization: {
          id: parseInt(selectedOrganization), // Match organization ID
        },
        specialty: selectedSpecialty, // Match specialty
      },
      select: {
        id: true,
        firstname: true,
        lastname: true,
        email: true,
        contact: true,
        gender: true,
        age: true,
        address: true,
        bio: true,
        photo: true,
        qualifications: true,
        specialty: true,
        organization: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    // If no doctors are found
    if (doctors.length === 0) {
      return res.status(404).json({ message: 'No doctors found for the given organization and specialty.' });
    }

    // Respond with the doctors
    res.status(200).json({ doctors });
  } catch (error) {
    console.error('Error fetching doctors by organization and specialty:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;