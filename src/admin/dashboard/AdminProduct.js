import React, { useState } from "react";
import DashboardTitle from "../ui/DashboardTitle";
import DashbaordSubtitle from "../ui/DashbaordSubtitle";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import "./Main.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
function NewProductTypeComponent() {
  const [typeValue, setTypeValue] = useState("");

  const setNewTypeValue = (e) => {
    setTypeValue(e.target.value);
  };
  return (
    <>
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
          <Button variant="contained">新規</Button>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

function ProductTypeComponent() {
  return (
    <>
      <NewProductTypeComponent></NewProductTypeComponent>
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
      <DashbaordSubtitle>製品カテゴリー</DashbaordSubtitle>
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
          <DashbaordSubtitle>種類新規</DashbaordSubtitle>
          <ProductTypeComponent></ProductTypeComponent>
          <DashbaordSubtitle>種類リスト</DashbaordSubtitle>
        </div>
        <div className="productTypeContentRight">
          <DashbaordSubtitle>製品のリスト</DashbaordSubtitle>
        </div>
      </div>
    </>
  );
}
