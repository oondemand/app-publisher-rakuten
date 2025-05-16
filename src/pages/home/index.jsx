import { useAuth } from "../../hooks/auth";
import { useState } from "react";
import { Dropdown } from "../_layouts/dropdown";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  CircleCheckBig,
  RefreshCcw,
  Clock,
  FileUser,
  FileText,
  Circle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { TicketService } from "../../services/tickets";
import { useQuery } from "@tanstack/react-query";
import { formatCurrency } from "../../utils/currency";
import { format } from "date-fns";
import { formatDateToDDMMYYYY } from "../../utils/date";

import { TicketDetailsDialog } from "./ticketDetailsDialog";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export const addTotalValueOfServices = (services) => {
  return services.reduce((acc, curr) => acc + curr.valor, 0);
};

export const Home = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [ticketDetailsModal, setTicketDetailsModal] = useState({
    open: false,
    ticket: null,
  });

  const handleOpenTicketDetailsModal = (ticket) => {
    setTicketDetailsModal(() => ({ ticket, open: true }));
  };

  const handleChangeTicketDetailsModal = (boolean) => {
    setTicketDetailsModal(() => ({ ticket: null, open: boolean }));
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ["tickets"],
    queryFn: async () => await TicketService.getTicketsByPrestadorId(user._id),
  });

  return (
    <div className="flex flex-col max-h-screen pb-24">
      <div className="px-6 py-4">
        <h1 className="text-left font-bold text-brand-500 text-2xl">
          {t("home.header.greeting", { nome: user.nome })}
        </h1>
        <div className="pb-6" />
        <div className="flex justify-between gap-2">
          <Card className="px-1 bg-brand-500 text-white rounded-md">
            <CardHeader className="px-2 py-4">
              <CardTitle className="text-xs font-semibold flex gap-2 align-top">
                <CircleCheckBig size={20} />
                {t("home.cards.comissoesPagas.title")}
              </CardTitle>
            </CardHeader>
            <CardContent className="px-2 pb-4">
              <p className="text-sm font-extrabold">
                {isLoading && "..."}
                {!isLoading && formatCurrency(data?.valorTotalRecebido ?? 0)}
              </p>
            </CardContent>
          </Card>
          <Card className="px-1 bg-orange-500 text-white rounded-md">
            <CardHeader className="px-2 py-4">
              <CardTitle className="text-xs font-semibold flex gap-2 align-top">
                <CircleCheckBig size={20} />
                {t("home.cards.comissoesPendentes.title")}
              </CardTitle>
            </CardHeader>
            <CardContent className="px-2 pb-4">
              <p className="text-sm font-extrabold">
                {isLoading && "..."}
                {!isLoading && formatCurrency(data?.valorTotalPendente ?? 0)}
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="pb-6" />
        <span className="text-left font-bold text-brand-500 text-2xl">
          {t("home.summary.title")}
        </span>
      </div>
      <div className="pb-6" />
      {isLoading && (
        <div className="px-6 font-semibold animate-pulse text-zinc-400">
          {t("home.header.loadingTickets")}
        </div>
      )}
      {((!data && !isLoading) || data?.tickets.length === 0) && (
        <div className="px-6 font-semibold text-zinc-400">
          {t("home.header.notFound")}
        </div>
      )}

      {data && data.tickets.length > 0 && (
        <div className="px-6 flex-grow overflow-y-scroll custom-scrollbar relative transition-all">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-[11px] p-1 h-0">
                  {t("home.table.header.statusPagamento")}
                </TableHead>
                <TableHead className="text-[11px] p-1 h-0">
                  {t("home.table.header.inclusao")}
                </TableHead>
                <TableHead className="text-[11px] p-1 h-0">
                  {t("home.table.header.valorTotal")}
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {data.tickets.map(
                (ticket, i) =>
                  ticket.servicos.length > 0 && (
                    <TableRow
                      onClick={() => handleOpenTicketDetailsModal(ticket)}
                      key={ticket._id}
                    >
                      <TableCell className="text-xs flex gap-2">
                        {ticket.status === "aberto" && !ticket?.etapa && (
                          <Badge className="rounded-2xl  bg-zinc-100 text-zinc-500 hover:bg-zinc-200 flex gap-2 items-center">
                            <Circle size={14} /> {t("home.badge.aberto")}
                          </Badge>
                        )}
                        {((ticket.status === "concluido" &&
                          ticket.etapa === "concluido") ||
                          ticket.status === "pago-externo") && (
                          <Badge className="rounded-2xl  bg-emerald-100 text-green-500 hover:bg-emerald-200 flex gap-2 items-center">
                            <CircleCheckBig size={14} /> {t("home.badge.pago")}
                          </Badge>
                        )}

                        {ticket?.etapa &&
                          !["requisicao", "concluido"].includes(
                            ticket.etapa
                          ) && (
                            <Badge className="rounded-2xl bg-violet-200 text-violet-500 hover:bg-violet-300 flex gap-2 items-center">
                              <RefreshCcw size={14} />
                              {t("home.badge.processando")}
                            </Badge>
                          )}
                      </TableCell>
                      <TableCell className="text-xs font-semibold text-neutral-600">
                        {ticket.dataRegistro
                          ? formatDateToDDMMYYYY(ticket?.dataRegistro)
                          : ticket?.servicos[0]?.dataRegistro
                          ? formatDateToDDMMYYYY(
                              ticket.servicos[0]?.dataRegistro
                            )
                          : "-"}
                      </TableCell>
                      <TableCell className="text-xs">
                        <span className="underline font-semibold text-blue-500">
                          {formatCurrency(
                            addTotalValueOfServices(ticket.servicos)
                          )}
                        </span>
                      </TableCell>
                    </TableRow>
                  )
              )}
            </TableBody>
          </Table>
        </div>
      )}

      <TicketDetailsDialog
        open={ticketDetailsModal.open}
        ticket={ticketDetailsModal.ticket}
        onOpenChange={handleChangeTicketDetailsModal}
      />
    </div>
  );
};
