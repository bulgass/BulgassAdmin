importScripts('https://www.gstatic.com/firebasejs/8.6.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.6.1/firebase-messaging.js');

firebase.initializeApp({
  apiKey: "AIzaSyBFsilZb-Wa2OtEOxiaos00Si7KLx8GIQU",
  authDomain: "bulgassadmin.firebaseapp.com",
  projectId: "bulgassadmin",
  storageBucket: "bulgassadmin.appspot.com",
  messagingSenderId: "146105604573",
  appId: "1:146105604573:web:1ddba38a7964960064be34",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  return self.registration.showNotification(notificationTitle, notificationOptions);
});
