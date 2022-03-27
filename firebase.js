import { initializeApp } from "firebase/app";
import {getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore';
//import firebase from 'firebase';
const firebaseConfig = {
  apiKey: "AIzaSyAz37rqk-U213TyOVm-4cm0DlWyn1dl9bA",
  authDomain: "rn-instagram-clone-5d78e.firebaseapp.com",
  projectId: "rn-instagram-clone-5d78e",
  storageBucket: "rn-instagram-clone-5d78e.appspot.com",
  messagingSenderId: "1013681198785",
  appId: "1:1013681198785:web:d68aac89cc1ef502402640"
};

//!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db =  getFirestore(app);

export {auth, db}