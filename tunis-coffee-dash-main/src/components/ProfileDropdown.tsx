import { PiUserDuotone, PiGearDuotone, PiSignOutDuotone } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ProfileDropdown() {
  const navigate = useNavigate();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold text-primary border border-primary/30 shadow-sm outline-none hover:bg-primary/30 transition-colors focus-visible:ring-2 focus-visible:ring-primary flex-shrink-0">
          AM
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 rounded-xl border-border/50 shadow-2xl p-1">
        <DropdownMenuLabel className="font-normal p-3 bg-muted/30 rounded-lg mb-1">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-bold leading-none">Ahmed M.</p>
            <p className="text-xs leading-none text-muted-foreground">Store Manager</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => navigate("/settings")} className="cursor-pointer font-medium py-2.5 rounded-lg focus:bg-muted">
          <PiUserDuotone className="mr-3 h-4 w-4 text-muted-foreground" />
          <span>My Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate("/settings")} className="cursor-pointer font-medium py-2.5 rounded-lg focus:bg-muted">
          <PiGearDuotone className="mr-3 h-4 w-4 text-muted-foreground" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer font-medium text-destructive focus:bg-destructive/10 focus:text-destructive py-2.5 rounded-lg">
          <PiSignOutDuotone className="mr-3 h-4 w-4" />
          <span>Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
