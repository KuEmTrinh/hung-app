import React, { useState, useEffect } from "react";
import DashboardSubtitle from "../ui/DashboardSubtitle";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import { useSelector, useDispatch } from "react-redux";
import { setTypeLength } from "../../slice/productSlice";
import { db } from "../../app/firebase";
import { firebase } from "../../app/firebase";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DashboardModal from "../ui/DashboardModal";
import TextField from "@mui/material/TextField";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { Button } from "@mui/material";

function PropertiesInputComponent({ setProperties }) {
  const [property, setProperty] = useState();
  const changePropertyValue = (e) => {
    setProperty(e.target.value);
  };
  const createNewProperty = async () => {
    await setProperties((properties) => [...properties, property]);
    await setProperty("");
  };
  return (
    <div className="productNewProperties">
      <div className="productPropertyInputBox">
        <TextField
          id="outlined-basic"
          label="性質"
          variant="outlined"
          size="small"
          fullWidth
          value={property}
          onChange={(e) => {
            changePropertyValue(e);
          }}
        />
      </div>
      <div
        className="productPropertyConfirmButton"
        onClick={() => {
          createNewProperty();
        }}
      >
        <AddBoxIcon color="primary" fontSize="large"></AddBoxIcon>
      </div>
    </div>
  );
}

