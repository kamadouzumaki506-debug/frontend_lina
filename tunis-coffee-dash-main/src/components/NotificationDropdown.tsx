import { PiBellRingingDuotone, PiCoffeeDuotone, PiWarningCircleDuotone, PiCheckCircleDuotone } from "react-icons/pi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const notifications = [
    { id: 1, title: "New Order #1024", time: "2 min ago", icon: PiCoffeeDuotone, color: "text-primary", bg: "bg-primary/10" },
    { id: 2, title: "Low Stock: Espresso Beans", time: "1 hour ago", icon: PiWarningCircleDuotone, color: "text-terracotta", bg: "bg-terracotta/10" },
    { id: 3, title: "System Update Complete", time: "2 hours ago", icon: PiCheckCircleDuotone, color: "text-olive", bg: "bg-olive/10" },
];

export function NotificationDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="relative p-2 rounded-xl outline-none hover:bg-muted transition-colors border border-transparent hover:border-border">
          <PiBellRingingDuotone className="w-6 h-6 text-muted-foreground hover:text-primary transition-colors" />
          <span className="absolute top-1 right-2 w-2.5 h-2.5 bg-terracotta rounded-full border-2 border-background animate-pulse-soft" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 p-0 rounded-2xl overflow-hidden shadow-2xl border-border/50">
        <div className="flex items-center justify-between px-4 py-3 bg-muted/30 border-b border-border/50">
          <DropdownMenuLabel className="p-0 font-heading text-lg text-primary">Notifications</DropdownMenuLabel>
          <span className="text-xs text-primary font-bold cursor-pointer hover:underline">Mark all read</span>
        </div>
        <div className="max-h-[300px] overflow-y-auto no-scrollbar">
          {notifications.map(n => (
            <DropdownMenuItem key={n.id} className="focus:bg-muted/50 cursor-pointer px-4 py-3 border-b border-border/10 last:border-0 rounded-none flex gap-3 items-start outline-none">
              <div className={cn("p-2 rounded-xl shrink-0", n.bg, n.color)}>
                <n.icon className="w-5 h-5" />
              </div>
              <div className="space-y-1 mt-0.5">
                <p className="text-sm font-semibold leading-none">{n.title}</p>
                <p className="text-xs text-muted-foreground leading-none">{n.time}</p>
              </div>
            </DropdownMenuItem>
          ))}
        </div>
        <DropdownMenuSeparator className="m-0" />
        <div className="p-1">
            <DropdownMenuItem className="w-full text-center justify-center font-bold text-sm text-primary cursor-pointer outline-none rounded-xl py-2.5 focus:bg-primary/10">
              View all notifications
            </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
