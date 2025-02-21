import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { LoginService } from "../../services/auth";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/auth";
import { useTranslation } from "react-i18next";

const FormSchema = z.object({
  email: z
    .string({ message: "login.validation.form.email.error.required" })
    .email("login.validation.form.email.error.invalid"),
  senha: z
    .string({ message: "login.validation.form.senha.error.required" })
    .min(6, { message: "login.validation.form.senha.error.min" }),
});

export const LoginForm = () => {
  const { t } = useTranslation();

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      senha: "",
    },
  });

  const navigate = useNavigate();
  const { login } = useAuth();

  const { mutateAsync: LoginMutation } = useMutation({
    mutationFn: LoginService.login,
    onSuccess({ token, usuario: user }) {
      if (user.tipo === "prestador") {
        login(token, user);
        return navigate("/");
      }

      toast.error(t("login.common.form.toast.login.permission.error.message"), {
        description: t(
          "login.common.form.toast.login.permission.error.description"
        ),
      });
    },
    onError: (error) =>
      toast.error(t("login.common.form.toast.login.unexpected.error.message"), {
        description: t(
          "login.common.form.toast.login.unexpected.error.description"
        ),
      }),
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(LoginMutation)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-brand-500">
                {t("login.form.email.label")} *
              </FormLabel>
              <FormControl>
                <Input
                  className="focus-visible:ring-brand-350"
                  placeholder={t("login.form.email.placeholder")}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="senha"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-brand-500">
                {t("login.form.senha.label")} *
              </FormLabel>
              <FormControl>
                <Input
                  className="focus-visible:ring-brand-350"
                  type="password"
                  placeholder={t("login.form.senha.placeholder")}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="w-full font-semibold bg-sky-500 hover:bg-sky-600"
          type="submit"
        >
          {t("login.form.button.submit")}
        </Button>
      </form>
    </Form>
  );
};
