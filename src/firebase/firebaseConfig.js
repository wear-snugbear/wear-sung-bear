import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // Added quotes

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAgbEfiRiYPFNgPCfJ5Ae47aMTLInnNRZY",
  authDomain: "snugbear-dcfa8.firebaseapp.com",
  projectId: "snugbear-dcfa8",
  storageBucket: "snugbear-dcfa8.firebasestorage.app",
  messagingSenderId: "778308368113",
  appId: "1:778308368113:web:016e02fc5eb488a2055b50",
  measurementId: "G-FZVQH94QKF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Exported instances
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app); // Initialized and exported Firestore