import { useAuth } from "../../hooks/auth";
import { Dropdown } from "./dropdown";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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

import { CircleCheckBig, RefreshCcw, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import "./custom-scrollbar.css";

export const Home = () => {
  const badges = [
    <Badge className="rounded-2xl  bg-emerald-100 text-green-500 hover:bg-emerald-200 flex gap-2 items-center">
      <CircleCheckBig size={14} /> Pago
    </Badge>,
    <Badge className="rounded-2xl bg-orange-200 text-orange-500 hover:bg-orange-300 flex gap-2 items-center">
      <RefreshCcw size={14} />
      Processando
    </Badge>,
    <Badge className="rounded-2xl bg-violet-200 text-violet-500 hover:bg-violet-300 flex gap-2 items-center">
      <Clock size={14} /> Aguardando
    </Badge>,
  ];

  const getRandomBadge = () => {
    const randomIndex = Math.floor(Math.random() * badges.length); // Índice aleatório
    return badges[randomIndex];
  };

  const { user } = useAuth();
  return (
    <div className="flex flex-col max-h-screen pb-24">
      <div className="px-3 py-3 flex items-center justify-between shadow-sm">
        <img width={84} height={23} src="/logo_rakuten_purple.png" />
        <Dropdown />
      </div>
      <div className="px-6 py-4">
        <h1 className="text-left font-bold text-brand-500 text-2xl">{`Olá ${user.nome}, seja bem vindo(a) :)`}</h1>
        <div className="pb-6" />
        <div className="flex justify-between gap-2">
          <Card className="px-1 bg-brand-500 text-white rounded-md">
            <CardHeader className="px-2 py-4">
              <CardTitle className="text-xs font-semibold flex gap-2 align-top">
                <CircleCheckBig size={20} />
                Total de comissões pagas.
              </CardTitle>
            </CardHeader>
            <CardContent className="px-2 pb-4">
              <p className="text-sm font-extrabold">R$ 5.000,00</p>
            </CardContent>
          </Card>
          <Card className="px-1 bg-orange-500 text-white rounded-md">
            <CardHeader className="px-2 py-4">
              <CardTitle className="text-xs font-semibold flex gap-2 align-top">
                <CircleCheckBig size={20} />
                Total de comissões Pendentes
              </CardTitle>
            </CardHeader>
            <CardContent className="px-2 pb-4">
              <p className="text-sm font-extrabold">R$ 500,00</p>
            </CardContent>
          </Card>
        </div>
        <div className="pb-6" />
        <span className="text-left font-bold text-brand-500 text-2xl">
          Resumo Financeiro
        </span>
      </div>
      <div className="pb-4" />
      <div className="px-6 flex-grow overflow-y-scroll relative custom-scrollbar">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-[11px] p-1 h-0">INCLUSÃO</TableHead>
              <TableHead className="text-[11px] p-1 h-0">VALOR TOTAL</TableHead>
              <TableHead className="text-[11px] p-1 h-0">
                STATUS DE PAGAMENTO
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 74 }).map((e, i) => (
              <TableRow key={i}>
                <TableCell className="text-xs font-semibold text-neutral-600">
                  30/12
                </TableCell>
                <TableCell className="text-xs">
                  <a href="#" className="underline font-semibold text-blue-500">
                    R$ 50,00
                  </a>
                </TableCell>
                <TableCell className="text-xs flex gap-2">
                  {getRandomBadge()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog>
        <DialogTrigger>Abrir modal de comissões</DialogTrigger>
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
                <Badge className="bg-orange-200 text-orange-500 hover:bg-orange-200 rounded-2xl flex gap-2 items-center">
                  <RefreshCcw size={14} />
                  Processando
                </Badge>
              </span>
              <span className="flex gap-4 font-semibold text-zinc-600">
                Valor total: <p className="font-normal">R$ 120,00</p>
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
    </div>
  );
};
