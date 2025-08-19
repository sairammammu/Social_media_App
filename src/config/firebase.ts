// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCEEU5p-RKzCtk_xuxxqxiVsrUY9w-e5iA",
  authDomain: "social-media-app-949f4.firebaseapp.com",
  projectId: "social-media-app-949f4",
  storageBucket: "social-media-app-949f4.firebasestorage.app",
  messagingSenderId: "619717282649",
  appId: "1:619717282649:web:8dcccb640b20772a8b5a48",
  measurementId: "G-22E2PEVQ45"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app)