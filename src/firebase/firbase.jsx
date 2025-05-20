import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAT4JAO1Iy_XjY6zIG3wHalofKIdbORtmk",
  authDomain: "akstur-f10de.firebaseapp.com",
  projectId: "akstur-f10de",
  storageBucket: "akstur-f10de.firebasestorage.app",
  messagingSenderId: "1073542217458",
  appId: "1:1073542217458:web:49a23d0870fbcec76fda6b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Firestore and get a reference to the service
const db = getFirestore(app);

// Initialize Firebase Storage and get a reference to the service
const storage = getStorage(app);

export { auth, db, storage };
