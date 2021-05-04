import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDsCwgkJOD378n4yoEE2jjZSABfd6TTCkI",
    authDomain: "clone-5922e.firebaseapp.com",
    projectId: "clone-5922e",
    storageBucket: "clone-5922e.appspot.com",
    messagingSenderId: "437177529449",
    appId: "1:437177529449:web:b34508f058d3dd7277def8",
    measurementId: "G-0PWX1E0WN8"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();

  export { db, auth };