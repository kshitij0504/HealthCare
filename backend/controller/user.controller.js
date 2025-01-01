const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");
const prisma = require("../config/connectDB");
const { sendEmail } = require("../config/emailService");

const register = async (req, res) => {
  const { username, email, password } = req.body;

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser)
    return res.status(400).json({ message: "Email already registered" });

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: { username, email, password: hashedPassword },
  });

  const otp = otpGenerator.generate(6, { digits: true });
  await prisma.userVerification.create({ data: { userId: newUser.id, otp } });

  await sendEmail(
    email,
    "Verify your email",
    `<p>Your OTP: <strong>${otp}</strong></p>`
  );

  res.status(201).json({ message: "User registered, OTP sent" });
};

const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  console.log({ email, otp });

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(404).json({ message: "User not found" });

  const verification = await prisma.userVerification.findFirst({
    where: { userId: user.id, otp },
  });
  if (!verification) return res.status(400).json({ message: "Invalid OTP" });

  await prisma.userVerification.delete({ where: { id: verification.id } });

  res
    .status(200)
    .json({ message: "Email verified successfully", userId: user.id });
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Validate the password
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(400).json({ message: "Invalid password" });

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET || "your_secret_key",
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production", // Enable in production
      maxAge: 3600000, // 1 hour
    });

    res.status(200).json({ message: "Login successful", data: user });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const GoogleAuth = async (req, res) => {
  const { username, email, googlePhotoURL } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (user) {
      const payload = {
        id: user.id,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
        expiresIn: "1d",
      });

      const cookieOptions = {
        httpOnly: true,
        secure: true,
      };

      res.cookie("token", token, cookieOptions);
      return res.status(200).json({
        message: "Login successful",
        success: true,
        data: {
          token: token,
          user: {
            id: user.id,
            email: user.email,
            username: user.username,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            avatar: user.avatar,
          },
        },
      });
    } else {
      const generatePassword = Math.random().toString(36).slice(-8);
      const salt = await bcrypt.genSalt(10);
      const hashpassword = await bcrypt.hash(generatePassword, salt);

      const newUser = await prisma.user.create({
        data: {
          email: email,
          username: username,
          password: hashpassword,
          avatar: googlePhotoURL,
        },
      });

      await sendGeneratedPassword(email, generatePassword);

      const payload = {
        id: newUser.id,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
        expiresIn: "1d",
      });

      const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      };

      res.cookie("token", token, cookieOptions);
      return res.status(200).json({
        message: "Registration and login successful",
        success: true,
        data: {
          token: token,
          user: {
            id: newUser.id,
            email: newUser.email,
            username: newUser.username,
            createdAt: newUser.createdAt,
            updatedAt: newUser.updatedAt,
            avatar: newUser.avatar,
          },
        },
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

const getAvailableSlots = async (req, res) => {
  const { doctorId, organizationId } = req.query;

  const doctorIdInt = parseInt(doctorId, 10);
  const organizationIdInt = parseInt(organizationId, 10);

  try {
    if (isNaN(doctorIdInt) || isNaN(organizationIdInt)) {
      return res.status(400).json({ error: "Invalid doctorId or organizationId." });
    }
    const slots = await prisma.slot.findMany({
      where: {
        doctorId: doctorIdInt,
        organizationId: organizationIdInt,
      },
    });

    const availableSlots = slots
      .map((slot) => {
        if (Array.isArray(slot.slotDetails)) {
          const filteredDetails = slot.slotDetails.filter((detail) => !detail.isBooked);
          if (filteredDetails.length > 0) {
            return { ...slot, slotDetails: filteredDetails };
          }
        }
        return null;
      })
      .filter(Boolean); // Remove null values

    res.status(200).json(availableSlots);
  } catch (error) {
    console.error("Error fetching available slots:", error.message);
    res
      .status(500)
      .json({ error: "An error occurred while fetching available slots." });
  }
};

const bookAppointment = async (req, res) => {
  const { userId, doctorId, organizationId, date, timeSlot } = req.body;
  const userIdint = parseInt(userId, 10);

  try {
    const doctorIdInt = parseInt(doctorId, 10);
    const organizationIdInt = parseInt(organizationId, 10);

    // Fetch the slots for the specified doctor and organization
    const slotData = await prisma.slot.findFirst({
      where: {
        doctorId: doctorIdInt,
        organizationId: organizationIdInt,
      },
    });

    if (!slotData) {
      return res.status(404).json({ error: "No slots found for the given doctor and organization." });
    }

    // Parse slotDetails and check if the timeSlot is available
    const slotDetails = slotData.slotDetails;
    const slotIndex = slotDetails.findIndex(
      (slot) => slot.timeSlot === timeSlot && !slot.isBooked
    );

    if (slotIndex === -1) {
      return res.status(400).json({ error: "This slot is already booked or does not exist." });
    }

    // Mark the slot as booked
    slotDetails[slotIndex].isBooked = true;

    await prisma.slot.update({
      where: { id: slotData.id },
      data: { slotDetails },
    });

    // Create the appointment and connect it to an existing doctor and user
    const appointment = await prisma.appointment.create({
      data: {
        date: new Date(date),
        timeSlot,
        status: "Pending",
        user: {
          connect: {
            id: userIdint,  // Connect the user by their ID
          },
        },
        doctor: {
          connect: {
            id: doctorIdInt,  // Connect the doctor by their ID (no need for doctorId)
          },
        },
        organization: {
          connect: {
            id: organizationIdInt, // Connect the organization by its ID
          },
        },
      },
    });
    

    res.status(201).json(appointment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while booking the appointment." });
  }
};



module.exports = { register, verifyOtp, login, GoogleAuth, getAvailableSlots,bookAppointment };
