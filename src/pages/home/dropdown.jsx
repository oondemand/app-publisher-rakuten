import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { DoorOpen, UserRound } from "lucide-react";
import { ResetPasswordDialog } from "./dialog";

import { useAuth } from "../../hooks/auth";

export const Dropdown = () => {
  const { logout } = useAuth();

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
            Logout <DoorOpen />
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
