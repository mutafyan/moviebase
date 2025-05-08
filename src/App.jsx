import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { auth } from "./firebase";
import { setUser, clearUser } from "./store/slices/authSlice";
import ProtectedRoute from "./components/ProtectedRoute";
import HomePage from "./pages/main/HomePage";
import "./App.css";
import LoginScreen from "./pages/auth/LoginScreen";

const router = createBrowserRouter([
  {
    path: "/auth",
    element: <LoginScreen />,
  },
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
]);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        dispatch(setUser({ email: firebaseUser.email, uid: firebaseUser.uid }));
      } else {
        dispatch(clearUser());
      }
    });

    return () => unsubscribe(); // remove auth state listeners
  }, [dispatch]);

  return <RouterProvider router={router} />;
}

export default App;
