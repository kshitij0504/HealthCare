import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import { Edit, Trash2, Eye } from 'lucide-react';

const Hospital = () => {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch hospital data from backend
    const fetchHospitals = async () => {
      try {
        const response = await axios.get("http://localhost:5000/admin/org",{
          withCredentials: true,
        });
        console.log(response.data)
        setHospitals(response.data.data);
      } catch (error) {
        setError("Failed to fetch hospital data");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchHospitals();
  }, []);

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="ml-64 p-8 w-full">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-black">Hospitals</h1>
          <button
            className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-all"
          >
            Add Organization
          </button>
        </div>

        {loading ? (
          <p>Loading hospitals...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : (
          <div className="overflow-x-auto bg-white rounded-lg shadow-md p-4">
            <table className="min-w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-100 text-left text-teal-600 font-semibold">
                  <th className="px-4 py-2 border">Name</th>
                  <th className="px-4 py-2 border">Location</th>
                  <th className="px-4 py-2 border">Doctors</th>
                  <th className="px-4 py-2 border">Patients</th>
                  <th className="px-4 py-2 border">Rating</th>
                  <th className="px-4 py-2 border">View</th>
                  <th className="px-4 py-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {hospitals.map((hospital, index) => (
                  <tr
                    key={hospital.id}
                    className={`${
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                    } text-gray-700`}
                  >
                    <td className="px-4 py-2 border">{hospital.name}</td>
                    <td className="px-4 py-2 border">{hospital.address}</td>
                    <td className="px-4 py-2 border">{hospital._count.doctors}</td>
                    <td className="px-4 py-2 border">{hospital.patients}</td>
                    <td className="px-4 py-2 border">{hospital.rating}/5.0</td>
                    <td className="px-4 py-2 border">
                      <button
                        className="text-teal-600 hover:underline"
                        onClick={() => console.log(`Viewing details for ${hospital.name}`)}
                      >
                        <Eye className="h-5 w-5" />
                      </button>
                    </td>
                    <td className="px-4 py-2 border">
                      <div className="flex space-x-2">
                        <button className="text-teal-600 hover:underline">
                          <Edit className="h-5 w-5" />
                        </button>
                        <button className="text-red-600 hover:underline">
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
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

export default Hospital;