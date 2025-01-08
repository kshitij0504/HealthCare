const express = require('express');
const crypto = require("crypto");
const router = express.Router();
const prisma = require("../config/connectDB")
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY 
const IV = process.env.IV 

if (Buffer.from(ENCRYPTION_KEY, "hex").length !== 32) {
  throw new Error("Invalid ENCRYPTION_KEY. Must be 32 bytes in hexadecimal format.");
}

if (Buffer.from(IV, "hex").length !== 16) {
  throw new Error("Invalid IV. Must be 16 bytes in hexadecimal format.");
}

const decrypt = (text) => {
  if (!text) return null; // Handle null/undefined
  const decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    Buffer.from(ENCRYPTION_KEY, "hex"),
    Buffer.from(IV, "hex")
  );
  let decrypted = decipher.update(text, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
};

// Get user profile
router.get('/profile/:userId',  async (req, res) => {
    const { userId } = req.params
    console.log(userId)
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: parseInt(userId)
            },
            select: {
                id: true,
                username: true,
                email: true,
                avatar: true,
                role: true,
                createdAt: true
            }
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// Get user health data
router.get('/health-data/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const healthData = await prisma.healthData.findFirst({
            where: {
                userId: parseInt(userId)
            }
        });

        if (!healthData) {
            return res.status(404).json({ error: 'Health data not found' });
        }

        const decryptedHealthData = {
            id: healthData.id,
            healthStatus: decrypt(healthData.healthStatus),
            bloodType: decrypt(healthData.bloodType),
            allergies: healthData.allergies ? JSON.parse(decrypt(healthData.allergies)) : null,
            chronicConditions: healthData.chronicConditions ? JSON.parse(decrypt(healthData.chronicConditions)) : null,
            emergencyContactName: healthData.emergencyContactName ? decrypt(healthData.emergencyContactName) : null,
            emergencyContactNumber: healthData.emergencyContactNumber ? decrypt(healthData.emergencyContactNumber) : null,
            insuranceProvider: decrypt(healthData.insuranceProvider),
            policyNumber: decrypt(healthData.policyNumber),
            policyStartDate: healthData.policyStartDate,
            policyEndDate: healthData.policyEndDate,
            createdAt: healthData.createdAt,
            updatedAt: healthData.updatedAt,
        };

        res.json(decryptedHealthData);
    } catch (error) {
        console.error('Error fetching health data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// Get user appointments
router.get('/appointments/:userId',  async (req, res) => {
    const { userId } = req.params
    try {
        const appointments = await prisma.appointment.findMany({
            where: {
                userId: parseInt(userId)
            },
            include: {
                doctor: {
                    select: {
                        firstname: true,
                        lastname: true,
                        specialty: true,
                        photo: true
                    }
                },
                organization: {
                    select: {
                        name: true,
                        address: true
                    }
                }
            },
            orderBy: {
                date: 'asc'
            }
        });

        res.json(appointments);
    } catch (error) {
        console.error('Error fetching appointments:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update health data
router.put('/health-data',  async (req, res) => {
    const { userId } = req.params
    try {
        const {
            healthStatus,
            bloodType,
            allergies,
            chronicConditions,
            emergencyContactName,
            emergencyContactNumber,
            insuranceProvider,
            policyNumber,
            policyStartDate,
            policyEndDate
        } = req.body;

        const updatedHealthData = await prisma.healthData.upsert({
            where: {
                userId: userId
            },
            update: {
                healthStatus,
                bloodType,
                allergies,
                chronicConditions,
                emergencyContactName,
                emergencyContactNumber,
                insuranceProvider,
                policyNumber,
                policyStartDate,
                policyEndDate
            },
            create: {
                userId: req.user.id,
                healthStatus,
                bloodType,
                allergies,
                chronicConditions,
                emergencyContactName,
                emergencyContactNumber,
                insuranceProvider,
                policyNumber,
                policyStartDate,
                policyEndDate
            }
        });

        res.json(updatedHealthData);
    } catch (error) {
        console.error('Error updating health data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Create new appointment
router.post('/appointments', async (req, res) => {
    try {
        const {
            scheduleId,
            date,
            startTime,
            endTime,
            doctorId,
            organizationId
        } = req.body;

        const user = await prisma.user.findUnique({
            where: { id: req.user.id }
        });

        const appointment = await prisma.appointment.create({
            data: {
                scheduleId,
                date: new Date(date),
                startTime: new Date(startTime),
                endTime: new Date(endTime),
                patientName: user.username,
                patientEmail: user.email,
                userId: req.user.id,
                doctorId,
                organizationId,
                status: 'BOOKED'
            },
            include: {
                doctor: {
                    select: {
                        firstname: true,
                        lastname: true,
                        specialty: true
                    }
                },
                organization: {
                    select: {
                        name: true,
                        address: true
                    }
                }
            }
        });

        res.status(201).json(appointment);
    } catch (error) {
        console.error('Error creating appointment:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update appointment status
router.patch('/appointments/:id/status', async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const appointment = await prisma.appointment.update({
            where: {
                id,
                userId: req.user.id
            },
            data: {
                status
            },
            include: {
                doctor: {
                    select: {
                        firstname: true,
                        lastname: true,
                        specialty: true
                    }
                }
            }
        });

        res.json(appointment);
    } catch (error) {
        console.error('Error updating appointment status:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;