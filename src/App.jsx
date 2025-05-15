import { useEffect } from "react";
import { RouterProvider } from "react-router";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { auth } from "./firebase";
import { setUser, clearUser, finishLoading } from "./store/slices/authSlice";
import "./App.css";
import { router } from "./Router";
import { initUserLists } from "./store/slices/userListsSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        dispatch(setUser({ email: firebaseUser.email, uid: firebaseUser.uid }));
        dispatch(initUserLists(firebaseUser.uid));
      } else {
        dispatch(clearUser());
      }
      dispatch(finishLoading());
    });

    return unsubscribe; // remove auth state listeners
  }, [dispatch]);

  return <RouterProvider router={router} />;
}

export default App;
