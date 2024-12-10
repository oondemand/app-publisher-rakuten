import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useEffect } from "react";
import { RecoverPasswordForm } from "./form";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";

export const RecoverPassword = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("code");
    if (token) {
      localStorage.setItem("code", token);
      navigate(location.pathname, { replace: true });
    }
  }, [searchParams, navigate]);

  return (
    <Card className="w-[390px] py-4">
      <CardHeader className="flex items-center space-y-2.5">
        <CardTitle className="text-brand-400 text-xs font-semibold  text-center">
          Central do publisher
          <img src="/logo_rakuten_purple.png" />
        </CardTitle>
        <h2 className="text-brand-500 font-bold text-lg">Bem-vindo(a)!</h2>
        <CardDescription className="text-center text-base px-8">
          Crie sua senha para acessar a Central do Publisher Rakuten.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RecoverPasswordForm />
      </CardContent>
    </Card>
  );
};
