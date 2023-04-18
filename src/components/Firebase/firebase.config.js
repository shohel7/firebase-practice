// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDE4diL6Ds0A3mksDZYvg_80htoL2nTSac",
  authDomain: "test-auth-2d29d.firebaseapp.com",
  projectId: "test-auth-2d29d",
  storageBucket: "test-auth-2d29d.appspot.com",
  messagingSenderId: "848106648755",
  appId: "1:848106648755:web:3ebda1770eb7ee65ac6cc6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;