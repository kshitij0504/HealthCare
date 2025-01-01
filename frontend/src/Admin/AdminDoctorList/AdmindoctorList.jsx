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
} from "lucide-react";
import { Link } from "react-router-dom";

const DoctorDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    {
      id: 2,
      name: "Dr. Maria Lopez",
      department: "Pediatrics",
      experience: "10 Years Experience",
      rating: 4.8,
      image: "/api/placeholder/200/200",
      email: "maria.lopez@medflex.com",
      phone: "+1 (555) 234-5678",
      education: "MBBS, MD - Pediatrics",
      specializations: [
        "Child Development",
        "Vaccination",
        "Pediatric Asthma",
      ],
      availability: "Mon-Fri, 10:00 AM - 6:00 PM",
      consultationFee: "$120",
      languages: ["English", "French"],
      about:
        "Dr. Maria Lopez is a compassionate pediatrician dedicated to providing quality care for children from infancy to adolescence. She is experienced in treating common childhood illnesses and promoting long-term health and development.",
    },
    {
      id: 3,
      name: "Dr. James Mitchell",
      department: "Cardiology",
      experience: "12 Years Experience",
      rating: 5,
      image: "/api/placeholder/200/200",
      email: "james.mitchell@medflex.com",
      phone: "+1 (555) 345-6789",
      education: "MBBS, MD - Cardiology",
      specializations: [
        "Heart Disease",
        "Angioplasty",
        "Cardiac Rehabilitation",
      ],
      availability: "Mon-Fri, 8:00 AM - 4:00 PM",
      consultationFee: "$200",
      languages: ["English"],
      about:
        "Dr. James Mitchell is a renowned cardiologist who specializes in diagnosing and treating heart conditions. With his extensive expertise in cardiac surgery and interventions, he helps patients achieve a healthier heart.",
    },
    {
      id: 4,
      name: "Dr. Emily Thompson",
      department: "Dermatology",
      experience: "7 Years Experience",
      rating: 4.7,
      image: "/api/placeholder/200/200",
      email: "emily.thompson@medflex.com",
      phone: "+1 (555) 456-7890",
      education: "MBBS, MD - Dermatology",
      specializations: [
        "Acne Treatment",
        "Psoriasis Management",
        "Skin Cancer Screening",
      ],
      availability: "Mon-Fri, 9:00 AM - 5:00 PM",
      consultationFee: "$130",
      languages: ["English", "Italian"],
      about:
        "Dr. Emily Thompson is a skilled dermatologist with a focus on treating various skin conditions. She is known for her expertise in non-surgical treatments and skin cancer prevention.",
    },
    {
      id: 5,
      name: "Dr. William Harris",
      department: "Orthopedics",
      experience: "15 Years Experience",
      rating: 4.9,
      image: "/api/placeholder/200/200",
      email: "william.harris@medflex.com",
      phone: "+1 (555) 567-8901",
      education: "MBBS, MD - Orthopedics",
      specializations: [
        "Joint Replacement",
        "Sports Medicine",
        "Spine Surgery",
      ],
      availability: "Mon-Fri, 8:00 AM - 4:00 PM",
      consultationFee: "$180",
      languages: ["English", "German"],
      about:
        "Dr. William Harris is a leading orthopedic surgeon with over 15 years of experience in joint replacement and sports injury treatments. His patient-centric approach has made him a preferred choice for many.",
    },
    {
      id: 6,
      name: "Dr. Sarah Brown",
      department: "Neurology",
      experience: "9 Years Experience",
      rating: 4.8,
      image: "/api/placeholder/200/200",
      email: "sarah.brown@medflex.com",
      phone: "+1 (555) 678-9012",
      education: "MBBS, MD - Neurology",
      specializations: [
        "Epilepsy",
        "Parkinson's Disease",
        "Migraine Management",
      ],
      availability: "Mon-Fri, 9:00 AM - 5:00 PM",
      consultationFee: "$160",
      languages: ["English", "Mandarin"],
      about:
        "Dr. Sarah Brown is a neurologist specializing in the diagnosis and treatment of neurological disorders. Her clinical skills and compassionate care have helped patients overcome various challenges related to the nervous system.",
    },
    {
      id: 7,
      name: "Dr. Mark Johnson",
      department: "Endocrinology",
      experience: "11 Years Experience",
      rating: 4.9,
      image: "/api/placeholder/200/200",
      email: "mark.johnson@medflex.com",
      phone: "+1 (555) 789-0123",
      education: "MBBS, MD - Endocrinology",
      specializations: [
        "Diabetes Management",
        "Thyroid Disorders",
        "Obesity Management",
      ],
      availability: "Mon-Fri, 9:00 AM - 5:00 PM",
      consultationFee: "$170",
      languages: ["English", "Russian"],
      about:
        "Dr. Mark Johnson is an experienced endocrinologist with a focus on managing diabetes, thyroid disorders, and obesity. His holistic approach has helped many patients improve their quality of life.",
    },
    {
      id: 8,
      name: "Dr. Natalie Scott",
      department: "Ophthalmology",
      experience: "6 Years Experience",
      rating: 4.6,
      image: "/api/placeholder/200/200",
      email: "natalie.scott@medflex.com",
      phone: "+1 (555) 890-1234",
      education: "MBBS, MD - Ophthalmology",
      specializations: [
        "Cataract Surgery",
        "Glaucoma Treatment",
        "LASIK",
      ],
      availability: "Mon-Fri, 8:00 AM - 4:00 PM",
      consultationFee: "$140",
      languages: ["English", "French"],
      about:
        "Dr. Natalie Scott is a skilled ophthalmologist with expertise in eye surgeries and treatments for conditions like glaucoma and cataracts. She is passionate about preserving and restoring vision.",
    },
    {
      id: 9,
      name: "Dr. Brian Lee",
      department: "Urology",
      experience: "14 Years Experience",
      rating: 5,
      image: "/api/placeholder/200/200",
      email: "brian.lee@medflex.com",
      phone: "+1 (555) 901-2345",
      education: "MBBS, MD - Urology",
      specializations: [
        "Kidney Stones",
        "Prostate Cancer",
        "Bladder Issues",
      ],
      availability: "Mon-Fri, 8:00 AM - 5:00 PM",
      consultationFee: "$190",
      languages: ["English", "Korean"],
      about:
        "Dr. Brian Lee is an expert urologist specializing in the treatment of kidney stones, prostate cancer, and other urological disorders. His extensive experience has earned him a reputation for excellence in patient care.",
    },
    {
      id: 10,
      name: "Dr. Linda Patel",
      department: "Psychiatry",
      experience: "13 Years Experience",
      rating: 4.7,
      image: "/api/placeholder/200/200",
      email: "linda.patel@medflex.com",
      phone: "+1 (555) 012-3456",
      education: "MBBS, MD - Psychiatry",
      specializations: [
        "Anxiety Disorders",
        "Depression Treatment",
        "Mental Health Counseling",
      ],
      availability: "Mon-Fri, 9:00 AM - 5:00 PM",
      consultationFee: "$160",
      languages: ["English", "Hindi"],
      about:
        "Dr. Linda Patel is a highly regarded psychiatrist specializing in mental health disorders, including anxiety and depression. She uses a combination of therapies to help patients improve their emotional well-being.",
    }
  ];
  
  
  const filteredDoctors = selectedDepartment
    ? doctors.filter((doctor) => doctor.department === selectedDepartment)
    : doctors;

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
                {/* <div className="flex items-center gap-2 mb-4">
                  <RatingStars rating={doctor.rating} />
                  <span className="text-gray-600 text-sm">
                    ({doctor.rating}.0)
                  </span>
                </div> */}

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

              {/* <div>
                <h4 className="font-semibold mb-2">Languages</h4>
                <div className="flex gap-2">
                  {doctor.languages.map((lang, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div> */}
            </div>

            <div className="mt-6 pt-6 border-t">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-gray-600">Consultation Fee</span>
                  <p className="text-xl font-semibold">
                    {doctor.consultationFee}
                  </p>
                </div>
                {/* <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Book Appointment
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
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
        {/* Sidebar content remains the same */}
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
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 rounded-lg hover:bg-gray-100"
              >
                <Menu className="w-6 h-6" />
              </button>
            )}
            <h1 className="text-xl font-semibold text-gray-800 mb-3">Doctors Details</h1>
          </div>
        </nav>

        {/* Department Dropdown */}
        <div className="p-6">
          <div className="max-w-xs">
            {/* <label className="text-lg font-semibold text-gray-800 block mb-2">
              Department
            </label> */}
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

        {/* Doctors Grid */}
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
                    {/* <RatingStars rating={doctor.rating} /> */}
                  </div>
                  {/* <div className="mt-4 text-center">
                    <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      View Profile
                    </button>
                  </div> */}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Doctor Details Modal */}
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
