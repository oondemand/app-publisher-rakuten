import { Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/auth";
import { Navigate } from "react-router-dom";
import { env } from "../../config/env";
import { Link } from "react-router-dom";
import { FileText } from "lucide-react";
import { Dropdown } from "./dropdown";

export const AuthLayout = () => {
  const { user, isLoading } = useAuth();

  if (user && !isLoading && user.tipo === "prestador") {
    return (
      <div className="w-screen h-screen bg-brand-25 flex justify-center">
        <div className="max-w-[390px] w-full relative overflow-hidden px-1">
          <div className="px-3 py-3 flex items-center justify-between shadow-sm">
            <Link to="/">
              <img width={84} height={23} src="/logo_rakuten_purple.png" />
            </Link>
            <div className="flex items-end gap-1">
              <Link
                to="/tax-documents"
                className="text-zinc-500 rounded-full bg-zinc-50 p-1"
              >
                <FileText size={19} />
              </Link>
              <Dropdown />
            </div>
          </div>
          <Outlet />
        </div>
        <div className="bg-brand-800 absolute bottom-0 w-full text-center py-3">
          <span className="text-white font-bold text-base">
            © App Publisher - v{env.VITE_SERVICE_VERSION}
          </span>
        </div>
      </div>
    );
  }

  if (!user && isLoading === false) {
    return <Navigate to="/login" replace />;
  }
};