function EditContentComponent({ item, category, typeId, setEditToggle }) {
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState(item.name);
  const [subName, setSubName] = useState(item.subName);
  const [price, setPrice] = useState(item.price);
  const [properties, setProperties] = useState(item.properties);
  const [editConfirmToggle, setEditConfirmToggle] = useState(false);
  const changeNameValue = (e) => {
    setName(e.target.value);
  };
  const changeSubNameValue = (e) => {
    setSubName(e.target.value);
  };
  const changePriceValue = (e) => {
    setPrice(e.target.value);
  };
  const deleteProperty = (index) => {
    const newProperties = properties.filter((el) => el != properties[index]);
    setProperties(newProperties);
  };

  useEffect(() => {
    runCheck();
  });

  const runCheck = () => {
    setEdit(checkEditTrueIsFalse);
  };

  const checkEditTrueIsFalse = () => {
    let check = false;
    if (name != item.name) {
      check = true;
      return check;
    } else if (subName != item.subName) {
      check = true;
      return check;
    } else if (price != item.price) {
      check = true;
      return check;
    } else if (properties != item.properties) {
      check = true;
      return check;
    } else {
      check = false;
      return check;
    }
  };

  const editConfirm = async () => {
    const query = await db
      .collection(category)
      .doc(typeId)
      .collection("product")
      .doc(item.id)
      .update({
        name: name,
        subName: subName,
        properties: properties,
        price: price,
        updateAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
    await setEditConfirmToggle(false);
    await setEditToggle(false);
    return query;
  };
  return (
    <>
      <div className="createProductBox">
        <div className="createProductInputBox">
          <DashboardModal
            show={editConfirmToggle}
            onClose={() => {
              setEditConfirmToggle(false);
            }}
          >
            <DashboardSubtitle>編集いかがでしょうか？</DashboardSubtitle>
            <Button
              variant="contained"
              onClick={() => {
                editConfirm(true);
              }}
              fullWidth
            >
              確認
            </Button>
          </DashboardModal>
          <DashboardSubtitle>{item.name}の情報を編集</DashboardSubtitle>
          <TextField
            id="outlined-basic"
            label="製品名"
            variant="outlined"
            size="small"
            fullWidth
            value={name}
            onChange={(e) => {
              changeNameValue(e);
            }}
          />
          <div className="mt-1">
            <TextField
              id="outlined-basic"
              label="製品詳細"
              variant="outlined"
              size="small"
              fullWidth
              value={subName}
              onChange={(e) => {
                changeSubNameValue(e);
              }}
            />
          </div>
          <div className="mt-1">
            <TextField
              id="outlined-basic"
              label="製品価格"
              variant="outlined"
              size="small"
              type="number"
              fullWidth
              value={price}
              onChange={(e) => {
                changePriceValue(e);
              }}
            />
          </div>
          <div className="mt-1">
            <PropertiesInputComponent
              setProperties={setProperties}
            ></PropertiesInputComponent>
          </div>
          <div className="mt-1">
            {edit ? (
              <Button
                variant="contained"
                onClick={() => {
                  setEditConfirmToggle(true);
                }}
                fullWidth
              >
                編集
              </Button>
            ) : (
              <Button variant="contained" fullWidth disabled>
                編集
              </Button>
            )}
          </div>
        </div>
        <div className="createProductPreviewBox">
          <DashboardSubtitle>参考</DashboardSubtitle>
          <div className="productImagePreview">
            <img src={item.photoUrl} />
            <div className="productItemPrice">
              <p>{price ? <>{price}</> : "????"}</p>
            </div>
          </div>
          <p className="productItemName">{name}</p>
          <p className="productItemSubName mbt-05">{subName}</p>
          <Stack direction="row" flexWrap="wrap">
            {properties?.map((el, index) => {
              return (
                <span className="chipLabel" key={index}>
                  <Chip
                    label={el}
                    variant="outlined"
                    size="small"
                    onDelete={() => {
                      deleteProperty(index);
                    }}
                  ></Chip>
                </span>
              );
            })}
          </Stack>
        </div>
      </div>
    </>
  );
}

function EditProductComponent({ item, category, typeId }) {
  const [editToggle, setEditToggle] = useState(false);
  return (
    <>
      <DashboardModal
        show={editToggle}
        onClose={() => {
          setEditToggle(false);
        }}
      >
        <EditContentComponent
          item={item}
          category={category}
          typeId={typeId}
          setEditToggle={setEditToggle}
        ></EditContentComponent>
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

function DeleteProductComponent({ item, category, typeId }) {
  const [deleteToggle, setDeleteToggle] = useState(false);
  const deleteConfirm = async () => {
    const query = await db
      .collection(category)
      .doc(typeId)
      .collection("product")
      .doc(item.id)
      .delete();
    await setDeleteToggle(false);
    return query;
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
        <Button
          variant="contained"
          onClick={() => {
            deleteConfirm();
          }}
          fullWidth
        >
          確認
        </Button>
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

export default function ProductList({ category }) {
  const typeId = useSelector((state) => state.product.typeId);
  const [items, setItems] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    if (typeId != null) {
      fetchItemList();
    }
  }, [typeId]);
  const fetchItemList = () => {
    const query = db
      .collection(category)
      .doc(typeId)
      .collection("product")
      .onSnapshot((querySnapshot) => {
        const data = [];
        querySnapshot.docs.map((doc) => {
          let item = doc.data();
          item.id = doc.id;
          data.push(item);
        });
        dispatch(setTypeLength(data.length));
        setItems(data);
      });
    return query;
  };
  return (
    <>
      <DashboardSubtitle>製品リスト</DashboardSubtitle>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right" width="5%"></TableCell>
              <TableCell width="25%">製品名</TableCell>
              <TableCell align="right" width="10%">
                価格
              </TableCell>
              <TableCell align="right">性質</TableCell>
              <TableCell align="right" width="15%">
                行動
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items?.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="right">
                  <div className="productSmallPhoto">
                    <img src={row.photoUrl} />
                  </div>
                </TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell align="right">{row.price}</TableCell>
                <TableCell align="right">
                  {row.properties?.map((el, index) => {
                    return (
                      <span className="chipLabel" key={index}>
                        <Chip label={el} variant="outlined" size="small"></Chip>
                      </span>
                    );
                  })}
                </TableCell>
                <TableCell>
                  <div className="productActionBox">
                    <DeleteProductComponent
                      item={row}
                      category={category}
                      typeId={typeId}
                    ></DeleteProductComponent>
                    <EditProductComponent
                      item={row}
                      category={category}
                      typeId={typeId}
                    ></EditProductComponent>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
