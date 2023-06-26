// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from "firebase/firestore"




const firebaseConfig = {
  apiKey: "AIzaSyDw_FRdqMsrTZqbLKYfc7EIoo8WVXf69po",
  authDomain: "database-auth-a4222.firebaseapp.com",
  projectId: "database-auth-a4222",
  storageBucket: "database-auth-a4222.appspot.com",
  messagingSenderId: "334579421951",
  appId: "1:334579421951:web:9602fa36090e050a15f2ca"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);