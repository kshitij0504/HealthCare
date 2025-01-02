// import React, { useState } from 'react';
// import {
//     Calendar,
//     Users,
//     Award,
//   } from "lucide-react";

// const AddDoctor = () => {
//     const [activeTab, setActiveTab] = useState("personal");
// const tabs = [
//     { id: "personal", label: "Personal Details", icon: Users },
//     { id: "profile", label: "Profile and Bio", icon: Award },
//     { id: "availability", label: "Availability", icon: Calendar },
//   ];
//     return (
//       <div className="bg-white rounded-lg shadow-sm">
//         <div className="border-b">
//           <div className="flex">
//             {tabs.map((tab) => (
//               <button
//                 key={tab.id}
//                 className={`flex items-center gap-2 px-6 py-3 border-b-2 transition-colors ${
//                   activeTab === tab.id
//                     ? "border-teal-500 text-teal-500"
//                     : "border-transparent hover:border-gray-300"
//                 }`}
//                 onClick={() => setActiveTab(tab.id)}
//               >
//                 <tab.icon className="w-4 h-4" />
//                 {tab.label}
//               </button>
//             ))}
//           </div>
//         </div>

//         <div className="p-6">
//           {activeTab === "personal" && (
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium mb-1">
//                   First Name <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
//                   placeholder="Enter First Name"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium mb-1">
//                   Last Name <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
//                   placeholder="Enter Last Name"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium mb-1">
//                   Age <span className="text-red-500">*</span>
//                 </label>
//                 <select className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-teal-500">
//                   <option value="">Select Age</option>
//                   {[...Array(50)].map((_, i) => (
//                     <option key={i + 23} value={i + 23}>
//                       {i + 23}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium mb-1">
//                   Gender <span className="text-red-500">*</span>
//                 </label>
//                 <div className="flex gap-4 mt-2">
//                   <label className="flex items-center gap-2">
//                     <input type="radio" name="gender" value="male" />
//                     Male
//                   </label>
//                   <label className="flex items-center gap-2">
//                     <input type="radio" name="gender" value="female" />
//                     Female
//                   </label>
//                 </div>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium mb-1">
//                   Mobile Number <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="tel"
//                   className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
//                   placeholder="Enter Mobile Number"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium mb-1">
//                   Email ID <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="email"
//                   className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
//                   placeholder="Enter Email ID"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium mb-1">
//                   Qualification
//                 </label>
//                 <select className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-teal-500">
//                   <option value="">Select</option>
//                   <option value="mbbs">MBBS</option>
//                   <option value="md">MD</option>
//                   <option value="ms">MS</option>
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium mb-1">
//                   Designation
//                 </label>
//                 <select className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-teal-500">
//                   <option value="">Select</option>
//                   <option value="senior">Senior Consultant</option>
//                   <option value="junior">Junior Consultant</option>
//                   <option value="resident">Resident Doctor</option>
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium mb-1">
//                   Blood Group <span className="text-red-500">*</span>
//                 </label>
//                 <select className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-teal-500">
//                   <option value="">Select</option>
//                   <option value="A+">A+</option>
//                   <option value="A-">A-</option>
//                   <option value="B+">B+</option>
//                   <option value="B-">B-</option>
//                   <option value="AB+">AB+</option>
//                   <option value="AB-">AB-</option>
//                   <option value="O+">O+</option>
//                   <option value="O-">O-</option>
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium mb-1">
//                   Address
//                 </label>
//                 <input
//                   type="text"
//                   className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
//                   placeholder="Enter Address"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium mb-1">City</label>
//                 <input
//                   type="text"
//                   className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
//                   placeholder="Enter City"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium mb-1">
//                   Postal Code
//                 </label>
//                 <input
//                   type="text"
//                   className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
//                   placeholder="Enter Postal Code"
//                 />
//               </div>
//             </div>
//           )}

//           {activeTab === "profile" && (
//             <div className="space-y-6">
//               <div className="border-2 border-dashed rounded-lg p-8 text-center">
//                 <div className="mb-4">Click here to upload your photo.</div>
//                 <button className="px-4 py-2 bg-blue-50 text-teal-600 rounded-lg">
//                   Upload Photo
//                 </button>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium mb-1">
//                   Write Bio
//                 </label>
//                 <textarea
//                   className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-teal-500 min-h-[200px]"
//                   placeholder="Write your bio here..."
//                 />
//               </div>
//             </div>
//           )}

