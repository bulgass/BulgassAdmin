import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import 'firebase/messaging';

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
const db = getFirestore(app);
const auth = getAuth(app);
const analytics = getAnalytics(app);
const messaging = firebaseApp.messaging();

export const getToken = (setTokenFound) => {
  return messaging
    .getToken({ vapidKey: 'YOUR_PUBLIC_VAPID_KEY' })
    .then((currentToken) => {
      if (currentToken) {
        setTokenFound(true);
        
        console.log('FCM Token:', currentToken);
      } else {
        setTokenFound(false);
        console.log('No registration token available. Request permission to generate one.');
      }
    })
    .catch((err) => {
      setTokenFound(false);
      console.log('An error occurred while retrieving token. ', err);
    });
};

export { app, db, auth, analytics };