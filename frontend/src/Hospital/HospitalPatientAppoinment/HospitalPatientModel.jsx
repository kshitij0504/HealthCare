import React from "react";
import { X, Calendar, Mail, User, Activity, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

const PatientModal = ({
  isViewModalOpen,
  selectedPatient,
  setIsViewModalOpen,
}) => {
  if (!isViewModalOpen || !selectedPatient) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-sm">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="relative w-full max-w-2xl rounded-xl bg-white shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between border-b p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                <User className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Patient Details
                </h3>
                <p className="text-sm text-gray-500">
                  View patient information
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsViewModalOpen(false)}
              className="rounded-full"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="space-y-6">
              {/* Patient Info */}
              <div className="rounded-lg bg-gray-50 p-4">
                <h4 className="text-lg font-semibold text-gray-900">
                  {selectedPatient.patientName}
                </h4>
                <div className="mt-2 flex items-center gap-2 text-gray-600">
                  <Mail className="h-4 w-4" />
                  <span className="text-sm">
                    {selectedPatient.patientEmail}
                  </span>
                </div>
              </div>

              {/* Appointments */}
              <div>
                <div className="mb-4 flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  <h4 className="text-lg font-semibold text-gray-900">
                    Appointment History
                  </h4>
                </div>

                <ScrollArea className="h-64">
                  <div className="space-y-4">
                    {selectedPatient.appointments.map((appointment, index) => (
                      <Card key={index}>
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <User className="h-4 w-4 text-gray-500" />
                                <p className="font-medium text-gray-900">
                                  Dr. {appointment.doctor.firstname}{" "}
                                  {appointment.doctor.lastname}
                                </p>
                              </div>
                              <div className="flex items-center gap-2">
                                <Activity className="h-4 w-4 text-gray-500" />
                                <p className="text-sm text-gray-600">
                                  {appointment.doctor.specialty}
                                </p>
                              </div>
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-gray-500" />
                                <p className="text-sm text-gray-600">
                                  {new Date(
                                    appointment.date
                                  ).toLocaleDateString("en-US", {
                                    weekday: "long",
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  })}
                                </p>
                              </div>
                            </div>
                            <Badge variant="secondary">#{index + 1}</Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientModal;
