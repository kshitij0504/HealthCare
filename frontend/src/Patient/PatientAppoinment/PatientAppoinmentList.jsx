import React, { useState } from "react";
import { Search } from "lucide-react";
import AppointmentModal from "../BookAppoinment/Bookappoinment";

const AppointmentsList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);

  const appointments = [
    {
      id: 1,
      doctorName: "Dr. Michael Chen",
      department: "Cardiology",
      date: "25 Dec 2024",
      time: "09:00 AM",
      status: "Scheduled",
      type: "Regular Checkup",
    },
    {
      id: 2,
      doctorName: "Dr. Emily White",
      department: "Neurology",
      date: "25 Dec 2024",
      time: "10:30 AM",
      status: "Confirmed",
      type: "Follow-up",
    },
    {
      id: 3,
      doctorName: "Dr. James Wilson",
      department: "Pediatrics",
      date: "25 Dec 2024",
      time: "02:00 PM",
      status: "Pending",
      type: "New Patient",
    },
    {
      id: 4,
      doctorName: "Dr. Sarah Lee",
      department: "Orthopedics",
      date: "25 Dec 2024",
      time: "03:30 PM",
      status: "Scheduled",
      type: "Surgery Consultation",
    },
  ];

  const getStatusColor = (status) => {
    const colors = {
      Scheduled: "bg-blue-100 text-blue-600",
      Confirmed: "bg-green-100 text-green-600",
      Pending: "bg-yellow-100 text-yellow-600",
    };
    return colors[status] || "bg-gray-100 text-gray-600";
  };

  const filteredAppointments = appointments.filter((appointment) =>
    appointment.doctorName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search by Doctor..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="py-4 px-6 text-left">Doctor</th>
              <th className="py-4 px-6 text-left">Department</th>
              <th className="py-4 px-6 text-left">Date & Time</th>
              <th className="py-4 px-6 text-left">Type</th>
              <th className="py-4 px-6 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.map((appointment) => (
              <tr key={appointment.id} className="border-b hover:bg-gray-50">
                <td className="py-4 px-6">{appointment.doctorName}</td>
                <td className="py-4 px-6">{appointment.department}</td>
                <td className="py-4 px-6">
                  <div className="flex flex-col">
                    <span>{appointment.date}</span>
                    <span className="text-sm text-gray-500">
                      {appointment.time}
                    </span>
                  </div>
                </td>
                <td className="py-4 px-6">{appointment.type}</td>
                <td className="py-4 px-6">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${getStatusColor(
                      appointment.status
                    )}`}
                  >
                    {appointment.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showModal && <AppointmentModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default AppointmentsList;
