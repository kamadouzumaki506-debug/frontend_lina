import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { PiArrowRightBold, PiDotsSixVerticalDuotone } from "react-icons/pi";
import { cn } from "@/lib/utils";

type OrderStatus = "new" | "brewing" | "preparing" | "ready" | "completed";

interface OrderItem {
  name: string;
  modifiers: string[];
}

interface Order {
  id: string;
  table: number;
  items: OrderItem[];
  status: OrderStatus;
  time: string;
}

const initialOrders: Order[] = [
  { id: "ORD-001", table: 3, items: [{ name: "Espresso", modifiers: ["Double shot"] }, { name: "Croissant", modifiers: [] }], status: "new", time: "2 min ago" },
  { id: "ORD-002", table: 7, items: [{ name: "Café Latte", modifiers: ["Large", "Almond milk"] }], status: "new", time: "4 min ago" },
  { id: "ORD-003", table: 1, items: [{ name: "Turkish Coffee", modifiers: ["Medium sweet"] }, { name: "Baklava", modifiers: [] }], status: "brewing", time: "6 min ago" },
  { id: "ORD-004", table: 5, items: [{ name: "Cappuccino", modifiers: ["Oat milk"] }, { name: "Makroudh", modifiers: [] }], status: "brewing", time: "8 min ago" },
  { id: "ORD-005", table: 9, items: [{ name: "Mint Tea", modifiers: ["Extra mint"] }], status: "preparing", time: "10 min ago" },
  { id: "ORD-006", table: 2, items: [{ name: "Americano", modifiers: ["Large"] }, { name: "Bambalouni", modifiers: [] }], status: "ready", time: "12 min ago" },
  { id: "ORD-007", table: 11, items: [{ name: "Flat White", modifiers: [] }], status: "completed", time: "15 min ago" },
];

const columns: { key: OrderStatus; label: string; color: string }[] = [
  { key: "new", label: "New", color: "border-t-primary" },
  { key: "brewing", label: "Brewing", color: "border-t-gold" },
  { key: "preparing", label: "Preparing", color: "border-t-terracotta" },
  { key: "ready", label: "Ready", color: "border-t-olive" },
  { key: "completed", label: "Completed", color: "border-t-muted-foreground" },
];

const nextStatus: Record<OrderStatus, OrderStatus | null> = {
  new: "brewing",
  brewing: "preparing",
  preparing: "ready",
  ready: "completed",
  completed: null,
};

export default function KitchenPage() {
  const [orders, setOrders] = useState(initialOrders);
  const [draggedOrder, setDraggedOrder] = useState<string | null>(null);

  const advanceOrder = (id: string) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id === id && nextStatus[o.status]) {
          return { ...o, status: nextStatus[o.status]! };
        }
        return o;
      })
    );
  };

  const handleDragStart = (id: string) => setDraggedOrder(id);

  const handleDrop = (status: OrderStatus) => {
    if (!draggedOrder) return;
    setOrders((prev) =>
      prev.map((o) => (o.id === draggedOrder ? { ...o, status } : o))
    );
    setDraggedOrder(null);
  };

  return (
    <DashboardLayout title="Kitchen Display System">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {columns.map((col) => (
          <div
            key={col.key}
            className={cn("kanban-column border-t-4", col.color)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(col.key)}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading font-semibold text-sm">{col.label}</h3>
              <span className="text-xs bg-muted px-2 py-0.5 rounded-full text-muted-foreground">
                {orders.filter((o) => o.status === col.key).length}
              </span>
            </div>
            {orders
              .filter((o) => o.status === col.key)
              .map((order) => (
                <div
                  key={order.id}
                  className="kanban-card"
                  draggable
                  onDragStart={() => handleDragStart(order.id)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1">
                      <PiDotsSixVerticalDuotone className="w-4 h-4 text-muted-foreground/60" />
                      <span className="text-xs font-medium text-muted-foreground">{order.id}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{order.time}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-primary/10 text-primary text-xs font-semibold px-2 py-1 rounded-md">
                      Table {order.table}
                    </span>
                  </div>
                  <ul className="space-y-1 mb-3">
                    {order.items.map((item, i) => (
                      <li key={i} className="text-sm">
                        <span className="font-medium">{item.name}</span>
                        {item.modifiers.length > 0 && (
                          <span className="text-xs text-muted-foreground ml-1">
                            ({item.modifiers.join(", ")})
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                  {nextStatus[order.status] && (
                    <button
                      onClick={() => advanceOrder(order.id)}
                      className="w-full flex items-center justify-center gap-1.5 py-2 rounded-lg bg-primary/10 text-primary text-xs font-semibold hover:bg-primary/20 transition-colors"
                    >
                      Move to {nextStatus[order.status]}
                      <PiArrowRightBold className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))}
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
