import React, { useEffect, useState } from "react";
//import Accessibilik from 'accessibility-react-widget';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./components/Login/Login";

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
          <Route path="/login" element={<Login/>}/>
        </Routes>
      </BrowserRouter>
    </div>
);
}

export default App;