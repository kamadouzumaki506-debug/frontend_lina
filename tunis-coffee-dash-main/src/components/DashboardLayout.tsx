import { ReactNode, useState, createContext, useContext } from "react";
import { AppSidebar } from "./AppSidebar";
import { ThemeToggle } from "./ThemeToggle";
import { NotificationDropdown } from "./NotificationDropdown";
import { ProfileDropdown } from "./ProfileDropdown";
import { PiBellRingingDuotone, PiMagnifyingGlassDuotone } from "react-icons/pi";
import { cn } from "@/lib/utils";

export const SidebarContext = createContext({ collapsed: false });
export const useSidebarState = () => useContext(SidebarContext);

interface DashboardLayoutProps {
  children: ReactNode;
  title: string;
}

export function DashboardLayout({ children, title }: DashboardLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <SidebarContext.Provider value={{ collapsed }}>
      <div className="min-h-screen flex bg-background">
        <AppSidebar collapsed={collapsed} setCollapsed={setCollapsed} />
        <div className={cn("flex-1 transition-all duration-300", collapsed ? "ml-[80px]" : "ml-[260px]")}>
          {/* Top header */}
          <header className="sticky top-0 z-40 h-16 bg-background/80 backdrop-blur-md border-b border-border flex items-center justify-between px-6">
            <h1 className="font-heading text-xl font-bold text-foreground">{title}</h1>
            <div className="flex items-center gap-2 md:gap-4">
              <div className="relative hidden sm:block">
                <PiMagnifyingGlassDuotone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-9 pr-4 py-2 rounded-xl bg-card border border-border/50 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 w-40 md:w-56 shadow-sm transition-all"
                />
              </div>
              
              <ThemeToggle />
              <NotificationDropdown />
              <ProfileDropdown />
            </div>
          </header>

          {/* Page content */}
          <main className="p-6 relative min-h-[calc(100vh-4rem)]">
            <div className="absolute inset-0 pointer-events-none opacity-5 bg-[url('data:image/svg+xml,%3Csvg%20width=%2260%22%20height=%2260%22%20viewBox=%220%200%2060%2060%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cpath%20d=%22M30%200L60%2030L30%2060L0%2030Z%22%20fill=%22none%22%20stroke=%22%23c4a882%22%20stroke-width=%228%22%20opacity=%220.1%22/%3E%3C/svg%3E')]"></div>
            <div className="relative z-10 w-full max-w-7xl mx-auto">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarContext.Provider>
  );
}
