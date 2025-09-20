import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAT4JAO1Iy_XjY6zIG3wHalofKIdbORtmk",
  authDomain: "aks-tour.firebaseapp.com",
  projectId: "aks-tour",
  storageBucket: "aks-tour.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:0987654321",
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
