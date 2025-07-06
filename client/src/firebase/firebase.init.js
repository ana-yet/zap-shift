// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA1ui_Ic5e7Ki-iMhdhJyBXhd7cxGrzIsc",
  authDomain: "zap-shift-f69af.firebaseapp.com",
  projectId: "zap-shift-f69af",
  storageBucket: "zap-shift-f69af.firebasestorage.app",
  messagingSenderId: "849240748003",
  appId: "1:849240748003:web:e4d0bcc56ee682836b3ad6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
