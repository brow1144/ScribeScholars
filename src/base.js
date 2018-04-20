var firebase = require('firebase');
require('firebase/auth');
require('firebase/firestore');
// var storage = firebase.storage();


firebase.initializeApp({
  apiKey: "AIzaSyB0uaTY4FIulFgiUH2PTLyzP-6vZK3-76U",
  authDomain: "scribe-92063.firebaseapp.com",
  databaseURL: "https://scribe-92063.firebaseio.com",
  projectId: "scribe-92063",
  storageBucket: "scribe-92063.appspot.com",
  messagingSenderId: "635378838973"
});

export const fireauth = firebase.auth();
export const firestore = firebase.firestore();
export const storageRef = firebase.storage();

export default firebase;

