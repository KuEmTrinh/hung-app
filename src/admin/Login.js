import React, { useState, useEffect } from "react";
import "./Login.css";
import { authentication } from "../app/firebase";
import { db } from "../app/firebase";
import { firebase } from "../app/firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import Main from "./dashboard/Main";
import { setRole, setToken } from "../slice/loginSlice";
import { useDispatch, useSelector } from "react-redux";
export default function Login() {
  const dispatch = useDispatch();
  const userRole = useSelector((state) => state.login.role);
  const userToken = useSelector((state) => state.login.token);
  // const [isUserSignedIn, setIsUserSignedIn] = useState(false);
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        dispatch(setToken(user.uid));
        checkUserIsAdmin(user.uid);
      } else {
        dispatch(setToken(""));
      }
    });
  }, []);
  const checkUserIsAdmin = (uid) => {
    const query = db
      .collection("user")
      .doc(uid)
      .get()
      .then((querySnapshot) => {
        let role = querySnapshot.data().role;
        dispatch(setRole(role));
      });
    return query;
  };
  const setUser = (user) => {
    db.collection("user")
      .doc(user.uid)
      .get()
      .then((doc) => {
        console.log(doc);
        if (doc.exists) {
          console.log("Có dữ liệu");
        } else {
          const userId = user.uid;
          console.log(user);
          db.collection("user").doc(userId).set({
            name: user.displayName,
            email: user.email,
            emailVerified: user.emailVerified,
            uid: user.uid,
            photoURL: user.photoURL,
            role: "user",
          });
        }
      });
  };
  const loginWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(authentication, provider)
      .then((res) => {
        setUser(res.user);
        // console.log("Da dang nhap");
      })
      .catch((error) => {
        console.log("Login Failed");
      });
  };
  return (
    <>
      {userToken ? (
        <>
          {userRole == "admin" ? (
            <Main></Main>
          ) : (
            <>
              <p>Bạn không phải là admin</p>
              <button
                className="loginButton"
                onClick={() => {
                  loginWithGoogle();
                }}
              >
                Đăng nhập bằng Gmail
              </button>
            </>
          )}
        </>
      ) : (
        <button
          className="loginButton"
          onClick={() => {
            loginWithGoogle();
          }}
        >
          Đăng nhập bằng Gmail
        </button>
      )}
    </>
  );
}
