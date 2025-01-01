import React, { useState, useEffect } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  BarElement,
  Title,
  Tooltip,
  LinearScale,
  Legend,
  ArcElement,
} from "chart.js";
import Sidebar from "./HospitalSidebar.jsx";
import { Menu } from "lucide-react";

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const MedicalDashboard = () => {
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

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const stats = [
    { title: "Appointments", value: "213", icon: "Calendar", trend: "+2.5%" },
    { title: "Patients", value: "104", icon: "Users", trend: "+3.8%" },
    { title: "Doctors", value: "24", icon: "Activity", trend: "+1.4%" },
    { title: "Hospital", value: "$12,174", icon: "DollarSign", trend: "+4.2%" },
  ];

  const barChartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Patients",
        data: [30, 50, 20, 40, 35, 55, 25],
        backgroundColor: "#4caf50",
        borderRadius: 10,
        hoverBackgroundColor: "#81c784",
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
          },
        },
      },
    },
    scales: {
      x: { grid: { display: false } },
      y: {
        grid: { color: "#f0f0f0" },
        beginAtZero: true,
      },
    },
    animation: {
      duration: 1000,
      easing: "easeOutBounce",
    },
  };

  const pieChartData = {
    labels: ["Patients", "Doctors", "Hospitals"],
    datasets: [
      {
        data: [70, 20, 10],
        backgroundColor: ["#4caf50", "#2196f3", "#ff9800"],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <Sidebar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        isMobile={isMobile}
      />

      <div
        className={`transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "md:ml-64" : "md:ml-20"
        }`}
      >
        <nav className="bg-white border-b px-4 py-3 mt-4 flex items-center justify-between">
          <div className="flex items-center">
            {isMobile && (
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-lg hover:bg-gray-100 mr-2"
              >
                <Menu className="w-6 h-6" />
              </button>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-gray-600">Welcome, Doctor</span>
            <img
              src="https://via.placeholder.com/40"
              alt="Avatar"
              className="w-10 h-6 rounded-full object-cover"
            />
          </div>
        </nav>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <span className="w-6 h-6 text-blue-600">{stat.icon}</span>
                  </div>
                  <span className="text-green-500 text-sm">{stat.trend}</span>
                </div>
                <h3 className="text-gray-500 text-sm mb-1">{stat.title}</h3>
                <p className="text-2xl font-semibold">{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Weekly Patients</h3>
              <Bar data={barChartData} options={barChartOptions} />
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Distribution</h3>
              <Pie data={pieChartData} height={200} width={300} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalDashboard;
