import React, { useState, useEffect } from "react";
import Sidebar from "./Doctorsidebar";
import TopBar from "./DoctorTopbar";
import AnalyticsCard from "./Doctoranalyticalcard";
import AppointmentsTimeline from "./DoctorAppoinmets";

const DoctorDashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [location, setLocation] = useState(window.location.pathname);
  const [stats, setStats] = useState({});
  const [analyticsData, setAnalyticsData] = useState({});

  useEffect(() => {
    setStats({
      totalPatients: 300,
      patientsToday: 5,
      newPatients: 2,
      pendingAppointments: 3,
    });

    setAnalyticsData({
      patients: { count: 300, trend: "+10", period: "This Week" },
      revenue: { count: "$12,500", trend: "+5%", period: "This Month" },
      appointments: { count: 20, trend: "-2", period: "This Week" },
    });
  }, []);

  return (
    <div className="flex">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setSidebarOpen={setSidebarOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        location={location}
      />
      <div
        className={`flex-1 transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-20"
        }`}
      >
        <TopBar />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          <AnalyticsCard key="patients" data={analyticsData.patients} />
          <AnalyticsCard key="revenue" data={analyticsData.revenue} />
          <AnalyticsCard key="appointments" data={analyticsData.appointments} />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
          <AppointmentsTimeline />
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
