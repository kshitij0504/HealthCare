import React, { useState } from "react";

const Profile = () => {
  const [tab, setTab] = useState("profile");
  const [profileData, setProfileData] = useState({
    name: "Christopher Burrell",
    number: "+(125) 458-8547",
    email: "christopher.burrell@example.com",
    gender: "Female",
    dob: "1993-09-13",
    address: "Sydney, Australia",
    bloodGroup: "O+",
    age: "20",
    medicines: " ",
  });

  const [photo, setPhoto] = useState(null);

  const pendingAppointments = [
    {
      title: "Cardiogram",
      doctor: "Dr. Calvin Carlo",
      date: "13 March",
      icon: "❤️",
    },
    {
      title: "Checkup",
      doctor: "Dr. Cristino Murphy",
      date: "5 May",
      icon: "🩺",
    },
    {
      title: "Covid Test",
      doctor: "Dr. Alia Reddy",
      date: "19 June",
      icon: "🧪",
    },
    { title: "Dentist", doctor: "Dr. Toni Kovar", date: "20 June", icon: "🦷" },
  ];

  const visitedDoctors = [
    { doctor: "Dr. Calvin Carlo", visits: 3 },
    { doctor: "Dr. Cristino Murphy", visits: 1 },
    { doctor: "Dr. Alia Reddy", visits: 2 },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(URL.createObjectURL(file));
    }
  };

  const handleSaveChanges = () => {
    alert("Changes saved successfully!");
  };

  const validateStep1 = () => {
    const step1Errors = {};
    if (!profileData.name.trim()) step1Errors.name = "Name is required.";
    if (!profileData.number.trim() || !/^\d{10}$/.test(profileData.number))
      step1Errors.number = "Valid phone number is required.";
    if (
      !profileData.email.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profileData.email)
    )
      step1Errors.email = "Valid email is required.";
    if (!profileData.gender.trim()) step1Errors.gender = "Gender is required.";
    if (!profileData.dob.trim()) step1Errors.dob = "Date of birth is required.";
    if (!profileData.address.trim())
      step1Errors.address = "Address is required.";
    return step1Errors;
  };

  const calculateCompletion = () => {
    const step1Errors = validateStep1();
    const totalFields = Object.keys(profileData).length - 1;
    const filledFields = totalFields - Object.keys(step1Errors).length;
    return Math.round((filledFields / totalFields) * 100);
  };

  const profileCompletion = calculateCompletion();

  return (
    <div className="flex flex-col items-center p-6">
      <div className="w-full max-w-6xl bg-white rounded-lg p-6">
        {" "}
        <a
          href="/patientdash"
          className="flex items-center text-blue-500 hover:text-blue-700 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 12H5m7-7l-7 7 7 7"
            />
          </svg>
          Back
        </a>
        <div className="flex justify-between border-b">
          <button
            className={`px-4 py-2 w-1/2 text-center ${
              tab === "profile"
                ? "border-b-2 border-blue-500 text-blue-500 font-semibold"
                : "text-gray-600"
            }`}
            onClick={() => setTab("profile")}
          >
            Profile
          </button>
          <button
            className={`px-4 py-2 w-1/2 text-center ${
              tab === "settings"
                ? "border-b-2 border-blue-500 text-blue-500 font-semibold"
                : "text-gray-600"
            }`}
            onClick={() => setTab("settings")}
          >
            Profile Settings
          </button>
        </div>
        {tab === "profile" && (
          <div className="flex flex-col md:flex-row mt-6">
            <div className="w-full md:w-1/3 flex flex-col items-center">
              <div className="relative w-full">
                <div className="h-32 w-full rounded-t-lg bg-gradient-to-r from-purple-500 to-green-400"></div>
                <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
                  <img
                    src={photo || "https://via.placeholder.com/100"}
                    alt="profile"
                    className="h-24 w-24 rounded-full border-4 border-white"
                  />
                </div>
              </div>
              <div className="mt-16 text-center">
                <h2 className="text-xl font-semibold">{profileData.name}</h2>
                <p className="text-gray-600">{`${
                  new Date().getFullYear() -
                  new Date(profileData.dob).getFullYear()
                } Years old`}</p>
              </div>
              <div className="mt-6 w-full px-4">
                <p className="text-gray-600 text-sm mb-2">
                  Complete your profile
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-blue-500 h-2.5 rounded-full"
                    style={{ width: `${profileCompletion}%` }}
                  ></div>
                </div>
                <p className="text-gray-600 text-sm mt-2 text-center">
                  {profileCompletion}% Complete
                </p>
              </div>
              <ul className="mt-6 w-full px-4 space-y-2 text-gray-600">
                <li>
                  <strong>Gender:</strong> {profileData.gender}
                </li>
                <li>
                  <strong>Birthday:</strong>{" "}
                  {new Date(profileData.dob).toLocaleDateString()}
                </li>
                <li>
                  <strong>Age:</strong>{" "}
                  {new Date().getFullYear() -
                    new Date(profileData.dob).getFullYear()}
                </li>
                <li>
                  <strong>Address:</strong> {profileData.address}
                </li>
                <li>
                  <strong>Phone No.:</strong> {profileData.number}
                </li>
                <li>
                  <strong>Medicines:</strong> {profileData.medicines}
                </li>
              </ul>
            </div>

            <div className="w-full md:w-2/3 mt-6 md:mt-0 md:ml-6">
              <h3 className="text-lg font-semibold">Introduction:</h3>
              <p className="text-gray-600 mb-6">
                Web designers to occupy the space which will later be filled
                with 'real' content. This is required when, for example, the
                final text is not yet available.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-md font-semibold mb-4">
                    Pending Appointments
                  </h4>
                  {pendingAppointments.map((appointment, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-gray-100 p-4 rounded-lg mb-4"
                    >
                      <div className="flex items-center">
                        <span className="text-2xl mr-4">
                          {appointment.icon}
                        </span>
                        <div>
                          <p className="font-semibold">{appointment.title}</p>
                          <p className="text-sm text-gray-500">
                            {appointment.doctor}
                          </p>
                        </div>
                      </div>
                      <p className="text-gray-600">{appointment.date}</p>
                    </div>
                  ))}
                </div>

                <div>
                  <h4 className="text-md font-semibold mb-4">
                    Visited Doctors
                  </h4>
                  {visitedDoctors.map((doctor, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-gray-100 p-4 rounded-lg mb-4"
                    >
                      <p>{doctor.doctor}</p>
                      <p className="text-blue-500 font-semibold">
                        {doctor.visits} Visits
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        {tab === "settings" && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-6">
              Personal Information:
            </h3>
            <form>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={profileData.name}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="number"
                    value={profileData.number}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Address
                  </label>
                  <textarea
                    name="address"
                    value={profileData.address}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Medicines
                  </label>
                  <textarea
                    name="medicines"
                    value={profileData.medicines}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Age
                  </label>
                  <input
                    type="text"
                    name="age"
                    readOnly
                    value={
                      new Date().getFullYear() -
                      new Date(profileData.dob).getFullYear()
                    }
                    className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md shadow-sm p-2 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Gender
                  </label>
                  <input
                    type="text"
                    name="gender"
                    value={profileData.gender}
                    readOnly
                    className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md shadow-sm p-2 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    name="dob"
                    value={profileData.dob}
                    readOnly
                    className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md shadow-sm p-2 cursor-not-allowed"
                  />
                </div>
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700">
                    Upload Photo
                  </label>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                </div>
                <div className="mt-12 flex justify-end">
                  <button
                    type="button"
                    onClick={handleSaveChanges}
                    className="px-3 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
