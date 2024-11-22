// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDt7mReSLb-w5McrystqJ7z0VzESfAn6TY",
  authDomain: "chattingapp-1f242.firebaseapp.com",
  projectId: "chattingapp-1f242",
  storageBucket: "chattingapp-1f242.firebasestorage.app",
  messagingSenderId: "33099094330",
  appId: "1:33099094330:web:ef71c3cfa336f5a3a6d803",
  measurementId: "G-MNXT52NG8X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


export default app