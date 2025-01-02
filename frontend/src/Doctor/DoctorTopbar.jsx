import React from "react";

const TopBar = () => {
  return (
    <header className="h-20 bg-white border-b border-gray-100">
      <div className="h-full px-6 flex items-center justify-between">
        <div className="flex-1 max-w-2xl">
          <div className="relative">
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome back, Dr. Smith! 👋
            </h1>
            <p className="mt-1 text-gray-500">
              Here's what's happening with your practice today.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="h-8 w-px bg-gray-200"></div>
          <div className="flex items-center space-x-3">
            <img
              src="/api/placeholder/40/40"
              alt="Doctor profile"
              className="w-10 h-10 rounded-xl border border-gray-200"
            />
            <div className="hidden md:block">
              <div className="text-sm font-medium text-gray-700">
                Dr. John Smith
              </div>
              <div className="text-xs text-gray-500">Cardiology</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
