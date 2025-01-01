import React, { useState } from "react";
import Sidebar from "../PatientSidebar";
import TrackerCard from "../PatinentTrackCard";
import SearchBar from "../Searchbar";
import {
  Droplet,
  Heart,
  Activity,
  Scale,
  Clock,
  Footprints,
  Thermometer,
  Menu,
} from "lucide-react";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const trackers = [
    {
      icon: Droplet,
      title: "Blood Pressure",
      value: "120/80 mmHg",
      source: "iHealth",
    },
    {
      icon: Heart,
      title: "Heart Rate",
      value: "90 BPM",
      source: "Apple Health",
    },
    {
      icon: Activity,
      title: "Blood Glucose",
      value: "146 mg/dL",
      source: "Abbott",
    },
    {
      icon: Scale,
      title: "Calories (Burned)",
      value: "1200 cal",
      source: "Google Fit",
      progress: 75,
    },
    {
      icon: Clock,
      title: "Sleep",
      value: "09:15:00",
      source: "Manual Entry",
      progress: 50,
    },
    {
      icon: Footprints,
      title: "Steps",
      value: "6000",
      source: "Fitbit",
      progress: 60,
    },
    { icon: Scale, title: "BMI", value: "20 (120 lbs)", source: "iHealth" },
    {
      icon: Thermometer,
      title: "Temperature",
      value: "97.7 F",
      source: "iHealth",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="lg:ml-64 transition-margin duration-200 ease-in-out">
        <header className="bg-white border-b">
          <div className="flex items-center justify-between px-6 py-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 lg:hidden"
            >
              <Menu className="w-6 h-6" />
            </button>

            <SearchBar />
          </div>
        </header>

        <main className="p-6">
          <h1 className="text-2xl font-semibold mb-6">My Trackers</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trackers.map((tracker) => (
              <TrackerCard key={tracker.title} {...tracker} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
