import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";
import { toast } from "sonner";
import { LockKeyhole } from "lucide-react";
import { useAuth } from "../../hooks/auth";

import { useMutation } from "@tanstack/react-query";
import { LoginService } from "../../services/auth";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const FormSchema = z
  .object({
    senhaAtual: z
      .string({
        message: "home.resetPasswordDialog.validation.senhaAtual.required",
      })
      .min(6, {
        message: "home.resetPasswordDialog.validation.senhaAtual.min",
      }),
    novaSenha: z
      .string({
        message: "home.resetPasswordDialog.validation.novaSenha.required",
      })
      .min(6, { message: "home.resetPasswordDialog.validation.novaSenha.min" }),
    confirmacao: z
      .string({
        message: "home.resetPasswordDialog.validation.confirmacao.required",
      })
      .min(6, {
        message: "home.resetPasswordDialog.validation.confirmacao.min",
      }),
  })
  .refine((data) => data.novaSenha === data.confirmacao, {
    message: "home.resetPasswordDialog.validation.confirmacao.notMatch",
    path: ["confirmacao"],
  });

export const ResetPasswordDialog = () => {
  const { login } = useAuth();
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const { t } = useTranslation();

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      senhaAtual: "",
      novaSenha: "",
      confirmacao: "",
    },
  });

  const { mutateAsync: changePasswordMutation } = useMutation({
    mutationFn: LoginService.changePassword,
    onSuccess: ({ token, usuario }) => {
      if (usuario.tipo === "prestador") {
        toast.success(t("home.resetPasswordDialog.toast.success.message"));
        login(token, usuario);
        return setDialogIsOpen(false);
      }

      toast.error(
        t("home.resetPasswordDialog.toast.permission.error.message"),
        {
          description: t(
            "home.resetPasswordDialog.toast.permission.error.description"
          ),
        }
      );
    },
    onError: (error) => {
      return toast.error(
        "home.resetPasswordDialog.toast.unexpected.error.message",
        {
          description: t(
            "home.resetPasswordDialog.toast.unexpected.error.description"
          ),
        }
      );
    },
  });

  return (
    <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
      <DialogTrigger asChild>
        <button className="flex text-brand-500 outline-none hover:bg-zinc-100 justify-between w-full items-center gap-2  rounded-sm text-sm transition-colors [&>svg]:size-4">
          {t("home.dropdown.alterarSenha")} <LockKeyhole />
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-[390px] rounded-lg px-1 border-none bg-transparent">
        <div className="bg-white rounded-lg p-4">
          <DialogHeader>
            <DialogTitle className="text-center text-lg text-brand-500">
              {t("home.resetPasswordDialog.header.title")}
            </DialogTitle>
            <DialogDescription className="text-center text-base px-8">
              {t("home.resetPasswordDialog.header.description")}
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(changePasswordMutation)}
              className="space-y-5"
            >
              <FormField
                control={form.control}
                name="senhaAtual"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-brand-500">
                      {t("home.resetPasswordDialog.form.senhaAtual.label")} *
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        className="focus-visible:ring-brand-350"
                        placeholder={t(
                          "home.resetPasswordDialog.form.senhaAtual.placeholder"
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
                name="novaSenha"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-brand-500">
                      {t("home.resetPasswordDialog.form.novaSenha.label")} *
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        className="focus-visible:ring-brand-350"
                        placeholder={t(
                          "home.resetPasswordDialog.form.novaSenha.placeholder"
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
                      {t("home.resetPasswordDialog.form.confirmacao.label")} *
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        className="focus-visible:ring-brand-350"
                        placeholder={t(
                          "home.resetPasswordDialog.form.confirmacao.placeholder"
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
                {t("home.resetPasswordDialog.form.button.submit")}
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
