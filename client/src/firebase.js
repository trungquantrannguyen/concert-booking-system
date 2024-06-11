// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.FIREBASE_KEY,
  authDomain: "concert-booking-web.firebaseapp.com",
  projectId: "concert-booking-web",
  storageBucket: "concert-booking-web.appspot.com",
  messagingSenderId: "375280266143",
  appId: "1:375280266143:web:adb5a383752d18d00d6baa",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
