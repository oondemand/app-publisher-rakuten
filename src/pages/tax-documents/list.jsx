import { useAuth } from "../../hooks/auth";
import { useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { CircleCheckBig, RefreshCcw, Circle, CircleX } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DocumentoFiscalService } from "../../services/documento-fiscal";
import { useQuery } from "@tanstack/react-query";

import { useTranslation } from "react-i18next";
import { TaxDocumentsDetailsDialog } from "./detailsDialog";
import { formatCurrency } from "../../utils/currency";

export const addTotalValueOfServices = (services) => {
  return services.reduce((acc, curr) => acc + curr.valor, 0);
};

export const TaxDocumentsList = () => {
  const { t } = useTranslation();

  const [taxDocumentsDetails, setTaxDocumentsDetails] = useState({
    open: false,
    taxDocument: null,
  });

  const handleOpenTaxDocumentsDetails = (taxDocument) => {
    setTaxDocumentsDetails(() => ({ taxDocument, open: true }));
  };

  const handleChangeTaxDocumentsDetails = (boolean) => {
    setTaxDocumentsDetails(() => ({ taxDocument: null, open: boolean }));
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ["list-documentos-fiscais"],
    queryFn: DocumentoFiscalService.getDocumentosFiscais,
  });

  return (
    <div className="flex flex-col max-h-screen pb-24">
      <div className="pb-4" />
      {isLoading && (
        <div className="px-6 font-semibold animate-pulse text-zinc-400">
          {t("taxDocuments.header.loadingTaxDocuments")}
        </div>
      )}
      {((!data && !isLoading) || data?.length === 0) && (
        <div className="px-6 font-semibold text-zinc-400">
          {t("taxDocuments.header.notFoundTaxDocuments")}
        </div>
      )}

      {data && data.length > 0 && (
        <div className="flex-grow px-6 overflow-y-scroll custom-scrollbar relative transition-all">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-[11px] p-1 h-0">
                  {t("taxDocuments.table.header.status")}
                </TableHead>
                <TableHead className="text-[11px] p-1 h-0">
                  {t("taxDocuments.table.header.numero")}
                </TableHead>
                <TableHead className="text-[11px] p-1 h-0">
                  {t("taxDocuments.table.header.valor")}
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {data.map((item, i) => {
                return (
                  <TableRow
                    onClick={() => handleOpenTaxDocumentsDetails(item)}
                    key={item._id}
                  >
                    <TableCell className="text-xs flex flex-wrap gap-1">
                      {item?.status === "aberto" &&
                        item?.statusValidacao === "aprovado" && (
                          <Badge className="rounded-2xl  bg-zinc-100 text-zinc-500 hover:bg-zinc-200 flex gap-2 items-center">
                            <Circle size={12} />{" "}
                            {t("taxDocuments.badge.aberto")}
                          </Badge>
                        )}

                      {item?.status === "pago" &&
                        item?.statusValidacao === "aprovado" && (
                          <Badge className="rounded-2xl  bg-emerald-100 text-green-500 hover:bg-emerald-200 flex gap-2 items-center">
                            <CircleCheckBig size={12} />{" "}
                            {t("taxDocuments.badge.pago")}
                          </Badge>
                        )}

                      {item?.status === "processando" &&
                        item?.statusValidacao === "aprovado" && (
                          <Badge className="rounded-2xl bg-violet-200 text-violet-500 hover:bg-violet-300 flex gap-2 items-center">
                            <RefreshCcw size={12} />
                            {t("taxDocuments.badge.processando")}
                          </Badge>
                        )}

                      {item?.statusValidacao === "pendente" && (
                        <Badge className="rounded-2xl  bg-orange-200 text-orange-500 hover:bg-orange-3  00 flex gap-2 items-center">
                          <RefreshCcw size={12} />{" "}
                          {t("taxDocuments.badge.pendente")}
                        </Badge>
                      )}

                      {/* {item?.statusValidacao === "aprovado" && (
                        <Badge className="rounded-2xl  bg-emerald-100 text-green-500 hover:bg-emerald-200 flex gap-2 items-center">
                          <CircleCheckBig size={12} />{" "}
                          {t("taxDocuments.badge.aprovado")}
                        </Badge>
                      )} */}

                      {item?.statusValidacao === "recusado" && (
                        <Badge className="rounded-2xl  bg-red-100 text-red-500 hover:bg-red-200 flex gap-2 items-center">
                          <CircleX size={12} />{" "}
                          {t("taxDocuments.badge.recusado")}
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-xs font-semibold text-neutral-600">
                      {item?.numero}
                    </TableCell>
                    <TableCell className="text-xs">
                      <span className="underline font-semibold text-blue-500">
                        {formatCurrency(item?.valor)}
                      </span>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}

      <TaxDocumentsDetailsDialog
        open={taxDocumentsDetails.open}
        taxDocument={taxDocumentsDetails.taxDocument}
        onOpenChange={handleChangeTaxDocumentsDetails}
      />
    </div>
  );
};
