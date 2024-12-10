import { createBrowserRouter } from "react-router-dom";

import { AuthLayout } from "./pages/_layouts/auth.jsx";
import { MainLayout } from "./pages/_layouts/main";
import { Login } from "./pages/login";
import { Home } from "./pages/home";

import { RecoverPassword } from "./pages/recover-password/index.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },

  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/login", element: <Login /> },
      { path: "/first-login", element: <RecoverPassword /> },
      { path: "/recover-password", element: <RecoverPassword /> },
    ],
  },
]);
