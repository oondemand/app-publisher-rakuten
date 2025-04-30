import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { DoorClosed, DoorOpen, FileText, UserRound } from "lucide-react";
import { ResetPasswordDialog } from "../home/dialog";

import { useAuth } from "../../hooks/auth";
import { useTranslation } from "react-i18next";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { useMutation } from "@tanstack/react-query";
import { UserService } from "../../services/user";
import { toast } from "sonner";
import { Link } from "react-router-dom";

export const Dropdown = () => {
  const { logout } = useAuth();
  const { t, i18n } = useTranslation();
  const { user } = useAuth();

  const { mutateAsync: updateUserMutation } = useMutation({
    mutationFn: UserService.updateUser,
  });

  const handleChangeLanguage = (language) => {
    if (language === i18n.language) return;
    try {
      i18n.changeLanguage(language);
      localStorage.setItem("@app-publisher-language", language);

      updateUserMutation({
        id: user._id,
        body: { configuracoes: { idioma: language } },
      });
    } catch (error) {
      console.error("Erro ao atualizar o idioma do usuário:", error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="text-zinc-500 rounded-full bg-zinc-50 p-1">
        <UserRound size={20} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onSelect={(e) => {
            e.preventDefault();
            e.stopPropagation();
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
        <DropdownMenuItem
          onSelect={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          className="text-brand-500 p-0"
        >
          <Select onValueChange={handleChangeLanguage} value={i18n.language}>
            <SelectTrigger className="px-2 py-2 outline-none focus:fill-none focus:ring-transparent border-none text-brand-500 hover:text-brand-500 h-7 rounded-md hover:bg-zinc-100  transition-colors">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="text-brand-500">
              <SelectItem
                className="cursor-pointer hover:text-brand-600 hover:bg-zinc-100"
                value="en-US"
              >
                🇺🇲 en-US
              </SelectItem>
              <SelectItem
                className="cursor-pointer hover:text-brand-600 hover:bg-zinc-100"
                value="pt-BR"
              >
                🇧🇷 pt-BR
              </SelectItem>
            </SelectContent>
          </Select>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
