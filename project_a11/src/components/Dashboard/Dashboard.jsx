import React from "react";
import Navbar from "./Navbar";
import SidePanel from "./SidePanel";
import Content from "./Content";
import Footer from "./Footer";

const Dashboard = ({ children }) => {
  return (
    <div className="flex flex-col w-full h-screen">
      <div className="bg-gray-300 w-full">
        <Navbar />
      </div>

      <div className="flex flex-1">
          <SidePanel />
        <div className="flex-1 bg-green-300">
          <Content>{children}</Content>
        </div>
      </div>

      <div className="bg-gray-300 h-1/6">
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;