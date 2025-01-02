import React, { useState } from "react";
import { ChevronLeft } from "lucide-react";
import Sidebar from "../Doctorsidebar";
import { useLocation } from "react-router-dom";

const DoctorPatientList = () => {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("patients");
  const location = useLocation();

  const patients = [
    {
      id: 1,
      name: "John Doe",
      age: 45,
      condition: "Hypertension",
      lastVisit: "2024-12-28",
    },
    {
      id: 2,
      name: "Jane Smith",
      age: 32,
      condition: "Diabetes",
      lastVisit: "2024-12-29",
    },
    {
      id: 3,
      name: "Mike Johnson",
      age: 28,
      condition: "Asthma",
      lastVisit: "2024-12-30",
    },
  ];

  const PatientDetails = ({ patient, onBack }) => (
    <div className="p-6">
      <button
        onClick={onBack}
        className="mb-4 flex items-center text-blue-600 hover:text-blue-800"
      >
        <ChevronLeft className="w-4 h-4 mr-1" />
        Back to Patient List
      </button>
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">{patient.name}</h2>
        <div className="space-y-4">
          <div>
            <p className="font-semibold">Age</p>
            <p>{patient.age}</p>
          </div>
          <div>
            <p className="font-semibold">Medical Condition</p>
            <p>{patient.condition}</p>
          </div>
          <div>
            <p className="font-semibold">Last Visit</p>
            <p>{patient.lastVisit}</p>
          </div>
        </div>
      </div>
    </div>
  );

  const PatientList = ({ patients, onSelectPatient }) => (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Patient List</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Age</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Condition
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Last Visit
              </th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr
                key={patient.id}
                onClick={() => onSelectPatient(patient)}
                className="border-t hover:bg-gray-50 cursor-pointer"
              >
                <td className="px-6 py-4">{patient.name}</td>
                <td className="px-6 py-4">{patient.age}</td>
                <td className="px-6 py-4">{patient.condition}</td>
                <td className="px-6 py-4">{patient.lastVisit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setSidebarOpen={setSidebarOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        location={location}
      />
      <div
        className={`${
          isSidebarOpen ? "ml-64" : "ml-20"
        } transition-all duration-300`}
      >
        {selectedPatient ? (
          <PatientDetails
            patient={selectedPatient}
            onBack={() => setSelectedPatient(null)}
          />
        ) : (
          <PatientList
            patients={patients}
            onSelectPatient={setSelectedPatient}
          />
        )}
      </div>
    </div>
  );
};

export default DoctorPatientList;
