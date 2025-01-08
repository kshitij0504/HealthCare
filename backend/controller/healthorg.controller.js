const prisma = require("../config/connectDB");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const { sendEmail } = require("../config/emailService");

const healthOrgSignin = async (req, res) => {
  const { id, password } = req.body;

  try {
    const healthOrg = await prisma.organization.findUnique({
      where: {
        accessId: id,
      },
      include: {
        doctors: true
      }
    });

    if (!healthOrg) {
      return res.status(404).json({ error: "Health organization not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, healthOrg.password);

    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: healthOrg.id, name: healthOrg.name },
      "your-secret-key",
      { expiresIn: "1h" }
    );

    const cookieOptions = {
      httpOnly: true, // Prevents client-side access
      secure: process.env.NODE_ENV === "production", // Enable in production (HTTPS)
      sameSite: 'None', // Helps prevent CSRF attacks
      path: '/', // Accessible across the entire site
    };

    // res.cookie("healthOrgToken", token, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === "production",
    //   maxAge: 3600000,
    //   sameSite: "Strict",
    // });

    // res.status(200).json({ message: "Sign-in successful", token, healthOrg });

    res.cookie("healthOrgToken", token, cookieOptions).status(200).json({
      message: "Sign-in successful",
      data: {
        healthOrg: {
          id: healthOrg.id,
          name: healthOrg.name,
          email: healthOrg.email,
          contact: healthOrg.contact,
          address: healthOrg.address,
          doctors: healthOrg.doctors
        },
        token
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const addDoctor = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    specialty,
    qualifications,
    contact,
    age,
    gender,
    bloodGroup,
    address,
    postalCode,
    bio,
    photo
  } = req.body;

  const token = req.cookies.healthOrgToken;
  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, "your-secret-key");
    const organizationId = parseInt(decoded.id, 10);
    const doctorId = uuidv4();
    const password = Math.random().toString(36).substring(2, 10);
    const accessId = `CN_DR_${uuidv4().split("-")[0].toUpperCase()}`;
    const hashedPassword = await bcrypt.hash(password, 10);

    const doctor = await prisma.doctor.create({
      data: {
        accessId,
        password: hashedPassword,
        firstname: firstName,
        lastname: lastName,
        email,
        specialty,
        qualifications,
        contact,
        age: age.toString(),
        gender,
        BloodGroup: bloodGroup,
        address,
        postalcode: postalCode,
        bio,
        photo,
        organizationId
      },
    });

    // Create default schedules
    const defaultSchedules = [0, 1, 2, 3, 4, 5, 6].map(day => ({
      doctorId: doctor.id,
      dayOfWeek: day,
      startTime: "09:00",
      endTime: "17:00",
      slotDuration: 30
    }));

    await prisma.schedule.createMany({
      data: defaultSchedules,
    });
    await sendEmail(
      email,
      "Welcome to CureNest",
      `<p>AccessId: <strong>${accessId}</strong></p><p>Password: <strong>${password}</strong></p>`
    );
    res.status(201).json({
      message: "Doctor added successfully",
      doctor,
      accessId,
      password
    });
  } catch (error) {
    console.error(error);
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: "Invalid token" });
    }
    res.status(500).json({ error: "Failed to add doctor" });
  }
};

const getDoctors = async (req, res) => {
  const token = req.cookies.healthOrgToken;
  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, "your-secret-key");
    const organizationId = decoded.id;

    const doctors = await prisma.doctor.findMany({
      where: {
        organizationId: parseInt(organizationId, 10),
      },
    });

    if (doctors.length === 0) {
      return res.status(404).json({ message: "No doctors found for this organization" });
    }

    res.status(200).json({ doctors });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getPatient = async (req, res) => {
  const { healthOrgId } = req;
  console.log(healthOrgId);

  try {
      // Check if the hospital exists
      const hospital = await prisma.organization.findUnique({
          where: { id: healthOrgId },
      });

      if (!hospital) {
          return res.status(404).json({ error: "Hospital not found" });
      }

      // Fetch all appointments for the hospital
      const appointments = await prisma.appointment.findMany({
          where: { organizationId: healthOrgId },
          select: {
              userId: true,
              patientName: true,
              patientEmail: true,
              user: {
                  select: {
                      username: true,
                      email: true,
                      age:true,
                      gender:true,
                      address:true,
                      contact:true,
                      healthData: true,
                  },
              },
              doctor: {
                  select: {
                      firstname: true,
                      lastname: true,
                      specialty: true,
                  },
              },
              date: true,
              status: true,
          },
      });

      // Deduplicate patients and collect their appointment count and doctor details
      const uniquePatients = new Map();

      appointments.forEach((appointment) => {
          if (!uniquePatients.has(appointment.userId)) {
              uniquePatients.set(appointment.userId, {
                  patientName: appointment.patientName,
                  patientEmail: appointment.patientEmail,
                  user: appointment.user,
                  appointments: [
                      {
                          date: appointment.date,
                          status: appointment.status,
                          doctor: appointment.doctor,
                      },
                  ],
              });
          } else {
              // Add appointment details to the existing patient entry
              uniquePatients.get(appointment.userId).appointments.push({
                  date: appointment.date,
                  status: appointment.status,
                  doctor: appointment.doctor,
              });
          }
      });

      // Prepare response
      const patientData = Array.from(uniquePatients.values()).map((patient) => ({
          ...patient,
          appointmentCount: patient.appointments.length,
      }));

      const patientCount = patientData.length;

      res.json({
          hospitalName: hospital.name,
          patientCount,
          patients: patientData,
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: "An error occurred while fetching data" });
  }
};

module.exports = {
  healthOrgSignin,
  addDoctor,
  getDoctors,
  getPatient
};