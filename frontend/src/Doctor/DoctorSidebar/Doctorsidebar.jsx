import React from "react";
import { Link } from "react-router-dom";
import {
  Home,
  CalendarCheck,
  ClipboardList,
  FileClock,
  LogOut,
  X,
} from "lucide-react";
import logo from "../../../assets/CureNest_logo.svg"
const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const menuItems = [
    { icon: Home, label: "Dashboard", path: "/doctordash" },
    { icon: CalendarCheck, label: "Appointments", path: "/doctorapoinment" },
    { icon: ClipboardList, label: "Patient", path: "/doctor-patientlist" },
    { icon: FileClock, label: "Schedule", path: "/doctor-schedule" },
    { icon: LogOut, label: "LogOut", path: "/signin" },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen transition-transform duration-300 ease-in-out transform 
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 w-64 bg-white shadow-lg`}
      >
        <div className="h-full flex flex-col">
          <div className="h-20 border-b flex items-center justify-between px-4">
          <img
          src={logo}
          alt="Logo"
          className="h-50 w-100 object-contain"
        />
            <button
              onClick={() => setSidebarOpen(false)}
              className="md:hidden p-2 rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {menuItems.map((item, index) => (
              <Link
                to={item.path}
                key={index}
                onClick={() => window.innerWidth < 768 && setSidebarOpen(false)}
                className="flex items-center w-full px-4 py-3 rounded-lg text-left 
                  transition-all duration-200 hover:bg-teal-50 active:bg-teal-100 
                  group relative overflow-hidden"
              >
                <div
                  className="absolute left-0 top-0 h-full w-1 bg-teal-600 transform 
                  -translate-x-full group-hover:translate-x-0 transition-transform duration-200"
                />
                <item.icon
                  className="w-5 h-5 text-gray-500 group-hover:text-teal-600 
                  transition-colors duration-200 mr-3"
                />
                <span
                  className="text-gray-700 group-hover:text-teal-600 
                  transition-colors duration-200 font-medium"
                >
                  {item.label}
                </span>
              </Link>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
