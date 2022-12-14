import React from "react";
import "./Home.css";
import Nav from "../nav/Nav";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

export default function Home() {
  return (
    <>
      <div className="main center width-normal">
        <Nav></Nav>
        <Header></Header>
      </div>
      <Outlet />
      <Footer></Footer>
    </>
  );
}
