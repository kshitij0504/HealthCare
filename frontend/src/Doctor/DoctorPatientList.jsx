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
  Users,
  Filter,
} from "lucide-react";
import Cookies from "js-cookie";
import axios from "axios";

const DoctorPatientList = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");

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
    const fetchPatients = async () => {
      try {
        const token = Cookies.get("token");
        const response = await axios.get(
          "http://localhost:5000/doctor/patients",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );
        setPatients(response.data.data || []);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || "An error occurred.");
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  const filteredPatients = patients
    .filter(
      (patient) =>
        patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "appointments")
        return b.numberOfAppointments - a.numberOfAppointments;
      return 0;
    });

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:sticky top-0 h-screen w-64 transform 
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 transition-transform duration-300 ease-in-out
          bg-white shadow-lg z-40`}
      >
        <div className="h-full flex flex-col">
          <div className="h-20 border-b flex items-center justify-between px-6">
            <span className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-teal-400 bg-clip-text text-transparent">
              CureNest
            </span>
            <button
              onClick={() => setSidebarOpen(false)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
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
                  className="absolute inset-y-0 left-0 w-1 bg-teal-600 rounded-r transform 
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
      <div className="flex-1">
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between p-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-lg md:hidden"
            >
              <Menu className="w-6 h-6 text-gray-500" />
            </button>
            <h1 className="text-2xl font-semibold text-gray-800 ml-3 mb-4 flex items-center">
              Patient List
            </h1>
          </div>
        </header>

        <main className="p-6">
          {loading ? (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="animate-pulse flex space-x-4">
                <div className="flex-1 space-y-4 py-1">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  </div>
                </div>
              </div>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-600">{error}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Search and Filter Bar */}
              <div className="bg-white rounded-lg shadow-sm p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search patients..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Filter className="w-5 h-5 text-gray-500" />
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    >
                      <option value="name">Sort by Name</option>
                      <option value="appointments">Sort by Appointments</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Patient List */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-gray-50 border-b">
                        <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                          Name
                        </th>
                        <th className="px-6 py-4 text-sm font-semibold text-gray-600 hidden sm:table-cell">
                          Email
                        </th>
                        <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                          Age
                        </th>
                        <th className="px-6 py-4 text-sm font-semibold text-gray-600 hidden lg:table-cell">
                          Appointments
                        </th>
                        <th className="px-6 py-4 text-sm font-semibold text-gray-600 hidden md:table-cell">
                          Contact
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredPatients.map((patient) => (
                        <tr
                          key={patient.id}
                          className="border-b last:border-b-0 hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-6 py-4">
                            <div className="font-medium text-gray-900">
                              {patient.name}
                            </div>
                          </td>
                          <td className="px-6 py-4 hidden sm:table-cell">
                            <div className="text-gray-600">{patient.email}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-gray-600">{patient.age}</div>
                          </td>
                          <td className="px-6 py-4 hidden lg:table-cell">
                            <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-teal-100 text-teal-800">
                              {patient.numberOfAppointments}
                            </div>
                          </td>
                          <td className="px-6 py-4 hidden md:table-cell">
                            <div className="text-gray-600">
                              {patient.contact}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile View */}
                <div className="md:hidden">
                  {filteredPatients.map((patient) => (
                    <div
                      key={patient.id}
                      className="p-4 border-b last:border-b-0 hover:bg-gray-50"
                    >
                      <div className="font-medium text-gray-900">
                        {patient.name}
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        Age: {patient.age}
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        {patient.email}
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        Phone: {patient.contact}
                      </div>
                      <div className="mt-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-100 text-teal-800">
                          {patient.numberOfAppointments} appointments
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default DoctorPatientList;
