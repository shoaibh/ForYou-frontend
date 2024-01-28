// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBmYO7Ew3EEMGUyfo6N0uXFmRjrcvCuqaM",
  authDomain: "foryou-6e39e.firebaseapp.com",
  projectId: "foryou-6e39e",
  storageBucket: "foryou-6e39e.appspot.com",
  messagingSenderId: "529241306555",
  appId: "1:529241306555:web:6bb0308b39f47f831fc09e",
  measurementId: "G-T50K4S1VYC",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const storage = getStorage();
export const db = getFirestore();