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
import { useTranslation } from "react-i18next";

const FormSchema = z.object({
  email: z
    .string({ message: "login.validation.dialog.form.email.error.required" })
    .email("login.validation.dialog.form.email.error.invalid"),
});

export const ForgetPasswordDialog = () => {
  const { t } = useTranslation();

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
        return toast.success(t("login.dialog.common.toast.success"), {
          description: t("login.dialog.common.toast.success.description"),
        });
      }
    },
    onError: (error) => {
      return toast.error(t("login.dialog.common.toast.error"), {
        description: t("login.dialog.common.toast.error.description"),
      });
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <a className="text-brand-500 underline text-sm cursor-pointer hover:text-brand-700">
          {t("login.footer.link")}
        </a>
      </DialogTrigger>
      <DialogContent className="max-w-[390px] rounded-lg px-1 border-none bg-transparent">
        <div className="bg-white rounded-lg p-4">
          <DialogHeader>
            <DialogTitle className="text-center text-lg text-brand-500">
              {t("login.dialog.title")}
            </DialogTitle>
            <DialogDescription className="text-center text-base px-8">
              {t("login.dialog.description")}
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
                    <FormLabel className="text-brand-500">
                      {t("login.dialog.form.email.label")} *
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="focus-visible:ring-brand-350"
                        placeholder={t("login.dialog.form.email.placeholder")}
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
                {t("login.dialog.form.button.submit")}
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
