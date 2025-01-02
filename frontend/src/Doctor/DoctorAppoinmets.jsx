import React from "react";

const AppointmentsTimeline = () => {
  const appointments = [
    {
      time: "09:00 AM",
      patient: "Sarah Johnson",
      type: "Check-up",
      status: "Confirmed",
    },
    {
      time: "10:30 AM",
      patient: "Mike Peters",
      type: "Follow-up",
      status: "In Progress",
    },
    {
      time: "02:00 PM",
      patient: "Emma Wilson",
      type: "Consultation",
      status: "Pending",
    },
  ];

  return (
    <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">
            Today's Appointments
          </h2>
          <button className="text-sm text-blue-600 hover:text-blue-700">
            View All
          </button>
        </div>
      </div>
      <div className="p-6">
        <div className="space-y-6">
          {appointments.map((appointment, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className="flex-none">
                <div className="text-sm font-medium text-gray-900">
                  {appointment.time}
                </div>
                <div className="mt-1 text-xs text-gray-500">
                  {appointment.type}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <img
                        src="/api/placeholder/40/40"
                        alt={appointment.patient}
                        className="w-10 h-10 rounded-xl"
                      />
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {appointment.patient}
                        </div>
                        <div className="mt-1 text-xs text-gray-500">
                          Patient ID: #12345
                        </div>
                      </div>
                    </div>
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        appointment.status === "Confirmed"
                          ? "bg-green-100 text-green-700"
                          : appointment.status === "In Progress"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      {appointment.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AppointmentsTimeline;
