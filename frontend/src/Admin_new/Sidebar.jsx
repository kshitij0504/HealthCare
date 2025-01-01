import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Building2,
  Users,
  Activity,
  Calendar,
  LogOut,
  Award,
  Settings,
  ChevronRight,
} from 'lucide-react';

const Sidebar = ({ activeNav, setActiveNav }) => {
  const navItems = [
    { icon: Settings, name: 'Dashboard', path: '/admin-dash' },
    { icon: Building2, name: 'Hospitals', path: '/admin-hospital' },
    { icon: Activity, name: 'Analytics', path: '/admin-analytics' },
    { icon: Users, name: 'Doctors', path: '/admin-doctor' },
    { icon: Calendar, name: 'Patients', path: '/admin-Patient' },
  ];

  return (
    <div className="fixed w-64 h-full bg-white border-r border-gray-200 p-4 shadow-sm">
      {/* Sidebar Header */}
      <div className="flex items-center space-x-2 mb-8 p-4">
        {/* Logo */}
        <img
          src="../../../assets/CureNest_logo.svg"
          alt="Logo"
          className="h-50 w-100 object-contain"
        />
        
      </div>

      {/* Navigation */}
      <nav className="space-y-2">
        {navItems.map((item) => (
          <NavLink
            to={item.path}
            key={item.name}
            className={({ isActive }) =>
              `w-full flex items-center justify-between text-black-800 hover:bg-teal-50 group transition-all duration-200 p-2 rounded-lg ${
                isActive ? 'bg-teal-50 font-medium' : ''
              }`
            }
            onClick={() => setActiveNav(item.name)}
          >
            <div className="flex items-center">
              <item.icon className="mr-2 h-5 w-5" />
              {item.name}
            </div>
            <ChevronRight
              className="h-4 w-4 transition-transform duration-200 opacity-0 group-hover:opacity-100"
            />
          </NavLink>
        ))}

        {/* Logout Button */}
        <Button
          variant="ghost"
          className="w-full justify-start text-red-500 hover:bg-red-50 mt-auto"
        >
          <LogOut className="mr-2 h-5 w-5" />
          Logout
        </Button>
      </nav>
    </div>
  );
};

export default Sidebar;
