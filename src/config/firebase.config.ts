
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCDmbGARjId3X7HsYCaXWW906XHS__tp7M",
  authDomain: "e-commerce-eb59d.firebaseapp.com",
  projectId: "e-commerce-eb59d",
  storageBucket: "e-commerce-eb59d.firebasestorage.app",
  messagingSenderId: "117846641302",
  appId: "1:117846641302:web:eaa2975dff93983c0b50b7"
};


export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();