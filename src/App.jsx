import { useEffect } from "react";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { auth } from "./firebase";
import { setUser, clearUser, finishLoading } from "./store/slices/authSlice";
import ProtectedRoute from "./components/ProtectedRoute";
import HomeScreen from "./pages/main/HomeScreen";
import "./App.css";
import LoginScreen from "./pages/auth/LoginScreen";
import RegisterScreen from "./pages/auth/RegisterScreen";
import PublicRoute from "./components/PublicRoute";
import MoviesScreen from "./pages/main/MoviesScreen";
import MovieDetailScreen from "./pages/main/MovieDetailScreen";

const router = createBrowserRouter([
  {
    element: <PublicRoute />,
    children: [
      {
        path: "/register",
        element: <RegisterScreen />,
      },
      {
        path: "/login",
        element: <LoginScreen />,
      },
    ],
  },
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        index: true,
        element: <HomeScreen />,
      },
      {
        path: "/movies",
        children: [
          {
            index: true,
            element: <MoviesScreen />,
          },
          {
            path: ":id",
            element: <MovieDetailScreen />,
          },
        ],
      },
      //...
    ],
  },
  { path: "*", element: <Navigate to={"/"} replace /> },
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
      dispatch(finishLoading());
    });

    return unsubscribe; // remove auth state listeners
  }, [dispatch]);

  return <RouterProvider router={router} />;
}

export default App;
