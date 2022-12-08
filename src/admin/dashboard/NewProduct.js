import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import DashboardSubtitle from "../ui/DashboardSubtitle";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import imageCompression from "browser-image-compression";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import DashboardModal from "../ui/DashboardModal";
import { db } from "../../app/firebase";
import { firebase } from "../../app/firebase";
import { storage } from "../../app/firebase";
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

export default function NewProduct({ category, setOpenToggle }) {
  const typeLength = useSelector((state) => state.product.typeLength);
  const typeId = useSelector((state) => state.product.typeId);
  const [file, setFile] = useState("");
  const [preview, setPreview] = useState();
  const [name, setName] = useState();
  const [subName, setSubName] = useState();
  const [price, setPrice] = useState();
  const [percent, setPercent] = useState(0);
  const [properties, setProperties] = useState([]);
  const [createToggle, setCreateToggle] = useState(false);
  useEffect(() => {
    if (!file) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);
  const handleChangeImage = async (event) => {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1000,
      useWebWorker: true,
    };
    try {
      const file = event.target.files[0];
      const compressedFile = await imageCompression(file, options);
      setFile(compressedFile);
    } catch (err) {
      console.log(err);
    }
  };
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

  const handleUpload = () => {
    if (!file) {
      const url =
        "https://us.123rf.com/450wm/yehorlisnyi/yehorlisnyi2104/yehorlisnyi210400016/167492439-no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-comin.jpg?ver=6";
      createConfirm(url);
    } else {
      const storageRef = ref(storage, `/files/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const percent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );

          // update progress
          setPercent(percent);
        },
        (err) => console.log(err),
        () => {
          // download url
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            createConfirm(url);
          });
        }
      );
    }
  };

  const plusCountProduct = () => {
    const query = db
      .collection(category)
      .doc(typeId)
      .update({
        count: typeLength + 1,
      });
    return query;
  };
  const createConfirm = async (url) => {
    const query = await db
      .collection(category)
      .doc(typeId)
      .collection("product")
      .add({
        name: name,
        subName: subName,
        properties: properties,
        price: price,
        photoUrl: url,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
    await setCreateToggle(false);
    await setOpenToggle(false);
    await plusCountProduct();
    return query;
  };
  return (
    <>
      <DashboardModal
        show={createToggle}
        onClose={() => {
          setCreateToggle(false);
        }}
      >
        <DashboardSubtitle>新し製品を新規する</DashboardSubtitle>
        <Button
          variant="contained"
          onClick={() => {
            handleUpload();
          }}
          fullWidth
        >
          確認
        </Button>
      </DashboardModal>
      <div className="createProductBox">
        <div className="createProductInputBox">
          <DashboardSubtitle>新しい製品を新規</DashboardSubtitle>
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
          <div className="inputBox">
            <label for="accountSettingInput">
              <div className="accountSettingInputUpload">
                <div className="imageInputTitle">
                  <FileUploadIcon></FileUploadIcon>
                  <p>写真を選択</p>
                </div>
                <input
                  className="inputSetting"
                  onChange={handleChangeImage}
                  id="accountSettingInput"
                  type="file"
                ></input>
              </div>
            </label>
          </div>
          <DashboardSubtitle>製品性質管理</DashboardSubtitle>
          <PropertiesInputComponent
            setProperties={setProperties}
          ></PropertiesInputComponent>
          <div className="confirmButtonNewType">
            <Button
              variant="contained"
              onClick={() => {
                setCreateToggle(true);
              }}
              fullWidth
            >
              新規
            </Button>
          </div>
        </div>
        <div className="createProductPreviewBox">
          <DashboardSubtitle>参考</DashboardSubtitle>
          {preview ? (
            <div className="productImagePreview">
              {file && <img src={preview} />}
              <div className="productItemPrice">
                <p>{price ? <>{price}</> : "????"}</p>
              </div>
            </div>
          ) : (
            ""
          )}
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
