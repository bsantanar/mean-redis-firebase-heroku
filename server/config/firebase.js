const firebase = require('firebase-admin');

const app = firebase.initializeApp({
    apiKey: "AIzaSyAMKkfF6a9pnAqy4Pwv57vf3WwHZLN3s0o",
    authDomain: "products-challenge.firebaseapp.com",
    databaseURL: "https://products-challenge.firebaseio.com",
    projectId: "products-challenge",
    storageBucket: "products-challenge.appspot.com",
    messagingSenderId: "531665349296",
    appId: "1:531665349296:web:8c1defcb170a8bbd8a6975",
    measurementId: "G-ZLBCD80FLL"
  });

module.exports = app;