import React, { useState, useEffect } from "react";
import {
  Eye,
  X,
  ChevronRight,
  ChevronLeft,
  Menu,
  Home,
  Calendar,
  Users,
  Activity,
  LogOut,
} from "lucide-react";
import { Link } from "react-router-dom";

const PatientDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  // Adjusting for mobile screen resizing
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

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Sample patient data (expanded to 8 patients)
  const patients = [
    {
      id: "001",
      name: "Deena Cooley",
      DOB: "03/05/2005",
      doctor: { name: "Vicki Walsh", department: "Surgeon" },
      date: "05/23/2024",
      time: "9:30AM",
      disease: "Diabetes",
      bloodGroup: "A+",
      address: "123 Main St, City",
      phone: "(555) 123-4567",
    },
    {
      id: "002",
      name: "John Doe",
      DOB: "12/11/1980",
      doctor: { name: "Sarah Brown", department: "Cardiology" },
      date: "06/20/2024",
      time: "10:00AM",
      disease: "Heart Disease",
      bloodGroup: "B-",
      address: "456 Oak St, Town",
      phone: "(555) 234-5678",
    },
    {
      id: "003",
      name: "Alice Johnson",
      DOB: "01/15/1992",
      doctor: { name: "Michael Lee", department: "Neurology" },
      date: "07/11/2024",
      time: "11:30AM",
      disease: "Migraine",
      bloodGroup: "O+",
      address: "789 Pine St, Village",
      phone: "(555) 345-6789",
    },
    {
      id: "004",
      name: "James Smith",
      DOB: "04/22/1995",
      doctor: { name: "Emily Davis", department: "Orthopedics" },
      date: "08/18/2024",
      time: "12:00PM",
      disease: "Fracture",
      bloodGroup: "AB+",
      address: "101 Maple St, Suburb",
      phone: "(555) 456-7890",
    },
    {
      id: "005",
      name: "Lisa Green",
      DOB: "10/03/1985",
      doctor: { name: "David Evans", department: "Pediatrics" },
      date: "09/12/2024",
      time: "1:30PM",
      disease: "Asthma",
      bloodGroup: "A-",
      address: "102 Birch St, City",
      phone: "(555) 567-8901",
    },
    {
      id: "006",
      name: "Michael Brown",
      DOB: "03/22/1990",
      doctor: { name: "Rachel Turner", department: "Dermatology" },
      date: "10/15/2024",
      time: "2:00PM",
      disease: "Skin Rash",
      bloodGroup: "O-",
      address: "203 Elm St, Town",
      phone: "(555) 678-9012",
    },
    {
      id: "007",
      name: "Sophia Harris",
      DOB: "07/19/1982",
      doctor: { name: "Joshua Clark", department: "Gastroenterology" },
      date: "11/25/2024",
      time: "3:30PM",
      disease: "Acid Reflux",
      bloodGroup: "B+",
      address: "304 Cedar St, Village",
      phone: "(555) 789-0123",
    },
    {
      id: "008",
      name: "Daniel Wilson",
      DOB: "05/29/1978",
      doctor: { name: "Laura White", department: "Endocrinology" },
      date: "12/05/2024",
      time: "4:00PM",
      disease: "Thyroid Issues",
      bloodGroup: "AB-",
      address: "405 Pine St, Suburb",
      phone: "(555) 890-1234",
    },
  ];

  // Sidebar menu items
  const menuItems = [
    { icon: Home, label: "Dashboard", path: "/admindash" },
    {
      icon: Calendar,
      label: "Appointments",
      path: "/admin-patient-appointments",
    },
    { icon: Activity, label: "Doctors", path: "/admin-doctors" },
    { icon: Users, label: "Patients", path: "/admin-patients" },
    { icon: LogOut, label: "LogOut", path: "/signin" },
  ];

  const handleViewDetails = (patient) => {
    setSelectedPatient(patient);
    setIsViewModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Backdrop */}
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen bg-white border-r transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "w-64" : "w-20"
        } ${
          isMobile && !isSidebarOpen ? "-translate-x-full" : "translate-x-0"
        }`}
      >
        <div className="h-full flex flex-col">
          <div
            className={`flex items-center h-16 px-4 border-b ${
              isSidebarOpen ? "justify-between" : "justify-center"
            }`}
          >
            {isSidebarOpen ? (
              <>
                <span className="text-xl font-bold text-blue-600">MedFlex</span>
                {!isMobile && (
                  <button
                    onClick={toggleSidebar}
                    className="p-2 rounded-lg hover:bg-gray-100 text-gray-500"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                )}
              </>
            ) : (
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-lg hover:bg-gray-100 text-gray-500"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
          </div>
          <nav className="flex-1 px-3 py-4 space-y-1">
            {menuItems.map((item, index) => (
              <Link key={index} to={item.path}>
                <button
                  className={`flex items-center w-full rounded-lg text-left transition-colors ${
                    isSidebarOpen ? "px-4 py-3" : "p-3 justify-center"
                  }`}
                >
                  <item.icon
                    className={`w-5 h-5 ${isSidebarOpen ? "mr-3" : ""}`}
                  />
                  {isSidebarOpen && <span>{item.label}</span>}
                </button>
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div
        className={`transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "md:ml-64" : "md:ml-20"
        }`}
      >
        {/* Top Navigation */}
        <nav className="bg-white border-b px-4 py-3">
          <div className="flex items-center justify-between">
            {isMobile && (
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-lg hover:bg-gray-100"
              >
                <Menu className="w-6 h-6" />
              </button>
            )}
            <h1 className="text-xl font-semibold text-gray-800 mb-3">
              Patient Appointments
            </h1>
          </div>
        </nav>

        {/* Patient Table */}
        <div className="px-4 sm:px-6 lg:px-8 py-8">
          <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle">
                <table className="min-w-full divide-y divide-x divide-gray-300">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">
                        #
                      </th>
                      <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Patient Name
                      </th>
                      <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        DOB
                      </th>
                      <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Consulting Doctor
                      </th>
                      <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Department
                      </th>
                      <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Appointment Time
                      </th>
                      <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {patients.map((patient) => (
                      <tr key={patient.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">
                          {patient.id}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {patient.name}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {patient.DOB}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {patient.doctor.name}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {patient.doctor.department}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {patient.time}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm font-medium">
                          <button
                            onClick={() => handleViewDetails(patient)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* View Details Modal */}
      {isViewModalOpen && selectedPatient && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-4">
            <div
              className="fixed inset-0 bg-black bg-opacity-30"
              onClick={() => setIsViewModalOpen(false)}
            />

            <div className="relative bg-white rounded-lg shadow-lg max-w-md w-full">
              {/* Modal Header */}
              <div className="flex justify-between items-center p-4 border-b">
                <h3 className="text-xl font-semibold">Appointment Detail</h3>
                <button
                  onClick={() => setIsViewModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Patient Info */}
              <div className="p-6">
                <div className="flex items-center mb-6">
                  <img
                    src="/api/placeholder/80/80"
                    alt={selectedPatient.name}
                    className="w-16 h-16 rounded-full mr-4"
                  />
                  <h2 className="text-xl font-semibold">
                    {selectedPatient.name}
                  </h2>
                </div>

                <div className="grid grid-cols-2 gap-y-4">
                  <div>
                    <span className="text-gray-500">Date: </span>
                    <span className="text-gray-700">
                      {selectedPatient.date}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">Gender: </span>
                    <span className="text-gray-700">Male</span>{" "}
                    {/* Update gender if available */}
                  </div>
                  <div>
                    <span className="text-gray-500">Time: </span>
                    <span className="text-gray-700">
                      {selectedPatient.time}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">Department: </span>
                    <span className="text-gray-700">
                      {selectedPatient.doctor.department}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">Doctor: </span>
                    <span className="text-gray-700">
                      Dr. {selectedPatient.doctor.name}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">Disease: </span>
                    <span className="text-gray-700">
                      {selectedPatient.disease}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">Blood Group: </span>
                    <span className="text-gray-700">
                      {selectedPatient.bloodGroup}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">Address: </span>
                    <span className="text-gray-700">
                      {selectedPatient.address}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">Phone: </span>
                    <span className="text-gray-700">
                      {selectedPatient.phone}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientDashboard;
