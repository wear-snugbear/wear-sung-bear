import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// 1. Firebase configuration object using environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// 2. Verification (Check your browser console to ensure this isn't undefined)
if (!firebaseConfig.apiKey) {
  console.error("Firebase API Key is missing! Check your .env file or Netlify variables.");
} else {
  console.log("Firebase initialized successfully with Key:", firebaseConfig.apiKey.substring(0, 5) + "...");
}

// 3. Initialize Firebase
const app = initializeApp(firebaseConfig);

// 4. Initialize and export services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
export const analytics = getAnalytics(app);