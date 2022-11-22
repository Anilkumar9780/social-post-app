import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyB4Y_5e5FOPxNF6FjlrJCtUh4WmyTttmi8",
  authDomain: "social-media-app-c9b69.firebaseapp.com",
  projectId: "social-media-app-c9b69",
  storageBucket: "social-media-app-c9b69.appspot.com",
  messagingSenderId: "968502154569",
  appId: "1:968502154569:web:9cabaaf6d22125aee23698"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

export const storage = getStorage();
export const db = getFirestore(app);
