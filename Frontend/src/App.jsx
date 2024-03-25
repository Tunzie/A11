import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import Accessibilik from 'accessibility-react-widget';
import Alerts from "./components/Alerts/Alerts";
import Dashboard from "./components/Dashboard/Dashboard";
import Signup from "./components/Signup/Signup";
import ContactUs from "./components/ContactUs/ContactUs";
import Home from "./components/Dashboard/Home";
import SettingsForm from "./components/Settings/SettingsForm";
import landQualityPage from "./components/LandQuality/landQualityPage";

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
          <Route path="/alerts" element={<Dashboard><Alerts /></Dashboard>} />
          <Route path="/contactus" element={<Dashboard><ContactUs /></Dashboard>} />
          <Route path="/Alerts" element={<Dashboard><Alerts/> </Dashboard>} />
          <Route path="/SettingsForm" element={<Dashboard><SettingsForm/> </Dashboard>} />
          <Route path="/landQualityPage" element={<Dashboard><landQualityPage/></Dashboard>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
