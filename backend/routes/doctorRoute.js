const express = require("express");
const { doctorAppointment } = require("../controller/doctor.controller");
const { doctorAuthMiddleware } = require("../middleware/authMiddleware");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get("/appointments", doctorAuthMiddleware, doctorAppointment);
router.get("/patients", doctorAuthMiddleware, async (req, res) => {
  try {
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
      age: patient.healthData?.[0]?.age || "N/A", // Assuming healthData contains age
      phoneNumber: patient.healthData?.[0]?.contact || "N/A", // Assuming healthData contains contact
      numberOfAppointments: patient.appointments.length,
    }));

    res.json({ success: true, data: formattedPatients });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

router.get("/api/doctor/schedule", doctorAuthMiddleware, async (req, res) => {
  const {doctorId } = req;
  const { month, year } = req.query;

  if (!doctorId || !month || !year) {
    return res
      .status(400)
      .json({ error: "Doctor ID, month, and year are required" });
  }

  const startOfMonth = new Date(parseInt(year), parseInt(month) - 1, 1);
  const endOfMonth = new Date(parseInt(year), parseInt(month), 0);

  try {
    const appointments = await prisma.appointment.findMany({
      where: {
        doctorId: parseInt(doctorId),
        date: {
          gte: startOfMonth,
          lte: endOfMonth,
        },
      },
      select: {
        date: true,
        status: true,
      },
    });

    res.json(appointments);
  } catch (error) {
    console.error("Error fetching monthly appointments:", error);
    res.status(500).json({ error: "Failed to fetch monthly appointments" });
  }
});

// Get today's appointments
router.get(
  "/api/doctor/today-appointments",
  doctorAuthMiddleware,
  async (req, res) => {
    const { doctorId } = req;
    const { date } = req.query;

    if (!doctorId) {
      return res.status(400).json({ error: "Doctor ID is required" });
    }

    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    try {
      const appointments = await prisma.appointment.findMany({
        where: {
          doctorId: parseInt(doctorId),
          date: {
            gte: startOfDay,
            lte: endOfDay,
          },
        },
        include: {
          doctor: {
            select: {
              id: true,
              firstname: true,
              lastname: true,
              specialty: true,
            },
          },
        },
        orderBy: {
          startTime: "asc",
        },
      });

      // Also fetch doctor's schedule for availability info
      const doctorSchedule = await prisma.schedule.findMany({
        where: {
          doctorId: parseInt(doctorId),
        },
      });

      res.json({ appointments, schedule: doctorSchedule });
    } catch (error) {
      console.error("Error fetching appointments:", error);
      res.status(500).json({ error: "Failed to fetch appointments" });
    }
  }
);

module.exports = router;
