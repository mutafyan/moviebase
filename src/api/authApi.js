import { auth } from "../firebase";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

const EMAIL_KEY = "login_email";

const isAuthenticated = () => {
  return !!auth.currentUser;
};

const login = async (email, password) => {
  console.log("Email: ", email);
  console.log("password: ", password);
  try {
    await signInWithEmailAndPassword(auth, email, password);
    localStorage.setItem(EMAIL_KEY, email);
    return true;
  } catch (e) {
    console.error("Error during login:", e.message);
    return false;
  }
};

const logout = async () => {
  try {
    await signOut(auth);
    localStorage.removeItem(EMAIL_KEY);
    return true;
  } catch (e) {
    console.error("Error during logout:", e.message);
    return false;
  }
};

const getEmail = () => localStorage.getItem(EMAIL_KEY) || "";

const listenToAuthChanges = (callback) => {
  return onAuthStateChanged(auth, callback);
};

export { isAuthenticated, login, logout, getEmail, listenToAuthChanges };
