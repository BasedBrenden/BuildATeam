import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {

    apiKey: "AIzaSyA_nakR-TgKmKl0L8OOYP1O42q_hLqfo2E",
  
    authDomain: "apollobat-a73ab.firebaseapp.com",
  
    projectId: "apollobat-a73ab",
  
    storageBucket: "apollobat-a73ab.appspot.com",
  
    messagingSenderId: "489870951900",
  
    appId: "1:489870951900:web:331780def18ed6f34afb19",
  
    measurementId: "G-9HMFS8XHTG"
  
  };
  
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const storage = getStorage(app);


export {app, auth, storage}