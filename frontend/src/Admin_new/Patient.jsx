import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { Edit, Trash2, Eye } from 'lucide-react';

const Patient = () => {
  const [patients, setPatients] = useState([
    {
      id: 1,
      name: 'John Doe',
      age: 35,
      gender: 'Male',
      condition: 'Hypertension',
      contact: '+1 123 456 7890',
    },
    {
      id: 2,
      name: 'Jane Smith',
      age: 28,
      gender: 'Female',
      condition: 'Diabetes',
      contact: '+1 987 654 3210',
    },
  ]);

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="ml-64 p-8 w-full">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-teal-600">Patients</h1>
        </div>

        {/* Patient Table */}
        <div className="overflow-x-auto bg-white rounded-lg shadow-md p-4">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left text-teal-600 font-semibold">
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Age</th>
                <th className="px-4 py-2 border">Gender</th>
                <th className="px-4 py-2 border">Condition</th>
                <th className="px-4 py-2 border">Contact</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient, index) => (
                <tr
                  key={patient.id}
                  className={`${
                    index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                  } text-gray-700`}
                >
                  <td className="px-4 py-2 border">{patient.name}</td>
                  <td className="px-4 py-2 border">{patient.age}</td>
                  <td className="px-4 py-2 border">{patient.gender}</td>
                  <td className="px-4 py-2 border">{patient.condition}</td>
                  <td className="px-4 py-2 border">{patient.contact}</td>
                  <td className="px-4 py-2 border">
                    <div className="flex space-x-2">
                      <button
                        className="text-teal-600 hover:underline"
                        onClick={() => console.log(`Viewing ${patient.name}`)}
                      >
                        <Eye className="h-5 w-5" />
                      </button>
                      <button
                        className="text-teal-600 hover:underline"
                        onClick={() => console.log(`Editing ${patient.name}`)}
                      >
                        <Edit className="h-5 w-5" />
                      </button>
                      <button
                        className="text-red-600 hover:underline"
                        onClick={() =>
                          setPatients((prev) =>
                            prev.filter((p) => p.id !== patient.id)
                          )
                        }
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

export default Patient;
