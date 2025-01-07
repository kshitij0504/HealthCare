import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar.jsx";
import axios from "axios";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const Patient = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [newPatient, setNewPatient] = useState({
    name: "",
    email: "",
    gender: "",
    age: "",
    contact: "",
  });

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/admin/users`, {
          withCredentials: true,
        });
        setPatients(response.data);
      } catch (err) {
        setError("Failed to fetch patients");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  return (
    <div className="flex">
      <Sidebar />

      <div className="ml-64 p-8 w-full">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-teal-600">Patients</h1>
        </div>

        {loading ? (
          <p>Loading patients...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : (
          <div className="overflow-x-auto bg-white rounded-lg shadow-md p-4">
            <table className="min-w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-100 text-left text-teal-600 font-semibold">
                  <th className="px-4 py-2 border">Name</th>
                  <th className="px-4 py-2 border">Email</th>
                  <th className="px-4 py-2 border">Gender</th>
                  <th className="px-4 py-2 border">Age</th>
                  <th className="px-4 py-2 border">Contact</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((patient, index) => (
                  <tr
                    key={patient.id}
                    className={`${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } text-gray-700`}
                  >
                    <td className="px-4 py-2 border">{patient.username}</td>
                    <td className="px-4 py-2 border">{patient.email}</td>
                    <td className="px-4 py-2 border">{patient.gender}</td>
                    <td className="px-4 py-2 border">{patient.age}</td>
                    <td className="px-4 py-2 border">{patient.contact}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <Dialog
          open={selectedPatient !== null}
          onOpenChange={() => setSelectedPatient(null)}
        >
          <DialogContent className="sm:max-w-[800px]">
            <DialogHeader>
              <DialogTitle>{selectedPatient?.name}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <p>
                <strong>Email:</strong> {selectedPatient?.email}
              </p>
              <p>
                <strong>Contact:</strong> {selectedPatient?.contact}
              </p>
              <p>
                <strong>Gender:</strong> {selectedPatient?.gender}
              </p>
              <p>
                <strong>Age:</strong> {selectedPatient?.age}
              </p>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Patient;
