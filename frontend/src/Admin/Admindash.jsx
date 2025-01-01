import { Bar, Pie } from "react-chartjs-2";
import {
  ChevronRight,
  ChevronLeft,
  Menu,
  Home,
  Calendar,
  Users,
  Activity,
  DollarSign,
  LogOut,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";

// Registering Chart.js components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
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

  // Stats data for the dashboard cards
  const stats = [
    { title: "Appointments", value: "213", icon: Calendar, trend: "+2.5%" },
    { title: "Patients", value: "104", icon: Users, trend: "+3.8%" },
    { title: "Doctors", value: "24", icon: Activity, trend: "+1.4%" },
    { title: "Hospital", value: "$12,174", icon: DollarSign, trend: "+4.2%" },
  ];

  // Sidebar menu items
  const menuItems = [
    { icon: Home, label: "Dashboard", path: "/admindash" },
    {
      icon: Calendar,
      label: "Appointments",
      path: "/admin-patient-appointments",
    },
    { icon: Activity, label: "Doctors", path: "/admin-doctors" },
    { icon: Users, label: "Patients", path: "/admin-patients" },
    { icon: LogOut, label: "LogOut", path: "/signin" },
  ];

  // Bar Chart Data
  const barChartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Patients",
        data: [30, 50, 20, 40, 35, 55, 25],
        backgroundColor: "#4caf50",
        borderRadius: 10, // Rounded bars for a smoother look
        hoverBackgroundColor: "#81c784", // Change color on hover
      },
    ],
  };

  // Bar Chart Options
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
      duration: 1000, // Smooth animation on render
      easing: "easeOutBounce", // Bounce effect when the chart is rendered
    },
  };

  // Horizontal Bar Chart Data (new type)
  const horizontalBarData = {
    labels: ["Doctors", "Appointments", "Patients", "Hospitals"],
    datasets: [
      {
        label: "Statistics",
        data: [24, 213, 104, 12],
        backgroundColor: "#2196f3",
        borderRadius: 10,
        hoverBackgroundColor: "#64b5f6",
      },
    ],
  };

  // Horizontal Bar Chart Options
  const horizontalBarOptions = {
    indexAxis: "y", // Makes it a horizontal bar chart
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
      x: { beginAtZero: true, grid: { color: "#f0f0f0" } },
      y: { grid: { display: false } },
    },
    animation: {
      duration: 1200,
      easing: "easeInOutQuad",
    },
  };

  // Pie Chart Data
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

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen bg-white border-r transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "w-64" : "w-20"
        } ${
          isMobile && !isSidebarOpen ? "-translate-x-full" : "translate-x-0"
        }`}
      >
        <div className="h-full flex flex-col">
          <div
            className={`flex items-center h-16 px-4 border-b ${
              isSidebarOpen ? "justify-between" : "justify-center"
            }`}
          >
            {isSidebarOpen ? (
              <>
                <span className="text-xl font-bold text-blue-600">MedFlex</span>
                {!isMobile && (
                  <button
                    onClick={toggleSidebar}
                    className="p-2 rounded-lg hover:bg-gray-100 text-gray-500"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                )}
              </>
            ) : (
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-lg hover:bg-gray-100 text-gray-500"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
          </div>
          <nav className="flex-1 px-3 py-4 space-y-1">
            {menuItems.map((item, index) => (
              <Link key={index} to={item.path}>
                <button
                  className={`flex items-center w-full rounded-lg text-left transition-colors ${
                    isSidebarOpen ? "px-4 py-3" : "p-3 justify-center"
                  }`}
                >
                  <item.icon
                    className={`w-5 h-5 ${isSidebarOpen ? "mr-3" : ""}`}
                  />
                  {isSidebarOpen && <span>{item.label}</span>}
                </button>
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      <div
        className={`transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "md:ml-64" : "md:ml-20"
        }`}
      >
        <nav className="bg-white border-b px-4 py-3 mt-4">
          <div className="flex items-center justify-between">
            {isMobile && (
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-lg hover:bg-gray-100 mr-2"
              >
                <Menu className="w-6 h-6" />
              </button>
            )}
          </div>
        </nav>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <stat.icon className="w-6 h-6 text-blue-600" />
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
