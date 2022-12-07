import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCpD4Hy7D7xOtLPWokq9v8tGcrgxYCR4MQ",
  authDomain: "social-media-app-539d2.firebaseapp.com",
  databaseURL: "https://social-media-app-539d2-default-rtdb.firebaseio.com",
  projectId: "social-media-app-539d2",
  storageBucket: "social-media-app-539d2.appspot.com",
  messagingSenderId: "576376354303",
  appId: "1:576376354303:web:4693500a990563af1d63ca"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

export const storage = getStorage();
export const db = getFirestore(app);
