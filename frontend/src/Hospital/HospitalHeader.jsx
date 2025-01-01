import React from "react";
import { Menu } from "lucide-react";

const Header = ({ toggleSidebar, isMobile }) => {
  return (
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
  );
};

export default Header;
