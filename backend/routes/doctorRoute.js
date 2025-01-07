const express = require("express");
const { doctorAppointment } = require("../controller/doctor.controller");
const { doctorAuthMiddleware } = require("../middleware/authMiddleware");
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.get("/appointments", doctorAuthMiddleware, doctorAppointment);
router.get('/patients', doctorAuthMiddleware, async (req, res) => {
    try {
      // Only allow doctors to access patient details
    //   if (req.user.role !== 'DOCTOR') {
    //     return res.status(403).json({ message: 'Access denied' });
    //   }
  
      // Fetch patient details including the number of appointments
      const patients = await prisma.user.findMany({
        select: {
          id: true,
          username: true,
          email: true,
          healthData: true,
          appointments: {
            select: {
              id: true,
            },
          },
        },
      });
  
      const formattedPatients = patients.map((patient) => ({
        id: patient.id,
        name: patient.username,
        email: patient.email,
        age: patient.healthData?.[0]?.age || 'N/A', // Assuming healthData contains age
        phoneNumber: patient.healthData?.[0]?.contact || 'N/A', // Assuming healthData contains contact
        numberOfAppointments: patient.appointments.length,
      }));
  
      res.json({ success: true, data: formattedPatients });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  });

module.exports = router;