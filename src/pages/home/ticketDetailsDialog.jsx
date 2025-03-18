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

import { Button } from "@/components/ui/button";

import { Badge } from "@/components/ui/badge";
import { CircleCheckBig, RefreshCcw, Clock } from "lucide-react";
import { formatCurrency } from "../../utils/currency";
import { addTotalValueOfServices } from "./index";
import { formatCompetence } from "../../utils/date";

import JSZip from "jszip";
import { format } from "date-fns";
import { saveAs } from "file-saver";
import { useTranslation } from "react-i18next";

export const TicketDetailsDialog = ({ open, ticket, onOpenChange }) => {
  const { t } = useTranslation();
  const handleDownloadArquivos = async () => {
    const arquivos = ticket.arquivos;

    if (arquivos.length > 1) {
      const zip = new JSZip();
      arquivos.forEach((file) => {
        zip.file(file.nomeOriginal, file.data);
      });
      zip.generateAsync({ type: "blob" }).then(function (content) {
        saveAs(content, `arquivos-${format(new Date(), "dd-MM-yyy")}.zip`);
      });
      return;
    }

    const arquivo = arquivos[0];
    const byteArray = new Uint8Array(arquivo.buffer.data);
    const blob = new Blob([byteArray], { type: arquivo.mimetype });
    saveAs(blob, arquivo.nomeOriginal);
  };

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
              {ticket &&
                ticket.status === "concluido" &&
                ticket.etapa === "concluido" && (
                  <Badge className="rounded-2xl  bg-emerald-100 text-green-500 hover:bg-emerald-200 flex gap-2 items-center">
                    <CircleCheckBig size={14} /> {t("home.badge.pago")}
                  </Badge>
                )}
              {ticket && ticket?.etapa === "integracao-omie" && (
                <Badge className="rounded-2xl bg-violet-200 text-violet-500 hover:bg-violet-300 flex gap-2 items-center">
                  <Clock size={14} /> {t("home.badge.pendente")}
                </Badge>
              )}
              {ticket &&
                !["requisicao", "concluido", "integracao-omie"].includes(
                  ticket.etapa
                ) && (
                  <Badge className="rounded-2xl bg-orange-200 text-orange-500 hover:bg-orange-300 flex gap-2 items-center">
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
            <span className="flex gap-4 font-semibold text-zinc-600">
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
                    <TableRow key={servico._id}>
                      <TableCell>
                        {formatCompetence({
                          month: servico?.competencia?.mes,
                          year: servico?.competencia?.ano,
                        })}
                      </TableCell>
                      <TableCell>
                        {formatCurrency(servico?.valor)}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            {ticket?.arquivos.length > 0 && (
              <Button
                onClick={handleDownloadArquivos}
                className="w-full bg-sky-500 hover:bg-sky-700 font-semibold"
              >
                {t("home.ticketDetails.dialog.button.arquivo")}
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
