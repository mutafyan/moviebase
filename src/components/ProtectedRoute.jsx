import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";
import { Spin } from "antd";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useSelector((state) => state.auth);

  if (loading) return <Spin tip="Loading…" />;
  if (!user) return <Navigate to="/login" replace />;

  return children ?? <Outlet />;
};

export default ProtectedRoute;
