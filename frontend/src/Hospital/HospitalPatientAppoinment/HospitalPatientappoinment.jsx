import React, { useState, useEffect } from "react";
import Sidebar from "../HospitalSidebar";
import PatientTable from "./HospitalPatientTable";
import PatientModal from "./HospitalPatientModel";
import axios from "axios";
import { Menu } from "lucide-react";
import { Card } from "@/components/ui/card";

const PatientDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [patients, setPatients] = useState([]);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          "http://localhost:5000/healthorg/getPatient",
          {
            withCredentials: true,
          }
        );
        setPatients(response.data.patients);
      } catch (error) {
        console.error("Error fetching patients:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPatients();
  }, []);

  const handleViewDetails = (patient) => {
    setSelectedPatient(patient);
    setIsViewModalOpen(true);
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const mainContentClass = `transition-all duration-300 ease-in-out ${
    isSidebarOpen ? "md:ml-64" : "md:ml-20"
  } flex-1 min-h-screen bg-gray-50`;

  return (
    <div className="flex h-screen bg-gray-50">
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <Sidebar
        isSidebarOpen={isSidebarOpen}
        isMobile={isMobile}
        toggleSidebar={toggleSidebar}
      />

      <div className={mainContentClass}>
        <div className="bg-white border-b sticky top-0 z-10">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 h-16">
                {isMobile && (
                  <button onClick={toggleSidebar} className="p-2 rounded-lg">
                    <Menu className="h-6 w-6 text-gray-600" />
                  </button>
                )}
                <h1 className="text-2xl font-semibold text-gray-800">
                  Appointment Management
                </h1>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          {isLoading ? (
            <div className="flex-1 min-h-screen bg-gray-50 flex justify-center items-center">
              <div className="text-lg text-gray-600">
                <div className="animate-pulse font-semibold text-xl mb-4">
                  Loading Appointments data...
                </div>
              </div>
            </div>
          ) : (
            <Card>
              <div className="p-4">
                <PatientTable
                  patients={patients}
                  handleViewDetails={handleViewDetails}
                  isLoading={isLoading}
                />
              </div>
            </Card>
          )}
        </div>

        <PatientModal
          isViewModalOpen={isViewModalOpen}
          selectedPatient={selectedPatient}
          setIsViewModalOpen={setIsViewModalOpen}
        />
      </div>
    </div>
  );
};

export default PatientDashboard;
