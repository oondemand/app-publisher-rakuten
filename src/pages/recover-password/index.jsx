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
import { useTranslation } from "react-i18next";

export const RecoverPassword = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    const token = searchParams.get("code");
    if (token) {
      localStorage.setItem("code", token);
      navigate(location.pathname, { replace: true });
    }
  }, [searchParams, navigate]);

  return (
    <Card className="max-w-[390px] py-4">
      <CardHeader className="flex items-center space-y-2.5">
        <CardTitle className="text-brand-400 text-xs font-semibold  text-center">
          {t("recoverPassword.header.logo.description")}
          <img src="/logo_rakuten_purple.png" />
        </CardTitle>
        <h2 className="text-brand-500 font-bold text-lg">
          {t("recoverPassword.header.title")}
        </h2>
        <CardDescription className="text-center text-base px-8">
          {t("recoverPassword.header.description")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RecoverPasswordForm />
      </CardContent>
    </Card>
  );
};
