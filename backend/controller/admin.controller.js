const prisma = require("../config/connectDB");
const bcryptjs = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const { sendEmail } = require("../config/emailService");

const hashPassword = async (password) => {
  const salt = await bcryptjs.genSalt(10);
  return bcryptjs.hash(password, salt);
};

const addHealthCareOrganisation = async (req, res) => {
  try {
    const { name, address, latitude, longitude, contact, services, email, specialities } =
      req.body;
      console.log(specialities)
    const accessId = `CN_ORG_${uuidv4().split("-")[0].toUpperCase()}`;
    const password = accessId;
    const hashedPassword = await hashPassword(password);
    let servicesArray = [];
    if (typeof services === "string") {
      servicesArray = services.split(",").map((service) => service.trim());
    } else if (Array.isArray(services)) {
      servicesArray = services.map((service) => service.trim());
    } else {
      return res.status(400).json({
        status: "error",
        message: "Services must be an array or a comma-separated string",
      });
    }

    const newOrganization = await prisma.organization.create({
      data: {
        name,
        address,
        latitude,
        longitude,
        contact,
        services: servicesArray,
        email,
        accessId: accessId,
        password: hashedPassword,
        status: "Pending",
        specialities
      },
    });

    await sendEmail(
      email,
      "Welcome to CureNest",
      `<p>AccessId: <strong>${accessId}</strong></p><p>Password: <strong>${password}</strong></p>`
    );

    res.status(201).json({
      status: "success",
      message: "Healthcare Organization created successfully",
      organization: {
        ...newOrganization,
        accessId,
      },
    });
  } catch (error) {
    console.error("Error creating organization:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to create healthcare organization",
    });
  }
};

const getAllHealthCareOrganizations = async (req, res) => {
  try {
    const organizations = await prisma.organization.findMany({
      select: {
        id: true,
        name: true,
        address: true,
        contact: true,
        services: true,
        email: true,
        status: true,
        specialities: true,
        _count: {
          select: {
            doctors: true,
          },
        },
        appointments: {
          select: {
            userId: true, 
          },
        },
      },
    });

    const transformedOrganizations = organizations.map(org => {
      const uniquePatientIds = new Set(org.appointments.map(appt => appt.userId));
      return {
        ...org,
        numberOfDoctors: org._count.doctors,
        numberOfPatients: uniquePatientIds.size, 
      };
    });

    res.status(200).json({
      status: "success",
      message: "Fetched healthcare organizations successfully",
      data: transformedOrganizations,
    });
  } catch (error) {
    console.error("Error fetching organizations:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to fetch healthcare organizations",
    });
  }
};

const getDashboardAnalytics = async (req, res) => {
  try {
    const [healthOrgsCount, doctorsCount, usersCount, appointmentStats, totalAppointments] = await Promise.all([
      prisma.organization.count(),
      prisma.doctor.count(),
      prisma.user.count({ where: { role: 'USER' } }),
      prisma.appointment.groupBy({
        by: ['status'],
        _count: { id: true },
      }),
      prisma.appointment.count(), // Count all appointments
    ]);

    const response = {
      healthOrgs: healthOrgsCount,
      doctors: doctorsCount,
      users: usersCount,
      appointments: appointmentStats.map(stat => ({
        status: stat.status,
        count: stat._count.id,
      })),
      totalAppointments, // Include total appointment count
    };

    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching analytics data' });
  }
};


const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        gender:true,
        contact:true,
        age:true,
        address:true,
        role: true,
        email: true,
        avatar: true,
        createdAt: true,
        healthData: true
      },
    });

    return res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ error: "Failed to fetch users." });
  }
};

const getDoctors = async (req, res) => {
  try {
    const doctors = await prisma.doctor.findMany({
      select: {
        id: true,
        firstname: true,
        lastname: true,
        photo: true,
        accessId: true,
        email: true,
        contact: true,
        specialty: true,
        qualifications: true,
        bio: true,
        organization: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return res.status(200).json(doctors);
  } catch (error) {
    console.error("Error fetching doctors:", error);
    return res.status(500).json({ error: "Failed to fetch doctors." });
  }
};

module.exports = {
  addHealthCareOrganisation,
  getAllHealthCareOrganizations,
  getUsers,
  getDoctors,
  getDashboardAnalytics
};