import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { format, getMonth, getYear } from "date-fns";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const DoctorSchedule = () => {
  const [date, setDate] = useState(new Date());
  const [appointments, setAppointments] = useState([]);
  const [monthlyAppointments, setMonthlyAppointments] = useState([]);
  const [doctorSchedule, setDoctorSchedule] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchAppointments = async (selectedDate) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/doctor/api/doctor/today-appointments?date=${selectedDate.toISOString()}`,
        { credentials: "include" }
      );
      if (!response.ok) throw new Error("Failed to fetch appointments");
      const data = await response.json();
      setAppointments(data.appointments);
      setDoctorSchedule(data.schedule);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMonthlyAppointments = async (month, year) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/doctor/api/doctor/schedule?&month=${month + 1}&year=${year}`,
        { credentials: "include" }
      );
      if (!response.ok) throw new Error("Failed to fetch monthly appointments");
      const data = await response.json();
      setMonthlyAppointments(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchAppointments(date);
  }, [date]);

  useEffect(() => {
    const currentMonth = getMonth(date);
    const currentYear = getYear(date);
    fetchMonthlyAppointments(currentMonth, currentYear);
  }, [date]);

  const getStatusBadgeStyles = (status) => {
    switch (status) {
      case "BOOKED":
        return "bg-teal-100 text-teal-800 hover:bg-teal-200";
      case "CANCELLED":
        return "bg-red-100 text-red-800 hover:bg-red-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  const renderAppointmentCard = (appointment) => (
    <div key={appointment.id} className="mb-4">
      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 hover:border-teal-200 transition-colors">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center space-x-2">
            <span className="text-teal-600 font-medium">
              {format(new Date(appointment.startTime), "HH:mm")} -
              {format(new Date(appointment.endTime), "HH:mm")}
            </span>
            <Badge className={getStatusBadgeStyles(appointment.status)}>
              {appointment.status}
            </Badge>
          </div>
        </div>
        <Separator className="my-2" />
        <div className="flex flex-col space-y-1">
          <span className="text-gray-900 font-medium">{appointment.patientName}</span>
          <span className="text-gray-500 text-sm">{appointment.patientEmail}</span>
        </div>
      </div>
    </div>
  );

  const renderSchedule = () => {
    if (loading) {
      return Array(3).fill(0).map((_, i) => (
        <div key={i} className="mb-4">
          <Skeleton className="h-24 w-full" />
        </div>
      ));
    }

    if (appointments.length === 0) {
      return (
        <div className="text-center py-8">
          <p className="text-gray-500">No appointments scheduled for this day</p>
        </div>
      );
    }

    return appointments.map(renderAppointmentCard);
  };

  const getTileClassName = ({ date }) => {
    const appointments = monthlyAppointments.filter(
      (apt) => format(new Date(apt.date), "yyyy-MM-dd") === format(date, "yyyy-MM-dd")
    );

    if (appointments.length === 0) return "";

    const hasBookedAppointments = appointments.some((apt) => apt.status === "BOOKED");
    const hasCancelledAppointments = appointments.some((apt) => apt.status === "CANCELLED");

    if (hasBookedAppointments && hasCancelledAppointments) {
      return "mixed-appointments";
    } else if (hasBookedAppointments) {
      return "has-appointments";
    } else if (hasCancelledAppointments) {
      return "cancelled-appointments";
    }

    return "";
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Doctor Info */}
        {appointments[0]?.doctor && (
          <Card className="mb-6">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center">
                  <span className="text-teal-600 font-medium text-lg">
                    {appointments[0].doctor.firstname[0]}
                    {appointments[0].doctor.lastname[0]}
                  </span>
                </div>
                <div>
                  <CardTitle className="text-2xl text-gray-900">
                    Dr. {appointments[0].doctor.firstname} {appointments[0].doctor.lastname}
                  </CardTitle>
                  <p className="text-gray-500">{appointments[0].doctor.specialty}</p>
                </div>
              </div>
            </CardHeader>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Calendar */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="text-xl text-gray-900">Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                onChange={setDate}
                value={date}
                tileClassName={getTileClassName}
                className="react-calendar border-none shadow-none w-full"
              />
            </CardContent>
          </Card>

          {/* Today's Appointments */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-gray-900">
                Appointments for {format(date, "MMMM d, yyyy")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">{renderSchedule()}</div>
            </CardContent>
          </Card>
        </div>
      </div>

      <style jsx>{`
        .react-calendar {
          font-family: inherit;
        }
        .react-calendar button {
          font-family: inherit;
          font-size: 0.875rem;
        }
        .react-calendar__tile--active {
          background: #14b8a6 !important;
        }
        .react-calendar__tile--active:enabled:hover,
        .react-calendar__tile--active:enabled:focus {
          background: #0d9488 !important;
        }
        .has-appointments {
          background-color: #ccfbf1;
          color: #0d9488;
        }
        .cancelled-appointments {
          background-color: #fee2e2;
          color: #991b1b;
        }
        .mixed-appointments {
          background: linear-gradient(45deg, #ccfbf1 50%, #fee2e2 50%);
        }
        .react-calendar__tile:enabled:hover,
        .react-calendar__tile:enabled:focus {
          background-color: #f0fdfa;
        }
      `}</style>
    </div>
  );
};

export default DoctorSchedule;