import React, { useState, useEffect } from "react";
import Sidebar from "../HospitalSidebar";
import PatientTable from "./HospitalPatientTable";
import PatientModal from "./HospitalPatientModel";

const PatientDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [patients, setPatients] = useState([]);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  useEffect(() => {
    const fetchPatients = async () => {
      const response = await fetch("/api/patients"); 
      const data = await response.json();
      setPatients(data);
    };
    fetchPatients();
  }, []);

  const handleViewDetails = (patient) => {
    setSelectedPatient(patient);
    setIsViewModalOpen(true);
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        isMobile={isMobile}
        toggleSidebar={toggleSidebar}
      />
      <div className="flex-1 ml-64 p-8">
        <PatientTable
          patients={patients}
          handleViewDetails={handleViewDetails}
        />
      </div>
      <PatientModal
        isViewModalOpen={isViewModalOpen}
        selectedPatient={selectedPatient}
        setIsViewModalOpen={setIsViewModalOpen}
      />
    </div>
  );
};

export default PatientDashboard;
