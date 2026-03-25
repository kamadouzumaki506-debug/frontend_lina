import { DashboardLayout } from "@/components/DashboardLayout";
import {
  PiShoppingBagDuotone,
  PiCoinsDuotone,
  PiClockDuotone,
  PiFireDuotone,
  PiWarningDuotone,
} from "react-icons/pi";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const stats = [
  { label: "Total Orders", value: "284", change: "+12%", icon: PiShoppingBagDuotone, color: "text-primary dark:text-gold" },
  { label: "Total Revenue", value: "4,520 TND", change: "+8%", icon: PiCoinsDuotone, color: "text-olive" },
  { label: "Avg Prep Time", value: "4.2 min", change: "-15%", icon: PiClockDuotone, color: "text-gold" },
  { label: "Active Orders", value: "18", change: "", icon: PiFireDuotone, color: "text-terracotta" },
];

const alerts = [
  { table: 4, message: "Needs assistance – water refill", time: "2 min ago" },
  { table: 7, message: "Requesting the bill", time: "5 min ago" },
  { table: 12, message: "Asking about gluten-free options", time: "1 min ago" },
];

const peakData = [
  { hour: "8AM", orders: 12, revenue: 180 },
  { hour: "9AM", orders: 28, revenue: 420 },
  { hour: "10AM", orders: 45, revenue: 675 },
  { hour: "11AM", orders: 38, revenue: 570 },
  { hour: "12PM", orders: 52, revenue: 780 },
  { hour: "1PM", orders: 48, revenue: 720 },
  { hour: "2PM", orders: 35, revenue: 525 },
  { hour: "3PM", orders: 22, revenue: 330 },
  { hour: "4PM", orders: 30, revenue: 450 },
  { hour: "5PM", orders: 42, revenue: 630 },
  { hour: "6PM", orders: 38, revenue: 570 },
];

export default function DashboardPage() {
  return (
    <DashboardLayout title="Dashboard Overview">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className="stat-card animate-slide-up"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{s.label}</p>
                <p className="text-2xl font-heading font-bold mt-1">{s.value}</p>
                {s.change && (
                  <span className="text-xs text-olive font-medium">{s.change} vs yesterday</span>
                )}
              </div>
              <div className={`p-2.5 rounded-lg bg-muted/60 ${s.color}`}>
                <s.icon className="w-5 h-5" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Alerts Bar */}
      <div className="alert-bar mb-6 animate-slide-up" style={{ animationDelay: "320ms" }}>
        <div className="flex items-center gap-2 mb-3">
          <PiWarningDuotone className="w-6 h-6 text-terracotta" />
          <h3 className="font-heading font-semibold text-terracotta">
            Pending Waiter Assistance ({alerts.length})
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {alerts.map((a) => (
            <div
              key={a.table}
              className="flex items-center justify-between bg-background/60 rounded-lg px-4 py-3 border border-terracotta/20"
            >
              <div>
                <span className="font-semibold text-sm">Table {a.table}</span>
                <p className="text-xs text-muted-foreground">{a.message}</p>
              </div>
              <span className="text-xs text-muted-foreground whitespace-nowrap">{a.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Peak Hours Chart */}
      <div className="glass-card p-6 animate-slide-up" style={{ animationDelay: "400ms" }}>
        <h3 className="font-heading text-lg font-semibold mb-4">Peak Hours Analysis</h3>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={peakData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(35 20% 85% / 0.5)" />
            <XAxis dataKey="hour" tick={{ fontSize: 12, fill: "hsl(25 15% 45%)" }} />
            <YAxis tick={{ fontSize: 12, fill: "hsl(25 15% 45%)" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(35 25% 93%)",
                border: "1px solid hsl(35 20% 85%)",
                borderRadius: "8px",
                fontFamily: "Inter",
              }}
            />
            <Line
              type="monotone"
              dataKey="orders"
              stroke="hsl(210 70% 45%)"
              strokeWidth={2.5}
              dot={{ fill: "hsl(210 70% 45%)", r: 4 }}
              name="Orders"
            />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="hsl(85 35% 42%)"
              strokeWidth={2.5}
              dot={{ fill: "hsl(85 35% 42%)", r: 4 }}
              name="Revenue (TND)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </DashboardLayout>
  );
}
