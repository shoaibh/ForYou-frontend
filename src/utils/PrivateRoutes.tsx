import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export const PrivateRoutes = () => {
  const { currentUser, isLoading } = useAuth();

  if (isLoading) {
    return <div>"...loading"</div>;
  }

  return currentUser ? <Outlet /> : <Navigate to="/login" />;
};
