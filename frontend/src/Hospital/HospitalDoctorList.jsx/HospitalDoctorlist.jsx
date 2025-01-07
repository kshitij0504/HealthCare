// import React, { useState, useEffect } from "react";
// import { Menu, Plus, X, UserX } from "lucide-react";
// import Sidebar from "../HospitalSidebar";
// import { Card } from "@/components/ui/card";
// import axios from "axios";
// import AddDoctor from "./AddDoctor";

// const DoctorDashboard = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const [isMobile, setIsMobile] = useState(false);
//   const [selectedDepartment, setSelectedDepartment] = useState("");
//   const [selectedDoctor, setSelectedDoctor] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [showAddDoctor, setShowAddDoctor] = useState(false);
//   const [doctors, setDoctors] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth < 768);
//       if (window.innerWidth < 768) {
//         setIsSidebarOpen(false);
//       }
//     };

//     window.addEventListener("resize", handleResize);
//     handleResize();

//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   useEffect(() => {
//     fetchDoctors();
//   }, []);

//   const fetchDoctors = async () => {
//     try {
//       setIsLoading(true);
//       const response = await axios.get(
//         "http://localhost:5000/healthorg/getDoctor",
//         {
//           withCredentials: true,
//         }
//       );
//       setDoctors(response.data.doctors || []);
//     } catch (error) {
//       console.error("Error fetching doctors:", error);
//       setDoctors([]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const filteredDoctors = Array.isArray(doctors)
//     ? selectedDepartment
//       ? doctors.filter((doctor) => doctor.specialty === selectedDepartment)
//       : doctors
//     : [];

//   const EmptyState = () => (
//     <div className="flex flex-col items-center justify-center h-64 text-center">
//       <UserX className="w-16 h-16 text-gray-400 mb-4" />
//       <h3 className="text-xl font-semibold text-gray-700 mb-2">
//         No Doctors Available
//       </h3>
//       <p className="text-gray-500 max-w-md">
//         There are currently no doctors registered in the organization. New
//         doctors can be added through the registration system.
//       </p>
//     </div>
//   );

//   const DoctorModal = ({ doctor, onClose }) => {
//     if (!doctor) return null;

//     return (
//       <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
//         <Card className="bg-white max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//           <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
//             <h2 className="text-xl font-semibold">Doctor Details</h2>
//             <button
//               onClick={onClose}
//               className="p-2 hover:bg-gray-100 rounded-full"
//             >
//               <X className="w-5 h-5" />
//             </button>
//           </div>

//           <div className="p-6">
//             <div className="flex flex-col md:flex-row gap-6">
//               <img
//                 src={doctor.photo || "/api/placeholder/128/128"}
//                 alt={`${doctor.firstname} ${doctor.lastname}`}
//                 className="w-32 h-32 rounded-lg object-cover"
//               />

//               <div className="flex-1">
//                 <h3 className="text-2xl font-semibold mb-2">
//                   {`${doctor.firstname} ${doctor.lastname}`}
//                 </h3>
//                 <p className="text-gray-600 mb-2">{doctor.specialty}</p>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <span className="font-medium">Email:</span> {doctor.email}
//                   </div>
//                   <div>
//                     <span className="font-medium">Contact:</span>{" "}
//                     {doctor.contact}
//                   </div>
//                   <div>
//                     <span className="font-medium">Qualifications:</span>{" "}
//                     {doctor.qualifications}
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="mt-6 space-y-4">
//               <div>
//                 <h4 className="font-semibold mb-2">About</h4>
//                 <p className="text-gray-600">{doctor.bio}</p>
//               </div>

//               <div>
//                 <h4 className="font-semibold mb-2">Additional Information</h4>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <span className="font-medium">Age:</span> {doctor.age}
//                   </div>
//                   <div>
//                     <span className="font-medium">Blood Group:</span>{" "}
//                     {doctor.BloodGroup}
//                   </div>
//                   <div>
//                     <span className="font-medium">Gender:</span> {doctor.gender}
//                   </div>
//                   <div>
//                     <span className="font-medium">Access ID:</span>{" "}
//                     {doctor.accessId}
//                   </div>
//                 </div>
//               </div>

