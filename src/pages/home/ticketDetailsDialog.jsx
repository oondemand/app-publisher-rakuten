import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
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
import { formatBRL } from "../../utils/currency";
import { addTotalValueOfServices } from "./index";

export const TicketDetailsDialog = ({ open, ticket, onOpenChange }) => {
  console.log(ticket);

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
              Detalhe do Ticket
            </DialogTitle>
          </DialogHeader>
          <div className="pb-3" />
          <div className="flex flex-col gap-2">
            <span className="flex gap-4 font-semibold text-zinc-600">
              Status{" "}
              {ticket &&
                ticket.status === "concluido" &&
                ticket.etapa === "concluido" && (
                  <Badge className="rounded-2xl  bg-emerald-100 text-green-500 hover:bg-emerald-200 flex gap-2 items-center">
                    <CircleCheckBig size={14} /> Pago
                  </Badge>
                )}
              {ticket && ticket?.etapa === "integracao-omie" && (
                <Badge className="rounded-2xl bg-violet-200 text-violet-500 hover:bg-violet-300 flex gap-2 items-center">
                  <Clock size={14} /> Pendente
                </Badge>
              )}
              {ticket &&
                !["requisicao", "concluido", "integracao-omie"].includes(
                  ticket.etapa
                ) && (
                  <Badge className="rounded-2xl bg-orange-200 text-orange-500 hover:bg-orange-300 flex gap-2 items-center">
                    <RefreshCcw size={14} />
                    {/* Processando */}
                  </Badge>
                )}
            </span>
            <span className="flex gap-4 font-semibold text-zinc-600">
              Valor total:{" "}
              <p className="font-normal">
                {formatBRL(addTotalValueOfServices(ticket?.servicos ?? []))}
              </p>
            </span>
            <span className="flex gap-4 font-semibold text-zinc-600">
              Detalhamento das comissões:
            </span>
            <Table>
              <TableHeader>
                <TableRow className="bg-brand-500 text-white rounded-t-md hover:bg-brand-500">
                  <TableHead className="rounded-tl-md text-white font-bold p-2 h-0">
                    Competência
                  </TableHead>
                  <TableHead className="rounded-tr-md text-white font-bold p-2 h-0">
                    Valor
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>30/12</TableCell>
                  <TableCell>R$ 15,00</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <Button className="w-full bg-sky-500 hover:bg-sky-700 font-semibold">
              Baixar Rpa
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
