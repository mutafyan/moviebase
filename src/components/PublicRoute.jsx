import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";

const PublicRoute = () => {
  const { user, loading } = useSelector((state) => state.auth);
  if (loading) return null;
  return user ? <Navigate to="/" replace /> : <Outlet />;
}

export default PublicRoute;
