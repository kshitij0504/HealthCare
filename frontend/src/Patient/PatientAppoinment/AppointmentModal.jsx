import React from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import AppointmentScheduler from './AppointmentScheduler';

const AppointmentModal = ({ onClose, onAddAppointment }) => {
  // Function to handle successful appointment booking
  const handleAppointmentBooked = (appointmentData) => {
    // Pass the new appointment data to parent component
    onAddAppointment(appointmentData);
    // Close the modal
    onClose();
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl">
        <AppointmentScheduler 
          onClose={onClose}
          onAppointmentBooked={handleAppointmentBooked}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentModal;