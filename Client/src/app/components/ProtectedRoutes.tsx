import { Navigate, Outlet } from "react-router";
import { useAuth } from "../../lib/hooks/useAuth";

type ProtectedRouteProps = {
  allowedRoles?: string[];
};

const ProtectedRoutes = ({ allowedRoles }: ProtectedRouteProps) => {
  const { user } = useAuth();

  
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
