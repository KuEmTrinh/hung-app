import React, { useState, useEffect } from "react";
import DashboardSubtitle from "../ui/DashboardSubtitle";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import { useSelector } from "react-redux";
import { db } from "../../app/firebase";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
export default function ProductList({ category }) {
  const typeId = useSelector((state) => state.product.typeId);
  const [items, setItems] = useState();
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
                <TableCell align="right">
                  <div className="productActionBox">
                    <div className="productTypeActionIconDelete">
                      <DeleteIcon
                        color="blackColor"
                        fontSize="small"
                        className="hoverIconColor"
                        onClick={() => {
                          // setDeleteToggle(true);
                        }}
                      ></DeleteIcon>
                    </div>
                    <div
                      className="productTypeActionIconEdit"
                      onClick={() => {
                        // setEditToggle(true);
                      }}
                    >
                      <EditIcon
                        color="blackColor"
                        fontSize="small"
                        className="hoverIconColor"
                      ></EditIcon>
                    </div>
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
