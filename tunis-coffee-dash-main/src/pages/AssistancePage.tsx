import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { PiCheckBold, PiBellRingingDuotone, PiClockDuotone } from "react-icons/pi";
import { cn } from "@/lib/utils";

interface AssistanceRequest {
  id: number;
  table: number;
  message: string;
  time: string;
  handled: boolean;
}

const initialRequests: AssistanceRequest[] = [
  { id: 1, table: 4, message: "Needs water refill", time: "1 min ago", handled: false },
  { id: 2, table: 7, message: "Requesting the bill", time: "3 min ago", handled: false },
  { id: 3, table: 12, message: "Asking about gluten-free options", time: "5 min ago", handled: false },
  { id: 4, table: 2, message: "Extra napkins needed", time: "7 min ago", handled: false },
  { id: 5, table: 9, message: "Order modification request", time: "10 min ago", handled: true },
  { id: 6, table: 1, message: "Needs a high chair", time: "12 min ago", handled: true },
];

export default function AssistancePage() {
  const [requests, setRequests] = useState(initialRequests);

  const markHandled = (id: number) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, handled: true } : r))
    );
  };

  const active = requests.filter((r) => !r.handled);
  const handled = requests.filter((r) => r.handled);

  return (
    <DashboardLayout title="Waiter Assistance">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active */}
        <div>
          <div className="flex items-center gap-3 mb-5">
            <div className="p-2.5 bg-terracotta/10 rounded-xl">
              <PiBellRingingDuotone className="w-6 h-6 text-terracotta animate-pulse-soft" />
            </div>
            <h2 className="font-heading text-xl font-bold">
              Active Requests ({active.length})
            </h2>
          </div>
          <div className="space-y-3">
            {active.map((r, i) => (
              <div
                key={r.id}
                className="glass-card p-4 flex items-center justify-between border-l-4 border-l-terracotta animate-slide-up"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-terracotta/10 flex items-center justify-center">
                    <span className="font-heading font-bold text-terracotta text-lg">{r.table}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Table {r.table}</p>
                    <p className="text-xs text-muted-foreground">{r.message}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground flex items-center gap-1.5 bg-muted/50 px-2 py-1 rounded-md">
                    <PiClockDuotone className="w-4 h-4" />
                    {r.time}
                  </span>
                  <button
                    onClick={() => markHandled(r.id)}
                    className="p-2.5 rounded-lg bg-olive/10 text-olive hover:bg-olive/20 transition-colors"
                  >
                    <PiCheckBold className="w-4 h-4 shadow-sm" />
                  </button>
                </div>
              </div>
            ))}
            {active.length === 0 && (
              <div className="glass-card p-8 text-center text-muted-foreground">
                <PiBellRingingDuotone className="w-10 h-10 mx-auto mb-3 opacity-30" />
                <p className="text-sm font-medium">No active requests</p>
              </div>
            )}
          </div>
        </div>

        {/* Handled */}
        <div>
          <div className="flex items-center gap-3 mb-5">
            <div className="p-2.5 bg-olive/10 rounded-xl">
              <PiCheckBold className="w-6 h-6 text-olive" />
            </div>
            <h2 className="font-heading text-xl font-bold text-muted-foreground">
              Handled ({handled.length})
            </h2>
          </div>
          <div className="space-y-3">
            {handled.map((r, i) => (
              <div
                key={r.id}
                className="glass-card p-4 flex items-center justify-between opacity-60 border-l-4 border-l-olive/40 animate-slide-up"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-muted/40 flex items-center justify-center">
                    <span className="font-heading font-bold text-muted-foreground text-lg">{r.table}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Table {r.table}</p>
                    <p className="text-xs text-muted-foreground">{r.message}</p>
                  </div>
                </div>
                <span className="text-xs font-semibold text-olive flex items-center gap-1.5 bg-olive/10 px-2.5 py-1 rounded-md">
                  <PiCheckBold className="w-3.5 h-3.5" />
                  Handled
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
