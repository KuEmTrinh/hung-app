import React, { useState, useRef, useEffect } from "react";
import DashboardTitle from "../ui/DashboardTitle";
import DashboardSubtitle from "../ui/DashboardSubtitle";
import DashboardToast from "../ui/DashboardToast";
import DashboardModal from "../ui/DashboardModal";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import "./Main.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { db } from "../../app/firebase";
import { firebase } from "../../app/firebase";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
function NewProductTypeComponent({ category }) {
  const toastRef = useRef(null);
  const confirmCreateNewType = async () => {
    await setIsLoading(true);
    await createNewType();
    await setTypeValue("");
    await toastRef.current.openToast();
    await setIsLoading(false);
  };
  const [typeValue, setTypeValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const setNewTypeValue = (e) => {
    setTypeValue(e.target.value);
  };
  const createNewType = () => {
    const query = db.collection(category).add({
      name: typeValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    return query;
  };
  return (
    <>
      <DashboardToast ref={toastRef} message="新規出来ました"></DashboardToast>
      <TextField
        id="outlined-basic"
        label="新し項目入力"
        variant="outlined"
        size="small"
        value={typeValue}
        onChange={setNewTypeValue}
      />
      {typeValue != "" ? (
        <div className="confirmButtonNewType">
          <Button
            variant="contained"
            onClick={() => {
              confirmCreateNewType();
            }}
          >
            {isLoading ? "loading" : "新規"}
          </Button>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

function ProductTypeItemComponent({ item }) {
  return (
    <div className="productTypeItem">
      <div className="productTypeItemName">
        <p className="productTypeItemNameText">{item.name}</p>
      </div>
      <div className="productTypeItemAction">
        <div className="productTypeActionIconEdit">
          <EditIcon
            color="blackColor"
            fontSize="small"
            className="hoverIconColor"
          ></EditIcon>
        </div>
        <div className="productTypeActionIconDelete">
          <DeleteIcon
            color="blackColor"
            fontSize="small"
            className="hoverIconColor"
          ></DeleteIcon>
        </div>
      </div>
    </div>
  );
}

function ProductTypeEditComponent({}) {
  return <></>;
}

function ProductTypeListComponent({ category }) {
  const [types, setTypes] = useState();
  useEffect(() => {
    fetchTypeList();
  }, [category]);
  const fetchTypeList = () => {
    const query = db.collection(category).onSnapshot((querySnapshot) => {
      const data = [];
      querySnapshot.docs.map((doc) => {
        let item = doc.data();
        item.id = doc.id;
        data.push(item);
      });
      setTypes(data);
    });
    return query;
  };
  return (
    <>
      {types?.map((el) => {
        return (
          <ProductTypeItemComponent
            item={el}
            key={el.id}
          ></ProductTypeItemComponent>
        );
      })}
    </>
  );
}

function ProductTypeComponent({ category }) {
  return (
    <>
      <NewProductTypeComponent category={category}></NewProductTypeComponent>
    </>
  );
}

export default function AdminProduct() {
  const [value, setValue] = React.useState("mobile");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <DashboardTitle>製品管理</DashboardTitle>
      <DashboardSubtitle>製品カテゴリー</DashboardSubtitle>
      <Box sx={{ width: "100%" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
        >
          <Tab value="mobile" label="携帯" />
          <Tab value="kaden" label="家電" />
          <Tab value="cosmetic" label="化粧品" />
          <Tab value="sake" label="お酒" />
        </Tabs>
      </Box>
      <div className="productTypeContent">
        <div className="productTypeContentLeft">
          <DashboardSubtitle>種類新規</DashboardSubtitle>
          <ProductTypeComponent category={value}></ProductTypeComponent>
          <DashboardSubtitle>種類リスト</DashboardSubtitle>
          <ProductTypeListComponent category={value}></ProductTypeListComponent>
        </div>
        <div className="productTypeContentRight">
          <DashboardSubtitle>製品のリスト</DashboardSubtitle>
        </div>
      </div>
    </>
  );
}
