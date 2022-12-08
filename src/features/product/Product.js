import React, { useEffect, useState } from "react";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import LightIcon from "@mui/icons-material/Light";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import BrushIcon from "@mui/icons-material/Brush";
import LiquorIcon from "@mui/icons-material/Liquor";
import DownloadIcon from "@mui/icons-material/Download";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
import "./Product.css";
import { Link } from "react-router-dom";
import { db } from "../../app/firebase";
function Categories({ activeCategory, setActiveCategory }) {
  return (
    <div className="section section-grey">
      <div className="category">
        <p className="categoryTitle">製品リストを参考</p>
        <div className="categories">
          <Link
            to={"/"}
            className={
              activeCategory == "mobile"
                ? "categoryTextLink categoryItemActive"
                : "categoryTextLink"
            }
            onClick={() => {
              setActiveCategory("mobile");
            }}
          >
            <div className="categoryItem">
              <PhoneIphoneIcon color="white"></PhoneIphoneIcon>
              <p>携帯</p>
            </div>
          </Link>
          <Link
            to={"/"}
            className={
              activeCategory == "kaden"
                ? "categoryTextLink categoryItemActive"
                : "categoryTextLink"
            }
            onClick={() => {
              setActiveCategory("kaden");
            }}
          >
            <div className="categoryItem">
              <LightIcon color="white"></LightIcon>
              <p>家電</p>
            </div>
          </Link>
          <Link
            to={"/"}
            className={
              activeCategory == "cosmetic"
                ? "categoryTextLink categoryItemActive"
                : "categoryTextLink"
            }
            onClick={() => {
              setActiveCategory("cosmetic");
            }}
          >
            <div className="categoryItem">
              <BrushIcon color="white"></BrushIcon>
              <p>化粧品</p>
            </div>
          </Link>
          <Link
            to={"/"}
            className={
              activeCategory == "sake"
                ? "categoryTextLink categoryItemActive"
                : "categoryTextLink"
            }
            onClick={() => {
              setActiveCategory("sake");
            }}
          >
            <div className="categoryItem">
              <LiquorIcon color="white"></LiquorIcon>
              <p>お酒</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

function Navigation({ productTypes, type, setType }) {
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
        {productTypes ? (
          <>
            {productTypes.map((el) => {
              return (
                <div
                  className="productListItem"
                  key={el.id}
                  onClick={() => {
                    setType(el);
                  }}
                >
                  <div
                    className={
                      el.name == type.name
                        ? "productListItemName itemNameActive"
                        : "productListItemName"
                    }
                  >
                    {el.name}
                  </div>
                  <div
                    className={
                      el.name == type.name
                        ? "productListItemCount itemCountActive"
                        : "productListItemCount"
                    }
                  >
                    {el.count != null ? <>{el.count}</> : "未定"}
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          "Loading"
        )}
      </div>
    </div>
  );
}

function Item({ product }) {
  return (
    <div className="productItem">
      <div className="productItemImage">
        <img src={product?.photoUrl}></img>
        <div className="productItemPrice">
          <p>{product.price}</p>
        </div>
      </div>
      <div className="productItemInfo">
        <p className="productItemName">{product.name}</p>
        <p className="productItemSubName">{product.subName}</p>
        <div className="mt-05"></div>
        <Stack direction="row" flexWrap="wrap">
          {product.properties?.map((el, index) => {
            return (
              <span className="chipLabel" key={index}>
                <Chip label={el} variant="outlined" size="small"></Chip>
              </span>
            );
          })}
        </Stack>
      </div>
    </div>
  );
}

function ProductItemList({ type, activeCategory }) {
  const [products, setProducts] = useState();
  useEffect(() => {
    if (type != null) {
      fetchProducts();
    }
  }, [type]);

  const fetchProducts = () => {
    const query = db
      .collection(activeCategory)
      .doc(type.id)
      .collection("product")
      .get()
      .then((snapshot) => {
        const data = [];
        snapshot.docs.map((doc) => {
          let item = doc.data();
          item.id = doc.id;
          data.push(item);
        });
        setProducts(data);
      });
    return query;
  };
  return (
    <div className="productItems">
      {products ? (
        <>
          {products.map((item) => {
            return <Item product={item} key={item.id}></Item>;
          })}
        </>
      ) : (
        "Loading"
      )}
    </div>
  );
}

function ProductMain({ activeCategory }) {
  const [productTypes, setProductTypes] = useState();
  const [type, setType] = useState();
  useEffect(() => {
    fetchProductTypes();
  }, [activeCategory]);

  const fetchProductTypes = () => {
    const query = db
      .collection(activeCategory)
      .get()
      .then((snapshot) => {
        const data = [];
        snapshot.docs.map((doc) => {
          let item = doc.data();
          item.id = doc.id;
          data.push(item);
        });
        // console.log(data);
        setProductTypes(data);
        setType(data[0]);
      });

    return query;
  };
  return (
    <div className="productMain center width-normal">
      <Navigation
        productTypes={productTypes}
        type={type}
        setType={setType}
      ></Navigation>
      <div className="productItemList">
        <div className="productNotice">
          <div className="productNoticeIcon">
            <NewReleasesIcon color="action"></NewReleasesIcon>
          </div>
          <p className="productNoticeText">
            2022年10月21日 iPad Pro 12.9インチ 第6世代 WiFi+Cellular 256GB 黑/銀
          </p>
        </div>
        <ProductItemList
          type={type}
          activeCategory={activeCategory}
        ></ProductItemList>
      </div>
    </div>
  );
}
export default function Product() {
  const [activeCategory, setActiveCategory] = useState("mobile");
  return (
    <>
      <Categories
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      ></Categories>
      <ProductMain activeCategory={activeCategory}></ProductMain>
    </>
  );
}
