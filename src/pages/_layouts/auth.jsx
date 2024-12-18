import { Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/auth";
import { Navigate } from "react-router-dom";

export const AuthLayout = () => {
  const { user, isLoading } = useAuth();

  if (user && !isLoading && user.tipo === "prestador") {
    return (
      <div className="w-screen h-screen bg-brand-25 flex justify-center">
        <div className="max-w-[390px] px-1">
          <Outlet />
        </div>
      </div>
    );
  }

  if (!user && isLoading === false) {
    return <Navigate to="/login" replace />;
  }
};
