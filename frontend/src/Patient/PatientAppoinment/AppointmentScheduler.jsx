import { useState, useEffect } from "react";
import axios from "axios";
import { Calendar, Clock, User, Mail, Heart, Sun, FlaskConical, Pill, Scissors, UserRound, Microscope, Stethoscope, Activity, Brain, Eye, Bone, Baby, Syringe } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";

const SPECIALTIES = [
  { name: "Cardiology", icon: Heart, description: "[❤️] Heart and cardiovascular system" },
  { name: "Dermatology", icon: Sun, description: "[🌞] Skin conditions and treatments" },
  { name: "Endocrinology", icon: FlaskConical, description: "[⚗️] Hormone and metabolic disorders" },
  { name: "Gastroenterology", icon: Pill, description: "[💊] Digestive system disorders" },
  { name: "General Surgery", icon: Scissors, description: "[✂️] Surgical procedures" },
  { name: "Gynecology", icon: UserRound, description: "[👩] Women's health" },
  { name: "Hematology", icon: Microscope, description: "[🔬] Blood disorders" },
  { name: "Internal Medicine", icon: Stethoscope, description: "[👨‍⚕️] General adult medicine" },
  { name: "Nephrology", icon: Activity, description: "[🫘] Kidney diseases" },
  { name: "Neurology", icon: Brain, description: "[🧠] Nervous system disorders" },
  { name: "Ophthalmology", icon: Eye, description: "[👁️] Eye care and surgery" },
  { name: "Orthopedics", icon: Bone, description: "[🦴] Musculoskeletal system" },
  { name: "Pediatrics", icon: Baby, description: "[👶] Children's health" },
  { name: "Pulmonology", icon: Stethoscope, description: "[🫁] Respiratory system" },
  { name: "Radiology", icon: Syringe, description: "[💉] Medical imaging" },
  { name: "Rheumatology", icon: Bone, description: "[🦴] Joint and autoimmune diseases" }
];

