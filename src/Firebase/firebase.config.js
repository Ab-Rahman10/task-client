// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyChNRlHa5PosOsuTZ9tdcpE83sAyXE9dss",
  authDomain: "task-management-b6464.firebaseapp.com",
  projectId: "task-management-b6464",
  storageBucket: "task-management-b6464.firebasestorage.app",
  messagingSenderId: "215878866178",
  appId: "1:215878866178:web:7261e83359c7828667de1b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
