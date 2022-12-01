import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import DashboardSubtitle from "../ui/DashboardSubtitle";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import imageCompression from "browser-image-compression";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

export default function NewProduct() {
  const [file, setFile] = useState("");
  const [preview, setPreview] = useState();
  const [name, setName] = useState();
  const [subName, setSubName] = useState();
  const [percent, setPercent] = useState(0);
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
        </div>
      </div>
    </>
  );
}
