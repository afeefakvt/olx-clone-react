import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Import Firestore


const firebaseConfig = {
  apiKey: "AIzaSyCrPXIvugJbCZBQq_Pneyj-5hyiFdL4zB8",
  authDomain: "olx-clone-9f25b.firebaseapp.com",
  projectId: "olx-clone-9f25b",
  storageBucket: "olx-clone-9f25b.appspot.com",
  messagingSenderId: "271554269193",
  appId: "1:271554269193:web:c6444860a2892d5cc4a8d8"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);



// Initialize Authentication and Firestore
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
export const db = getFirestore(app); // Initialize Firestore