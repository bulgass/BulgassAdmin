
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBFsilZb-Wa2OtEOxiaos00Si7KLx8GIQU",
  authDomain: "bulgassadmin.firebaseapp.com",
  projectId: "bulgassadmin",
  storageBucket: "bulgassadmin.appspot.com",
  messagingSenderId: "146105604573",
  appId: "1:146105604573:web:1ddba38a7964960064be34",
  measurementId: "G-HM157SPRKS"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);