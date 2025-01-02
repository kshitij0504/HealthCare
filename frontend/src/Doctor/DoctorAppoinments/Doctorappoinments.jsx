import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Calendar,
  Clock,
  Phone,
  Mail,
  MapPin,
  Search,
  Filter,
  Plus,
} from "lucide-react";
import Sidebar from "../Doctorsidebar";

const PatientAppointments = () => {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("appointments");
  const location = useLocation();

  const appointments = [
    {
      id: 1,
      name: "John Smith",
      date: "2025-01-15",
      time: "09:00 AM",
      type: "Check-up",
      status: "Scheduled",
      email: "john.smith@email.com",
      phone: "(555) 123-4567",
      address: "123 Main St, City, State",
      age: 45,
      lastVisit: "2024-12-01",
      medicalHistory: "Hypertension, Diabetes",
      upcomingVisits: 2,
    },
    {
      id: 2,
      name: "Sarah Johnson",
      date: "2025-01-15",
      time: "10:30 AM",
      type: "Follow-up",
      status: "Confirmed",
      email: "sarah.j@email.com",
      phone: "(555) 987-6543",
      address: "456 Oak Ave, City, State",
      age: 32,
      lastVisit: "2024-12-15",
      medicalHistory: "Asthma",
      upcomingVisits: 1,
    },
  ];

  const filteredAppointments = appointments.filter((appointment) =>
    appointment.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex min-h-screen">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setSidebarOpen={setSidebarOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        location={location}
      />
      <div
        className={`flex-1 ${
          isSidebarOpen ? "ml-64" : "ml-20"
        } p-6 transition-all duration-300`}
      >
        <div className="bg-white">
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Patient Appointments
                </h2>
                <p className="text-gray-500">Manage your daily appointments</p>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Patient Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAppointments.map((appointment) => (
                  <tr
                    key={appointment.id}
                    className="hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => setSelectedPatient(appointment)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">
                        {appointment.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {appointment.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {appointment.time}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {appointment.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium
                        ${
                          appointment.status === "Confirmed"
                            ? "bg-green-100 text-green-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {appointment.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {selectedPatient && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold">
                    Patient Details: {selectedPatient.name}
                  </h3>
                  <button
                    onClick={() => setSelectedPatient(null)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-gray-500" />
                    <span>{selectedPatient.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-gray-500" />
                    <span>{selectedPatient.phone}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-gray-500" />
                    <span>{selectedPatient.address}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-gray-500" />
                    <span>{selectedPatient.date}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-gray-500" />
                    <span>{selectedPatient.time}</span>
                  </div>
                  <div className="border-t pt-4 mt-4">
                    <h4 className="font-semibold mb-3">Medical Information</h4>
                    <div className="space-y-2 text-sm">
                      <p>Age: {selectedPatient.age} years</p>
                      <p>Last Visit: {selectedPatient.lastVisit}</p>
                      <p>Medical History: {selectedPatient.medicalHistory}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientAppointments;
