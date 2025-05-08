import { auth } from "../firebase";
import {
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const EMAIL_KEY = "login_email";

const isAuthenticated = () => {
  return !!auth.currentUser;
};

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    localStorage.setItem(EMAIL_KEY, email);
    return true;
  } catch (e) {
    console.error("Error while logging in:", e.message);
    return false;
  }
};

const logout = async () => {
  try {
    await signOut(auth);
    localStorage.removeItem(EMAIL_KEY);
    return true;
  } catch (e) {
    console.error("Error while logging out:", e.message);
    return false;
  }
};

const getEmail = () => localStorage.getItem(EMAIL_KEY) || "";

export { isAuthenticated, login, logout, getEmail };
