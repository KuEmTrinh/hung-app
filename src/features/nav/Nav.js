import React from "react";
import "./Nav.css";
import logo from "../../WEBLOGO.png";
import SearchIcon from '@mui/icons-material/Search';
export default function Nav() {
  return (
    <div className="nav">
      <div className="navLogo">
        {" "}
        <img src={logo} alt="logo" />
      </div>
      <div className="navPages">
        <div className="navPage">
          <p>ホーム</p>
        </div>
        <div className="navPage">
          <p>買取流れ</p>
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
        <div className="navIcon"><SearchIcon></SearchIcon></div>
      </div>
    </div>
  );
}
