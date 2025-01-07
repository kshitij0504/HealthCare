import React, { useState } from "react";
import { Users, Award } from "lucide-react";

const AddDoctor = () => {
  const [activeTab, setActiveTab] = useState("personal");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    contact: "",
    email: "",
    qualifications: "",
    specialty: "",
    bloodGroup: "",
    address: "",
    postalCode: "",
    bio: "",
  });
  const [photo, setPhoto] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const tabs = [
    { id: "personal", label: "Personal Details", icon: Users },
    { id: "profile", label: "Profile and Bio", icon: Award },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const payload = {
      ...formData,
      photo: photo,
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/healthorg/add-doctor`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(payload),
        }
      );
      if (!response.ok) {
        throw new Error(`Server returned an error: ${response.status}`);
      }

      const data = await response.json();
      setSuccessMessage("Doctor profile created successfully!");
      setErrorMessage("");
    } catch (error) {
      setErrorMessage(error.message || "An unknown error occurred.");
      setSuccessMessage("");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="border-b">
        <div className="flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`flex items-center gap-2 px-6 py-3 border-b-2 transition-colors ${
                activeTab === tab.id
                  ? "border-teal-500 text-teal-500"
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
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
                placeholder="Enter First Name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
                placeholder="Enter Last Name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Age <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
                placeholder="Enter Age"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Gender <span className="text-red-500">*</span>
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Mobile Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
                placeholder="Enter Mobile Number"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
                placeholder="Enter Email Address"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Qualification <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="qualifications"
                value={formData.qualifications}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
                placeholder="Enter Qualification"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Specialty <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="specialty"
                value={formData.specialty}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
                placeholder="Enter Specialty"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Blood Group <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
                placeholder="Enter Blood Group"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Address <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
                placeholder="Enter Address"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Postal Code <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
                placeholder="Enter Postal Code"
              />
            </div>
          </div>
        )}

        {activeTab === "profile" && (
          <div className="space-y-6">
            <div className="border-2 border-dashed rounded-lg p-8 text-center">
              <div className="mb-4">Click here to upload your photo</div>
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
                id="photo-upload"
              />
              <label
                htmlFor="photo-upload"
                className="px-4 py-2 bg-blue-50 text-teal-600 rounded-lg cursor-pointer"
              >
                Upload Photo
              </label>
              {photo && (
                <div className="mt-4">
                  <img
                    src={photo}
                    alt="Preview"
                    className="max-w-xs mx-auto rounded-lg"
                  />
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Write Bio
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-teal-500 min-h-[200px]"
                placeholder="Write your bio here..."
              />
            </div>
          </div>
        )}

        <div className="mt-6 pt-6 border-t flex justify-end">
          <button
            onClick={handleSubmit}
            className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
          >
            Create Doctor Profile
          </button>
        </div>

        {errorMessage && (
          <div className="text-red-500 mt-4">{errorMessage}</div>
        )}
        {successMessage && (
          <div className="text-green-500 mt-4">{successMessage}</div>
        )}
      </div>
    </div>
  );
};

export default AddDoctor;
