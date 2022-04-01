import { getApps, getApp, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDU6--RW_4MaXNjAIuuMrx9-nGVO-_sxlI",
  authDomain: "qorder-b8e16.firebaseapp.com",
  projectId: "qorder-b8e16",
  storageBucket: "qorder-b8e16.appspot.com",
  messagingSenderId: "430405492834",
  appId: "1:430405492834:web:ced0730b77533c40fa313b",
  measurementId: "G-M94ZXBFLNM",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// Use these for db & auth
const db = getFirestore();
//const auth = auth();

export { app, db };
