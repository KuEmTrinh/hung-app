import React from "react";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import LightIcon from "@mui/icons-material/Light";
import StarsIcon from "@mui/icons-material/Stars";
import BrushIcon from "@mui/icons-material/Brush";
import LiquorIcon from "@mui/icons-material/Liquor";
import DownloadIcon from "@mui/icons-material/Download";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
function Categories() {
  return (
    <div className="section section-grey">
      <div className="category">
        <p className="categoryTitle">製品リストを参考</p>
        <div className="categories">
          <div className="categoryItem categoryItemActive">
            <PhoneIphoneIcon color="white"></PhoneIphoneIcon>
            <p>携帯</p>
          </div>
          <div className="categoryItem">
            <LightIcon color="action"></LightIcon>
            <p>家電</p>
          </div>
          <div className="categoryItem">
            <StarsIcon color="action"></StarsIcon>
            <p>強化買取中</p>
          </div>
          <div className="categoryItem">
            <BrushIcon color="action"></BrushIcon>
            <p>化粧品</p>
          </div>
          <div className="categoryItem">
            <LiquorIcon color="action"></LiquorIcon>
            <p>お酒</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Navigation() {
  return (
    <div className="productNav">
      <div className="downloadButton mbt-05">
        <DownloadIcon></DownloadIcon>
        <p>買取依頼書</p>
      </div>
      <div className="downloadButton mbt-05">
        <DownloadIcon></DownloadIcon>
        <p>保険者同意書</p>
      </div>
      <div className="productList">
        <div className="productListItem">
          <div className="productListItemName itemNameActive">Iphone</div>
          <div className="productListItemCount itemCountActive">100</div>
        </div>
        <div className="productListItem">
          <div className="productListItemName">Ipad</div>
          <div className="productListItemCount">44</div>
        </div>
        <div className="productListItem">
          <div className="productListItemName">Macbook</div>
          <div className="productListItemCount">22</div>
        </div>
      </div>
    </div>
  );
}

function Item() {
  return (
    <div className="productItem">
      <div className="productItemImage">
        <img src="https://images.unsplash.com/photo-1664478546384-d57ffe74a78c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"></img>
        <div className="productItemPrice">
          <p>20万9千</p>
        </div>
      </div>
      <div className="productItemInfo">
        <p className="productItemName">Iphone 14 Pro Max</p>
        <p className="productItemSubName">256GB, FreeSim 未開封</p>
      </div>
    </div>
  );
}

function ProductItemList() {
  return (
    <div className="productItems">
      <Item></Item>
      <Item></Item>
      <Item></Item>
      <Item></Item>
      <Item></Item>
      <Item></Item>
    </div>
  );
}

function ProductMain() {
  return (
    <div className="productMain center width-normal">
      <Navigation></Navigation>
      <div className="productItemList">
        <div className="productNotice">
          <div className="productNoticeIcon">
            <NewReleasesIcon color="action"></NewReleasesIcon>
          </div>
          <p className="productNoticeText">
            2022年10月21日 iPad Pro 12.9インチ 第6世代 WiFi+Cellular 256GB 黑/銀
          </p>
        </div>
        <ProductItemList></ProductItemList>
      </div>
    </div>
  );
}
export default function Product() {
  return (
    <>
      <Categories></Categories>
      <ProductMain></ProductMain>
    </>
  );
}
