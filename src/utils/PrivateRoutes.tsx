import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export const PrivateRoutes = () => {
  const { currentUser, isLoading } = useAuth();

  if (isLoading) {
    return <div>"...loading"</div>;
  }

  return currentUser ? (
    <div className="h-full flex flex-col">
      <Outlet />
    </div>
  ) : (
    <Navigate to="/login" />
  );
};
