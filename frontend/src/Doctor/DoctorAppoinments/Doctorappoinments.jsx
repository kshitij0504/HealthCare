import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Menu,
  Home,
  CalendarCheck,
  ClipboardList,
  FileClock,
  LogOut,
  X,
  Search,
  Calendar,
  Clock,
} from "lucide-react";
import Cookies from "js-cookie";
import axios from "axios";

const DoctorAppointment = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const menuItems = [
    { icon: Home, label: "Dashboard", path: "/doctordash" },
    { icon: CalendarCheck, label: "Appointments", path: "/doctorapoinment" },
    { icon: ClipboardList, label: "Patient", path: "/doctor-patientlist" },
    { icon: FileClock, label: "Records", path: "/doctor-patient-records" },
    { icon: LogOut, label: "LogOut", path: "/signin" },
  ];

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = Cookies.get("token");
        const response = await axios.get(
          "http://localhost:5000/doctor/appointments",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );
        setAppointments(response.data.data || []);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || "An error occurred.");
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const getStatusColor = (status) => {
    const statusColors = {
      completed: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      cancelled: "bg-red-100 text-red-800",
      scheduled: "bg-blue-100 text-blue-800",
    };
    return statusColors[status?.toLowerCase()] || "bg-gray-100 text-gray-800";
  };

  const filteredAppointments = appointments.filter(
    (app) =>
      app.patientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.patientEmail?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-40 w-64 transform 
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 transition-transform duration-300 ease-in-out
          bg-white shadow-lg`}
      >
        <div className="h-full flex flex-col">
          <div className="h-20 border-b flex items-center justify-between px-4">
            <span className="text-2xl font-bold text-teal-600">CureNest</span>
            <button
              onClick={() => setSidebarOpen(false)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                onClick={() => window.innerWidth < 768 && setSidebarOpen(false)}
                className="flex items-center w-full px-4 py-3 rounded-lg
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

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 space-y-2 sm:space-y-0">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2 rounded-lg hover:bg-gray-100 md:hidden"
                aria-label="Toggle Sidebar"
              >
                <Menu className="w-6 h-6 text-gray-500" />
              </button>
              <h1 className="text-2xl font-semibold text-gray-800 ml-2 mb-4">
                Today's Appointments
              </h1>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search appointments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent w-full sm:w-64"
              />
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="animate-pulse space-y-4">
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-600">{error}</p>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b">
                      <th className="py-4 px-6 text-sm font-semibold text-gray-600">
                        Patient Name
                      </th>
                      <th className="py-4 px-6 text-sm font-semibold text-gray-600 hidden sm:table-cell">
                        Patient Email
                      </th>
                      <th className="py-4 px-6 text-sm font-semibold text-gray-600">
                        Date
                      </th>
                      <th className="py-4 px-6 text-sm font-semibold text-gray-600 hidden md:table-cell">
                        Time
                      </th>
                      <th className="py-4 px-6 text-sm font-semibold text-gray-600">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAppointments.map((app) => (
                      <tr
                        key={app.id}
                        className="border-b hover:bg-gray-50 transition-colors"
                      >
                        <td className="py-4 px-6">
                          <div className="font-medium text-gray-900">
                            {app.patientName}
                          </div>
                        </td>
                        <td className="py-4 px-6 hidden sm:table-cell">
                          <div className="text-gray-600">
                            {app.patientEmail}
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center text-gray-600">
                            <Calendar className="w-4 h-4 mr-2" />
                            {new Date(app.appointmentDate).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="py-4 px-6 hidden md:table-cell">
                          <div className="flex items-center text-gray-600">
                            <Clock className="w-4 h-4 mr-2" />
                            {app.appointmentTime}
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                              app.status
                            )}`}
                          >
                            {app.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile View */}
              <div className="md:hidden">
                {filteredAppointments.map((app) => (
                  <div
                    key={app.id}
                    className="p-4 border-b last:border-b-0 space-y-2"
                  >
                    <div className="font-medium text-gray-900">
                      {app.patientName}
                    </div>
                    <div className="text-sm text-gray-600">
                      {app.patientEmail}
                    </div>
                    <div className="flex items-center text-sm text-gray-600 space-x-4">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(app.appointmentDate).toLocaleDateString()}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {app.appointmentTime}
                      </div>
                    </div>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                        app.status
                      )}`}
                    >
                      {app.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default DoctorAppointment;
