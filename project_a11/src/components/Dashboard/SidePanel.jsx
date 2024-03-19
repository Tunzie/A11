import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Wind, Droplet, CircleAlert, CloudSunRain, Settings, CircleHelp, LandPlot, LayoutDashboard} from "lucide-react";
import { motion } from "framer-motion";
import Logo from "../../Assets/logo.png";
import RightArrowIcon from "../../Assets/icons/rightArrow.svg";


const variants = {
  expanded: { width: "15%" },
  nonexpanded: { width: "6%" },
};

function SidePanel() {
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
        (isExpanded ? " px-4" : " px-4")
      }
    >
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="cursor-pointer  absolute -right-3 top-10 rounded-full  h-6 bg-[#FF8C8C] flex justify-center items-center"
      >
        <img src={RightArrowIcon} className="w-2" />
      </div>

      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="cursor-pointer absolute -right-3 top-10 rounded-full w-6 h-6 bg-[#FF8C8C] flex justify-center items-center"
      >
        <img src={RightArrowIcon} className="w-2" />
      </div>
      <div className="logo-div flex space-x-4 items-center">
        <img src= {""} />
        <span className={!isExpanded ? "hidden" : "block"}>Environmental Monitoring</span>
      </div>
      
      
      <div className="flex flex-col space-y-8 mt-12">
        <div className="nav-links w-full">
          <div className="flex space-x-3 w-full p-2 rounded bg-[#FF8C8C] text-white">
            <LayoutDashboard />
            <span className={!isExpanded ? "hidden" : "block"}>Dashboard</span>
          </div>
        </div>

        <div className="nav-links w-full">
          <button className="flex space-x-3 w-full p-2 rounded" onClick={() => handleButtonClick("/airQuality")}>
            <Wind />
            <span className={!isExpanded ? "hidden" : "block"}>Air Quality</span>
          </button>
        </div>

        <div className="nav-links w-full">
        <button className="flex space-x-3 w-full p-2 rounded" onClick={() => handleButtonClick("/waterQuality")}>
            <Droplet />
            <span className={!isExpanded ? "hidden" : "block"}>Water Quality</span>
          </button>
        </div>

        <div className="nav-links w-full">
        <button className="flex space-x-3 w-full p-2 rounded" onClick={() => handleButtonClick("/watherConditions")}>
            <CloudSunRain />
            <span className={!isExpanded ? "hidden" : "block"}>
            Weather Conditions
            </span>
          </button>
        </div>

        <div className="nav-links w-full">
          <button className="flex space-x-3 w-full p-2 rounded" onClick={() => handleButtonClick("/landQuality")}>
            <LandPlot  />
            <span className={!isExpanded ? "hidden" : "block"}>
            Land Quality
            </span>
          </button>
        </div>

        <div className="nav-links w-full">
          <button className="flex space-x-3 w-full p-2 rounded" onClick={() => handleButtonClick("/alerts")}>
            <CircleAlert />
            <span className={!isExpanded ? "hidden" : "block"}>
            Alerts
            </span>
          </button>
        </div>

        <div className="nav-links w-full">
          <button className="flex space-x-3 w-full p-2 rounded" onClick={() => handleButtonClick("/settings")}>
            <Settings  />
            <span className={!isExpanded ? "hidden" : "block"}>
            Settings
            </span>
          </button>
        </div>

        <div className="nav-links w-full">
        <button className="flex space-x-3 w-full p-2 rounded" onClick={() => handleButtonClick("/help")}>
            <CircleHelp  />
            <span className={!isExpanded ? "hidden" : "block"}>
              Help Center
            </span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default SidePanel;
