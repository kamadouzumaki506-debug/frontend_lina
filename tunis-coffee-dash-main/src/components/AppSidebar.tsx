import { Link, useLocation } from "react-router-dom";
import {
  PiSquaresFourDuotone,
  PiCookingPotDuotone,
  PiListBulletsDuotone,
  PiBellRingingDuotone,
  PiChartLineUpDuotone,
  PiMonitorDuotone,
  PiGearDuotone,
  PiCaretLeftBold,
  PiCaretRightBold,
} from "react-icons/pi";
import { cn } from "@/lib/utils";
import { CafeLogo } from "./CafeLogo";

const navItems = [
  { title: "Dashboard", path: "/", icon: PiSquaresFourDuotone, color: "text-white" },
  { title: "Point of Sale", path: "/pos", icon: PiMonitorDuotone, color: "text-gold" },
  { title: "Kitchen Display", path: "/kitchen", icon: PiCookingPotDuotone, color: "text-terracotta" },
  { title: "Menu Management", path: "/menu", icon: PiListBulletsDuotone, color: "text-olive" },
  { title: "Assistance", path: "/assistance", icon: PiBellRingingDuotone, color: "text-accent" },
  { title: "Analytics", path: "/analytics", icon: PiChartLineUpDuotone, color: "text-[hsl(20,50%,70%)]" },
  { title: "Settings", path: "/settings", icon: PiGearDuotone, color: "text-white/70" },
];

interface AppSidebarProps {
  collapsed: boolean;
  setCollapsed: (c: boolean) => void;
}

export function AppSidebar({ collapsed, setCollapsed }: AppSidebarProps) {
  const location = useLocation();

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 h-screen bg-sidebar text-sidebar-foreground flex flex-col z-50 transition-all duration-300 border-r border-sidebar-border shadow-2xl",
        collapsed ? "w-[80px]" : "w-[260px]"
      )}
    >
      {/* Brand Logo */}
      <div className={cn("flex items-center border-b border-sidebar-border/50 bg-sidebar/80 backdrop-blur-md h-24", collapsed ? "justify-center px-0" : "gap-4 px-6")}>
        <CafeLogo className="w-10 h-10 flex-shrink-0 drop-shadow-xl" />
        {!collapsed && (
          <div className="flex flex-col animate-fade-in">
            <span className="font-heading text-xl font-bold text-white tracking-wide">
              Café Medina
            </span>
            <span className="text-[10px] text-white/50 font-bold tracking-widest uppercase">EST. 1982</span>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto overflow-x-hidden no-scrollbar">
        {navItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "sidebar-item group flex items-center",
                collapsed ? "justify-center px-0" : "px-4",
                active ? "sidebar-item-active shadow-glow-primary border border-white/10" : "hover:border-white/5 border border-transparent"
              )}
            >
              <div className={cn(
                "p-2 rounded-xl transition-all duration-300 flex-shrink-0",
                active ? "bg-sidebar shadow-inner scale-110" : "bg-sidebar-accent/50 group-hover:bg-sidebar-accent group-hover:scale-110"
              )}>
                <item.icon className={cn("w-6 h-6", item.color)} />
              </div>
              {!collapsed && (
                <span className={cn(
                  "truncate font-semibold transition-colors tracking-wide ml-1",
                  active ? "text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]" : "text-white/70 group-hover:text-white"
                )}>
                  {item.title}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Collapse toggle */}
      <div className="p-4 border-t border-sidebar-border/50 bg-sidebar/50 backdrop-blur-sm">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center p-3 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all duration-300 border border-transparent hover:border-white/20 hover:shadow-glow-primary active:scale-95"
        >
          {collapsed ? <PiCaretRightBold className="w-5 h-5" /> : <PiCaretLeftBold className="w-5 h-5" />}
        </button>
      </div>
    </aside>
  );
}
