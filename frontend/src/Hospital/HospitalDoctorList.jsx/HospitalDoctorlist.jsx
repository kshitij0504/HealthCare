import React, { useEffect, useState } from "react";
import {
  ChevronRight,
  ChevronLeft,
  Menu,
  Calendar,
  Users,
  Star,
  X,
  Mail,
  Phone,
  Award,
  Clock,
  Plus,
} from "lucide-react";
import Sidebar from "../HospitalSidebar";
import AddDoctor from "./AddDoctor";

const DoctorDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAddDoctor, setShowAddDoctor] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://curenest.onrender.com/healthorg/getDoctor`, {
        headers: {
          'Content-Type': 'application/json'
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch doctors');
      }

      const data = await response.json();
      console.log(data);
      setDoctors(data.doctors);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredDoctors = Array.isArray(doctors) 
  ? selectedDepartment
    ? doctors.filter((doctor) => doctor.specialty === selectedDepartment)
    : doctors
  : [];

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
                src={doctor.photo}
                alt={`${doctor.firstname} ${doctor.lastname}`}
                className="w-32 h-32 rounded-lg object-cover"
              />
  
              <div className="flex-1">
                <h3 className="text-2xl font-semibold mb-2">{`${doctor.firstname} ${doctor.lastname}`}</h3>
                <p className="text-gray-600 mb-2">{doctor.specialty}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <Mail className="w-5 h-5 text-teal-600" />
                    <span>{doctor.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-5 h-5 text-teal-600" />
                    <span>{doctor.contact}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-teal-600" />
                    <span>{doctor.qualifications}</span>
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
                    <span className="font-medium">Blood Group:</span> {doctor.BloodGroup}
                  </div>
                  <div>
                    <span className="font-medium">Gender:</span> {doctor.gender}
                  </div>
                  <div>
                    <span className="font-medium">Access ID:</span> {doctor.accessId}
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
            <Sidebar/>
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
              className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
            >
              <Plus className="w-4 h-4" />
              Add Doctor
            </button>
          </div>
        </nav>

        {showAddDoctor ? (
          <div className="p-6">
            <AddDoctor />
          </div>
        ) : (
          <>
            <div className="p-6">
              <div className="max-w-xs">
                <select
                  className="w-full p-2 border rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
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
                          src={doctor.photo}
                          alt={doctor.name}
                          className="w-24 h-24 rounded-full object-cover mb-4"
                        />
                        <h3 className="text-lg font-semibold text-center mb-1">
                          {doctor.firstname} {doctor.lastname}
                        </h3>
                        <p className="text-teal-600 text-sm mb-2">
                          {doctor.specialty}
                        </p>
                        <p className="text-teal-600 text-sm mb-3">
                          {doctor.contact}
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
