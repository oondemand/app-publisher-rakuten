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

const FormSchema = z
  .object({
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

export const RecoverPasswordForm = () => {
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
        toast.success("Senha atualizada com sucesso!");
        login(token, usuario);
        return navigate("/");
      }

      toast.error("Sem permissões para acessar o app publisher!", {
        description: "Verifique suas permissões com um administrador.",
      });
    },
    onError: (error) => {
      toast.error("Ouve um erro ao atualizar senha!");
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
              <FormLabel className="text-brand-500">Nova senha *</FormLabel>
              <FormControl>
                <Input
                  className="focus-visible:ring-brand-350"
                  type="password"
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
          name="confirmacao"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-brand-500">
                Confirme sua nova senha *
              </FormLabel>
              <FormControl>
                <Input
                  className="focus-visible:ring-brand-350"
                  type="password"
                  placeholder="Sua senha"
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
  );
};
