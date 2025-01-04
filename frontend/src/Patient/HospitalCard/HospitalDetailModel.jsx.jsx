// import React from "react";
// import { ChevronLeft, Phone, Mail } from "lucide-react";

// const HospitalDetails = ({ hospitalDetails, onBack }) => {
//   return (
//     <div>
//       <div className="mb-6">
//         <button
//           onClick={onBack}
//           className="flex items-center text-gray-600 hover:text-gray-900"
//         >
//           <ChevronLeft className="w-5 h-5" />
//           <span>Back to Hospitals</span>
//         </button>
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         {hospitalDetails.map((doctor) => (
//           <div
//             key={doctor.id}
//             className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow"
//           >
//             <div className="flex flex-col md:flex-row gap-6">
//               <div className="flex flex-col items-center space-y-3">
//                 <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100">
//                   <img
//                     src={doctor.photo || "/api/placeholder/150/150"}
//                     alt={`${doctor.firstname} ${doctor.lastname}`}
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
//                 <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm">
//                   Available
//                 </span>
//               </div>

//               <div className="flex-1">
//                 <div className="mb-4">
//                   <h3 className="text-xl font-semibold text-gray-900">
//                     Dr. {doctor.firstname} {doctor.lastname}
//                   </h3>
//                   {doctor.specialty && (
//                     <span className="inline-block mt-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
//                       {doctor.specialty}
//                     </span>
//                   )}
//                 </div>

//                 {doctor.qualifications && (
//                   <p className="text-gray-600 text-sm mb-4">
//                     {doctor.qualifications}
//                   </p>
//                 )}

//                 <div className="flex flex-wrap gap-4 mb-4">
//                   {doctor.contact && (
//                     <div className="flex items-center gap-2 text-gray-600">
//                       <Phone className="w-4 h-4" />
//                       <span className="text-sm">{doctor.contact}</span>
//                     </div>
//                   )}
//                   {doctor.email && (
//                     <div className="flex items-center gap-2 text-gray-600">
//                       <Mail className="w-4 h-4" />
//                       <span className="text-sm">{doctor.email}</span>
//                     </div>
//                   )}
//                 </div>

//                 {doctor.bio && (
//                   <p className="text-gray-600 text-sm leading-relaxed">
//                     {doctor.bio}
//                   </p>
//                 )}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default HospitalDetails;
import React from "react";
import { ChevronLeft, Phone, Mail } from "lucide-react";

const HospitalDetails = ({ hospitalDetails, onBack }) => {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <button
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Back to Hospitals</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {hospitalDetails.map((doctor) => (
          <div
            key={doctor.id}
            className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex flex-col items-center space-y-3">
                <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100">
                  <img
                    src={doctor.photo || "/api/placeholder/150/150"}
                    alt={`${doctor.firstname} ${doctor.lastname}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm">
                  Available
                </span>
              </div>

              <div className="flex-1">
                <div className="mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">
                    Dr. {doctor.firstname} {doctor.lastname}
                  </h3>
                  {doctor.specialty && (
                    <span className="inline-block mt-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                      {doctor.specialty}
                    </span>
                  )}
                </div>

                {doctor.qualifications && (
                  <p className="text-gray-600 text-sm mb-4">
                    {doctor.qualifications}
                  </p>
                )}

                <div className="flex flex-wrap gap-4 mb-4">
                  {doctor.contact && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <Phone className="w-4 h-4" />
                      <span className="text-sm">{doctor.contact}</span>
                    </div>
                  )}
                  {doctor.email && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <Mail className="w-4 h-4" />
                      <span className="text-sm">{doctor.email}</span>
                    </div>
                  )}
                </div>

                {doctor.bio && (
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {doctor.bio}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HospitalDetails;