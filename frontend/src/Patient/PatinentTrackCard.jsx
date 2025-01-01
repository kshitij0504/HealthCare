import React from "react";

const TrackerCard = ({ icon: Icon, title, value, source, progress }) => (
  <div className="bg-white rounded-xl p-6 shadow-sm">
    <div className="flex items-center space-x-2 mb-4">
      <div
        className={`p-2 rounded-lg ${
          title === "Blood Pressure"
            ? "bg-purple-50"
            : title === "Heart Rate"
            ? "bg-blue-50"
            : title === "Blood Glucose"
            ? "bg-yellow-50"
            : title === "Calories (Burned)"
            ? "bg-pink-50"
            : title === "Sleep"
            ? "bg-green-50"
            : title === "Steps"
            ? "bg-orange-50"
            : title === "BMI"
            ? "bg-red-50"
            : "bg-blue-50"
        }`}
      >
        <Icon className="w-5 h-5 text-gray-600" />
      </div>
      <h3 className="text-gray-600">{title}</h3>
    </div>
    <div className="flex justify-between items-end">
      <div>
        <p className="text-2xl font-semibold">{value}</p>
        {progress && (
          <div className="w-32 h-1 bg-gray-100 rounded-full mt-2">
            <div
              className="h-full bg-gray-300 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>
      <div className="flex items-center text-xs text-gray-400">
        <img src="/api/placeholder/16/16" alt={source} className="mr-1" />
        {source}
      </div>
    </div>
  </div>
);

export default TrackerCard;
