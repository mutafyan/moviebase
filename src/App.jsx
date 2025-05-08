import LoginForm from "./components/LoginForm";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import ProtectedRoute from "./components/ProtectedRoute";
import HomePage from "./pages/main/HomePage";

const router = createBrowserRouter([
  {
    path: "/auth",
    element: <LoginForm />,
  },
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [{ index: true, element: <HomePage /> }],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
