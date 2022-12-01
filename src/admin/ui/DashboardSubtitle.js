import React from 'react'
import "./DashboardUI.css";
export default function DashboardSubtitle({ ...props }) {
  return (
    <p className='dashboardSubtitle'>{props.children}</p>
  )
}
