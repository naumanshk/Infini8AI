// import firebase from 'firebase';
// import 'firebase/storage';
importScripts('https://www.gstatic.com/firebasejs/8.6.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.6.2/firebase-messaging.js');

firebase.initializeApp({
    apiKey: 'api-key',
    authDomain: 'project-id.firebaseapp.com',
    databaseURL: 'https://project-id.firebaseio.com',
    projectId: 'project-id',
    storageBucket: 'project-id.appspot.com',
    messagingSenderId: 'sender-id',
    appId: 'app-id',
    measurementId: 'G-measurement-id',
  });
  
  // Retrieve an instance of Firebase Messaging so that it can handle background
  // messages.
  const messaging = firebase.messaging();

  // messaging.onBackgroundMessage((payload) => {
  //   console.log('[firebase-messaging-sw.js] Received background message ', payload);
  //   // Customize notification here
  //   const notificationTitle = 'Background Message Title';
  //   const notificationOptions = {
  //     body: 'Background Message body.',
  //     icon: '/firebase-logo.png'
  //   };
  
  //   self.registration.showNotification(notificationTitle,
  //     notificationOptions);
  // });

//   const storage =storage();
  
//   export {fire, storage as default} ;


 