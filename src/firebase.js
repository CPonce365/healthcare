// src/components/firebase.js (or move to src/firebase.js if cleaner)

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // 🔥 Needed for login/signup
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA1kU3XWw2yVukJ88jNbEAwiMq_M-bycOc",
  authDomain: "capstone-52761.firebaseapp.com",
  projectId: "capstone-52761",
  storageBucket: "capstone-52761.firebasestorage.app",
  messagingSenderId: "89882458953",
  appId: "1:89882458953:web:7c56bd0ffe1ddd086bf898",
  measurementId: "G-2EYDMC18MG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
export { db }
const analytics = getAnalytics(app);
export const auth = getAuth(app); // ✅ EXPORT this so you can use it in Login/Signup
