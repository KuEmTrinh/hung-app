import React from "react";
import "./Main.css";
import Nav from "./Nav";
import { Outlet } from "react-router-dom";
export default function Main() {
  return (
    <div className="dashboardMain">
      <Nav></Nav>
      <div className="dashboardContent">
        <Outlet></Outlet>
      </div>
    </div>
  );
}
