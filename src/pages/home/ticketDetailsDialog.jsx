import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Button } from "@/components/ui/button";

import { Badge } from "@/components/ui/badge";
import { CircleCheckBig, RefreshCcw, Clock, Download } from "lucide-react";
import { formatCurrency } from "../../utils/currency";
import { addTotalValueOfServices } from "./index";
import { formatCompetence } from "../../utils/date";

import { saveAs } from "file-saver";
import { useTranslation } from "react-i18next";
import { TicketService } from "../../services/tickets";
import { ServiceDetailsPopover } from "./popover";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";

export const TicketDetailsDialog = ({ open, ticket, onOpenChange }) => {
  const { t } = useTranslation();

  const handleDownloadArquivo = async ({ id }) => {
    try {
      const { data } = await TicketService.getFile({ id });
      if (data) {
        const byteArray = new Uint8Array(data?.buffer?.data);
        const blob = new Blob([byteArray], { type: data?.mimetype });
        saveAs(blob, data?.nomeOriginal);
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  const { mutateAsync: uploadFileMutation, isPending } = useMutation({
    mutationFn: async ({ files }) =>
      await TicketService.uploadFiles({ ticketId: ticket._id, files }),
    onSuccess: ({ data }) => {
      console.log("Arquivo enviado", data);

      const { nomeOriginal, mimetype, size, tipo, _id } = data?.arquivos[0];
      ticket.arquivos = [
        ...ticket.arquivos,
        { nomeOriginal, mimetype, size, tipo, _id },
      ];

      toast.success(t("home.ticketDetails.toast.importFiles.success.message"));
    },
    onError: () => {
      toast.error(t("home.ticketDetails.toast.importFiles.error.message"));
    },
  });

  return (
    <Dialog
      open={open}
      onOpenChange={(e) => {
        onOpenChange(e);
      }}
    >
      <DialogContent
        closeButton
        className="max-w-[390px] rounded-lg px-1 border-none bg-transparent"
      >
        <div className="bg-white rounded-lg p-4">
          <DialogHeader className="text-left">
            <DialogTitle className="text-base border-b text-brand-500">
              {t("home.ticketDetails.dialog.title")}
            </DialogTitle>
          </DialogHeader>
          <div className="pb-3" />
          <div className="flex flex-col gap-2">
            <span className="flex gap-4 font-semibold text-zinc-600">
              {t("home.ticketDetails.dialog.status.label")}{" "}
              {ticket && ticket?.status === "aberto" && !ticket?.etapa && (
                <Badge className="rounded-2xl  bg-zinc-100 text-zinc-500 hover:bg-zinc-200 flex gap-2 items-center">
                  <CircleCheckBig size={14} /> {t("home.badge.aberto")}
                </Badge>
              )}
              {ticket &&
                ticket.status === "concluido" &&
                ticket.etapa === "concluido" && (
                  <Badge className="rounded-2xl  bg-emerald-100 text-green-500 hover:bg-emerald-200 flex gap-2 items-center">
                    <CircleCheckBig size={14} /> {t("home.badge.pago")}
                  </Badge>
                )}
              {/* {ticket && ticket?.etapa === "integracao-omie" && (
                <Badge className="rounded-2xl bg-violet-200 text-violet-500 hover:bg-violet-300 flex gap-2 items-center">
                  <Clock size={14} /> {t("home.badge.pendente")}
                </Badge>
              )} */}
              {ticket &&
                ticket?.etapa &&
                !["requisicao", "concluido"].includes(ticket.etapa) && (
                  <Badge className="rounded-2xl bg-violet-200 text-violet-500 hover:bg-violet-300 flex gap-2 items-center">
                    <RefreshCcw size={14} />
                    {t("home.badge.processando")}
                  </Badge>
                )}
            </span>
            <span className="flex gap-4 font-semibold text-zinc-600">
              {t("home.ticketDetails.dialog.valorTotal.label")}{" "}
              <p className="font-normal">
                {formatCurrency(
                  addTotalValueOfServices(ticket?.servicos ?? [])
                )}
              </p>
            </span>
            {ticket?.etapa && (
              <Accordion
                type="single"
                collapsible
                className="border-none outline-none"
              >
                <AccordionItem value="item-1">
                  <AccordionTrigger className="py-1 outline-none border-none decoration-transparent font-semibold text-zinc-600 text-base">
                    {t("home.ticketDetails.dialog.header.arquivo")}
                  </AccordionTrigger>
                  <AccordionContent className="space-y-2 mt-1 max-h-[95%]">
                    {ticket?.arquivos.map((e) => {
                      return (
                        <div
                          key={e?._id}
                          className="flex justify-between items-center"
                        >
                          <div className="font-medium text-zinc-500">
                            {e?.nomeOriginal}
                          </div>
                          <Button
                            onClick={async () => {
                              await handleDownloadArquivo({ id: e?._id });
                            }}
                            variant="outline"
                            className="size-6 rounded-lg bg-transparent border-none outline-none text-brand-500 hover:text-brand-500"
                          >
                            <Download />
                          </Button>
                        </div>
                      );
                    })}

                    {(ticket?.status !== "concluido" ||
                      ticket?.etapa !== "concluido") && (
                      <div className="w-full pt-2">
                        <input
                          disabled={isPending}
                          accept="application/pdf"
                          type="file"
                          id="file-input"
                          className="hidden"
                          onChange={async (e) => {
                            if (e.target?.files.length > 0) {
                              const file = e.target.files[0];

                              // Convertendo bytes para MB
                              const fileSizeInMB = file.size / (1024 * 1024);

                              console.log(fileSizeInMB);

                              if (fileSizeInMB > 0.5) {
                                toast.error(
                                  t(
                                    "home.ticketDetails.toast.importFiles.error.size.message"
                                  )
                                );
                                e.target.value = "";
                                return;
                              }

                              await uploadFileMutation({
                                files: [file],
                              });
                            }
                          }}
                        />

                        <label
                          for="file-input"
                          className="min-w-full text-sm inline-block cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-medium py-1.5 px-4 rounded-md transition-colors duration-200"
                        >
                          {t("home.ticketDetails.dialog.importFiles.label")}
                        </label>
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            )}
            <span className="flex mt-1 gap-4 font-semibold text-zinc-600">
              {t("home.ticketDetails.dialog.comissoes.label")}
            </span>
            <Table>
              <TableHeader>
                <TableRow className="bg-brand-500 text-white rounded-t-md hover:bg-brand-500">
                  <TableHead className="rounded-tl-md text-white font-bold p-2 h-0">
                    {t("home.ticketDetails.table.head.label.competencia")}
                  </TableHead>
                  <TableHead className="rounded-tr-md text-white font-bold p-2 h-0">
                    {t("home.ticketDetails.table.head.label.valor")}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ticket &&
                  ticket?.servicos.map((servico) => (
                    <ServiceDetailsPopover key={servico._id} servico={servico}>
                      <TableRow>
                        <TableCell>
                          {formatCompetence({
                            month: servico?.competencia?.mes,
                            year: servico?.competencia?.ano,
                          })}
                        </TableCell>
                        <TableCell>{formatCurrency(servico?.valor)}</TableCell>
                      </TableRow>
                    </ServiceDetailsPopover>
                  ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
