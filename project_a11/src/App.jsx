import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import Accessibilik from 'accessibility-react-widget';
import Alerts from "./components/Alerts/Alerts";
import Dashboard from "./components/Dashboard/Dashboard";
function App() {

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
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Dashboard><Login /></Dashboard>} />
          <Route path="/alerts" element={<Dashboard><Alerts /></Dashboard>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
