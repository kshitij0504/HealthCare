import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Sidebar from "./DoctorSidebar/Doctorsidebar";

const DoctorSchedule = () => {
  const [date, setDate] = useState(new Date());
  const visits = [
    {
      time: "12:00 - 12:45",
      patient: "Olivia Wild",
    },
    {
      time: "14:00 - 14:45",
      patient: "Osip Mandelstam",
    },
    {
      time: "15:00 - 15:45",
      patient: "Jennifer Parkins",
    },
  ];

  const renderSchedule = () => {
    return visits.map((visit, index) => (
      <li
        key={index}
        className="flex justify-between items-center p-3 bg-gray-100 rounded-md shadow-sm mb-3"
      >
        <span className="font-medium text-gray-800">{visit.time}</span>
        <span className="text-gray-600">{visit.patient}</span>
      </li>
    ));
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 p-6 bg-gray-50 min-h-screen">
      {/* Today's Visits */}
      <div className="md:w-1/3 w-full bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Today's Visits
        </h2>
        <ul>{renderSchedule()}</ul>
      </div>

      {/* Calendar */}
      <div className="md:w-2/3 w-full bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Schedule</h2>
        <Calendar
          onChange={setDate}
          value={date}
          tileContent={({ date }) =>
            date.getDay() === 5 ? (
              <div className="text-xs text-white bg-pink-500 rounded-full py-1 px-2 mx-auto text-center">
                Visits
              </div>
            ) : null
          }
          className="react-calendar"
        />
      </div>
    </div>
  );
};

export default DoctorSchedule;
