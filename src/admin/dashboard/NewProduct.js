import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import DashboardSubtitle from "../ui/DashboardSubtitle";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import imageCompression from "browser-image-compression";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
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

export default function NewProduct() {
  const [file, setFile] = useState("");
  const [preview, setPreview] = useState();
  const [name, setName] = useState();
  const [subName, setSubName] = useState();
  const [percent, setPercent] = useState(0);
  const [properties, setProperties] = useState([]);
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
  return (
    <>
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
                //   confirmCreateNewType();
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
                <p>1000</p>
              </div>
            </div>
          ) : (
            ""
          )}
          <p className="productItemName">{name}</p>
          <p className="productItemSubName">{subName}</p>
          <Stack direction="row" flexWrap="wrap">
            {properties?.map((el, index) => {
              return (
                <span className="chipLabel">
                  <Chip
                    label={el}
                    variant="outlined"
                    size="small"
                    onDelete={() => {}}
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
