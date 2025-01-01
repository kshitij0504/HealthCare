import React from "react";
import { X } from "lucide-react";

const PatientModal = ({
  isViewModalOpen,
  selectedPatient,
  setIsViewModalOpen,
}) => {
  if (!isViewModalOpen || !selectedPatient) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div
          className="fixed inset-0 bg-black bg-opacity-30"
          onClick={() => setIsViewModalOpen(false)}
        />
        <div className="relative bg-white rounded-lg shadow-lg max-w-md w-full">
          <div className="flex justify-between items-center p-4 border-b">
            <h3 className="text-xl font-semibold">Appointment Detail</h3>
            <button
              onClick={() => setIsViewModalOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="p-6">
            <div className="flex items-center mb-6">
              <div>
                <p className="text-lg font-semibold">{selectedPatient.name}</p>
                <p className="text-sm text-gray-500">
                  DOB: {selectedPatient.DOB}
                </p>
                <p className="text-sm text-gray-500">
                  Disease: {selectedPatient.disease}
                </p>
                <p className="text-sm text-gray-500">
                  Doctor: {selectedPatient.doctor.name}
                </p>
                <p className="text-sm text-gray-500">
                  Department: {selectedPatient.doctor.department}
                </p>
                <p className="text-sm text-gray-500">
                  Appointment Time: {selectedPatient.time}
                </p>
                <p className="text-sm text-gray-500">
                  Blood Group: {selectedPatient.bloodGroup}
                </p>
                <p className="text-sm text-gray-500">
                  Phone: {selectedPatient.phone}
                </p>
                <p className="text-sm text-gray-500">
                  Address: {selectedPatient.address}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientModal;
