import firebase from 'firebase';

export default firebase.initializeApp({
  apiKey: "AIzaSyBHYq_ghuyGRXfwB91BFUO9vPBcnxbleX8",
  authDomain: "cra-pwa.firebaseapp.com",
  databaseURL: "https://cra-pwa.firebaseio.com",
  projectId: "cra-pwa",
  storageBucket: "",
  messagingSenderId: "911049353230"
});

export const db = firebase.firestore();

const settings = {timestampsInSnapshots: true};
db.settings(settings);
db.enablePersistence()
  .then(function() {
    // Initialize Cloud Firestore through firebase
    firebase.firestore();
  })
  .catch(function(err) {
    if (err.code === 'failed-precondition') {
      console.log('Multiple tabs open, persistence can only be enabled in one tab at a a time.');
    } else if (err.code === 'unimplemented') {
      console.log('The current browser does not support all of the features required to enable persistence');
    }
  });