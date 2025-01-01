import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const AppointmentCard = ({ appointment }) => {
  return (
    <Card
      key={appointment.id}
      className="overflow-hidden hover:shadow-lg transition-shadow"
    >
      <CardContent className="p-4">
        <div className="flex items-center space-x-4 mb-4">
          <img
            src={appointment.avatar}
            alt=""
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h3 className="font-medium text-gray-900">
              {appointment.patientName}
            </h3>
            <p className="text-sm text-gray-500">{appointment.specialty}</p>
          </div>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-gray-500">Doctor:</span>
            <span className="font-medium">{appointment.doctor}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-500">Phone:</span>
            <span>{appointment.phone}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-500">Gender:</span>
            <span>{appointment.gender}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-500">Date & Time:</span>
            <span>{`${appointment.appointmentDate} ${appointment.time}`}</span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t">
          <p className="text-sm text-gray-600">
            <span className="font-medium">Address:</span> {appointment.address}
          </p>
        </div>

        <div className="mt-4 flex justify-end">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              appointment.status === "Confirmed"
                ? "bg-green-100 text-green-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {appointment.status}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default AppointmentCard;
