import firebase from 'firebase';
import 'firebase/storage';

var firebaseConfig = {
  apiKey: "AIzaSyAY3LxSg3cO2yFF9WzqYUcJrZHFzRnUhSY",
  authDomain: "infini8-ai.firebaseapp.com",
  projectId: "infini8-ai",
  storageBucket: "infini8-ai.appspot.com",
  messagingSenderId: "866141127012",
  appId: "1:866141127012:web:682e6ad818f3878aa7fa71",
  measurementId: "G-1LCVZLFJ5K"
  };

  const fire = firebase.initializeApp(firebaseConfig);
  const storage = firebase.storage();
  const messaging = firebase.messaging();

  export {fire, storage , messaging as default} ;

