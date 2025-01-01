import React from "react";
import { Link } from "react-router-dom";
import {
  ChevronRight,
  ChevronLeft,
  Home,
  Calendar,
  Users,
  Activity,
  DollarSign,
  LogOut,
} from "lucide-react";

const Sidebar = ({ isSidebarOpen, toggleSidebar, isMobile }) => {
  const menuItems = [
    { icon: Home, label: "Dashboard", path: "/hospitaldash" },
    {
      icon: Calendar,
      label: "Appointments",
      path: "/hospital-patient-appoinment",
    },
    { icon: Activity, label: "Doctors", path: "/hospital-doctorlist" },
    { icon: Users, label: "Patients", path: "/hospital-patientlist" },
    { icon: LogOut, label: "LogOut", path: "/signin" },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 z-40 h-screen bg-white border-r transition-all duration-300 ease-in-out ${
        isSidebarOpen ? "w-64" : "w-20"
      } ${isMobile && !isSidebarOpen ? "-translate-x-full" : "translate-x-0"}`}
    >
      <div className="h-full flex flex-col">
        <div
          className={`flex items-center h-16 px-4 border-b ${
            isSidebarOpen ? "justify-between" : "justify-center"
          }`}
        >
          {isSidebarOpen ? (
            <>
              <span className="text-xl font-bold text-blue-600">MedFlex</span>
              {!isMobile && (
                <button
                  onClick={toggleSidebar}
                  className="p-2 rounded-lg hover:bg-gray-100 text-gray-500"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              )}
            </>
          ) : (
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-lg hover:bg-gray-100 text-gray-500"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {menuItems.map((item, index) => (
            <Link key={index} to={item.path}>
              <button
                className={`flex items-center w-full rounded-lg text-left transition-colors ${
                  isSidebarOpen ? "px-4 py-3" : "p-3 justify-center"
                }`}
              >
                <item.icon
                  className={`w-5 h-5 ${isSidebarOpen ? "mr-3" : ""}`}
                />
                {isSidebarOpen && <span>{item.label}</span>}
              </button>
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
