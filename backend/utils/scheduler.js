const prisma = require('../config/connectDB')

const generateSlots = async () => {
    try {
        const doctors = await prisma.doctor.findMany();
        const organizations = await prisma.organization.findMany();

        if (doctors.length === 0 || organizations.length === 0) {
            throw new Error("No doctors or organizations found.");
        }

        const today = new Date();
        const daysToGenerate = 7;

        for (const organization of organizations) {
            for (const doctor of doctors) {
                for (let i = 0; i < daysToGenerate; i++) {
                    const targetDate = new Date(today);
                    targetDate.setDate(today.getDate() + i);

                    for (let hour = 0; hour < 24; hour++) {
                        for (let minute = 0; minute < 60; minute += 30) {
                            const slotDate = new Date(targetDate);
                            slotDate.setHours(hour, minute, 0, 0);

                            const time = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;

                            // Check if slot already exists
                            const existingSlot = await prisma.slot.findFirst({
                                where: {
                                    doctorId: doctor.id,
                                    organizationId: organization.id,
                                    date: slotDate,
                                    time,
                                },
                            });

                            if (!existingSlot) {
                                // Create slot if it doesn't exist
                                await prisma.slot.create({
                                    data: {
                                        doctorId: doctor.id,
                                        organizationId: organization.id,
                                        date: slotDate,
                                        time,
                                    },
                                });
                            }
                        }
                    }
                }
            }
        }
    } catch (error) {
        console.error("Error generating slots: ", error);
    }
};

module.exports = generateSlots