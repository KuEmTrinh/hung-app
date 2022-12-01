import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { authentication } from "../../app/firebase";
export default function Nav() {
  const logOut = () => {
    signOut(authentication)
      .then(() => {
        console.log("da dang xuat");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="dashboardNav">
      <div className="dashboardNavContent">
        <div className="dashboardNavColumn">
          <div className="dashboardNavItemList">
            <div className="dashboardNavItem">
              <div className="dashboardNavItemIcon">
                <HomeIcon color="whiteColor"></HomeIcon>
              </div>
              <div className="dashboardNavItemText">
                <Link to={`/admin`}>
                  <p>ホーム</p>
                </Link>
              </div>
            </div>
            <div className="dashboardNavItem">
              <div className="dashboardNavItemIcon">
                <PhoneIphoneIcon color="whiteColor"></PhoneIphoneIcon>
              </div>
              <div className="dashboardNavItemText">
                <Link to={`/admin/product`}>
                  <p>製品管理</p>
                </Link>
              </div>
            </div>
            <div className="dashboardNavItem">
              <div className="dashboardNavItemIcon">
                <EqualizerIcon color="whiteColor"></EqualizerIcon>
              </div>
              <div className="dashboardNavItemText">
                <Link to={`/admin`}>
                  <p>売上統計</p>
                </Link>
              </div>
            </div>
            <div className="dashboardNavItem">
              <div className="dashboardNavItemIcon">
                <ManageAccountsIcon color="whiteColor"></ManageAccountsIcon>
              </div>
              <div className="dashboardNavItemText">
                <Link to={`/admin`}>
                  <p>アカウント</p>
                </Link>
              </div>
            </div>
            <div className="dashboardNavLogoutItem">
              <div className="dashboardNavItemIcon">
                <LogoutIcon color="whiteColor"></LogoutIcon>
              </div>
              <div
                className="dashboardNavItemText"
                onClick={() => {
                  logOut();
                }}
              >
                <p>ログアウト</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
