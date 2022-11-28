import React from 'react'
import "./DashboardUI.css";
export default function DashbaordSubtitle({ ...props }) {
  return (
    <p className='dashboardSubtitle'>{props.children}</p>
  )
}
