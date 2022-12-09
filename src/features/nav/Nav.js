import React from "react";
import "./Nav.css";
import logo from "../../WEBLOGO.png";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import DescriptionIcon from "@mui/icons-material/Description";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import FindInPageIcon from "@mui/icons-material/FindInPage";
import MoreIcon from "@mui/icons-material/More";
export default function Nav() {
  return (
    <>
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
      <div className="openNav">
        <div className="openNavPages">
          <div className="openNavPage">
            <Link to={`/`}>
              <div className="openNavPageConten">
                <div className="openNavLogo">
                  <HomeIcon color="whiteColor"></HomeIcon>
                </div>
                <div className="openNavText">
                  <p>ホーム</p>
                </div>
              </div>
            </Link>
          </div>
          <div className="openNavPage">
            <Link to={`/guide`}>
              <div className="openNavPageConten">
                <div className="openNavLogo">
                  <DescriptionIcon color="whiteColor"></DescriptionIcon>
                </div>
                <div className="openNavText">
                  <p>買取流れ</p>
                </div>
              </div>
            </Link>
          </div>
          <div className="openNavPage">
            <Link to={`/`}>
              <div className="openNavPageConten">
                <div className="openNavLogo">
                  <FactCheckIcon color="whiteColor"></FactCheckIcon>
                </div>
                <div className="openNavText">
                  <p>利用規約</p>
                </div>
              </div>
            </Link>
          </div>
          <div className="openNavPage">
            <Link to={`/`}>
              <div className="openNavPageConten">
                <div className="openNavLogo">
                  <FindInPageIcon color="whiteColor"></FindInPageIcon>
                </div>
                <div className="openNavText">
                  <p>無料査定</p>
                </div>
              </div>
            </Link>
          </div>
          <div className="openNavPage">
            <Link to={`/`}>
              <div className="openNavPageConten">
                <div className="openNavLogo">
                  <MoreIcon color="whiteColor"></MoreIcon>
                </div>
                <div className="openNavText">
                  <p>その他</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
