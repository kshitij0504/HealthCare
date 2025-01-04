import React from "react";
import { Link } from "react-router-dom";
import { BarChart, Calendar, Bed, MapPin, User, LogOut } from "lucide-react";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const menuItems = [
    { icon: BarChart, label: "Dashboard", path: "/patientdash" },
    { icon: Calendar, label: "Appointments", path: "/patient-appointments" },
    { icon: Bed, label: "Hospitals", path: "/hospital-card" },
    { icon: MapPin, label: "Find Hospitals", path: "/map" },
    { icon: User, label: "Profile", path: "/patientprofile" },
    { icon: LogOut, label: "Sign Out", path: "/signin" },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 z-40 h-screen w-64 bg-white shadow-lg transform transition-transform duration-200 ease-in-out z-30 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      }`}
    >
      <div className="h-24 border-b flex items-center justify-center">
        <img
          src="../../../assets/CureNest_logo.svg"
          alt="Logo"
          className="h-16 w-48 object-contain"
        />
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item, index) => (
          <Link key={index} to={item.path}>
            <button
              className="flex items-center w-full px-4 py-3 rounded-lg text-left 
              transition-all duration-200 hover:bg-teal-50 active:bg-teal-100 
              group relative overflow-hidden"
            >
              <div
                className="absolute left-0 top-0 h-full w-1 bg-teal-600 transform 
                -translate-x-full group-hover:translate-x-0 transition-transform duration-200"
              />
              <item.icon className="w-5 h-5 text-gray-500 group-hover:text-teal-600 
              transition-colors duration-200 mr-3" />
              <span className="text-gray-700 group-hover:text-teal-600 
              transition-colors duration-200 font-medium">
                {item.label}
              </span>
            </button>
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
