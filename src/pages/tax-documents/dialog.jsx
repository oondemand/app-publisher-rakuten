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

const taxDocumentsSchema = z.object({
  file: z.instanceof(File, { message: "O arquivo é obrigatório" }),
  numero: z.string().nonempty({ message: "O número é obrigatório" }),
  tipoDocumentoFiscal: z.string().nonempty({ message: "O tipo é obrigatório" }),
  valor: z.coerce.number({ message: "O valor é obrigatório" }),
  observacaoPrestador: z.string().optional(),
  descricao: z.string().optional(),
  competencia: z.string().optional(),
});

export const TaxDocumentsDialog = () => {
  const [open, setOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(taxDocumentsSchema),
    defaultValues: {
      file: null,
      numero: "",
      tipoDocumentoFiscal: "",
      dataEmissao: "",
      dataVencimento: "",
      valor: "",
      observacaoPrestador: "",
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
      toast.success("Documento fiscal criado com sucesso");
      setOpen(false);
      form.reset();
    },

    onError: () => {
      toast.error("Erro ao criar documento fiscal");
    },
  });

  const onSubmit = async (data) => {
    console.log("data", data);
    await criarDocumentoFiscalMutation({ body: data });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="mt-4 text-zinc-500">
          <PlusIcon size={16} />
          <span className="text-sm mt-0.5 ">Novo documento fiscal</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[390px] rounded-lg px-1 border-none bg-transparent">
        <div className="bg-white rounded-lg p-4">
          <DialogHeader>
            <DialogTitle className="text-center text-lg text-brand-500">
              Documento fiscal
            </DialogTitle>
            <DialogDescription className="text-center text-base px-8">
              Adicione um novo documento fiscal
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
                          Arquivo
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            // placeholder={}
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
                    label="Número"
                  />

                  <TextInput
                    required={true}
                    control={form.control}
                    name="valor"
                    label="Valor"
                  />
                </div>

                <div className="flex gap-2">
                  <TextInput
                    required={true}
                    control={form.control}
                    name="tipoDocumentoFiscal"
                    label="Tipo"
                  />

                  <TextInput
                    control={form.control}
                    name="competencia"
                    label="Competência"
                  />
                </div>

                <TextInput
                  control={form.control}
                  name="descricao"
                  label="Descrição"
                />

                <TextInput
                  control={form.control}
                  name="observacaoPrestador"
                  label="Observação"
                />

                <div className="pt-4" />

                <Button
                  disabled={isPending}
                  className="w-full bg-sky-500 hover:bg-sky-600"
                  type="submit"
                >
                  Salvar
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
