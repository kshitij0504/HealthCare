import React from "react";
import { useNavigate } from "react-router-dom";

const AdminHealthCare = () => {
  const navigate = useNavigate();

  const handleNavigateToAddOrganization = () => {
    navigate("/healthcareservice");
  };

  return (
    <div className="admin-container">
      <h1 className="title">Admin Healthcare Management</h1>
      <button className="btn" onClick={handleNavigateToAddOrganization}>
        Add Doctor
      </button>
    </div>
  );
};

export default AdminHealthCare;
