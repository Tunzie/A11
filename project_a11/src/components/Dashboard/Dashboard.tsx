import React, { ReactNode, useEffect, useState } from "react";
//import {Navbar, Nav, NavDropdown, Offcanvas, Button, OverlayTrigger, Tooltip} from 'react-bootstrap';
import { FaBars, FaHome, FaUser } from "react-icons/fa";
import "./Dashboard.css";
import Footer from "./Footer";
import Navbar from "./Navbar";
import SidePanel from "./SidePanel";
import Content from "./Content";
import { useLocation } from "react-router-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const Dashboard = ({ children }) => {
  // const { setUsername } = useContext(UserContext);

  return (
    <div className="flex flex-col w-full h-screen">
      <div className=" bg-gray-300 w-1/5h-1/5">
        <Navbar />
      </div>

      <div className="flex flex-1">
        <div className="bg-blue-300 w-1/4">
          <SidePanel />
        </div>
        <div className=" flex-1 bg-green-300 ">
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
