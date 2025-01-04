const prisma = require("../config/connectDB");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const doctorSignin = async (req, res) => {
  const { accessId, password } = req.body;

  try {
    const doctor = await prisma.doctor.findUnique({
      where: { accessId },
      include: {
        appointments: true, // Include related appointments
        schedules: true, // Include related schedules
        organization: true, // Include related organization details if needed
      },
    });

    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, doctor.password);

    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: doctor.id, name: `${doctor.firstname} ${doctor.lastname}` },
      "your-secret-key",
      { expiresIn: "1h" }
    );

    res.cookie("doctorToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600000,
      sameSite: "Strict",
    });

    res.status(200).json({ message: "Login successful", token, data: doctor });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const doctorAppointment = async (req, res) => {
  const { doctorId } = req;
  console.log(doctorId);
 
  try {
    const appointments = await prisma.appointment.findMany({
      where: {
        doctorId: parseInt(doctorId, 10),
      },
      include: {
        user: {
          select: {
            username: true,
            email: true,
          },
        },
        schedule: {
          select: {
            dayOfWeek: true,
            startTime: true,
            endTime: true,
          },
        },
        doctor: {
          select: {
            firstname: true,
            lastname: true,
            specialty: true,
          },
        },
        organization: {
          select: {
            name: true,
            contact: true,
          },
        },
      },
    });

    if (!appointments.length) {
      return res.status(404).json({ message: 'No appointments found for this doctor.' });
    }

    res.status(200).json({ data: appointments });
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ error: 'An error occurred while fetching appointments.' });
  }
};

module.exports = {
  doctorSignin,
  doctorAppointment,
};