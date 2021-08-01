import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyBrTfYdVKciF6pix3XDEoCewaSWcpMc7iA",
    authDomain: "engineers-bc6c8.firebaseapp.com",
    projectId: "engineers-bc6c8",
    storageBucket: "engineers-bc6c8.appspot.com",
    messagingSenderId: "1064525980406",
    appId: "1:1064525980406:web:7d84484c0deececacf42d7",
    measurementId: "G-C6QJ3YVWKK",
  });
} else {
  firebase.app();
}

export default firebase;
