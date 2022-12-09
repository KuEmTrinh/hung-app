import React from "react";
import "./Footer.css";
import InfoIcon from "@mui/icons-material/Info";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
export default function Footer() {
  return (
    <div className="footer">
      <div className="main center width-normal mainFooter">
        <div className="footerTitle">
          <p>買取一番</p>
        </div>
        <div className="footerSubTitle">
          <p>
            携帯電話、新品家電、化粧品、お酒をごとよりも高く売りたいと考えている方は、ぜひ買取一丁目査定サービスを利用して、高価買取を実現してください。
          </p>
        </div>
        <div className="footerInfoBox">
          <div className="footerMainInfo">
            <p>ホームページ管理会社：買取一番</p>
            <p>お問い合わせ：tienduan@gmail.com</p>
            <p>郵送予約： 03-5927-9818</p>
            <p>LINE予約： @kaitori-1ban</p>
            <p>小倉店(日本語)： 080-666-6666</p>
          </div>
          <div className="footerSubInfo">
            <div className="footerSubInfoContent">
              <div className="footerSubInfoIcon">
                <InfoIcon fontSize="small" color="action"></InfoIcon>
              </div>
              <p>利用規約</p>
            </div>
            <div className="footerSubInfoContent">
              <div className="footerSubInfoIcon">
                <InfoIcon fontSize="small" color="action"></InfoIcon>
              </div>
              <p>無料査定</p>
            </div>
            <div className="footerSubInfoContent">
              <div className="footerSubInfoIcon">
                <InfoIcon fontSize="small" color="action"></InfoIcon>
              </div>
              <p>買取の流れ</p>
            </div>
            <div className="footerSubInfoContent">
              <div className="footerSubInfoIcon">
                <InfoIcon fontSize="small" color="action"></InfoIcon>
              </div>
              <p>法人買取案内</p>
            </div>
            <div className="footerSubInfoContent">
              <div className="footerSubInfoIcon">
                <InfoIcon fontSize="small" color="action"></InfoIcon>
              </div>
              <p>よくある質問</p>
            </div>
            <div className="footerSubInfoContent">
              <div className="footerSubInfoIcon">
                <InfoIcon fontSize="small" color="action"></InfoIcon>
              </div>
              <p>店舗案内</p>
            </div>
          </div>
        </div>
        {/* <p className="footerSocialMediaTitle">ソーシャルメディア</p> */}
        <div className="footerSocialMedia">
          <div className="footerSocialMediaIcons">
            <div className="footerSocialMediaIcon">
              <FacebookIcon color="action"></FacebookIcon>
            </div>
            <div className="footerSocialMediaIcon">
              <InstagramIcon color="action"></InstagramIcon>
            </div>
            <div className="footerSocialMediaIcon">
              <YouTubeIcon color="action"></YouTubeIcon>
            </div>
          </div>
        </div>
        <p className="footerCenterText">
          携帯買取/家電買取/化粧品買取/お酒買取
        </p>
        <p className="footerCenterText">小倉店</p>
        <p className="footerCenterText copyWrite">
          Copyright (C) 2020 www.kaitori-1ban.me All Rights Reserved.
        </p>
      </div>
    </div>
  );
}
