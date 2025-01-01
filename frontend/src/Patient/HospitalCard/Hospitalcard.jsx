import React, { useState } from "react";
import Sidebar from "../PatientSidebar";
import DoctorCard from "./HospitalDoctorcard";
import AppointmentModal from "../BookAppoinment/Bookappoinment";
import { Menu } from "lucide-react";

const DashboardLayout = () => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const doctors = [
    {
      name: "Dr. Peter Doe",
      degrees: "BDS, MDS",
      consultationFee: "58",
      speciality: "Orthodontist",
      rating: "4.7",
      experience: "13+ Years",
      location: "Boston",
    },
    {
      name: "Dr. Sarah William",
      degrees: "BDS, MDS",
      consultationFee: "100",
      speciality: "Orthodontist",
      rating: "4.7",
      experience: "8+ Years",
      location: "Boston",
    },
  ];

  const handleBookAppointment = (doctor) => {
    setSelectedDoctor(doctor);
  };

  const closeModal = () => {
    setSelectedDoctor(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main Content */}
      <div className="lg:ml-64 flex-1">
        <header className="bg-white border-b flex items-center justify-between px-6 py-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 lg:hidden"
          >
            <Menu className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-semibold">Welcome to Dashboard</h1>
        </header>

        <main className="p-6">
          <div className="space-y-4">
            {doctors.map((doctor) => (
              <DoctorCard
                key={doctor.name}
                doctor={doctor}
                onBookAppointment={handleBookAppointment}
              />
            ))}
          </div>
        </main>

        {selectedDoctor && <AppointmentModal onClose={closeModal} />}
      </div>
    </div>
  );
};

export default DashboardLayout;
