import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Wind, CircleChevronLeft, Droplet, PhoneCall, CircleChevronRight , CircleAlert, CloudSunRain, Settings, CircleHelp, LandPlot, LayoutDashboard} from "lucide-react";
import { motion } from "framer-motion";
import Logo from "../../Assets/logo.png";



const variants = {
  expanded: { width: "17%" },
  nonexpanded: { width: "7%" },
};

const SidePanel = () => {

    const [isExpanded, setIsExpanded] = useState(true);
    const navigate = useNavigate();
  
    const handleButtonClick = (route) => {
      setIsExpanded(!isExpanded);
      navigate(route); // Update the route based on the button clicked
    };
  
    return (
      <motion.div
        animate={isExpanded ? "expanded" : "nonexpanded"}
        variants={variants}
        className={
          "py-10 h-screen flex flex-col border border-r-1 bg-[#FDFDFD] relative" +
          (isExpanded ? " px-4" : " px-5")
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
          <button className="nav-links flex w-full p-4 rounded bg-[#FF8C8C] text-white" onClick={() => handleButtonClick("/")}>
            <LayoutDashboard />
            <span className={!isExpanded ? "hidden" : "block pl-12"}>Dashboard</span>
          </button>
  
          <button className="nav-links flex w-full p-4 rounded" onClick={() => handleButtonClick("/airQuality")}>
            <Wind />
            <span className={!isExpanded ? "hidden" : "block pl-12"}>Air Quality</span>
          </button>
  
          <button className="nav-links flex w-full p-4 rounded" onClick={() => handleButtonClick("/waterQuality")}>
            <Droplet />
            <span className={!isExpanded ? "hidden" : "block pl-12"}>Water Quality</span>
          </button>
  
          <button className="nav-links flex w-full p-4 rounded" onClick={() => handleButtonClick("/watherConditions")}>
            <CloudSunRain />
            <span className={!isExpanded ? "hidden" : "block pl-12"}>Weather Conditions</span>
          </button>
  
          <button className="nav-links flex w-full p-4 rounded" onClick={() => handleButtonClick("/landQuality")}>
            <LandPlot />
            <span className={!isExpanded ? "hidden" : "block pl-12"}>Land Quality</span>
          </button>
  
          <button className="nav-links flex w-full p-4 rounded" onClick={() => handleButtonClick("/alerts")}>
            <CircleAlert />
            <span className={!isExpanded ? "hidden" : "block pl-12"}>Alerts</span>
          </button>
  
          <button className="nav-links flex w-full p-4 rounded" onClick={() => handleButtonClick("/settings")}>
            <Settings />
            <span className={!isExpanded ? "hidden" : "block pl-12"}>Settings</span>
          </button>
  
          <button className="nav-links flex w-full p-4 roundedd" onClick={() => handleButtonClick("/help")}>
            <CircleHelp />
            <span className={!isExpanded ? "hidden" : "block pl-12"}>Help Center</span>
          </button>
  
          <button className="nav-links flex w-full p-4 rounded" onClick={() => handleButtonClick("/contactus")}>
            <PhoneCall />
            <span className={!isExpanded ? "hidden" : "block pl-12"}>Contact Us</span>
          </button>
        </div>
      </motion.div>
    );
  };
  
  export default SidePanel;
  