import React, { useState, useEffect } from "react";
import Sidebar from "../PatientSidebar";
import HospitalCard from "./HospitalDoctorcard";
import HospitalDetails from "./HospitalDetailModel.jsx";
import { Menu } from "lucide-react";
import axios from "axios";

const DashboardLayout = () => {
  const [hospitals, setHospitals] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [hospitalDetails, setHospitalDetails] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/user/organizations"
        );
        setHospitals(response.data);
      } catch (error) {
        console.error("Error fetching hospitals:", error);
      }
    };
    fetchHospitals();
  }, []);

  const handleHospitalClick = async (hospitalId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/user/doctors/${hospitalId}`
      );
      const dataAsArray = Array.isArray(response.data)
        ? response.data
        : Object.values(response.data);
      setHospitalDetails(dataAsArray);
      setSelectedHospital(hospitalId);
    } catch (error) {
      console.error("Error fetching hospital details:", error);
    }
  };

  const handleBack = () => {
    setSelectedHospital(null);
    setHospitalDetails([]);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main Content */}
      <div className="lg:ml-64 flex-1">
        <header className="bg-white border-b flex items-center justify-between px-6 py-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 lg:hidden"
          >
            <Menu className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-semibold mb-9">Hospital Details</h1>
        </header>

        <main className="p-6">
          {!selectedHospital ? (
            <div className="grid grid-cols-1 gap-4">
              {hospitals.map((hospital) => (
                <HospitalCard
                  key={hospital.id}
                  hospital={hospital}
                  onClick={() => handleHospitalClick(hospital.id)}
                />
              ))}
            </div>
          ) : (
            <HospitalDetails
              hospitalDetails={hospitalDetails}
              onBack={handleBack}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
