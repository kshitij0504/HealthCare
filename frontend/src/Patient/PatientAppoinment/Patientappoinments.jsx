import React, { useState } from "react";
import Sidebar from "../PatientSidebar";
import AppointmentsList from "./PatientAppoinmentList";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        isModalOpen={isModalOpen}
      />

      <div className="lg:ml-64 transition-margin duration-200 ease-in-out">
        <header className="bg-white border-b">
          <div className="flex items-center justify-between px-6 py-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 lg:hidden"
            >
              {/* <Search className="w-6 h-6" /> */}
            </button>
          </div>
        </header>

        <main className="p-6">
          <AppointmentsList />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
