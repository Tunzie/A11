import React, { ReactNode, useEffect, useState } from "react";
import './Dashboard.css';

const Navbar = () => {
  // const { setUsername } = useContext(UserContext);

  return (
    <div id="navbar" >
      <header className="bg-blue-500 text-white p-4 md:p-10 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">
          Environmental Monitoring Dashboard
        </h1>
        <div className="flex items-center">
          <label className="text-white px-9 ">Welcome, John Doe</label>
          <button
            id="login"
            className="bg-gray-800 text-white px-8 py-2 rounded "
          >
            Login
          </button>
          <div id="loginModal"></div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
