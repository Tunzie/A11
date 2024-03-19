import React from "react";
import "./Dashboard.css";

const Navbar = () => {
  return (
    <header className="bg-blue-500 text-white p-4 md:p-7 flex justify-between items-center">
      <h1 className="text-3xl font-bold text-gray-800">
      Eden Initiative
      </h1>
      <div className="flex items-center">
        <label className="text-white px-3">Welcome, John Doe</label>
        <button className="bg-gray-800 text-white px-4 py-2 rounded">
          Login
        </button>
      </div>
    </header>
  );
};

export default Navbar;