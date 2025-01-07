import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import { Eye, Plus } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Doctor = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [newDoctor, setNewDoctor] = useState({
    firstname: "",
    lastname: "",
    email: "",
    specialty: "",
    hospital: "",
  });

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/admin/doctor`, {
        withCredentials: true,
      });
      setDoctors(response.data);
    } catch (error) {
      setError("Failed to fetch doctors");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddDoctor = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/admin/doctor/add",
        newDoctor,
        { withCredentials: true }
      );
      setDoctors([...doctors, response.data]);
      setNewDoctor({
        firstname: "",
        lastname: "",
        email: "",
        specialty: "",
        hospital: "",
      });
      setDialogOpen(false);
    } catch (error) {
      setError("Failed to add doctor");
      console.error(error);
    }
  };

  const handleViewDetails = (doctor) => {
    setSelectedDoctor(doctor);
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="ml-64 p-8 w-full">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-teal-600">Doctors</h1>
        </div>

        {loading ? (
          <p>Loading doctors...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : (
          <div className="overflow-x-auto bg-white rounded-lg shadow-md p-4">
            <table className="min-w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-100 text-left text-teal-600 font-semibold">
                  <th className="px-4 py-2 border">Name</th>
                  <th className="px-4 py-2 border">Email</th>
                  <th className="px-4 py-2 border">Specialty</th>
                  <th className="px-4 py-2 border">Hospital</th>
                </tr>
              </thead>
              <tbody>
                {doctors.map((doctor, index) => (
                  <tr
                    key={doctor.id}
                    className={`${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } text-gray-700`}
                  >
                    <td className="px-4 py-2 border">
                      {doctor.firstname} {doctor.lastname}
                    </td>
                    <td className="px-4 py-2 border">{doctor.email}</td>
                    <td className="px-4 py-2 border">{doctor.specialty}</td>
                    <td className="px-6 py-4 border-b">
                      {doctor.organization?.name}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Doctor;
