import React, {ReactNode, useEffect, useState} from 'react';
import {FaBars, FaHome, FaUser} from 'react-icons/fa';

const SidePanel = () => {

    // const { setUsername } = useContext(UserContext);

    return (
      <aside id="aside" className="md:col-span-1 md:row-span-3" >
         <h2 className="text-xl font-bold mb-4">Menu</h2>
            <ul>
                <li><a href="AirQuality.html" className="block py-2"><i className="fas fa-wind mr-2"></i>Air Quality</a></li>
                <li><a href="WaterQuality.html" className="block py-2"><i className="fas fa-tint mr-2"></i>Water Quality</a>
                </li>
                <li><a href="#" className="block py-2"><i className="fas fa-cloud-sun mr-2"></i>Weather
                        Conditions</a></li>
                <li><a href="LandQuality.html" className="block py-2"><i className="fas fa-mountain mr-2"></i>Land Quality</a>
                </li>
                <li className="relative flex items-center">
                    <a href="Alerts.html" className="block py-2">
                        <i className="fas fa-bell mr-2"></i> 
                        Alerts
                    </a>
                    <span id="alertsNotification" className="ml-2 bg-red-500 rounded-full w-4 h-4 text-white text-xs flex items-center justify-center"></span>
                </li>
                <li className="relative flex items-center">
                    <a href="Settings.html" className="block py-2">
                        <i className="fas fa-bell mr-2"></i> 
                     Settings
                    </a> 
                </li>
            </ul>
      </aside>
    );
   };
   
   export default SidePanel;