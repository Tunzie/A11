import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Content from "./Content";
import Footer from "./Footer";

const Dashboard = ({ children }) => {
  return (
    <div className="flex flex-col w-full h-screen">
      <div className="w-full">
        <Navbar />
      </div>

      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 pl-1 pt-1 bg-slate-300 h-full overflow-y-auto">
          <Content>{children}</Content>
        </div>
      </div>

      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;
