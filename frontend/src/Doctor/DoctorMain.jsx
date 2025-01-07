import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Users, Clock, Bell, Search, Menu } from "lucide-react";

const MainContent = ({ sidebarOpen, setSidebarOpen }) => {
  const stats = [
    {
      icon: TrendingUp,
      label: "Total Appointments",
      value: "1,234",
      change: "+12%",
    },
    { icon: Users, label: "New Patients", value: "321", change: "+8%" },
    { icon: Clock, label: "Avg. Wait Time", value: "18 min", change: "-5%" },
  ];

  return (
    <div className="md:ml-64 min-h-screen">
      <header className="bg-white shadow-sm">
        <div className="flex items-center justify-between px-4 py-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Menu className="w-6 h-6 text-gray-500" />
          </button>

          <div className="flex items-center flex-1 px-4 md:px-6 mb-2">
            <div className="max-w-md w-full relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative">
              <Bell className="w-6 h-6 text-gray-500" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                3
              </span>
            </button>
            <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center">
              <span className="text-teal-600 font-medium">DR</span>
            </div>
          </div>
        </div>
      </header>

      <main className="p-4 md:p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">{stat.label}</p>
                    <p className="text-2xl font-semibold mt-1">{stat.value}</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <stat.icon className="w-8 h-8 text-teal-500 mb-2" />
                    <span
                      className={`text-sm ${
                        stat.change.startsWith("+")
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {stat.change}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Recent Appointments
              </h3>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Patient Statistics</h3>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default MainContent;
