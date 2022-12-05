import React, { useState, useRef, useEffect } from "react";
import DashboardTitle from "../ui/DashboardTitle";
import DashboardSubtitle from "../ui/DashboardSubtitle";
import DashboardToast from "../ui/DashboardToast";
import DashboardModal from "../ui/DashboardModal";
import NewProduct from "./NewProduct";
import ProductList from "./ProductList";
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
import { setTypeId } from "../../slice/productSlice";
import { useDispatch } from "react-redux";
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
        fullWidth
      />
      {typeValue != "" ? (
        <div className="confirmButtonNewType">
          <Button
            variant="contained"
            onClick={() => {
              confirmCreateNewType();
            }}
            fullWidth
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

function ProductTypeItemComponent({ item, category, selected, setSelected }) {
  const dispatch = useDispatch();
  return (
    <div
      className={
        item.id == selected
          ? "productTypeItem productTypeItemActive"
          : "productTypeItem"
      }
      onClick={() => {
        setSelected(item.id);
        dispatch(setTypeId(item.id));
      }}
    >
      <div className="productTypeItemName">
        <p className="productTypeItemNameText">{item.name}</p>
      </div>
      <div className="productTypeItemAction">
        <ProductTypeEditComponent
          item={item}
          category={category}
        ></ProductTypeEditComponent>
        <ProductTypeDeleteComponent
          item={item}
          category={category}
        ></ProductTypeDeleteComponent>
      </div>
    </div>
  );
}

function ProductTypeEditComponent({ item, category }) {
  const [editToggle, setEditToggle] = useState(false);
  const [typeName, setTypeName] = useState(item.name);
  const toastRef = useRef(null);
  const changeTypeName = (e) => {
    setTypeName(e.target.value);
  };
  const confirmChangeTypeName = () => {
    const query = db.collection(category).doc(item.id).update({
      name: typeName,
      updateAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    return query;
  };

  const changeConfirm = async () => {
    await confirmChangeTypeName();
    await setEditToggle(false);
    await toastRef.current.openToast();
  };
  return (
    <>
      <DashboardToast ref={toastRef} message="編集出来ました"></DashboardToast>
      <DashboardModal
        show={editToggle}
        onClose={() => {
          setEditToggle(false);
        }}
      >
        <DashboardSubtitle>Chỉnh sửa {item.name}</DashboardSubtitle>
        <TextField
          id="outlined-basic"
          label="新し項目入力"
          variant="outlined"
          size="small"
          fullWidth
          value={typeName}
          onChange={(e) => {
            changeTypeName(e);
          }}
        />
        {typeName != item.name ? (
          <div className="confirmButtonNewType">
            <Button
              variant="contained"
              onClick={() => {
                changeConfirm();
              }}
              fullWidth
            >
              編集
            </Button>
          </div>
        ) : (
          ""
        )}
      </DashboardModal>
      <div
        className="productTypeActionIconEdit"
        onClick={() => {
          setEditToggle(true);
        }}
      >
        <EditIcon
          color="blackColor"
          fontSize="small"
          className="hoverIconColor"
        ></EditIcon>
      </div>
    </>
  );
}

function ProductTypeDeleteComponent({ item, category }) {
  const [deleteToggle, setDeleteToggle] = useState(false);

  const confirmDeleteType = () => {
    const query = db.collection(category).doc(item.id).delete();
    return query;
  };

  const confirmDelete = async () => {
    await confirmDeleteType();
    await setDeleteToggle(false);
  };
  return (
    <>
      <DashboardModal
        show={deleteToggle}
        onClose={() => {
          setDeleteToggle(false);
        }}
      >
        <DashboardSubtitle>{item.name}を削除する？</DashboardSubtitle>
        <div className="confirmButtonNewType">
          <Button
            variant="contained"
            onClick={() => {
              confirmDelete();
            }}
            fullWidth
          >
            同意
          </Button>
        </div>
      </DashboardModal>
      <div className="productTypeActionIconDelete">
        <DeleteIcon
          color="blackColor"
          fontSize="small"
          className="hoverIconColor"
          onClick={() => {
            setDeleteToggle(true);
          }}
        ></DeleteIcon>
      </div>
    </>
  );
}

function ProductTypeListComponent({ category }) {
  const [types, setTypes] = useState();
  const [selected, setSelected] = useState();
  const dispatch = useDispatch();
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
      setSelected(data[0].id);
      dispatch(setTypeId(data[0].id));
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
            category={category}
            selected={selected}
            setSelected={setSelected}
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

function ProductNewItemComponent({ category }) {
  const [openToggle, setOpenToggle] = useState(false);
  return (
    <>
      <DashboardModal
        show={openToggle}
        onClose={() => {
          setOpenToggle(false);
        }}
      >
        <NewProduct
          category={category}
          setOpenToggle={setOpenToggle}
        ></NewProduct>
      </DashboardModal>
      <Button
        variant="contained"
        onClick={() => {
          setOpenToggle(true);
        }}
      >
        新規
      </Button>
    </>
  );
}

function ProductItemListComponent({ category }) {
  return <ProductList category={category}></ProductList>;
}

function ProductComponent({ category }) {
  return (
    <>
      <ProductNewItemComponent category={category}></ProductNewItemComponent>
      <ProductItemListComponent category={category}></ProductItemListComponent>
    </>
  );
}

export default function AdminProduct() {
  const [value, setValue] = useState("mobile");
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
          <DashboardSubtitle>製品管理</DashboardSubtitle>
          <ProductComponent category={value}></ProductComponent>
        </div>
      </div>
    </>
  );
}
