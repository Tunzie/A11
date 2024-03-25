import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Wind, CircleChevronLeft, Droplet, PhoneCall, CircleChevronRight, CircleAlert, CloudSunRain, Settings, CircleHelp, LandPlot, LayoutDashboard } from "lucide-react";
import { motion } from "framer-motion";
import Logo from "../../Assets/logo.png";

const variants = {
  expanded: { width: "17%" },
  nonexpanded: { width: "5%" },
};

const SidePanel = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const handleButtonClick = (route) => {
    setIsExpanded(!isExpanded);
    navigate(route); // Update the route based on the button clicked
  };

  return (
    <motion.div
      animate={isExpanded ? "expanded" : "nonexpanded"}
      variants={variants}
      className={
        "py-10 h-screen flex-col border border-r-1 bg-[#FDFDFD] relative" +
        (isExpanded ? " px-4" : " px-4")
      }
    >
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="cursor-pointer absolute -right-4 top-10  rounded-full w-8 h-8 bg-[#FF8C8C] flex justify-center items-center"
      >
        {isExpanded ? (
          <CircleChevronLeft />
        ) : (
          <CircleChevronRight />
        )}
      </div>

      <div className="logo-div flex space-x-4 items-center">
        <img src={Logo} alt="Logo" className="w-8" />
        <span className={!isExpanded ? "hidden" : "block"}>Environmental Monitoring</span>
      </div>

      <div className="flex flex-col space-y-4 mt-12">
        <button className={"nav-links flex w-full p-3 rounded " + (location.pathname === "/" ? "bg-[#FF8C8C] text-white" : "")} onClick={() => handleButtonClick("/")}>
          <LayoutDashboard />
          {isExpanded && <span className="pl-2">Dashboard</span>}
        </button>

        <button className={"nav-links flex w-full p-3 rounded " + (location.pathname === "/airQuality" ? "bg-[#FF8C8C] text-white" : "")} onClick={() => handleButtonClick("/airQuality")}>
          <Wind />
          {isExpanded && <span className="pl-2">Air Quality</span>}
        </button>

        <button className={"nav-links flex w-full p-3 rounded " + (location.pathname === "/waterQuality" ? "bg-[#FF8C8C] text-white" : "")} onClick={() => handleButtonClick("/waterQuality")}>
          <Droplet />
          {isExpanded && <span className="pl-2">Water Quality</span>}
        </button>

        <button className={"nav-links flex w-full p-3 rounded " + (location.pathname === "/weatherConditions" ? "bg-[#FF8C8C] text-white" : "")} onClick={() => handleButtonClick("/weatherConditions")}>
          <CloudSunRain />
          {isExpanded && <span className="pl-2">Weather Conditions</span>}
        </button>
page
        <button className={"nav-links flex w-full p-3 rounded " + (location.pathname === "/landQualityPage" ? "bg-[#FF8C8C] text-white" : "")} onClick={() => handleButtonClick("/landQuality")}>
          <LandPlot />
          {isExpanded && <span className="pl-2">Land Quality</span>}
        </button>

        <button className={"nav-links flex w-full p-3 rounded " + (location.pathname === "/alerts" ? "bg-[#FF8C8C] text-white" : "")} onClick={() => handleButtonClick("/alerts")}>
          <CircleAlert />
          {isExpanded && <span className="pl-2">Alerts</span>}
        </button>

        <button className={"nav-links flex w-full p-3 rounded " + (location.pathname === "/settings" ? "bg-[#FF8C8C] text-white" : "")} onClick={() => handleButtonClick("/settings")}>
          <Settings />
          {isExpanded && <span className="pl-2">Settings</span>}
        </button>

        <button className={"nav-links flex w-full p-3 rounded " + (location.pathname === "/help" ? "bg-[#FF8C8C] text-white" : "")} onClick={() => handleButtonClick("/help")}>
          <CircleHelp />
          {isExpanded && <span className="pl-2">Help Center</span>}
        </button>

        <button className={"nav-links flex w-full p-3 rounded " + (location.pathname === "/contactus" ? "bg-[#FF8C8C] text-white" : "")} onClick={() => handleButtonClick("/contactus")}>
          <PhoneCall />
          {isExpanded && <span className="pl-2">Contact Us</span>}
        </button>
      </div>
    </motion.div>
  );
};

export default SidePanel;
