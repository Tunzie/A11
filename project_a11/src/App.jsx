import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import Alerts from "./components/Alerts/Alerts"; // Import Alerts component

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
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/alerts" element={<Alerts />} /> {}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
