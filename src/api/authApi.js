import { auth } from "../firebase";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
} from "firebase/auth";

const EMAIL_KEY = "login_email";

const isAuthenticated = () => {
  return !!auth.currentUser;
};

const login = async (email, password) => {
  try {
    const credentials = await signInWithEmailAndPassword(auth, email, password);
    localStorage.setItem(EMAIL_KEY, email);
    return credentials;
  } catch (err) {
    throw new Error(err.message);
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

const register = async (email, password) => {
  try {
    const credentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    localStorage.setItem(EMAIL_KEY, email);
    return credentials;
  } catch (e) {
    throw new Error(e);
  }
};

const getEmail = () => localStorage.getItem(EMAIL_KEY) || "";

const listenToAuthChanges = (callback) => {
  return onAuthStateChanged(auth, callback);
};

export {
  isAuthenticated,
  login,
  logout,
  register,
  getEmail,
  listenToAuthChanges,
};
