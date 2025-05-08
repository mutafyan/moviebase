import { Navigate, Outlet } from "react-router"
import { isAuthenticated } from "../api/authApi";

const ProtectedRoute = () => {
    return isAuthenticated() ? <Outlet/> : <Navigate to='/auth' replace/>
}

export default ProtectedRoute;
