var firebase = require('firebase');
require('firebase/auth');
require('firebase/firestore');
require('firebase/firebase-storage');

firebase.initializeApp({
  apiKey: "AIzaSyChlfKvDE7NooubBJdFgaVuVElhO8h0jm8",
  authDomain: "scribescholars-ad86f.firebaseapp.com",
  databaseURL: "https://scribescholars-ad86f.firebaseio.com",
  projectId: "scribescholars-ad86f",
  storageBucket: "scribescholars-ad86f.appspot.com",
  messagingSenderId: "972953349504"
});

export const fireauth = firebase.auth();
export const firestore = firebase.firestore();
export const storageRef = firebase.storage().ref();
export const googleProvider = new firebase.auth.GoogleAuthProvider();

export default firebase;

