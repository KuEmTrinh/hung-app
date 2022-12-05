import React from "react";
import "./Nav.css";
import logo from "../../WEBLOGO.png";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
export default function Nav() {
  return (
    <div className="nav">
      <div className="navLogo">
        <img src={logo} alt="logo" />
      </div>
      <div className="navPages">
        <div className="navPage">
          <div className="linkRouterText">
            <Link to={`/`}>ホーム</Link>
          </div>
        </div>
        <div className="navPage">
          <div className="linkRouterText">
            <Link to={`/guide`}>買取流れ</Link>
          </div>
        </div>
        <div className="navPage">
          <div className="linkRouterText">
            <Link to={`/guide`}>利用規約</Link>
          </div>
        </div>
        <div className="navPage">
          <div className="linkRouterText">
            <Link to={`/guide`}>無料査定</Link>
          </div>
        </div>
        <div className="navPage">
          <div className="linkRouterText">
            <Link to={`/guide`}>その他</Link>
          </div>
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
