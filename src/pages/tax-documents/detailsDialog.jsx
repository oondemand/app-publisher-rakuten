import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { Badge } from "@/components/ui/badge";
import {
  CircleCheckBig,
  RefreshCcw,
  Download,
  CircleX,
  Circle,
} from "lucide-react";
import { formatCurrency } from "../../utils/currency";
import { formatCompetence } from "../../utils/date";

import { saveAs } from "file-saver";
import { useTranslation } from "react-i18next";
import { TicketService } from "../../services/tickets";

export const TaxDocumentsDetailsDialog = ({
  open,
  taxDocument,
  onOpenChange,
}) => {
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
              {t("taxDocuments.dialog.details.title")}
            </DialogTitle>
          </DialogHeader>
          <div className="pb-3" />
          <div className="flex flex-col gap-2">
            <span className="flex gap-2.5 font-semibold text-zinc-600">
              {t("taxDocuments.dialog.details.status.label")}{" "}
              {taxDocument?.status === "aberto" && (
                <Badge className="rounded-2xl  bg-zinc-100 text-zinc-500 hover:bg-zinc-200 flex gap-2 items-center">
                  <Circle size={12} /> {t("taxDocuments.badge.aberto")}
                </Badge>
              )}
              {taxDocument?.status === "pago" && (
                <Badge className="rounded-2xl  bg-emerald-100 text-green-500 hover:bg-emerald-200 flex gap-2 items-center">
                  <CircleCheckBig size={12} /> {t("taxDocuments.badge.pago")}
                </Badge>
              )}
              {taxDocument?.status === "processando" && (
                <Badge className="rounded-2xl bg-violet-200 text-violet-500 hover:bg-violet-300 flex gap-2 items-center">
                  <RefreshCcw size={12} />
                  {t("taxDocuments.badge.processando")}
                </Badge>
              )}
              {taxDocument?.statusValidacao === "pendente" && (
                <Badge className="rounded-2xl  bg-violet-200 text-violet-500 hover:bg-violet-300 flex gap-2 items-center">
                  <RefreshCcw size={12} />
                  {t("taxDocuments.badge.pendente")}
                </Badge>
              )}
              {taxDocument?.statusValidacao === "aprovado" && (
                <Badge className="rounded-2xl  bg-emerald-100 text-green-500 hover:bg-emerald-200 flex gap-2 items-center">
                  <CircleCheckBig size={12} />
                  {t("taxDocuments.badge.aprovado")}
                </Badge>
              )}
              {taxDocument?.statusValidacao === "recusado" && (
                <Badge className="rounded-2xl  bg-red-100 text-red-500 hover:bg-red-200 flex gap-2 items-center">
                  <CircleX size={12} />
                  {t("taxDocuments.badge.recusado")}
                </Badge>
              )}
            </span>
            <span className="flex gap-2.5 font-semibold text-zinc-600">
              {t("taxDocuments.dialog.details.numero.label")}{" "}
              <p className="font-normal">{taxDocument?.numero}</p>
            </span>
            <span className="flex gap-2.5 font-semibold text-zinc-600">
              {t("taxDocuments.dialog.details.valor.label")}
              <p className="font-normal">
                {formatCurrency(taxDocument?.valor)}
              </p>
            </span>
            <span className="flex gap-2.5 font-semibold text-zinc-600">
              {t("taxDocuments.dialog.details.imposto.label")}
              <p className="font-normal">
                {formatCurrency(taxDocument?.imposto)}
              </p>
            </span>
            <span className="flex gap-2.5 font-semibold text-zinc-600">
              {t("taxDocuments.dialog.details.tipo.label")}
              <p className="font-normal">{taxDocument?.tipoDocumentoFiscal}</p>
            </span>
            {taxDocument?.competencia && (
              <span className="flex gap-2.5 font-semibold text-zinc-600">
                {t("taxDocuments.dialog.details.competencia.label")}
                <p className="font-normal">
                  {formatCompetence({
                    month: taxDocument?.competencia?.mes,
                    year: taxDocument?.competencia?.ano,
                  })}
                </p>
              </span>
            )}

            {taxDocument?.statusValidacao === "recusado" && (
              <>
                <span className="flex gap-2.5 font-semibold text-zinc-600">
                  {t("taxDocuments.dialog.details.motivoRecusa.label")}
                  <p className="font-normal text-zinc-600">
                    {taxDocument?.motivoRecusa}
                  </p>
                </span>
                <span className="font-semibold text-zinc-600">
                  {t("taxDocuments.dialog.details.observacao.label")}{" "}
                  <p className="font-normal mt-1">
                    {taxDocument?.observacaoPrestador}
                  </p>
                </span>
              </>
            )}

            <Button
              onClick={async () =>
                await handleDownloadArquivo({ id: taxDocument?.arquivo })
              }
              className="w-full h-[35px] bg-sky-500 hover:bg-sky-600 text-white "
            >
              <Download size={16} />
              <p className="h-[16px]">
                {t("taxDocuments.dialog.details.button.label")}
              </p>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
