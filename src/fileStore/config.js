
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";  

const firebaseConfig = {
    apiKey: "AIzaSyCJPspFWqN9VPFlLnRQFkvCj0t1TKmAJvQ",
    authDomain: "curso-react-202611.firebaseapp.com",
    projectId: "curso-react-202611",
    storageBucket: "curso-react-202611.firebasestorage.app",
    messagingSenderId: "507266119543",
    appId: "1:507266119543:web:270f21f99dc79180575372"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db =   getFirestore(app);
