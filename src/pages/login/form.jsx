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

const FormSchema = z.object({
  email: z.string({ message: "Email é obrigatório" }).email("Email inválido!"),
  senha: z
    .string({ message: "Senha é obrigatória" })
    .min(6, { message: "A senha precisa ter pelo menos 6 dígitos!" }),
});

export const LoginForm = () => {
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

      toast.error("Sem permissões para acessar o app publisher!", {
        description: "Verifique suas permissões com um administrador.",
      });
    },
    onError: (error) =>
      toast.error("Erro ao fazer login", {
        description: error?.message || "",
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
              <FormLabel className="text-brand-500">Seu email *</FormLabel>
              <FormControl>
                <Input
                  className="focus-visible:ring-brand-350"
                  placeholder="Seu email"
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
              <FormLabel className="text-brand-500">Sua senha *</FormLabel>
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
