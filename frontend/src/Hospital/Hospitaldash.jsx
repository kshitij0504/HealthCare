import React, { useState, useEffect } from "react";
import { Bar, Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  BarElement,
  Title,
  Tooltip,
  LinearScale,
  Legend,
  ArcElement,
  LineElement,
  PointElement,
} from "chart.js";
import { Menu } from "lucide-react";
import Sidebar from "./HospitalSidebar.jsx";

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  LineElement,
  PointElement,
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
        label: "New Patients",
        data: [30, 50, 20, 40, 35, 55, 25],
        backgroundColor: "#14b8a6",
        borderRadius: 10,
        hoverBackgroundColor: "#2dd4bf",
      },
      {
        label: "Follow-ups",
        data: [20, 35, 15, 30, 25, 40, 20],
        backgroundColor: "#8b5cf6",
        borderRadius: 10,
        hoverBackgroundColor: "#a78bfa",
      },
      {
        label: "Emergency",
        data: [10, 15, 8, 12, 10, 18, 8],
        backgroundColor: "#f97316",
        borderRadius: 10,
        hoverBackgroundColor: "#fb923c",
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#64748b" },
      },
      y: {
        grid: { color: "#f0f0f0" },
        beginAtZero: true,
        ticks: { color: "#64748b" },
      },
    },
    animation: {
      duration: 1000,
      easing: "easeOutBounce",
    },
  };

  const pieChartData = {
    labels: ["Outpatient", "Inpatient", "Emergency", "Surgery", "Consultation"],
    datasets: [
      {
        data: [35, 25, 15, 15, 10],
        backgroundColor: [
          "#14b8a6",
          "#8b5cf6",
          "#f97316",
          "#ec4899",
          "#f59e0b",
        ],
        hoverBackgroundColor: [
          "#2dd4bf",
          "#a78bfa",
          "#fb923c",
          "#f472b6",
          "#fbbf24",
        ],
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
        <nav className="bg-white shadow-sm border-b px-6 py-4 mt-4 flex items-center justify-between">
          <div className="flex items-center h-15">
            {isMobile && (
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-lg hover:bg-teal-50 mr-2 text-teal-600"
              >
                <Menu className="w-6 h-6" />
              </button>
            )}
            <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-gray-600">Welcome, Hospital</span>
            <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center">
              <span className="text-teal-600 font-medium">H</span>
            </div>
          </div>
        </nav>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex justify-between items-center mb-4">
                  <div className="p-3 bg-teal-50 rounded-lg">
                    <span className="w-6 h-6 text-teal-600">{stat.icon}</span>
                  </div>
                  <span className="text-teal-600 text-sm font-medium bg-teal-50 px-2 py-1 rounded-full">
                    {stat.trend}
                  </span>
                </div>
                <h3 className="text-gray-500 text-sm font-medium mb-1">
                  {stat.title}
                </h3>
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">
                Patient Visits
              </h3>
              <Bar data={barChartData} options={barChartOptions} />
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">
                Department Distribution
              </h3>
              <div className="flex justify-center">
                <Pie data={pieChartData} height={200} width={300} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalDashboard;
