import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar"; // Import Sidebar
import AppointmentCard from "./AppointmentCard"; // Import AppointmentCard
import { Search, Plus } from "lucide-react";

const PatientList = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsOpen(window.innerWidth >= 768);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const appointments = [
    {
      id: 1,
      patientName: "Howard Tanner",
      phone: "(+452) 8945-4568",
      address: "1451 ABC Street, New York, NY",
      gender: "Male",
      doctor: "Dr. Sarah Smith",
      specialty: "Cardiology",
      appointmentDate: "Dec 30, 2024",
      time: "11:00 AM",
      status: "Confirmed",
      avatar: "/api/placeholder/40/40",
    },
    {
      id: 2,
      patientName: "Alice Johnson",
      phone: "(+452) 8975-1234",
      address: "7890 XYZ Avenue, Los Angeles, CA",
      gender: "Female",
      doctor: "Dr. Michael Chen",
      specialty: "Neurology",
      appointmentDate: "Dec 31, 2024",
      time: "2:00 PM",
      status: "Pending",
      avatar: "/api/placeholder/40/40",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar
        isSidebarOpen={isOpen}
        toggleSidebar={() => setIsOpen(!isOpen)}
        isMobile={isMobile}
      />
      <div className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 ml-20 md:ml-64">
        <div className="px-4 py-6 md:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Appointments</h1>
              <p className="text-sm text-gray-500">
                Manage your patient appointments
              </p>
            </div>
            <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              New Appointment
            </button>
          </div>

          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search appointments..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {appointments.map((appointment) => (
              <AppointmentCard key={appointment.id} appointment={appointment} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientList;
