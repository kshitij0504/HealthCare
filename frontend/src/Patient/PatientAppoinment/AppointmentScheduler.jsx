import { useState, useEffect } from "react";
import axios from "axios";
import { Calendar, Clock, User, Mail } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";

const AppointmentScheduler = ({ onClose, onAppointmentBooked }) => {
  const { currentUser } = useSelector((state) => state.user || {});
  const [organizations, setOrganizations] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [selectedOrganization, setSelectedOrganization] = useState("");
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]); // Original slots from backend
  const [filteredSlots, setFilteredSlots] = useState([]); // Filtered slots
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [patientName, setPatientName] = useState("");
  const [patientEmail, setPatientEmail] = useState("");
  const [bookingStatus, setBookingStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/user/organizations"
        );
        setOrganizations(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to fetch organizations:", error);
        setError("Failed to fetch organizations");
      } finally {
        setLoading(false);
      }
    };
    fetchOrganizations();
  }, []);

  useEffect(() => {
    if (selectedOrganization) {
      const fetchDoctors = async () => {
        try {
          const { data } = await axios.get(
           `http://localhost:5000/user/doctors/${selectedOrganization}`
          );
          setDoctors(data);
          setFilteredDoctors(data);
          setSelectedDoctor("");
        } catch (error) {
          console.error("Failed to fetch doctors:", error);
        }
      };
      fetchDoctors();
    }
  }, [selectedOrganization]);

  const filterTimeSlots = (slots) => {
    const now = new Date();
    const selectedDateTime = new Date(selectedDate);
    const isToday = selectedDateTime.toDateString() === now.toDateString();

    // Get current time in minutes since midnight
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentTimeInMinutes = currentHour * 60 + currentMinute;

    // Add buffer time (e.g., 15 minutes) to prevent booking slots too close to current time
    const bufferTime = 15;
    const cutoffTimeInMinutes = currentTimeInMinutes + bufferTime;

    return slots.filter((slot) => {
      // Convert slot time to minutes since midnight
      const [slotHours, slotMinutes] = slot.startTime.split(":").map(Number);
      const slotTimeInMinutes = slotHours * 60 + slotMinutes;

      if (isToday) {
        // For today, only show slots that are after current time + buffer
        return slotTimeInMinutes > cutoffTimeInMinutes;
      }

      // For future dates, show all slots
      return true;
    });
  };

  useEffect(() => {
    const fetchTimeSlots = async () => {
      if (selectedDate && selectedDoctor) {
        try {
          const { data } = await axios.get(
            "http://localhost:5000/user/available-slots",
            {
              params: {
                doctorId: selectedDoctor,
                date: selectedDate,
              },
            }
          );

          // Store original slots
          setTimeSlots(data);

          // Apply filtering
          const filtered = filterTimeSlots(data);
          setAvailableSlots(filtered);

          // Clear selected slot if it's no longer available
          if (
            selectedSlot &&
            !filtered.find(
              (slot) =>
                slot.startTime === selectedSlot.startTime &&
                slot.endTime === selectedSlot.endTime
            )
          ) {
            setSelectedSlot(null);
          }
        } catch (error) {
          console.error("Failed to fetch available slots:", error);
          setError("Failed to fetch available slots");
        }
      }
    };

    fetchTimeSlots();
  }, [selectedDate, selectedDoctor]);

  const handleDateSelect = async (date) => {
    setSelectedDate(date);
    try {
      const { data } = await axios.get(
        "http://localhost:5000/user/available-slots",
        {
          params: {
            doctorId: selectedDoctor,
            date: date,
          },
        }
      );
      const filteredSlots = filterTimeSlots(data);
      setAvailableSlots(filteredSlots);
    } catch (error) {
      console.error("Failed to fetch available slots:", error);
    }
  };

  const handleBooking = async () => {
    if (
      !selectedOrganization ||
      !selectedDoctor ||
      !selectedDate ||
      !selectedSlot ||
      !patientName ||
      !patientEmail
    ) {
      setBookingStatus("Please fill in all fields");
      return;
    }

    try {
      const { data } = await axios.post(
        "http://localhost:5000/user/book-appointment",
        {
          scheduleId: selectedSlot.scheduleId,
          date: selectedDate,
          startTime: selectedSlot.startTime,
          endTime: selectedSlot.endTime,
          patientName,
          patientEmail,
          userId: currentUser.data.id,
        }
      );

      // Create the appointment object for the list
      const selectedDoctorInfo = doctors.find((d) => d.id === selectedDoctor);
      const selectedOrgInfo = organizations.find(
        (o) => o.id === selectedOrganization
      );

      const newAppointment = {
        _id: data.appointmentId, // Assuming the API returns this
        doctorName: selectedDoctorInfo ? `${selectedDoctorInfo.firstname} ${selectedDoctorInfo.lastname}` : '',
        organizationName: selectedOrgInfo ? selectedOrgInfo.name : '',
        date: selectedDate,
        startTime: selectedSlot.startTime,
        status: "Scheduled",
        type: "Consultation",
      };

      setBookingStatus("Appointment booked successfully!");

      // Notify parent component of successful booking
      if (onAppointmentBooked) {
        onAppointmentBooked(newAppointment);
      }

      // Close modal after short delay to show success message
      setTimeout(() => {
        if (onClose) {
          onClose();
        }
      }, 2000);
    } catch (error) {
      console.error("Failed to book appointment:", error);
      setBookingStatus("Failed to book appointment");
    }
  };

  return (
    <div>
      <div className="w-100">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-teal-900">
            Schedule an Appointment
          </CardTitle>
          <p className="text-teal-600">
            Book your consultation in few easy steps
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-teal-900">
              Select Organization
            </label>
            <Select
              value={selectedOrganization}
              onValueChange={setSelectedOrganization}
            >
              <SelectTrigger className="w-full border-teal-200 hover:border-teal-300 focus:ring-teal-500">
                <SelectValue placeholder="Select an organization..." />
              </SelectTrigger>
              <SelectContent>
                {organizations.map((org) => (
                  <SelectItem key={org.id} value={org.id}>
                    {org.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {filteredDoctors.length > 0 && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-teal-900">
                Select Doctor
              </label>
              <Select value={selectedDoctor} onValueChange={setSelectedDoctor}>
                <SelectTrigger className="w-full border-teal-200 hover:border-teal-300 focus:ring-teal-500">
                  <SelectValue placeholder="Select a doctor..." />
                </SelectTrigger>
                <SelectContent>
                  {filteredDoctors.map((doctor) => (
                    <SelectItem key={doctor.id} value={doctor.id}>
                      {doctor.firstname} - {doctor.specialty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium text-teal-900">
              Select Date
            </label>
            <div className="relative">
              <Calendar
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-500"
                size={20}
              />
              <Input
                type="date"
                className="pl-10 border-teal-200 hover:border-teal-300 focus:ring-teal-500"
                value={selectedDate}
                onChange={(e) => handleDateSelect(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
              />
            </div>
          </div>

          {availableSlots.length > 0 ? (
            <div className="space-y-2">
              <label className="text-sm font-medium text-teal-900">
                Available Slots
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {availableSlots.map((slot, index) => (
                  <Button
                    key={index}
                    variant={selectedSlot === slot ? "default" : "outline"}
                    className={`p-3 h-auto ${
                      selectedSlot === slot
                        ? "bg-teal-600 hover:bg-teal-700 text-white"
                        : "border-teal-200 hover:border-teal-300 hover:bg-teal-50"
                    }`}
                    onClick={() => setSelectedSlot(slot)}
                  >
                    <Clock className="mr-2" size={16} />
                    <span className="text-sm">
                      {slot.startTime} - {slot.endTime}
                    </span>
                  </Button>
                ))}
              </div>
            </div>
          ) : (
            selectedDate && (
              <div className="text-center text-teal-600">
                No available slots for the selected date
              </div>
            )
          )}

          {selectedSlot && (
            <div className="space-y-4 bg-white p-4 rounded-lg border border-teal-100">
              <div className="space-y-2">
                <label className="text-sm font-medium text-teal-900">
                  Name
                </label>
                <div className="relative">
                  <User
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-500"
                    size={20}
                  />
                  <Input
                    type="text"
                    className="pl-10 border-teal-200 hover:border-teal-300 focus:ring-teal-500"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    placeholder="Enter your name"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-teal-900">
                  Email
                </label>
                <div className="relative">
                  <Mail
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-500"
                    size={20}
                  />
                  <Input
                    type="email"
                    className="pl-10 border-teal-200 hover:border-teal-300 focus:ring-teal-500"
                    value={patientEmail}
                    onChange={(e) => setPatientEmail(e.target.value)}
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <Button
                className="w-full bg-teal-600 hover:bg-teal-700 text-white"
                onClick={handleBooking}
              >
                Book Appointment
              </Button>

              {bookingStatus && (
                <div
                  className={`text-center p-3 rounded-md ${
                    bookingStatus.includes("successful")
                      ? "bg-teal-50 text-teal-800 border border-teal-200"
                      : "bg-red-50 text-red-800 border border-red-200"
                  }`}
                >
                  {bookingStatus}
                </div>
              )}
            </div>
          )}
        </CardContent>
      </div>
    </div>
  );
};

export default AppointmentScheduler;
