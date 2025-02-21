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

const FormSchema = z
  .object({
    novaSenha: z
      .string({ message: "recoverPassword.validation.newPassword.required" })
      .min(6, { message: "recoverPassword.validation.newPassword.min" }),
    confirmacao: z
      .string({
        message: "recoverPassword.validation.confirmPassword.required",
      })
      .min(6, { message: "recoverPassword.validation.confirmPassword.min" }),
  })
  .refine((data) => data.novaSenha === data.confirmacao, {
    message: "recoverPassword.validation.confirmPassword.notMatch",
    path: ["confirmacao"],
  });

export const RecoverPasswordForm = () => {
  const { t } = useTranslation();
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      novaSenha: "",
      confirmacao: "",
    },
  });

  const navigate = useNavigate();
  const { login } = useAuth();

  const { mutateAsync: RecoverPasswordMutation } = useMutation({
    mutationFn: LoginService.createNewPassword,
    onSuccess: ({ token, usuario }) => {
      if (usuario.tipo === "prestador") {
        toast.success(t("recoverPassword.toast.success.message"));
        login(token, usuario);
        return navigate("/");
      }

      toast.error(t("recoverPassword.toast.permission.error.message"), {
        description: t("recoverPassword.toast.permission.error.description"),
      });
    },
    onError: (error) => {
      toast.error(t("recoverPassword.toast.unexpected.error.message"));
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(RecoverPasswordMutation)}
        className="space-y-4"
      >
        <FormField
          control={form.control}
          name="novaSenha"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-brand-500">
                {t("recoverPassword.form.newPassword.label")} *
              </FormLabel>
              <FormControl>
                <Input
                  className="focus-visible:ring-brand-350"
                  type="password"
                  placeholder={t(
                    "recoverPassword.form.newPassword.placeholder"
                  )}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmacao"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-brand-500">
                {t("recoverPassword.form.confirmPassword.label")} *
              </FormLabel>
              <FormControl>
                <Input
                  className="focus-visible:ring-brand-350"
                  type="password"
                  placeholder={t(
                    "recoverPassword.form.confirmPassword.placeholder"
                  )}
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
          {t("recoverPassword.form.button.submit")}
        </Button>
      </form>
    </Form>
  );
};
