import React from "react";

const PatientTable = ({ patients, handleViewDetails }) => {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      <div className="flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle">
            <table className="min-w-full divide-y divide-gray-300 shadow-sm rounded-lg">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">
                    Patient Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">
                    DOB
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">
                    Consulting Doctor
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">
                    Department
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">
                    Appointment Time
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {patients.map((patient) => (
                  <tr
                    key={patient.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-700">
                      {patient.name}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-700">
                      {patient.DOB}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-700">
                      {patient.doctor.name}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-700">
                      {patient.doctor.department}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-700">
                      {patient.time}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm">
                      <button
                        onClick={() => handleViewDetails(patient)}
                        className="text-blue-600 hover:text-blue-900 focus:outline-none"
                        aria-label="View Details"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientTable;
