const { parse } = require('path');
const prisma = require('../config/connectDB')
const { parseISO, format, addMinutes, isWithinInterval } = require('date-fns');

async function getAvailableSlots(req, res) {
  try {
    const { doctorId, date } = req.query;
    const requestedDate = parseISO(date);
    const dayOfWeek = requestedDate.getDay();
    console.log(dayOfWeek)

    const schedule = await prisma.schedule.findFirst({
      where: {
        doctorId: parseInt(doctorId),
        dayOfWeek: parseInt(dayOfWeek),
        isActive: true
      }
    });

    if (!schedule) {
      return res.json([]);
    }
    console.log(schedule)

    const existingAppointments = await prisma.appointment.findMany({
      where: {
        scheduleId: parseInt(schedule.id),
        date: {
          equals: requestedDate
        },
        status: 'BOOKED'
      }
    });

    const slots = [];
    let currentTime = parseISO(`${date}T${schedule.startTime}`);
    const endTime = parseISO(`${date}T${schedule.endTime}`);

    while (currentTime < endTime) {
      const slotEnd = addMinutes(currentTime, schedule.slotDuration);
      
      const isSlotAvailable = !existingAppointments.some(app => 
        isWithinInterval(currentTime, { start: app.startTime, end: app.endTime }) ||
        isWithinInterval(slotEnd, { start: app.startTime, end: app.endTime })
      );

      if (isSlotAvailable) {
        slots.push({
          startTime: format(currentTime, 'HH:mm'),
          endTime: format(slotEnd, 'HH:mm'),
          scheduleId: schedule.id
        });
      }

      currentTime = slotEnd;
    }

    res.json(slots);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function bookAppointment(req, res) {
  try {
    const { scheduleId, date, startTime, endTime, patientName, patientEmail, userId } = req.body;

    // Ensure the user exists
    const user = await prisma.user.findUnique({
      where: { id: parseInt(userId) },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }
    console.log(scheduleId)
    const schedule = await prisma.schedule.findUnique({
      where: { id: parseInt(scheduleId) },
      include: {
        doctor: {
          include: {
            organization: true,
          },
        },
      },
    });

    if (!schedule) {
      return res.status(404).json({ error: 'Schedule not found.' });
    }

    // Parse the requested start and end time
    const requestedStartTime = parseISO(`${date}T${startTime}`);
    const requestedEndTime = parseISO(`${date}T${endTime}`);

    // Check if the requested appointment slot overlaps with any existing appointments
    const conflictingAppointments = await prisma.appointment.findMany({
      where: {
        scheduleId,
        date: parseISO(date),
        status: 'BOOKED',
        OR: [
          {
            startTime: {
              lt: requestedEndTime,
            },
            endTime: {
              gt: requestedStartTime,
            },
          },
        ],
      },
    });

    // If there are conflicting appointments, return an error
    if (conflictingAppointments.length > 0) {
      return res.status(400).json({ error: 'The selected time slot is already booked.' });
    }

    // Proceed with creating the appointment as the time slot is available
    const appointment = await prisma.appointment.create({
      data: {
        scheduleId,
        date: parseISO(date),
        startTime: requestedStartTime,
        endTime: requestedEndTime,
        patientName,
        patientEmail,
        userId,
        doctorId: schedule.doctor.id,
        organizationId: schedule.doctor.organization.id,
        status: 'BOOKED',
      },
      include: {
        schedule: {
          include: {
            doctor: {
              include: {
                organization: true,
              },
            },
          },
        },
        user: true,
      },
    });

    res.json(appointment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getAvailableSlots,
  bookAppointment
};