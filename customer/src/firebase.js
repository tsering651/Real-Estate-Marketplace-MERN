
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-marketplace-44c1e.firebaseapp.com",
  projectId: "real-estate-marketplace-44c1e",
  storageBucket: "real-estate-marketplace-44c1e.appspot.com",
  messagingSenderId: "200020566451",
  appId: "1:200020566451:web:598f1036b4fc1736a12bc6"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);