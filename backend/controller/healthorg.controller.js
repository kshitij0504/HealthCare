const prisma = require("../config/connectDB");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

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

    res.cookie("healthOrgToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600000,
      sameSite: "Strict",
    });

    res.status(200).json({ message: "Sign-in successful", token, healthOrg });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


const addDoctor = async (req, res) => {
  const { name, specialty, qualifications, availability, contact } = req.body;

  const token = req.cookies.healthOrgToken
  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  const decoded = jwt.verify(token, "your-secret-key");
  console.log(decoded)
  const organizationId= decoded.id;
  console.log(organizationId)
  const organizationIdInt = parseInt(organizationId,10)

  try {
    const doctorId = uuidv4();
    const password = Math.random().toString(36).substring(2, 10);

    const accessId = `CN_DR_${uuidv4().split("-")[0].toUpperCase()}`;
    const hashedPassword = await bcrypt.hash(password, 10);

    const doctor = await prisma.doctor.create({
      data: {
        accessId,
        name,
        specialty,
        qualifications,
        contact,
        organizationId: organizationIdInt,
        password: hashedPassword,
      },
    });

     // Generate a default schedule for the doctor
     const defaultSchedules = [0, 1, 2, 3, 4, 5, 6].map(day => ({
      doctorId: doctor.id,
      dayOfWeek: day,
      startTime: "09:00",
      endTime: "21:00",
      slotDuration: 30, // Default slot duration
    }));

    const createdSchedules = await prisma.schedule.createMany({
      data: defaultSchedules,
    });


    res.status(201).json({
      message: "Doctor added successfully",
      doctor,
      doctorId,
      password,
      createdSchedules,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
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


module.exports = {
  healthOrgSignin,
  addDoctor,
  getDoctors
};
