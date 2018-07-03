import firebase from 'firebase'

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBHYq_ghuyGRXfwB91BFUO9vPBcnxbleX8",
  authDomain: "cra-pwa.firebaseapp.com",
  databaseURL: "https://cra-pwa.firebaseio.com",
  projectId: "cra-pwa",
  storageBucket: "",
  messagingSenderId: "911049353230"
});

export default firebaseApp;