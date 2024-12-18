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

const FormSchema = z
  .object({
    senhaAtual: z
      .string({ message: "Senha atual é obrigatória" })
      .min(6, { message: "A senha precisa ter pelo menos 6 dígitos!" }),
    novaSenha: z
      .string({ message: "Senha é obrigatória" })
      .min(6, { message: "A nova senha precisa ter pelo menos 6 dígitos!" }),
    confirmacao: z
      .string({ message: "Confirmação é obrigatória" })
      .min(6, { message: "A confirmação precisa ter pelo menos 6 dígitos!" }),
  })
  .refine((data) => data.novaSenha === data.confirmacao, {
    message: "A senha e a confirmação precisam ser iguais!",
    path: ["confirmacao"],
  });

export const ResetPasswordDialog = () => {
  const { login } = useAuth();
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

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
        toast.success("Senha atualizada com sucesso!");
        login(token, usuario);
        return setDialogIsOpen(false);
      }

      toast.error("Sem permissões para acessar o app publisher!", {
        description: "Verifique suas permissões com um administrador.",
      });
    },
    onError: (error) => {
      return toast.error("Ocorreu um erro ao alterar senha.", {
        description:
          error?.response?.data?.mensagem || "Não foi possível alterar senha!",
      });
    },
  });

  return (
    <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
      <DialogTrigger asChild>
        <button className="flex text-brand-500 outline-none hover:bg-zinc-100 justify-between w-full items-center gap-2  rounded-sm text-sm transition-colors [&>svg]:size-4">
          Alterar senha <LockKeyhole />
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-[390px] rounded-lg px-1 border-none bg-transparent">
        <div className="bg-white rounded-lg p-4">
          <DialogHeader>
            <DialogTitle className="text-center text-lg text-brand-500">
              Redefinir Senha
            </DialogTitle>
            <DialogDescription className="text-center text-base px-8">
              Digite sua nova senha abaixo.
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
                      Senha atual *
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        className="focus-visible:ring-brand-350"
                        placeholder="Sua senha"
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
                      Digite sua nova senha *
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        className="focus-visible:ring-brand-350"
                        placeholder="Sua nova senha"
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
                      Confirme sua nova senha *
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        className="focus-visible:ring-brand-350"
                        placeholder="Confirme sua nova senha"
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
                Submit
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
