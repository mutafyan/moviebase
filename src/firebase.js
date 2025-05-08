import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASEPROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASESTORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASEMESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASEAPP_ID
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {auth};