//               <div>
//                 <h4 className="font-semibold mb-2">Address</h4>
//                 <p className="text-gray-600">
//                   {doctor.address}, {doctor.postalcode}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </Card>
//       </div>
//     );
//   };

//   const mainContentClass = `
//     transition-all duration-300 ease-in-out
//     ${isSidebarOpen ? "md:ml-64" : "md:ml-20"}
//     flex-1 min-h-screen bg-gray-50
//   `;

//   return (
//     <div className="flex h-screen bg-gray-50">
//       {isMobile && isSidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 z-30"
//           onClick={() => setIsSidebarOpen(false)}
//         />
//       )}

//       <Sidebar
//         isSidebarOpen={isSidebarOpen}
//         isMobile={isMobile}
//         toggleSidebar={toggleSidebar}
//       />

//       <div className={mainContentClass}>
//         <div className="bg-white border-b sticky top-0 z-10">
//           <div className="px-6 py-4">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-4 h-16">
//                 {isMobile && (
//                   <button
//                     onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//                     className="p-2 rounded-lg"
//                   >
//                     <Menu className="h-6 w-6 text-gray-600" />
//                   </button>
//                 )}
//                 <h1 className="text-2xl font-semibold text-gray-800">
//                   Doctor Management
//                 </h1>
//               </div>
//               <button
//                 onClick={() => setShowAddDoctor(true)}
//                 className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
//               >
//                 <Plus className="h-5 w-5" />
//                 Add Doctor
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="p-6">
//           {isLoading ? (
//             <div className="flex justify-center items-center h-64">
//               <div className="text-gray-500">Loading doctors...</div>
//             </div>
//           ) : filteredDoctors.length === 0 ? (
//             <EmptyState />
//           ) : (
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//               {filteredDoctors.map((doctor) => (
//                 <Card
//                   key={doctor.id}
//                   className="cursor-pointer hover:shadow-md transition-shadow duration-300"
//                   onClick={() => {
//                     setSelectedDoctor(doctor);
//                     setIsModalOpen(true);
//                   }}
//                 >
//                   <div className="p-6">
//                     <div className="flex flex-col items-center">
//                       <img
//                         src={doctor.photo || "/api/placeholder/96/96"}
//                         alt={doctor.name}
//                         className="w-24 h-24 rounded-full object-cover mb-4"
//                       />
//                       <h3 className="text-lg font-semibold text-center mb-1">
//                         {doctor.firstname} {doctor.lastname}
//                       </h3>
//                       <p className="text-teal-600 text-sm mb-2">
//                         {doctor.specialty}
//                       </p>
//                       <p className="text-gray-600 text-sm">{doctor.contact}</p>
//                     </div>
//                   </div>
//                 </Card>
//               ))}
//             </div>
//           )}
//         </div>

//         {isModalOpen && (
//           <DoctorModal
//             doctor={selectedDoctor}
//             onClose={() => {
//               setIsModalOpen(false);
//               setSelectedDoctor(null);
//             }}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default DoctorDashboard;
import React, { useState, useEffect } from "react";
import { Menu, Plus, X, UserX } from "lucide-react";
import Sidebar from "../HospitalSidebar";
import { Card } from "@/components/ui/card";
import axios from "axios";
import AddDoctor from "./AddDoctor";

const DoctorDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAddDoctor, setShowAddDoctor] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        "http://localhost:5000/healthorg/getDoctor",
        {
          withCredentials: true,
        }
      );
      setDoctors(response.data.doctors || []);
    } catch (error) {
      console.error("Error fetching doctors:", error);
      setDoctors([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddDoctorSuccess = () => {
    fetchDoctors();
    setShowAddDoctor(false);
  };

  const filteredDoctors = Array.isArray(doctors)
    ? selectedDepartment
      ? doctors.filter((doctor) => doctor.specialty === selectedDepartment)
      : doctors
    : [];

  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center h-64 text-center">
      <UserX className="w-16 h-16 text-gray-400 mb-4" />
      <h3 className="text-xl font-semibold text-gray-700 mb-2">No Doctors Available</h3>
      <p className="text-gray-500 max-w-md">
        There are currently no doctors registered in the organization. New doctors can be added through the registration system.
      </p>
    </div>
  );

  const DoctorModal = ({ doctor, onClose }) => {
    if (!doctor) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <Card className="bg-white max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold">Doctor Details</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <img
                src={doctor.photo || "/api/placeholder/128/128"}
                alt={`${doctor.firstname} ${doctor.lastname}`}
                className="w-32 h-32 rounded-lg object-cover"
              />

              <div className="flex-1">
                <h3 className="text-2xl font-semibold mb-2">
                  {`${doctor.firstname} ${doctor.lastname}`}
                </h3>
                <p className="text-gray-600 mb-2">{doctor.specialty}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="font-medium">Email:</span> {doctor.email}
                  </div>
                  <div>
                    <span className="font-medium">Contact:</span> {doctor.contact}
                  </div>
                  <div>
                  <span className="font-medium">Qualifications:</span>{" "}
                    {doctor.qualifications}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div>
                <h4 className="font-semibold mb-2">About</h4>
                <p className="text-gray-600">{doctor.bio}</p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Additional Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="font-medium">Age:</span> {doctor.age}
                  </div>
                  <div>
                    <span className="font-medium">Blood Group:</span>{" "}
                    {doctor.BloodGroup}
                  </div>
                  <div>
                    <span className="font-medium">Gender:</span> {doctor.gender}
                  </div>
                  <div>
                    <span className="font-medium">Access ID:</span>{" "}
                    {doctor.accessId}
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Address</h4>
                <p className="text-gray-600">
                  {doctor.address}, {doctor.postalcode}
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    );
  };

  const mainContentClass = `
    transition-all duration-300 ease-in-out
    ${isSidebarOpen ? "md:ml-64" : "md:ml-20"}
    flex-1 min-h-screen bg-gray-50
  `;

  return (
    <div className="flex h-screen bg-gray-50">
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <Sidebar
        isSidebarOpen={isSidebarOpen}
        isMobile={isMobile}
        toggleSidebar={toggleSidebar}
      />

      <div className={mainContentClass}>
        <div className="bg-white border-b sticky top-0 z-10">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 h-16">
                {isMobile && (
                  <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="p-2 rounded-lg"
                  >
                    <Menu className="h-6 w-6 text-gray-600" />
                  </button>
                )}
                <h1 className="text-2xl font-semibold text-gray-800">
                  Doctor Management
                </h1>
              </div>
              <button
                onClick={() => setShowAddDoctor(true)}
                className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
              >
                <Plus className="h-5 w-5" />
                Add Doctor
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6">
          {showAddDoctor ? (
            <div className="max-w-4xl mx-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Add New Doctor</h2>
                <button
                  onClick={() => setShowAddDoctor(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <AddDoctor onSuccess={handleAddDoctorSuccess} />
            </div>
          ) : isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="text-gray-500">Loading doctors...</div>
            </div>
          ) : filteredDoctors.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredDoctors.map((doctor) => (
                <Card
                  key={doctor.id}
                  className="cursor-pointer hover:shadow-md transition-shadow duration-300"
                  onClick={() => {
                    setSelectedDoctor(doctor);
                    setIsModalOpen(true);
                  }}
                >
                  <div className="p-6">
                    <div className="flex flex-col items-center">
                      <img
                        src={doctor.photo || "/api/placeholder/96/96"}
                        alt={doctor.name}
                        className="w-24 h-24 rounded-full object-cover mb-4"
                      />
                      <h3 className="text-lg font-semibold text-center mb-1">
                        {doctor.firstname} {doctor.lastname}
                      </h3>
                      <p className="text-teal-600 text-sm mb-2">
                        {doctor.specialty}
                      </p>
                      <p className="text-gray-600 text-sm">{doctor.contact}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        {isModalOpen && (
          <DoctorModal
            doctor={selectedDoctor}
            onClose={() => {
              setIsModalOpen(false);
              setSelectedDoctor(null);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default DoctorDashboard;