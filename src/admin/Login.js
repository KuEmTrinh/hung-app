import React, { useState, useEffect } from "react";
import "./Login.css";
import { authentication } from "../app/firebase";
import { db } from "../app/firebase";
import { firebase } from "../app/firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import Main from "./dashboard/Main";
export default function Login() {
  const [isUserSignedIn, setIsUserSignedIn] = useState(false);
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const userInfomation = JSON.stringify(user);
        return setIsUserSignedIn(true);
      }
      return setIsUserSignedIn(false);
    });
  }, []);
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
          });
        }
      });
  };
  const loginWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(authentication, provider)
      .then((res) => {
        setUser(res.user);
        console.log("Da dang nhap");
      })
      .catch((error) => {
        console.log("Login Failed");
      });
  };
  return (
    <>
      {isUserSignedIn ? (
        <Main></Main>
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
