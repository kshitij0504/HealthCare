import React from "react";
import { X } from "lucide-react";

const AppointmentModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl shadow-lg">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">Book an Appointment</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <form className="space-y-4">
            <div>
              <label className="block mb-1">
                Patient Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Patient Name :"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block mb-1">Departments</label>
                <select className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Eye Care</option>
                  <option>Cardiology</option>
                  <option>Orthopedics</option>
                  <option>Neurology</option>
                  <option>General Medicine</option>
                  <option>Pediatrics</option>
                </select>
              </div>
              <div>
                <label className="block mb-1">Doctor</label>
                <select className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Dr. Calvin Carlo</option>
                  <option>Dr. Samantha Brown</option>
                  <option>Dr. Michael Lee</option>
                  <option>Dr. Emily Davis</option>
                  <option>Dr. Richard Kim</option>
                  <option>Dr. Sarah Johnson</option>
                </select>
              </div>

              <div>
                <label className="block mb-1">Appointment Type</label>
                <select className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Regular Checkup</option>
                  <option>New Patient</option>
                  <option>Follow-up</option>
                  <option>Surgery Consultation</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block mb-1">
                  Your Phone <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  placeholder="Your Phone :"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block mb-1">Date :</label>
                <input
                  type="date"
                  min={new Date().toISOString().split("T")[0]}
                  placeholder="dd-mm-yyyy"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block mb-1">Time :</label>
                <input
                  type="time"
                  placeholder="03:30 PM"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div>
              <label className="block mb-1">Comments</label>
              <textarea
                placeholder="Your Message :"
                rows={4}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              Book An Appointment
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AppointmentModal;
