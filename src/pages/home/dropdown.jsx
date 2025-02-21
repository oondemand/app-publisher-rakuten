import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { DoorOpen, UserRound } from "lucide-react";
import { ResetPasswordDialog } from "./dialog";

import { useAuth } from "../../hooks/auth";
import { useTranslation } from "react-i18next";

export const Dropdown = () => {
  const { logout } = useAuth();
  const { t } = useTranslation();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="text-zinc-500 rounded-full bg-zinc-50 p-1">
        <UserRound size={20} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onSelect={(e) => {
            e.preventDefault();
          }}
          className="text-brand-500"
        >
          <ResetPasswordDialog />
        </DropdownMenuItem>
        <DropdownMenuItem className="text-brand-500 ">
          <button
            onClick={logout}
            className="flex outline-none text-brand-500 hover:bg-zinc-100 justify-between w-full items-center gap-2 rounded-sm text-sm transition-colors [&>svg]:size-4"
          >
            {t("home.dropdown.logout")} <DoorOpen />
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
