import React, { useState } from "react";
import AppointmentsList from "./PatientAppoinmentList";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="lg:ml-64 transition-margin duration-200 ease-in-out">
        <header className="bg-white border-b h-24 p-8">
          <div className="flex items-center justify-end lg:justify-start gap-4 mb-6">
            <h2 className="text-xl lg:text-2xl font-bold text-gray-800">
              My Appointments
            </h2>
          </div>
        </header>
        <main className="p-5">
          <AppointmentsList />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
