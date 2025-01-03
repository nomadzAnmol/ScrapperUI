import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyAEl0BiNTwzNZY7hm4ZaDnxTAN1bMkcPIU",
    authDomain: "scrapperauth-13c76.firebaseapp.com",
    projectId: "scrapperauth-13c76",
    storageBucket: "scrapperauth-13c76.firebasestorage.app",
    messagingSenderId: "473545913768",
    appId: "1:473545913768:web:52e7e1dd407eb271fc999d"
  };
  
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
