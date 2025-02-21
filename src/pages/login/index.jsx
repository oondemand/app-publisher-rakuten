import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { LoginForm } from "./form";
import { ForgetPasswordDialog } from "./dialog";
import { useTranslation } from "react-i18next";

export const Login = () => {
  const { t } = useTranslation();

  return (
    <Card className="max-w-[390px] py-4">
      <CardHeader className="flex items-center space-y-2.5">
        <CardTitle className="text-brand-400 text-xs font-semibold  text-center">
          {t("login.header.logo.description")}
          <img src="/logo_rakuten_purple.png" />
        </CardTitle>
        <h2 className="text-brand-500 font-bold text-lg">
          {t("login.header.title")}
        </h2>
        <CardDescription className="text-center text-base px-8">
          {t("login.header.description")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <LoginForm />
      </CardContent>
      <CardFooter>
        <ForgetPasswordDialog />
      </CardFooter>
    </Card>
  );
};
