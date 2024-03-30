import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import SidePanel from "./SidePanel";
import Content from "./Content";
import Footer from "./Footer";

const Dashboard = ({ children }) => {
  let username = localStorage.getItem("username");

  useEffect(() => {
    username = localStorage.getItem("username");
  }, [username]);

  //logs the current user out
  const handleLogout = () => {
    localStorage.removeItem("username");
    window.location.reload();
  };
  return (
    <div className="flex flex-col w-full h-screen">
      <div className="w-full">
        <Navbar />
      </div>

      <div className="flex ">
        <SidePanel />
        <div className="flex-1 pl-1 pt-1 bg-slate-300">
          <Content>{children}</Content>
        </div>
      </div>

      <div className="w-full h-1/6">
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;
