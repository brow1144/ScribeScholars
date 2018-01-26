var Rebase = require('re-base');
var firebase = require('firebase/app');
require('firebase/database');

const app = firebase.initializeApp({
  apiKey: "AIzaSyChlfKvDE7NooubBJdFgaVuVElhO8h0jm8",
  authDomain: "scribescholars-ad86f.firebaseapp.com",
  databaseURL: "https://scribescholars-ad86f.firebaseio.com",
  projectId: "scribescholars-ad86f",
  storageBucket: "scribescholars-ad86f.appspot.com",
  messagingSenderId: "972953349504"
});

var db = firebase.database(app);
export default Rebase.createClass(db);

