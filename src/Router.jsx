import { createBrowserRouter, Navigate, Outlet } from "react-router";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import PublicRoute from "./components/routes/PublicRoute";
import Layout from "./components/Layout";
import HomeScreen from "./pages/main/HomeScreen";
import LoginScreen from "./pages/auth/LoginScreen";
import RegisterScreen from "./pages/auth/RegisterScreen";
import MoviesScreen from "./pages/main/MoviesScreen";
import MovieDetailScreen from "./pages/main/MovieDetailScreen";
import ActorScreen from "./pages/main/ActorScreen";
import { WatchlistScreen } from "./pages/main/WatchListScreen";
import FavouritesScreen from "./pages/main/FavouritesScreen";

const ProtectedWithLayout = () => (
  <ProtectedRoute>
    <Layout>
      <Outlet />
    </Layout>
  </ProtectedRoute>
);

export const router = createBrowserRouter([
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
    element: <ProtectedWithLayout />,
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
      {
        path: "/actor/:id",
        element: <ActorScreen />,
      },
      {
        path: "/watchlist",
        element: <WatchlistScreen />,
      },
      {
        path: "/favourites",
        element: <FavouritesScreen />,
      },
      //...
    ],
  },
  { path: "*", element: <Navigate to={"/"} replace /> },
]);
