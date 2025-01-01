import React, { useState } from "react";
import {
  ChevronRight,
  ChevronLeft,
  Menu,
  Home,
  Calendar,
  Users,
  Activity,
  LogOut,
  Star,
  X,
  Mail,
  Phone,
  Award,
  Clock,
  Plus,
} from "lucide-react";
import { Link } from "react-router-dom";

const DoctorDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAddDoctor, setShowAddDoctor] = useState(false);
  const [activeTab, setActiveTab] = useState("personal");

  const doctors = [
    {
      id: 1,
      name: "Dr. Clive Nathan",
      department: "Gynecology",
      experience: "8 Years Experience",
      rating: 5,
      image: "/api/placeholder/200/200",
      email: "clive.nathan@medflex.com",
      phone: "+1 (555) 123-4567",
      education: "MBBS, MD - Gynecology",
      specializations: [
        "High-Risk Pregnancy",
        "Laparoscopic Surgery",
        "Infertility Treatment",
      ],
      availability: "Mon-Fri, 9:00 AM - 5:00 PM",
      consultationFee: "$150",
      languages: ["English", "Spanish"],
      about:
        "Dr. Clive Nathan is a highly skilled gynecologist with extensive experience in handling complex cases. He specializes in minimally invasive surgical techniques and has successfully treated numerous patients with various gynecological conditions.",
    },
  ];

  const menuItems = [
    { icon: Home, label: "Dashboard", path: "/hospitaldash" },
    {
      icon: Calendar,
      label: "Appointments",
      path: "/hospital-patient-appoinment",
    },
    { icon: Activity, label: "Doctors", path: "/hospital-doctorlist" },
    { icon: Users, label: "Patients", path: "/hospital-patientlist" },
    { icon: LogOut, label: "LogOut", path: "/signin" },
  ];

  const tabs = [
    { id: "personal", label: "Personal Details", icon: Users },
    { id: "profile", label: "Profile and Bio", icon: Award },
    { id: "availability", label: "Availability", icon: Calendar },
  ];

  const filteredDoctors = selectedDepartment
    ? doctors.filter((doctor) => doctor.department === selectedDepartment)
    : doctors;

  const RatingStars = ({ rating }) => (
    <div className="flex gap-1">
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}
          className={`w-4 h-4 ${
            index < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );

  const DoctorModal = ({ doctor, onClose }) => {
    if (!doctor) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
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
                src={doctor.image}
                alt={doctor.name}
                className="w-32 h-32 rounded-lg object-cover"
              />

              <div className="flex-1">
                <h3 className="text-2xl font-semibold mb-2">{doctor.name}</h3>
                <p className="text-gray-600 mb-2">{doctor.department}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <Mail className="w-5 h-5 text-blue-600" />
                    <span>{doctor.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-5 h-5 text-blue-600" />
                    <span>{doctor.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-blue-600" />
                    <span>{doctor.education}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <span>{doctor.availability}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 space-y-4">
              <div>
                <h4 className="font-semibold mb-2">About</h4>
                <p className="text-gray-600">{doctor.about}</p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Specializations</h4>
                <div className="flex flex-wrap gap-2">
                  {doctor.specializations.map((spec, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-gray-600">Consultation Fee</span>
                  <p className="text-xl font-semibold">
                    {doctor.consultationFee}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const AddDoctorForm = () => {
    return (
      <div className="bg-white rounded-lg shadow-sm">
        <div className="border-b">
          <div className="flex">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`flex items-center gap-2 px-6 py-3 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-500"
                    : "border-transparent hover:border-gray-300"
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {activeTab === "personal" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-1">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter First Name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter Last Name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Age <span className="text-red-500">*</span>
                </label>
                <select className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500">
                  <option value="">Select Age</option>
                  {[...Array(50)].map((_, i) => (
                    <option key={i + 23} value={i + 23}>
                      {i + 23}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Gender <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-4 mt-2">
                  <label className="flex items-center gap-2">
                    <input type="radio" name="gender" value="male" />
                    Male
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="gender" value="female" />
                    Female
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Mobile Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter Mobile Number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Email ID <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter Email ID"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Qualification
                </label>
                <select className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500">
                  <option value="">Select</option>
                  <option value="mbbs">MBBS</option>
                  <option value="md">MD</option>
                  <option value="ms">MS</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Designation
                </label>
                <select className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500">
                  <option value="">Select</option>
                  <option value="senior">Senior Consultant</option>
                  <option value="junior">Junior Consultant</option>
                  <option value="resident">Resident Doctor</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Blood Group <span className="text-red-500">*</span>
                </label>
                <select className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500">
                  <option value="">Select</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Address
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter Address"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">City</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter City"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Postal Code
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter Postal Code"
                />
              </div>
            </div>
          )}

          {activeTab === "profile" && (
            <div className="space-y-6">
              <div className="border-2 border-dashed rounded-lg p-8 text-center">
                <div className="mb-4">Click here to upload your photo.</div>
                <button className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg">
                  Upload Photo
                </button>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Write Bio
                </label>
                <textarea
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 min-h-[200px]"
                  placeholder="Write your bio here..."
                />
              </div>
            </div>
          )}

          {activeTab === "availability" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day}>
                  <label className="block text-sm font-medium mb-2">
                    {day}
                  </label>
                  <div className="flex gap-2">
                    <select className="flex-1 p-2 border rounded-lg">
                      <option>From</option>
                      {[...Array(24)].map((_, i) => (
                        <option key={i} value={`${i}:00`}>
                          {`${i}:00`}
                        </option>
                      ))}
                    </select>
                    <select className="flex-1 p-2 border rounded-lg">
                      <option>To</option>
                      {[...Array(24)].map((_, i) => (
                        <option key={i} value={`${i}:00`}>
                          {`${i}:00`}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="mt-6 pt-6 border-t flex justify-end">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Create Doctor Profile
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

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
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="p-2 rounded-lg hover:bg-gray-100 text-gray-500"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                )}
              </>
            ) : (
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
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

      <div
        className={`transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "md:ml-64" : "md:ml-20"
        }`}
      >
        <nav className="bg-white border-b px-4 py-3">
          <div className="flex items-center justify-between">
            {isMobile && (
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 rounded-lg hover:bg-gray-100"
              >
                <Menu className="w-6 h-6" />
              </button>
            )}
            <h1 className="text-xl font-semibold text-gray-800">
              Doctors Details
            </h1>
            <button
              onClick={() => setShowAddDoctor(!showAddDoctor)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Plus className="w-4 h-4" />
              Add Doctor
            </button>
          </div>
        </nav>

        {showAddDoctor ? (
          <div className="p-6">
            <AddDoctorForm />
          </div>
        ) : (
          <>
            <div className="p-6">
              <div className="max-w-xs">
                <select
                  className="w-full p-2 border rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                >
                  <option value="">All Departments</option>
                  <option value="Gynecology">Gynecology</option>
                  <option value="Plastic Surgery">Plastic Surgery</option>
                  <option value="Physiotherapy">Physiotherapy</option>
                  <option value="Gastroenterology">Gastroenterology</option>
                  <option value="Cardiology">Cardiology</option>
                  <option value="Neurology">Neurology</option>
                  <option value="Orthopedics">Orthopedics</option>
                  <option value="Pediatrics">Pediatrics</option>
                  <option value="Dermatology">Dermatology</option>
                  <option value="Endocrinology">Endocrinology</option>
                </select>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredDoctors.map((doctor) => (
                  <div
                    key={doctor.id}
                    className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer"
                    onClick={() => {
                      setSelectedDoctor(doctor);
                      setIsModalOpen(true);
                    }}
                  >
                    <div className="p-6">
                      <div className="flex flex-col items-center">
                        <img
                          src={doctor.image}
                          alt={doctor.name}
                          className="w-24 h-24 rounded-full object-cover mb-4"
                        />
                        <h3 className="text-lg font-semibold text-center mb-1">
                          {doctor.name}
                        </h3>
                        <p className="text-blue-600 text-sm mb-2">
                          {doctor.department}
                        </p>
                        <p className="text-gray-600 text-sm mb-3">
                          {doctor.experience}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
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
