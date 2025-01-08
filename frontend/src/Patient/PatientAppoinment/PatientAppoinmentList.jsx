import React, { useEffect, useState } from "react";
import {
  Calendar,
  Clock,
  UserRound,
  Building2,
  Menu,
} from "lucide-react";
import AppointmentModal from "./AppointmentModal";
import { useSelector } from "react-redux";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import Sidebar from "../PatientSidebar";

const AppointmentsList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { currentUser } = useSelector((state) => state.user || {});
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const getStatusColor = (status) => {
    const colors = {
      Scheduled: "bg-teal-100 text-teal-600",
      Confirmed: "bg-emerald-100 text-emerald-600",
      Pending: "bg-amber-100 text-amber-600",
      Cancelled: "bg-red-100 text-red-600",
    };
    return colors[status] || "bg-gray-100 text-gray-600";
  };

  const getFilteredAppointments = () => {
    if (!Array.isArray(appointments)) return [];
    return appointments.filter((appointment) =>
      appointment?.doctorName?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const handleAddAppointment = (newAppointment) => {
    setAppointments((prev) =>
      Array.isArray(prev) ? [...prev, newAppointment] : [newAppointment]
    );
    setShowModal(false);
  };

  const getAppointment = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/user/appointment/${currentUser.data.user.id}`,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setAppointments(
        Array.isArray(response.data.data) ? response.data.data : []
      );
    } catch (error) {
      console.error("Error fetching appointments:", error);
      setAppointments([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAppointment();
  }, []);

  const filteredAppointments = getFilteredAppointments();

  return (
    <div className="min-h-screen bg-gray-50">
      <div
        id="sidebar"
        className={`fixed top-0 left-0 h-full z-30 w-64 bg-white shadow-md transition-transform duration-300 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      </div>
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {!sidebarOpen && (
        <button
          className="fixed top-4 left-4 z-40 p-4 rounded-md lg:hidden"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu className="w-6 h-6" />
        </button>
      )}

      <Card className="bg-white shadow-lg">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <h2 className="text-2xl font-bold text-gray-800"></h2>
            <button
              onClick={() => setShowModal(true)}
              className="bg-teal-500 hover:bg-teal-600  text-white px-6 py-2 rounded-lg shadow-md transition-colors duration-200"
            >
              Add Appointment
            </button>
          </div>

          {isLoading ? (
            <div className="text-center py-10 text-gray-500">
              Loading appointments...
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredAppointments.map((appointment) => (
                <div
                  key={appointment._id}
                  className="border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200 bg-white"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <UserRound className="w-5 h-5 text-teal-500" />
                    <h3 className="font-semibold text-gray-800">
                      {appointment.doctorName}
                    </h3>
                  </div>

                  <div className="space-y-2 text-gray-600">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-teal-500" />
                      <span>{appointment.organizationName}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-teal-500" />
                      <span>{formatDate(appointment.date)}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-teal-500" />
                      <span>{formatTime(appointment.startTime)}</span>
                    </div>
                  </div>

                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      {appointment.type}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                        appointment.status
                      )}`}
                    >
                      {appointment.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!isLoading && filteredAppointments.length === 0 && (
            <div className="text-center py-10 text-gray-500">
              No appointments found.
            </div>
          )}
        </CardContent>
      </Card>

      {showModal && (
        <AppointmentModal
          onClose={() => setShowModal(false)}
          onAddAppointment={handleAddAppointment}
        />
      )}
    </div>
  );
};

export default AppointmentsList;
