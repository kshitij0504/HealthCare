import React, { useState, useEffect } from "react";
import {
  Menu,
  Home,
  Calendar,
  Users,
  Activity,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const AppointmentsDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

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

  const appointments = [
    {
      id: 1,
      name: "Howard Tanner",
      age: 25,
      gender: "Male",
      address: "1451 - ABC Street, NY",
      mobile: "(+452) 8945 4568",
      department: "Cardiology",
      date: "13th Sep 2023",
      time: "11:00AM",
      status: "Approved",
      image: "/api/placeholder/48/48",
    },
    {
      id: 2,
      name: "Wendy Filson",
      age: 28,
      gender: "Female",
      address: "1451 - ABC Street, NY",
      mobile: "(+452) 8945 4568",
      department: "Gynecology",
      date: "29th Nov 2023",
      time: "11:00AM",
      status: "Pending",
      image: "/api/placeholder/48/48",
    },
    {
      id: 3,
      name: "Alice Johnson",
      age: 34,
      gender: "Female",
      address: "7890 - XYZ Avenue, LA",
      mobile: "(+452) 8975 1234",
      department: "Neurology",
      date: "5th Oct 2023",
      time: "2:00PM",
      status: "Approved",
      image: "/api/placeholder/48/48",
    },
    {
      id: 4,
      name: "James Miller",
      age: 45,
      gender: "Male",
      address: "2468 - DEF Road, SF",
      mobile: "(+452) 8765 4321",
      department: "Orthopedics",
      date: "17th Oct 2023",
      time: "9:00AM",
      status: "Pending",
      image: "/api/placeholder/48/48",
    },
    {
      id: 5,
      name: "Sarah Brown",
      age: 30,
      gender: "Female",
      address: "1050 - GHI Drive, SF",
      mobile: "(+452) 8643 2112",
      department: "Pediatrics",
      date: "25th Oct 2023",
      time: "1:30PM",
      status: "Approved",
      image: "/api/placeholder/48/48",
    },
    {
      id: 6,
      name: "David Lee",
      age: 60,
      gender: "Male",
      address: "5632 - JKL Street, NY",
      mobile: "(+452) 8934 5678",
      department: "Cardiology",
      date: "10th Nov 2023",
      time: "4:00PM",
      status: "Pending",
      image: "/api/placeholder/48/48",
    },
    {
      id: 7,
      name: "Emily Davis",
      age: 26,
      gender: "Female",
      address: "1122 - MNO Road, LA",
      mobile: "(+452) 8901 2345",
      department: "Dermatology",
      date: "12th Nov 2023",
      time: "3:00PM",
      status: "Approved",
      image: "/api/placeholder/48/48",
    },
    {
      id: 8,
      name: "Robert Wilson",
      age: 50,
      gender: "Male",
      address: "9865 - PQR Avenue, LA",
      mobile: "(+452) 8765 9876",
      department: "Gastroenterology",
      date: "22nd Dec 2023",
      time: "10:30AM",
      status: "Approved",
      image: "/api/placeholder/48/48",
    },
  ];

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

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile overlay */}
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
                  className={`flex items-center w-full rounded-lg text-left transition-colors hover:bg-gray-100 ${
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

      {/* Main content */}
      <div
        className={`transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "md:ml-64" : "md:ml-20"
        }`}
      >
        <nav className="bg-white border-b px-4 py-3">
          <div className="flex items-center justify-between">
            {isMobile && (
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-lg hover:bg-gray-100 mr-2"
              >
                <Menu className="w-6 h-6" />
              </button>
            )}
            <h1 className="text-xl font-semibold mb-3">Patient Details</h1>
            <br />
          </div>
        </nav>

        <div className="p-6">
          <div className="bg-white rounded-lg shadow overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Id
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Age
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Gender
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Address
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Mobile No.
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Time
                  </th>
                  {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th> */}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {appointments.map((appointment) => (
                  <tr key={appointment.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {appointment.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          className="h-12 w-12 rounded-full"
                          src={appointment.image}
                          alt=""
                        />
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {appointment.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {appointment.age}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {appointment.gender}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {appointment.address}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {appointment.mobile}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {appointment.department}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {appointment.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {appointment.time}
                    </td>
                    {/* <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          appointment.status === "Approved"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {appointment.status}
                      </span>
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentsDashboard;
