import React from "react";
import { Star, Clock, MapPin } from "lucide-react";

const DoctorCard = ({ doctor, onBookAppointment }) => (
  <div className="bg-white rounded-2xl p-6 shadow-sm">
    <div className="flex gap-6">
      <img
        src="/api/placeholder/92/92"
        alt={doctor.name}
        className="rounded-full w-[92px] h-[92px]"
      />
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-1">
              {doctor.name}
            </h3>
            <p className="text-gray-500 text-sm mb-1">{doctor.degrees}</p>
            <p className="text-gray-700 text-sm">
              ${doctor.consultationFee} Consultation Fee
            </p>
          </div>
          <div className="bg-blue-50 text-blue-800 px-4 py-1.5 rounded-full text-sm whitespace-nowrap">
            {doctor.speciality}
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-6 mt-6">
          <div className="flex items-center gap-2 bg-orange-50 px-3 py-1.5 rounded-full">
            <Star className="w-4 h-4 text-orange-400 fill-current" />
            <span className="text-gray-700 text-sm">{doctor.rating}/5</span>
          </div>
          <div className="flex items-center gap-2 bg-blue-50 px-3 py-1.5 rounded-full">
            <Clock className="w-4 h-4 text-blue-500" />
            <span className="text-gray-700 text-sm">{doctor.experience}</span>
          </div>
          <div className="flex items-center gap-2 bg-orange-50 px-3 py-1.5 rounded-full">
            <MapPin className="w-4 h-4 text-orange-400" />
            <span className="text-gray-700 text-sm">{doctor.location}</span>
          </div>
        </div>
        <div className="flex justify-end mt-6">
          <button
            className="bg-blue-600 text-white px-4 py-2 text-sm rounded-lg hover:bg-blue-700 transition-colors font-medium"
            onClick={() => onBookAppointment(doctor)}
          >
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default DoctorCard;
