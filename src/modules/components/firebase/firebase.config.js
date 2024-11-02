import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB97MvSqYFu8j_79OO6RiX84rvquRWywXs",
  authDomain: "proyecto-tnmt.firebaseapp.com",
  projectId: "proyecto-tnmt",
  storageBucket: "proyecto-tnmt.appspot.com",
  messagingSenderId: "21392943924",
  appId: "1:21392943924:web:79ce9cb706fe1247779361",
  measurementId: "G-4TLWLCH7C2"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { db, auth, provider };
