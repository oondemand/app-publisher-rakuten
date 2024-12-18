import { Outlet } from "react-router-dom";

export const MainLayout = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="max-w-[390px] px-1 relative">
        <Outlet />
      </div>
    </div>
  );
};
