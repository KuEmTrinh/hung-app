// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB-xr_dKqvdEbfqEXfUWa203n834aqQ3A8",
  authDomain: "hung-app-ea3c7.firebaseapp.com",
  projectId: "hung-app-ea3c7",
  storageBucket: "hung-app-ea3c7.appspot.com",
  messagingSenderId: "431508673565",
  appId: "1:431508673565:web:dfdc0ea32a990b29cda2f4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);
export const storage = getStorage(app);
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
export { db };
export { firebase };
