import firebase from 'firebase';
import 'firebase/storage';

var firebaseConfig = {
  apiKey: "AIzaSyBXm78Qmzus2FECKRUkYbYgKeNtlBYHd4c",
  authDomain: "video-chat-77f10.firebaseapp.com",
  databaseURL: "https://video-chat-77f10-default-rtdb.firebaseio.com",
  projectId: "video-chat-77f10",
  storageBucket: "video-chat-77f10.appspot.com",
  messagingSenderId: "754482653479",
  appId: "1:754482653479:web:833aa1bc76de16559aa102",
  measurementId: "G-NMC5PLLJR7"
  };

  const fire = firebase.initializeApp(firebaseConfig);
  const storage = firebase.storage();
  export {fire, storage as default} ;

