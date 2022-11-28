import React from "react";
import "./Nav.css";
import logo from "../../WEBLOGO.png";
import SearchIcon from "@mui/icons-material/Search";
import { Outlet, Link } from "react-router-dom";
export default function Nav() {
  return (
    <div className="nav">
      <div className="navLogo">
        {" "}
        <img src={logo} alt="logo" />
      </div>
      <div className="navPages">
        <div className="navPage">
          <Link to={`/`}>
            <p className="linkRouterText">ホーム</p>
          </Link>
        </div>
        <div className="navPage">
          <Link to={`/guide`}>
            <p className="linkRouterText">買取流れ</p>
          </Link>
        </div>
        <div className="navPage">
          <p>利用規約</p>
        </div>
        <div className="navPage">
          <p>無料査定</p>
        </div>
        <div className="navPage">
          <p>その他</p>
        </div>
      </div>
      <div className="navIcons">
        <div className="navIcon">
          <SearchIcon></SearchIcon>
        </div>
      </div>
    </div>
  );
}
