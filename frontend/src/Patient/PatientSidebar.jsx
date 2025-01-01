import React from "react";
import { useNavigate } from "react-router-dom";
import SidebarLink from "./PatientSidebarLink"
import { BarChart, Calendar, Bed, MapPin, User, LogOut } from "lucide-react";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate();

  return (
    <div
      className={`fixed top-0 left-0 bottom-0 w-64 bg-white border-r transform transition-transform duration-200 ease-in-out z-30 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      }`}
    >
      <div className="flex items-center space-x-3 px-6 py-4 border-b">
        <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
          <span className="text-white font-bold">P</span>
        </div>
        <span className="text-xl font-semibold">Patient</span>
      </div>

      <nav className="p-4 space-y-1">
        <SidebarLink
          icon={BarChart}
          label="Dashboard"
          path="/patientdash"
          active
        />
        <SidebarLink
          icon={Calendar}
          label="Appointments"
          path="/patient-appointments"
        />
        <SidebarLink icon={Bed} label="Hospitals" path="/hospital-card" />
        <SidebarLink
          icon={MapPin}
          label="Find Hospitals"
          path="/find-hospitals"
        />
        <SidebarLink icon={User} label="Profile" path="/patientprofile" />
        <SidebarLink icon={LogOut} label="Sign Out" path="/signin" />
      </nav>
    </div>
  );
};

export default Sidebar;
