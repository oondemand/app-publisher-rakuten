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

export const Login = () => {
  return (
    <Card className="max-w-[390px] py-4">
      <CardHeader className="flex items-center space-y-2.5">
        <CardTitle className="text-brand-400 text-xs font-semibold  text-center">
          Central do publisher
          <img src="/logo_rakuten_purple.png" />
        </CardTitle>
        <h2 className="text-brand-500 font-bold text-lg">
          Que bom ter você por aqui :)
        </h2>
        <CardDescription className="text-center text-base px-8">
          Vamos juntos transformar sua rotina com tecnologia.
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
