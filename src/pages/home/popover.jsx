import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { formatCurrency } from "../../utils/currency";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const ServicoDetails = ({ label, value }) => {
  return (
    <div className="flex items-center justify-between text-xs text-zinc-900">
      <span>{label}</span>
      <span>{formatCurrency(value)}</span>
    </div>
  );
};

export const ServiceDetailsPopover = ({ children, servico }) => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <>
      <Popover open={open}>
        <PopoverTrigger onClick={() => setOpen(!open)} asChild>
          {children}
        </PopoverTrigger>
        {open && (
          <PopoverContent
            forceMount
            side="top"
            onPointerDownOutside={(e) => {
              setOpen(false);
            }}
          >
            <div className="flex items-center justify-between mb-2 text-xs font-medium">
              <span className=" text-zinc-500">
                {t("home.ticketDetails.dialog.popover.valores.principal")}
              </span>
              <span className=" text-zinc-700">
                {formatCurrency(servico?.valores?.totalServico)}
              </span>
            </div>
            <div className="space-y-1">
              <ServicoDetails
                label={t(
                  "home.ticketDetails.dialog.popover.valores.grossValue"
                )}
                value={servico?.valores?.grossValue}
              />
              <ServicoDetails
                label={t("home.ticketDetails.dialog.popover.valores.bonus")}
                value={servico?.valores?.bonus}
              />
              <ServicoDetails
                label={t("home.ticketDetails.dialog.popover.valores.correcao")}
                value={servico?.valores?.ajusteComercial}
              />
              <ServicoDetails
                label={t(
                  "home.ticketDetails.dialog.popover.valores.paidPlacement"
                )}
                value={servico?.valores?.paidPlacement}
              />
            </div>

            <div className="flex items-center justify-between mb-2 mt-4 text-xs font-medium">
              <span className=" text-zinc-500">
                {t("home.ticketDetails.dialog.popover.valores.revisao")}
              </span>
              <span className=" text-zinc-700">
                {formatCurrency(servico?.valores?.totalRevisao)}
              </span>
            </div>
            <div className="space-y-1">
              <ServicoDetails
                label={t(
                  "home.ticketDetails.dialog.popover.valores.grossValue"
                )}
                value={servico?.valores?.revisionGrossValue}
              />
              <ServicoDetails
                label={t("home.ticketDetails.dialog.popover.valores.bonus")}
                value={servico?.valores?.revisionProvisionBonus}
              />
              <ServicoDetails
                label={t("home.ticketDetails.dialog.popover.valores.correcao")}
                value={servico?.valores?.revisionComissaoPlataforma}
              />
              <ServicoDetails
                label={t(
                  "home.ticketDetails.dialog.popover.valores.paidPlacement"
                )}
                value={servico?.valores?.revisionPaidPlacement}
              />
            </div>
          </PopoverContent>
        )}
      </Popover>
    </>
  );
};
