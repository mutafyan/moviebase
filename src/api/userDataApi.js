import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { db } from "../firebase";

const usersCol = (uid) => doc(db, "users", uid);

export async function ensureUserDoc(uid) {
  const snap = await getDoc(usersCol(uid));
  if (!snap.exists()) {
    await setDoc(usersCol(uid), {
      watchlist: [],
      favourites: { actors: [], movies: [] },
    });
  }
}

export async function fetchUserData(uid) {
  const snap = await getDoc(usersCol(uid));
  return snap.exists()
    ? snap.data()
    : { watchlist: [], favourites: { actors: [], movies: [] } };
}

export const addToWatchlist = (uid, movieId) =>
  updateDoc(usersCol(uid), { watchlist: arrayUnion(movieId) });

export const removeFromWatchlist = (uid, movieId) =>
  updateDoc(usersCol(uid), { watchlist: arrayRemove(movieId) });

export const addFavouriteMovie = (uid, movieId) =>
  updateDoc(usersCol(uid), { "favourites.movies": arrayUnion(movieId) });
export const removeFavouriteMovie = (uid, movieId) =>
  updateDoc(usersCol(uid), { "favourites.movies": arrayRemove(movieId) });

export const addFavouriteActor = (uid, actorId) =>
  updateDoc(usersCol(uid), { "favourites.actors": arrayUnion(actorId) });
export const removeFavouriteActor = (uid, actorId) =>
  updateDoc(usersCol(uid), { "favourites.actors": arrayRemove(actorId) });
