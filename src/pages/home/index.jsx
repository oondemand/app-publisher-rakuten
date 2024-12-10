import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { DoorOpen, UserRound } from "lucide-react";
import { useAuth } from "../../hooks/auth";
import { ResetPasswordDialog } from "./dialog";

export const Home = () => {
  const { logout, user } = useAuth();
  return (
    <div>
      <div className="px-4 py-3 flex items-center justify-between shadow-sm">
        <img width={84} height={23} src="/logo_rakuten_purple.png" />
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
                Logout <DoorOpen />
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="px-8 py-4">
        <h1 className="text-left font-bold text-brand-500 text-2xl">{`Olá ${user.nome}, seja bem vindo(a) :)`}</h1>
      </div>
    </div>
  );
};
