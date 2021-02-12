import firebase from 'firebase'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: "pc-verse.firebaseapp.com",
    databaseURL: "https://pc-verse-default-rtdb.firebaseio.com",
    projectId: "pc-verse",
    storageBucket: "pc-verse.appspot.com",
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID
  };

firebase.initializeApp(firebaseConfig);

var database = firebase.database();

export {
  database as default
}