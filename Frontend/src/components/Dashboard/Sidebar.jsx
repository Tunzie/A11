import React, { useState } from 'react';
import { Wind, Droplet, PhoneCall, CircleAlert, CloudSunRain, Settings, CircleHelp, LandPlot, LayoutDashboard } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  // Handle button pressed on the sidebar.
  const handleButtonClick = (route) => {
    navigate(route);
  };
// Define an array of navigation items for the application each item in the array is an object representing a navigation link (path,icon,label)
  const navItems = [
    { path: "/", icon: <LayoutDashboard className="h-6 w-6" />, label: "Dashboard" },
    { path: "/airQuality", icon: <Wind className="h-6 w-6" />, label: "Air Quality" },
    { path: "/waterQuality", icon: <Droplet className="h-6 w-6" />, label: "Water Quality" },
    { path: "/#", icon: <CloudSunRain className="h-6 w-6" />, label: "Weather Conditions" },
    { path: "/landQuality", icon: <LandPlot className="h-6 w-6" />, label: "Land Quality" },
    { path: "/alerts", icon: <CircleAlert className="h-6 w-6" />, label: "Alerts" },
    { path: "/settings", icon: <Settings className="h-6 w-6" />, label: "Settings" },
    { path: "/helpcenter", icon: <CircleHelp className="h-6 w-6" />, label: "Help Center" },
    { path: "/contactus", icon: <PhoneCall className="h-6 w-6" />, label: "Contact Us" }
  ];

  return (
    <div className={`bg-gray-800 text-white transition-all duration-300 z-10 ${isOpen ? 'w-60' : 'w-16'} flex flex-col min-h-screen`}>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold w-full py-2 px-3 rounded"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        )}
      </button>
      <div className="flex flex-col mt-5 space-y-2 overflow-y-auto">
        {navItems.map((item) => (
          <button
            title={item.label}
            key={item.path}
            className={`nav-links flex items-center w-full p-4 rounded hover:bg-[#FF8C8C] ${location.pathname === item.path ? "bg-[#FF8C8C] text-white" : "text-gray-100"}`}
            onClick={() => handleButtonClick(item.path)}
          >
            {item.icon}
            {isOpen && <span className="ml-4">{item.label}</span>}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
