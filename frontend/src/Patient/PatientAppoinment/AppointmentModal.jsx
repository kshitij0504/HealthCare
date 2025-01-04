import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import AppointmentScheduler from "./AppointmentScheduler";

const AppointmentModal = ({ onClose, onAddAppointment }) => {
  const handleAppointmentBooked = (appointmentData) => {
    onAddAppointment(appointmentData);
    onClose();
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-h-[100vh] max-w-4xl overflow-y-auto">
        {" "}
        <AppointmentScheduler
          onClose={onClose}
          onAppointmentBooked={handleAppointmentBooked}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentModal;
