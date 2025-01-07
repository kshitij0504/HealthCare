import React, { useState, useEffect } from "react";
import Sidebar from "../HospitalSidebar";
import {
  Search,
  Users,
  Hospital,
  UserCircle,
  Calendar,
  Mail,
  Menu,
  UserRound,
  PersonStanding,
  CircleEqual,
  MapPinHouse,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const PatientList = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/healthorg/getPatient`,
          {
            credentials: "include",
          }
        );
        const result = await response.json();
        setData(result);
        setLoading(false);
      } catch (err) {
        setError("Error fetching data");
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const mainContentClass = `transition-all duration-300 ease-in-out ${
    isSidebarOpen ? "md:ml-64" : "md:ml-20"
  } flex-1 min-h-screen bg-gray-50`;

  if (loading) {
    return (
      <div className="flex h-screen">
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          isMobile={isMobile}
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />
        <div
          className={`flex-1 min-h-screen bg-gray-50 flex justify-center items-center`}
        >
          <div className="text-lg text-gray-600">
            <div className="animate-pulse font-semibold text-xl mb-4">
              Loading patient data...
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen">
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          isMobile={isMobile}
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />
        <div className="flex-1 min-h-screen flex justify-center items-center">
          <Card className="w-96">
            <CardContent className="pt-6">
              <div className="text-red-500 text-center">
                <div className="text-xl font-semibold mb-2">Error</div>
                <p>{error}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const filteredPatients = data?.patients?.filter((patient) =>
    patient.patientName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedPatients = [...(filteredPatients || [])].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.patientName.localeCompare(b.patientName);
      case "appointments":
        return b.appointmentCount - a.appointmentCount;
      default:
        return 0;
    }
  });

  return (
    <div className="flex h-screen">
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <Sidebar
        isSidebarOpen={isSidebarOpen}
        isMobile={isMobile}
        toggleSidebar={toggleSidebar}
      />

      <div className={mainContentClass}>
        <div className="bg-white border-b sticky top-0 z-10">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 h-16">
                {isMobile && (
                  <button onClick={toggleSidebar} className="p-2 rounded-lg">
                    <Menu className="h-6 w-6 text-gray-600" />
                  </button>
                )}
                <h1 className="text-2xl font-semibold text-gray-800">
                  Patient Management
                </h1>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto p-8">
          <Card className="mb-8">
            <CardHeader className="space-y-1">
              <div className="flex items-center gap-2">
                <Hospital className="h-6 w-6 text-blue-500" />
                <CardTitle className="text-2xl">{data.hospitalName}</CardTitle>
              </div>
              <div className="flex items-center gap-2 text-gray-500">
                <Users className="h-5 w-5" />
                <span>Total Patients: {data.patientCount}</span>
              </div>
            </CardHeader>
          </Card>

          <div className="mb-6 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search patients..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Sort by Name</SelectItem>
                <SelectItem value="appointments">
                  Sort by Appointments
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedPatients.map((patient, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <UserCircle className="h-5 w-5 text-blue-500" />
                    {patient.patientName}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Mail className="h-4 w-4" />
                      {patient.patientEmail}
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <UserCircle className="h-4 w-4" />
                      {patient.user.contact}
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <UserRound className="h-4 w-4" />
                      username: {patient.user.username}
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <PersonStanding className="h-4 w-4" />
                      Age: {patient.user.age}
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <CircleEqual className="h-4 w-4" />
                      Gender: {patient.user.gender}
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPinHouse className="h-4 w-4" />
                      Address: {patient.user.address}
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="h-4 w-4" />
                      {patient.appointmentCount} Appointments
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientList;
