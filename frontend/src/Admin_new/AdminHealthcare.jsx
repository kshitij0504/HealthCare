// import React, { useState, useEffect } from "react";
// // import addOrganization from "../Services/HealthCareService.jsx";
// // import approveOrganization from "../Services/HealthCareService.jsx";
// import  addDoctor from "../Services/DoctorService.jsx";
// import getDoctors from "../Services/DoctorService.jsx";
// import HealthCareService from "../Services/HealthCareService.jsx";

// // Now you can access the functions as:
// const { addOrganization, approveOrganization } = HealthCareService;

// const AdminHealthCare = () => {
//   const [organizations, setOrganizations] = useState([]);
//   const [newOrg, setNewOrg] = useState({ name: "", address: "", contact: "", services: "",email:"",password:"" });
//   const [doctors, setDoctors] = useState([]);
//   const [newDoctor, setNewDoctor] = useState({name:"",
//     specialty:"",
//     qualifications:"",
//     availability:"",
//     contact:"",
//     organizationId:"",});

//   const fetchDoctors = async (orgId) => {
//     const response = await getDoctors(orgId);
//     setDoctors(response.data);
//   };

//   const handleOrgSubmit = async (e) => {
//     e.preventDefault();
//    const response= await addOrganization(newOrg);
//     alert("Organization added successfully!",response);
//   };

//   const handleApproveOrg = async (orgId) => {
//     await approveOrganization(orgId);
//     alert("Organization approved!");
//   };

//   const handleAddDoctor = async (e) => {
//     e.preventDefault();
//     await addDoctor(newDoctor);
//     alert("Doctor added successfully!");
//   };

//   return (
//     <div className="admin-container">
//       <h1 className="title">Admin Healthcare Management</h1>
      
//       {/* Add Organization Section */}
//       <div className="section">
//         <h2>Add Organization</h2>
//         <form className="form" onSubmit={handleOrgSubmit}>
//           <input
//             type="text"
//             placeholder="Name"
//             value={newOrg.name}
//             onChange={(e) => setNewOrg({ ...newOrg, name: e.target.value })}
//             required
//           />
//           <input
//             type="text"
//             placeholder="email"
//             value={newOrg.email}
//             onChange={(e) => setNewOrg({ ...newOrg, email: e.target.value })}
//             required
//           />
          
//           <input
//             type="text"
//             placeholder="password"
//             value={newOrg.password}
//             onChange={(e) => setNewOrg({ ...newOrg, password: e.target.value })}
//             required
//           />
//           <input
//             type="text"
//             placeholder="Address"
//             value={newOrg.address}
//             onChange={(e) => setNewOrg({ ...newOrg, address: e.target.value })}
//             required
//           />
//           <input
//             type="text"
//             placeholder="Contact"
//             value={newOrg.contact}
//             onChange={(e) => setNewOrg({ ...newOrg, contact: e.target.value })}
//             required
//           />
//           <input
//             type="text"
//             placeholder="Services"
//             value={newOrg.services}
//             onChange={(e) => setNewOrg({ ...newOrg, services: e.target.value })}
//             required
//           />
//           <button type="submit" className="btn">Add Organization</button>
//         </form>
//       </div>

//       {/* Approve Organization Section */}
//       <div className="section">
//         <h2>Pending Organizations</h2>
//         {organizations.length > 0 ? (
//           organizations.map((org) => (
//             <div key={org.id} className="organization">
//               <p>{org.name}</p>
//               <button
//                 className="btn approve-btn"
//                 onClick={() => handleApproveOrg(org.id)}
//               >
//                 Approve
//               </button>
//             </div>
//           ))
//         ) : (
//           <p>No pending organizations.</p>
//         )}
//       </div>

//       {/* Add Doctor Section */}
//       <div className="section">
//         <h2>Add Doctor</h2>
//         <form className="form" onSubmit={handleAddDoctor}>
//           <input
//             type="text"
//             placeholder="Doctor Name"
//             value={newDoctor.name}
//             onChange={(e) => setNewDoctor({ ...newDoctor, name: e.target.value })}
//             required
//           />
//           <input
//             type="text"
//             placeholder="Specialty"
//             value={newDoctor.specialty}
//             onChange={(e) => setNewDoctor({ ...newDoctor, specialty: e.target.value })}
//             required
//           />
//           <input
//             type="text"
//             placeholder="Contact"
//             value={newDoctor.contact}
//             onChange={(e) => setNewDoctor({ ...newDoctor, contact: e.target.value })}
//             required
//           />
//           <button type="submit" className="btn">Add Doctor</button>
//         </form>
//       </div>

//       {/* Doctor List Section */}
//       <div className="section">
//         <h2>Doctors</h2>
//         {doctors.length > 0 ? (
//           doctors.map((doc) => (
//             <div key={doc.id} className="doctor">
//               <p>{doc.name}</p>
//               <p>{doc.specialty}</p>
//             </div>
//           ))
//         ) : (
//           <p>No doctors available.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminHealthCare;
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
