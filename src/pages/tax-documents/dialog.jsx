import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { TextInput } from "@/components/form/text-input";
import { Form } from "@/components/ui/form";
import { useMutation } from "@tanstack/react-query";
import { DocumentoFiscalService } from "@/services/documento-fiscal";
import { toast } from "sonner";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CurrencyInput } from "@/components/form/currency-input";
import { requiredCurrencyValidation } from "@/utils/currency";
import { CompetenceInput } from "../../components/form/competence-input";
import { SelectInput } from "../../components/form/select";
import { api } from "../../config/api";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../../config/react-query";
import { useTranslation } from "react-i18next";

const taxDocumentsSchema = z.object({
  file: z.instanceof(File, {
    message: "taxDocuments.validation.form.arquivo.required",
  }),
  numero: z
    .string()
    .nonempty({ message: "taxDocuments.validation.form.numero.required" }),
  valor: requiredCurrencyValidation({
    message: "taxDocuments.validation.form.valor.required",
  }),
  descricao: z.string().optional(),
  competencia: z
    .string()
    .refine(
      (value) => {
        if (!value) return true;
        if (value.includes("_")) return false;

        const [mes, ano] = value.split("/");
        const mesNum = parseInt(mes);

        return mesNum >= 1 && mesNum <= 12 && ano.length === 4 && ano >= 1500;
      },
      {
        message: "taxDocuments.validation.form.competencia.invalid",
      }
    )
    .optional(),
});

export const TaxDocumentsDialog = () => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  const form = useForm({
    resolver: zodResolver(taxDocumentsSchema),
    defaultValues: {
      file: null,
      numero: "",
      valor: "",
      descricao: "",
      competencia: "",
    },
  });

  const { mutateAsync: criarDocumentoFiscalMutation, isPending } = useMutation({
    mutationFn: async ({ body }) =>
      DocumentoFiscalService.criarDocumentoFiscal({
        body,
      }),

    onSuccess: () => {
      toast.success(t("taxDocuments.dialog.form.toast.success"));
      queryClient.invalidateQueries({ queryKey: ["list-documentos-fiscais"] });
      setOpen(false);
      form.reset();
    },

    onError: () => {
      toast.error(t("taxDocuments.dialog.form.toast.error"));
    },
  });

  const onSubmit = async (values) => {
    if (values?.competencia !== "") {
      const [mes, ano] = values.competencia.split("/");

      values.mes = Number(mes);
      values.ano = Number(ano);
    }

    delete values.competencia;

    await criarDocumentoFiscalMutation({
      body: values,
    });
  };

  const { data: tiposDocumentoFiscal } = useQuery({
    queryKey: ["tipos-documento-fiscal"],
    queryFn: async () => api.get("/listas/tipo-documento-fiscal"),
    staleTime: Infinity,
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="mt-4 px-2 h-[30px] rounded-md focus-visible:ring-0 bg-zinc-100 hover:bg-zinc-200 text-zinc-500">
          <PlusIcon size={14} />
          <span className="text-xs mt-0.5">
            {t("taxDocuments.dialog.form.button.label")}
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[390px] rounded-lg px-1 border-none bg-transparent">
        <div className="bg-white rounded-lg p-4">
          <DialogHeader>
            <DialogTitle className="text-center text-lg text-brand-500">
              {t("taxDocuments.dialog.form.title")}
            </DialogTitle>
            <DialogDescription className="text-center text-base px-8">
              {t("taxDocuments.dialog.form.description")}
            </DialogDescription>
          </DialogHeader>
          <div className="pt-4 pb-2">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-2"
              >
                <FormField
                  control={form.control}
                  name="file"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel className="text-brand-500">
                          {t("taxDocuments.dialog.form.arquivo.label")} *
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            onChange={(e) => {
                              field.onChange(e.target.files[0]);
                            }}
                            accept="application/pdf"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />

                <div className="flex gap-2">
                  <TextInput
                    required={true}
                    control={form.control}
                    name="numero"
                    label={t("taxDocuments.dialog.form.numero.label")}
                  />

                  <CurrencyInput
                    required={true}
                    control={form.control}
                    name="valor"
                    label={t("taxDocuments.dialog.form.valor.label")}
                  />
                </div>

                <div className="flex gap-2">
                  <CompetenceInput
                    control={form.control}
                    name="competencia"
                    label={t("taxDocuments.dialog.form.competencia.label")}
                  />
                </div>

                <TextInput
                  control={form.control}
                  name="descricao"
                  label={t("taxDocuments.dialog.form.descricao.label")}
                />

                <div className="pt-4" />

                <Button
                  disabled={isPending}
                  className="w-full bg-sky-500 hover:bg-sky-600"
                  type="submit"
                >
                  {t("taxDocuments.dialog.form.button.submit.label")}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
