import React from "react";
import "./DashboardUI.css";
export default function DashboardTitle({ ...props }) {
  return <p className="dashboardTitle">{props.children}</p>;
}
