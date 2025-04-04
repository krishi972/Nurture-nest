
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyC4WPtlBJOEdtEUjloUoKCdrXispW-RrMo",
  authDomain: "nurturenest-34bc5.firebaseapp.com",
  projectId: "nurturenest-34bc5",
  storageBucket: "nurturenest-34bc5.firebasestorage.app",
  messagingSenderId: "172160990007",
  appId: "1:172160990007:web:2dad5fe03efb68029678b2",
  measurementId: "G-LS346GCZXB"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth=getAuth(app);
export const db = getFirestore(app);
