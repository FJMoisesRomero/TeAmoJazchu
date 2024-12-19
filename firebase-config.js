// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import Constants from "expo-constants";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyBw5hAjM_mlR8VQ0G0fiVBuY9nIttrvk5w",
  authDomain: "tell-67e48.firebaseapp.com",
  projectId: "tell-67e48",
  storageBucket: "tell-67e48.appspot.com",
  messagingSenderId: "828322366773",
  appId: "1:828322366773:web:80614f0abf5dcc5a90387c"
};

// initialize firebase
initializeApp(firebaseConfig);
export const auth = getAuth();
export const database = getFirestore();