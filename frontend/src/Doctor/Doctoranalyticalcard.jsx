import React from "react";
import { DollarSign, Calendar, TrendingUp, Users } from "lucide-react";

const AnalyticsCard = ({ key, data }) => {
  const getIcon = () => {
    if (key === "patients") return <Users size={24} />;
    if (key === "revenue") return <DollarSign size={24} />;
    if (key === "appointments") return <Calendar size={24} />;
    return <TrendingUp size={24} />;
  };
  if (!data) {
    return <div>Loading...</div>;
  }
  return (
    <div className="p-6 bg-white rounded-xl border border-gray-100 hover:border-blue-200 transition-colors">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-gray-500 capitalize">{key}</p>
          <h3 className="text-2xl font-bold text-gray-900">{data.count}</h3>
        </div>
        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-blue-100 text-blue-600">
          {getIcon()}
        </div>
      </div>
      <div className="mt-4 flex items-center space-x-2">
        <span
          className={`text-sm font-medium ${
            data.trend.startsWith("+") ? "text-green-600" : "text-red-600"
          }`}
        >
          {data.trend}
        </span>
        <span className="text-sm text-gray-500">{data.period}</span>
      </div>
    </div>
  );
};

export default AnalyticsCard;
