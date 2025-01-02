import React from "react";
import { Link } from "react-router-dom";
import {
  Activity,
  Calendar,
  Users,
  FileText,
  BarChart3,
  User,
  Menu,
  X,
  Home,
} from "lucide-react";

const Sidebar = ({
  isSidebarOpen,
  setSidebarOpen,
  activeTab,
  setActiveTab,
  location,
}) => {
  const navItems = [
    {
      icon: <Home size={20} />,
      text: "Dashboard",
      id: "dashboard",
      path: "/doctordash",
    },
    {
      icon: <Calendar size={20} />,
      text: "Appointments",
      id: "appointments",
      path: "/doctor-appointments",
      badge: "3",
    },
    {
      icon: <Users size={20} />,
      text: "Patients",
      id: "patients",
      path: "/doctor-patientlist",
    },
    {
      icon: <FileText size={20} />,
      text: "Medical Records",
      id: "records",
      path: "/doctor-patient-records",
    },
    {
      icon: <BarChart3 size={20} />,
      text: "Analytics",
      id: "analytics",
      path: "/doctor-patient-analytics",
    },
    {
      icon: <User size={20} />,
      text: "Profile",
      id: "profile",
      path: "/doctor-profile",
    },
  ];

  return (
    <div
      className={`${
        isSidebarOpen ? "w-64" : "w-20"
      } h-full bg-white shadow-xl fixed top-0 left-0 transition-all duration-300 ease-in-out z-30`}
    >
      <div
        className={`h-20 flex items-center justify-between ${
          isSidebarOpen ? "px-6" : "px-4"
        } border-b border-gray-200`}
      >
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-600">
            <Activity className="text-white" size={24} />
          </div>
          <span
            className={`font-bold text-xl transition-opacity duration-300 ${
              !isSidebarOpen ? "opacity-0" : "opacity-100"
            }`}
          >
            MedCare
          </span>
        </div>
        <button
          onClick={() => setSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <nav className="px-4 py-6">
        <div className="space-y-6">
          <div>
            <div
              className={`px-4 mb-3 text-xs font-semibold text-gray-400 uppercase ${
                !isSidebarOpen && "hidden"
              }`}
            >
              Main
            </div>
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.id}>
                  <Link
                    to={item.path}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex items-center w-full px-4 py-3 rounded-xl transition-all duration-300 ${
                      location.pathname === item.path
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {item.icon}
                    {isSidebarOpen && (
                      <div className="flex items-center justify-between w-full ml-3">
                        <span>{item.text}</span>
                        {item.badge && (
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-600">
                            {item.badge}
                          </span>
                        )}
                      </div>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
