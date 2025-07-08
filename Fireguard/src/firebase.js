// src/firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDBJ5gpJCs-N5-QT0_OfPZrPTRCu4Dv6eg",
  authDomain: "fireguardiot.firebaseapp.com",
  databaseURL:
    "https://fireguardiot-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "fireguardiot",
  storageBucket: "fireguardiot.firebasestorage.app",
  messagingSenderId: "788884680702",
  appId: "1:788884680702:web:c08aae85b2667c27a35aaf",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
