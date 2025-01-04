import React, { useState } from "react";
import { Plus } from "lucide-react";
import Sidebar from "../DoctorSidebar/Doctorsidebar";
import { useLocation } from "react-router-dom";

const DoctorPatientRecords = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("records");
  const [showForm, setShowForm] = useState(false);
  const [records, setRecords] = useState([
    {
      id: 1,
      date: "2024-01-01",
      bloodPressure: "120/80",
      heartRate: 72,
      glucose: 95,
      calories: 2000,
      sleepHours: 7,
      steps: 8000,
      bmi: 22.5,
      temperature: 98.6,
    },
  ]);
  const location = useLocation();

  const RecordForm = ({ onSave }) => {
    const [formData, setFormData] = useState({
      bloodPressure: "",
      heartRate: "",
      glucose: "",
      calories: "",
      sleepHours: "",
      steps: "",
      bmi: "",
      temperature: "",
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      onSave({
        id: Date.now(),
        date: new Date().toISOString().split("T")[0],
        ...formData,
      });
    };

    return (
      <div className="bg-white rounded-lg p-6 shadow">
        <h2 className="text-xl font-bold mb-4">Add New Record</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {Object.keys(formData).map((key) => (
              <div key={key}>
                <label className="block text-sm font-medium mb-1">
                  {key.charAt(0).toUpperCase() +
                    key.slice(1).replace(/([A-Z])/g, " $1")}
                </label>
                <input
                  type={
                    key === "bmi" || key === "temperature" ? "number" : "text"
                  }
                  className="w-full p-2 border rounded"
                  placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                  value={formData[key]}
                  onChange={(e) =>
                    setFormData({ ...formData, [key]: e.target.value })
                  }
                />
              </div>
            ))}
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Save Record
            </button>
          </div>
        </form>
      </div>
    );
  };

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
        } transition-all duration-300 p-6`}
      >
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Patient Records</h1>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus size={20} className="mr-2" />
            Add Record
          </button>
        </div>

        {showForm ? (
          <RecordForm
            onSave={(newRecord) => {
              setRecords([newRecord, ...records]);
              setShowForm(false);
            }}
          />
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50">
                  {[
                    "id",
                    "Date",
                    "Blood Pressure",
                    "Heart Rate",
                    "Glucose",
                    "Calories",
                    "Sleep",
                    "Steps",
                    "BMI",
                    "Temperature",
                  ].map((header) => (
                    <th
                      key={header}
                      className="px-6 py-3 text-left text-sm font-semibold"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {records.map((record) => (
                  <tr key={record.id} className="border-t hover:bg-gray-50">
                    {Object.values(record).map((value, index) => (
                      <td key={index} className="px-6 py-4">
                        {value}
                      </td>
                    ))}
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

export default DoctorPatientRecords;
