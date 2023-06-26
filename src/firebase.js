import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyBXDyeKmXDUtFVp7LBKSevuhjqooUXOCnQ",
  authDomain: "carpe-septemfirebase.firebaseapp.com",
  databaseURL: "https://carpe-septemfirebase-default-rtdb.firebaseio.com",
  projectId: "carpe-septemfirebase",
  storageBucket: "carpe-septemfirebase.appspot.com",
  messagingSenderId: "1004043563410",
  appId: "1:1004043563410:web:42839545e7b929ea03114b",
  measurementId: "G-HRLJGW5LMD"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage(app);
