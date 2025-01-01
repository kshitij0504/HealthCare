import React from "react";
import { useNavigate } from "react-router-dom";

const SidebarLink = ({ icon: Icon, label, path, active }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (path) navigate(path);
  };

  return (
    <button
      onClick={handleClick}
      className={`flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-blue-50 transition-colors ${
        active ? "text-blue-600 bg-blue-50" : "text-gray-600"
      }`}
    >
      <Icon className="w-5 h-5" />
      <span className="font-medium">{label}</span>
    </button>
  );
};

export default SidebarLink;
