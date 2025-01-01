const prisma = require("../config/connectDB");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const doctorSignin = async (req, res) => {
  const { accessId, password } = req.body;

  try {
    const doctor = await prisma.doctor.findUnique({
      where: { accessId },
      include: {
        Slot: true, // Include related slots
        appointments: true, // Include related appointments
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
      { id: doctor.id, name: doctor.name },
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

module.exports = {
  doctorSignin,
};
