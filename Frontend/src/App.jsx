import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import Accessibilik from 'accessibility-react-widget';
import WeatherAlerts from "./components/Alerts/Alerts";
import Dashboard from "./components/Dashboard/Dashboard";
import Signup from "./components/Signup/Signup";
import ContactUs from "./components/ContactUs/ContactUs";
import Home from "./components/Dashboard/Home";
import Settings from "./components/Settings/Settings";
import LandQuality from "./components/LandQuality/LandQuality";
import WaterQuality from "./components/WaterQuality/WaterQuality";
import HelpCenter from "./components/HelpCenter/HelpCenter";
import AirQuality from "./components/AirQuality/AirQuality";

function App() {

  const [username, setUsername] = useState('');



  useEffect(() => {
    const script = document.createElement("script");

    script.src = "https://buttons.github.io/buttons.js";
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);



  return (
    <div className="App">
        <Accessibilik />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard><Home /></Dashboard>} />
          <Route path="/login" element={<Dashboard><Login /></Dashboard>} />
          <Route path="/signup" element={<Dashboard><Signup /></Dashboard>} />
          <Route path="/Alerts" element={<Dashboard><WeatherAlerts /></Dashboard>} />
          <Route path="/contactus" element={<Dashboard><ContactUs /></Dashboard>} />
          <Route path="/landQuality" element={<Dashboard><LandQuality/> </Dashboard>} />
          <Route path="/WaterQuality" element={<Dashboard><WaterQuality/> </Dashboard>} />
          <Route path="/helpcenter" element={<Dashboard><HelpCenter/> </Dashboard>} />
          <Route path="/airQuality" element={<Dashboard><AirQuality/> </Dashboard>} />
          <Route path="/settings" element={<Dashboard><Settings/> </Dashboard>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
