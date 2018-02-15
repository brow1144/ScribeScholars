var firebase = require('firebase/app');
require('firebase/auth');
require("firebase/firestore");

firebase.initializeApp({
  apiKey: "AIzaSyChlfKvDE7NooubBJdFgaVuVElhO8h0jm8",
  authDomain: "scribescholars-ad86f.firebaseapp.com",
  databaseURL: "https://scribescholars-ad86f.firebaseio.com",
  projectId: "scribescholars-ad86f",
  storageBucket: "scribescholars-ad86f.appspot.com",
  messagingSenderId: "972953349504"
});

export const fireauth = firebase;
export const firestore = firebase;
export const googleProvider = new firebase.auth.GoogleAuthProvider();

export default firebase;

