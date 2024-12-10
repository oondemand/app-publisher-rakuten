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
import { LoginService } from "../../services/auth";

import { useMutation } from "@tanstack/react-query";

const FormSchema = z.object({
  email: z.string({ message: "Email é obrigatório" }).email("Email inválido!"),
});

export const ForgetPasswordDialog = () => {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
    },
  });

  const { mutateAsync: ForgetPasswordMutation, isPending } = useMutation({
    mutationFn: LoginService.forgotPassword,
    onSuccess(response) {
      if (response.status === 200) {
        return toast.success("Verifique seu e-mail. ", {
          description: "Te enviamos um link para redefinir sua senha",
        });
      }
    },
    onError: (error) => {
      return toast.error("Ouve um erro ao recuperar senha", {
        description: error?.response?.data?.message || error.message,
      });
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <a className="text-brand-500 underline text-sm cursor-pointer hover:text-brand-700">
          Esqueci minha senha
        </a>
      </DialogTrigger>
      <DialogContent className="max-w-[390px] rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-center text-lg text-brand-500">
            Recuperação de Senha
          </DialogTitle>
          <DialogDescription className="text-center text-base px-8">
            Informe o e-mail associado à sua conta. Você receberá um link para
            redefinir sua senha.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(ForgetPasswordMutation)}
            className="space-y-5"
          >
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
            <Button
              disabled={isPending}
              className="w-full font-semibold bg-sky-500 hover:bg-sky-600"
              type="submit"
            >
              Submit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
