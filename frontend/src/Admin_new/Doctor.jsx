// src/components/Doctor.jsx
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { Eye, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Doctor = () => {
  // Example data for doctors and their hospitals
  const [doctors, setDoctors] = useState([
    {
      id: 1,
      name: 'Dr. John Smith',
      specialty: 'Cardiology',
      hospital: 'City Hospital',
    },
    {
      id: 2,
      name: 'Dr. Jane Doe',
      specialty: 'Neurology',
      hospital: 'Green Valley Hospital',
    },
    {
      id: 3,
      name: 'Dr. Emily Johnson',
      specialty: 'Pediatrics',
      hospital: 'Sunrise Medical Center',
    },
    // Add more doctor entries as needed
  ]);

  // Handler for deleting a doctor
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this doctor?')) {
      setDoctors(doctors.filter((doctor) => doctor.id !== id));
    }
  };

  // Handler for viewing doctor details (Placeholder)
  const handleView = (doctor) => {
    // Implement your view logic here (e.g., navigate to a detail page or open a modal)
    alert(`Viewing details for ${doctor.name}`);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="ml-64 p-8 w-full bg-gray-50 min-h-screen">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-teal-600">Doctor List</h1>
          <Button
            className="flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-all"
            onClick={() => alert('Add Doctor functionality coming soon!')}
          >
            {/* You can replace the alert with navigation to an Add Doctor form or open a modal */}
            Add Doctor
          </Button>
        </div>

        {/* Doctor Table */}
        <div className="overflow-x-auto bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-teal-100">
                <th className="px-6 py-3 text-left text-gray-600 font-medium">#</th>
                <th className="px-6 py-3 text-left text-gray-600 font-medium">Doctor Name</th>
                <th className="px-6 py-3 text-left text-gray-600 font-medium">Specialty</th>
                <th className="px-6 py-3 text-left text-gray-600 font-medium">Hospital Name</th>
                <th className="px-6 py-3 text-left text-gray-600 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {doctors.map((doctor, index) => (
                <tr
                  key={doctor.id}
                  className={`${
                    index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                  } hover:bg-teal-50 transition-colors`}
                >
                  <td className="px-6 py-4 border-b">{index + 1}</td>
                  <td className="px-6 py-4 border-b">{doctor.name}</td>
                  <td className="px-6 py-4 border-b">{doctor.specialty}</td>
                  <td className="px-6 py-4 border-b">{doctor.hospital}</td>
                  <td className="px-6 py-4 border-b">
                    <div className="flex items-center space-x-4">
                      <button
                        className="text-teal-600 hover:text-teal-800"
                        onClick={() => handleView(doctor)}
                        title="View Details"
                      >
                        <Eye className="h-5 w-5" />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-800"
                        onClick={() => handleDelete(doctor.id)}
                        title="Delete Doctor"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Doctor;
