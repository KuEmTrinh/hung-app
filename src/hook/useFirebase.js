import React, { useState, useEffect } from "react";
import { db } from "../app/firebase";

export default function useFirebaseGet(...props) {
  const [result, setResult] = useState();
  const data = [...props];

  useEffect(() => {
    if (props[0] != null) {
      getData();
    }
  }, [props[0]]);
  const getData = async () => {
    const splitData = await data.splice(1);
    const query = await db;
    await splitData.map((el) => {
      if (el[1]) {
        query.collection(el[0]).doc(el[1]);
        console.log("connect");
      } else {
        query.collection(el[0]);
        console.log("get");
      }
    });
    // query = await query.onSnapshot((querySnapshot) => {
    //   const data = [];
    //   querySnapshot.docs.map((doc) => {
    //     let item = doc.data();
    //     item.id = doc.id;
    //     data.push(item);
    //   });
    //   console.log(data);
    // });
  };

  return [result];
}
