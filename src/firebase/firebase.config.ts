// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyArSZd1AK84pJ2sWQml-ryT_EmOvh4viQY",
  authDomain: "buffalo-app-data.firebaseapp.com",
  projectId: "buffalo-app-data",
  storageBucket: "buffalo-app-data.firebasestorage.app",
  messagingSenderId: "792528119735",
  appId: "1:792528119735:web:488bd195f1f54950b3aa32",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Obtener autenticación y Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);

// Crear e exportar los proveedores de autenticación
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();


export  default app;