const AppointmentScheduler = ({ onClose, onAppointmentBooked }) => {
  const { currentUser } = useSelector((state) => state.user || {});
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [organizations, setOrganizations] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [selectedOrganization, setSelectedOrganization] = useState("");
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [patientName, setPatientName] = useState("");
  const [patientEmail, setPatientEmail] = useState("");
  const [bookingStatus, setBookingStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch organizations when specialty is selected
  useEffect(() => {
    if (selectedSpecialty) {
      const fetchOrganizationsBySpecialty = async () => {
        setLoading(true);
        try {
          const { data } = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/user/organizations-by-specialty/${selectedSpecialty}`
          );
          console.log(data)
          setOrganizations(Array.isArray(data.organizations) ? data.organizations : []);
          setSelectedOrganization(""); // Reset organization selection
          setDoctors([]); // Reset doctors
          setFilteredDoctors([]); // Reset filtered doctors
        } catch (error) {
          console.error("Failed to fetch organizations:", error);
          setError("Failed to fetch organizations");
        } finally {
          setLoading(false);
        }
      };
      fetchOrganizationsBySpecialty();
    }
  }, [selectedSpecialty]);

  // Fetch doctors when organization is selected
  useEffect(() => {
    if (selectedOrganization && selectedSpecialty) {
      const fetchDoctorsBySpecialty = async () => {
        try {
          const { data } = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/user/user/doctors/${selectedOrganization}/${selectedSpecialty}`
          );
          console.log(data.doctors)
          setDoctors(data.doctors);
          setFilteredDoctors(data.doctors);
          setSelectedDoctor("");
        } catch (error) {
          console.error("Failed to fetch doctors:", error);
        }
      };
      fetchDoctorsBySpecialty();
    }
  }, [selectedOrganization, selectedSpecialty]);

  const filterTimeSlots = (slots) => {
    const now = new Date();
    const selectedDateTime = new Date(selectedDate);
    const isToday = selectedDateTime.toDateString() === now.toDateString();
    const currentTimeInMinutes = now.getHours() * 60 + now.getMinutes();
    const bufferTime = 15;
    const cutoffTimeInMinutes = currentTimeInMinutes + bufferTime;

    return slots.filter((slot) => {
      const [slotHours, slotMinutes] = slot.startTime.split(":").map(Number);
      const slotTimeInMinutes = slotHours * 60 + slotMinutes;
      return !isToday || slotTimeInMinutes > cutoffTimeInMinutes;
    });
  };

  useEffect(() => {
    if (selectedDate && selectedDoctor) {
      const fetchTimeSlots = async () => {
        try {
          const { data } = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/user/available-slots`,
            {
              params: { doctorId: selectedDoctor, date: selectedDate }
            }
          );
          setAvailableSlots(filterTimeSlots(data));
          if (selectedSlot && !data.find(slot => 
            slot.startTime === selectedSlot.startTime && 
            slot.endTime === selectedSlot.endTime
          )) {
            setSelectedSlot(null);
          }
        } catch (error) {
          console.error("Failed to fetch available slots:", error);
          setError("Failed to fetch available slots");
        }
      };
      fetchTimeSlots();
    }
  }, [selectedDate, selectedDoctor]);

  const handleBooking = async () => {
    if (!selectedSpecialty || !selectedOrganization || !selectedDoctor || 
        !selectedDate || !selectedSlot || !patientName || !patientEmail) {
      setBookingStatus("Please fill in all fields");
      return;
    }

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/user/book-appointment`,
        {
          scheduleId: selectedSlot.scheduleId,
          date: selectedDate,
          startTime: selectedSlot.startTime,
          endTime: selectedSlot.endTime,
          patientName,
          patientEmail,
          userId: currentUser.data.id,
          specialty: selectedSpecialty
        }
      );

      const selectedDoctorInfo = doctors.find((d) => d.id === selectedDoctor);
      const selectedOrgInfo = organizations.find((o) => o.id === selectedOrganization);

      const newAppointment = {
        _id: data.appointmentId,
        doctorName: selectedDoctorInfo ? `${selectedDoctorInfo.firstname} ${selectedDoctorInfo.lastname}` : '',
        organizationName: selectedOrgInfo ? selectedOrgInfo.name : '',
        specialty: selectedSpecialty,
        date: selectedDate,
        startTime: selectedSlot.startTime,
        status: "Scheduled",
        type: "Consultation"
      };

      setBookingStatus("Appointment booked successfully!");
      if (onAppointmentBooked) {
        onAppointmentBooked(newAppointment);
      }
      setTimeout(() => {
        if (onClose) onClose();
      }, 2000);
    } catch (error) {
      console.error("Failed to book appointment:", error);
      setBookingStatus("Failed to book appointment");
    }
  };

  return (
    <div className="w-full">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-teal-900">
          Schedule an Appointment
        </CardTitle>
        <p className="text-teal-600">
          Book your consultation in few easy steps
        </p>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Specialty Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-teal-900">
            Select Specialty
          </label>
          <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
            <SelectTrigger className="w-full border-teal-200 hover:border-teal-300 focus:ring-teal-500">
              <SelectValue placeholder="Select a specialty..." />
            </SelectTrigger>
            <SelectContent>
              {SPECIALTIES.map((specialty) => {
                const SpecialtyIcon = specialty.icon;
                return (
                  <SelectItem key={specialty.name} value={specialty.name}>
                    <div className="flex items-center space-x-2">
                      <SpecialtyIcon className="w-4 h-4" />
                      <span>{specialty.name}</span>
                    </div>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>

        {/* Organization Selection */}
        {selectedSpecialty && organizations.length > 0 && (
          <div className="space-y-2">
            <label className="text-sm font-medium text-teal-900">
              Select Organization
            </label>
            <Select value={selectedOrganization} onValueChange={setSelectedOrganization}>
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
        )}

        {/* Doctor Selection */}
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
                    {doctor.firstname} {doctor.lastname} - {selectedSpecialty}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Date Selection */}
        {selectedDoctor && (
          <div className="space-y-2">
            <label className="text-sm font-medium text-teal-900">
              Select Date
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-500" size={20} />
              <Input
                type="date"
                className="pl-10 border-teal-200 hover:border-teal-300 focus:ring-teal-500"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
              />
            </div>
          </div>
        )}

        {/* Time Slots */}
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

        {/* Patient Information */}
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

            {/* Booking Summary */}
            <div className="mt-4 p-4 bg-teal-50 rounded-lg">
              <h3 className="text-lg font-semibold text-teal-900 mb-2">Booking Summary</h3>
              <div className="space-y-2 text-sm text-teal-700">
                <p><span className="font-medium">Specialty:</span> {selectedSpecialty}</p>
                <p><span className="font-medium">Organization:</span> {organizations.find(org => org.id === selectedOrganization)?.name}</p>
                <p><span className="font-medium">Doctor:</span> {doctors.find(doc => doc.id === selectedDoctor)?.firstname} {doctors.find(doc => doc.id === selectedDoctor)?.lastname}</p>
                <p><span className="font-medium">Date:</span> {new Date(selectedDate).toLocaleDateString()}</p>
                <p><span className="font-medium">Time:</span> {selectedSlot.startTime} - {selectedSlot.endTime}</p>
              </div>
            </div>

            {/* Book Button */}
            <Button
              className="w-full bg-teal-600 hover:bg-teal-700 text-white"
              onClick={handleBooking}
              disabled={loading}
            >
              {loading ? "Booking..." : "Book Appointment"}
            </Button>

            {/* Booking Status Message */}
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

            {/* Error Message */}
            {error && (
              <div className="text-center p-3 rounded-md bg-red-50 text-red-800 border border-red-200">
                {error}
              </div>
            )}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center p-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
          </div>
        )}
      </CardContent>
    </div>
  );
};

export default AppointmentScheduler;