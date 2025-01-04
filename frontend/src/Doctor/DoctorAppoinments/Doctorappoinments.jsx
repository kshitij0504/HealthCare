import React, { useState } from "react";
import {
  Menu,
  X,
  Home,
  Users,
  Calendar,
  FileText,
  Settings,
  Bell,
  Search,
  ChevronDown,
  ArrowLeftToLine,
  ArrowRightToLine,
  LayoutPanelTop,
} from "lucide-react";

const DoctorDashboard = () => {
  const [sidebarState, setSidebarState] = useState("full"); // 'full', 'mini', 'closed'

  const toggleSidebar = (state) => {
    setSidebarState(state);
  };

  const getSidebarWidth = () => {
    switch (sidebarState) {
      case "full":
        return "w-64";
      case "mini":
        return "w-20";
      case "closed":
        return "w-0";
      default:
        return "w-64";
    }
  };

  const stats = [
    { label: "Total Patients", value: "1,234" },
    { label: "Today's Appointments", value: "28" },
    { label: "Pending Reports", value: "15" },
    { label: "Total Revenue", value: "$12,345" },
  ];

  const appointments = [
    { id: 1, name: "Sarah Johnson", time: "09:00 AM", type: "Check-up" },
    { id: 2, name: "Mike Peters", time: "10:30 AM", type: "Follow-up" },
    { id: 3, name: "Emma Wilson", time: "02:00 PM", type: "Consultation" },
  ];

  const navigationItems = [
    { icon: Home, text: "Dashboard" },
    { icon: Users, text: "Patients" },
    { icon: Calendar, text: "Appointments" },
    { icon: FileText, text: "Reports" },
    { icon: Settings, text: "Settings" },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed md:relative transition-all duration-300 h-full bg-white shadow-lg ${getSidebarWidth()}`}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b flex justify-between items-center">
            {sidebarState !== "mini" && (
              <h2 className="text-xl font-bold text-blue-600">Dr. Dashboard</h2>
            )}
            {sidebarState === "mini" && (
              <LayoutPanelTop className="text-blue-600" />
            )}
          </div>

          <nav className="flex-1 p-4 space-y-2">
            {navigationItems.map((item, index) => (
              <button
                key={index}
                className="flex items-center w-full p-3 text-gray-600 rounded-lg hover:bg-blue-50 hover:text-blue-600"
              >
                <item.icon className="w-5 h-5" />
                {sidebarState === "full" && (
                  <span className="ml-3">{item.text}</span>
                )}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between p-4">
            <div className="flex space-x-2">
              <button
                onClick={() => toggleSidebar("full")}
                className="p-2 rounded-lg hover:bg-gray-100"
                title="Full Sidebar"
              >
                <Menu />
              </button>
              <button
                onClick={() => toggleSidebar("mini")}
                className="p-2 rounded-lg hover:bg-gray-100"
                title="Mini Sidebar"
              >
                <ArrowLeftToLine />
              </button>
              <button
                onClick={() => toggleSidebar("closed")}
                className="p-2 rounded-lg hover:bg-gray-100"
                title="Close Sidebar"
              >
                <ArrowRightToLine />
              </button>
            </div>

            <div className="flex items-center flex-1 px-4 space-x-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
              <button className="p-2 text-gray-500 hover:text-gray-700">
                <Bell className="w-6 h-6" />
              </button>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <p className="text-gray-500 text-sm">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-800 mt-2">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Today's Appointments</h3>
              <button className="flex items-center text-blue-600 hover:text-blue-700">
                <span className="mr-2">View All</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-gray-500 border-b">
                    <th className="pb-3">Patient Name</th>
                    <th className="pb-3">Time</th>
                    <th className="pb-3">Type</th>
                    <th className="pb-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((app) => (
                    <tr key={app.id} className="border-b">
                      <td className="py-4">{app.name}</td>
                      <td className="py-4">{app.time}</td>
                      <td className="py-4">{app.type}</td>
                      <td className="py-4">
                        <button className="px-4 py-2 text-sm text-blue-600 hover:text-blue-700">
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DoctorDashboard;