//           {activeTab === "availability" && (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
//                 <div key={day}>
//                   <label className="block text-sm font-medium mb-2">
//                     {day}
//                   </label>
//                   <div className="flex gap-2">
//                     <select className="flex-1 p-2 border rounded-lg">
//                       <option>From</option>
//                       {[...Array(24)].map((_, i) => (
//                         <option key={i} value={`${i}:00`}>
//                           {`${i}:00`}
//                         </option>
//                       ))}
//                     </select>
//                     <select className="flex-1 p-2 border rounded-lg">
//                       <option>To</option>
//                       {[...Array(24)].map((_, i) => (
//                         <option key={i} value={`${i}:00`}>
//                           {`${i}:00`}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
                  
//                 </div>
                
//               ))}
//               <div className="mt-6 pt-6 border-t flex justify-end">
//             <button className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 ">
//               Create Doctor Profile
//             </button>
//           </div>
//             </div>
//           )}
          
//         </div>
//       </div>
//     );
//   };


// export default AddDoctor
import React, { useState } from 'react';
import { Calendar, Users, Award } from 'lucide-react';
import Cookies from 'js-cookie';
const AddDoctor = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    gender: '',
    contact: '', // Updated from mobileNumber
    email: '',
    qualifications: '',
    speciality: '',
    bloodGroup: '',
    address: '',
    postalCode: '',
    bio: '',
    availability: {},
  });
  const [photo, setPhoto] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const tabs = [
    { id: 'personal', label: 'Personal Details', icon: Users },
    { id: 'profile', label: 'Profile and Bio', icon: Award },
    { id: 'availability', label: 'Availability', icon: Calendar },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAvailabilityChange = (day, key, value) => {
    setFormData((prev) => ({
      ...prev,
      availability: {
        ...prev.availability,
        [day]: {
          ...prev.availability[day],
          [key]: value,
        },
      },
    }));
  };

  const handlePhotoUpload = (e) => {
    setPhoto(e.target.files[0]);
  };

 

const handleSubmit = async (event) => {
  event.preventDefault();

  const payload = new FormData();

  // Append formData fields to the payload
  Object.keys(formData).forEach((key) => {
    if (key === 'availability') {
      payload.append(key, JSON.stringify(formData[key])); // Convert availability object to JSON
    } else {
      payload.append(key, formData[key]);
    }
  });

  // Append photo if it exists
  if (photo) {
    payload.append('photo', photo);
  }

  try {
    const response = await fetch('http://localhost:5000/healthorg/add-doctor', {
      method: 'POST',
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // },
      body: payload,
      credentials: 'include'
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Server Error:', errorText);
      throw new Error(`Server returned an error: ${response.status}`);
    }

    const data = await response.json();
    console.log('Success:', data);
    setSuccessMessage('Doctor profile created successfully!');
    setErrorMessage('');
  } catch (error) {
    console.error('Error during form submission:', error);
    setErrorMessage(error.message || 'An unknown error occurred.');
    setSuccessMessage('');
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
                  ? 'border-teal-500 text-teal-500'
                  : 'border-transparent hover:border-gray-300'
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
        {activeTab === 'personal' && (
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

        {activeTab === 'profile' && (
          <div className="space-y-6">
            <div className="border-2 border-dashed rounded-lg p-8 text-center">
              <div className="mb-4">Click here to upload your photo.</div>
              <input type="file" accept="image/*" onChange={handlePhotoUpload} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Write Bio</label>
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

        {activeTab === 'availability' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day}>
                <label className="block text-sm font-medium mb-2">{day}</label>
                <div className="flex gap-2">
                  <select
                    onChange={(e) =>
                      handleAvailabilityChange(day, 'from', e.target.value)
                    }
                    className="flex-1 p-2 border rounded-lg"
                  >
                    <option value="">From</option>
                    {[...Array(24)].map((_, i) => (
                      <option key={i} value={`${i}:00`}>
                        {`${i}:00`}
                      </option>
                    ))}
                  </select>
                  <select
                    onChange={(e) =>
                      handleAvailabilityChange(day, 'to', e.target.value)
                    }
                    className="flex-1 p-2 border rounded-lg"
                  >
                    <option value="">To</option>
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
          <button
            onClick={handleSubmit}
            className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
          >
            Create Doctor Profile
          </button>
        </div>

        {errorMessage && <div className="text-red-500 mt-4">{errorMessage}</div>}
        {successMessage && <div className="text-green-500 mt-4">{successMessage}</div>}
      </div>
    </div>
  );
};

export default AddDoctor;
