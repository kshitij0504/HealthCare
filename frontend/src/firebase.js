import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDRMqJxDj7vYeX29Ie48MBD2LpWQrI5mwE",
  authDomain: "cure-nest.firebaseapp.com",
  projectId: "cure-nest",
  storageBucket: "cure-nest.firebasestorage.app",
  messagingSenderId: "993606359272",
  appId: "1:993606359272:web:676fe7bf63e62cb3f8915d",
  measurementId: "G-N2P08VK2XH"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);