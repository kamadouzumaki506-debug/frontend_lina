import { DashboardLayout } from "@/components/DashboardLayout";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const dailyRevenue = [
  { day: "Mon", revenue: 1250, orders: 82 },
  { day: "Tue", revenue: 1480, orders: 95 },
  { day: "Wed", revenue: 1120, orders: 73 },
  { day: "Thu", revenue: 1680, orders: 108 },
  { day: "Fri", revenue: 1920, orders: 124 },
  { day: "Sat", revenue: 2340, orders: 148 },
  { day: "Sun", revenue: 2100, orders: 135 },
];

const topProducts = [
  { name: "Café Latte", sales: 145 },
  { name: "Espresso", sales: 120 },
  { name: "Turkish Coffee", sales: 98 },
  { name: "Mint Tea", sales: 87 },
  { name: "Baklava", sales: 76 },
  { name: "Frappé", sales: 65 },
];

const categoryBreakdown = [
  { name: "Hot Drinks", value: 55 },
  { name: "Cold Drinks", value: 25 },
  { name: "Pastries", value: 20 },
];

const PIE_COLORS = [
  "hsl(210 70% 45%)",
  "hsl(85 35% 42%)",
  "hsl(42 75% 55%)",
];

export default function AnalyticsPage() {
  return (
    <DashboardLayout title="Analytics & Reports">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Daily Revenue */}
        <div className="glass-card p-6 animate-slide-up">
          <h3 className="font-heading text-lg font-semibold mb-4">Daily Revenue (Last 7 Days)</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={dailyRevenue}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(35 20% 85% / 0.5)" />
              <XAxis dataKey="day" tick={{ fontSize: 12, fill: "hsl(25 15% 45%)" }} />
              <YAxis tick={{ fontSize: 12, fill: "hsl(25 15% 45%)" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(35 25% 93%)",
                  border: "1px solid hsl(35 20% 85%)",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="revenue" fill="hsl(210 70% 45%)" radius={[6, 6, 0, 0]} name="Revenue (TND)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Top Selling */}
        <div className="glass-card p-6 animate-slide-up" style={{ animationDelay: "100ms" }}>
          <h3 className="font-heading text-lg font-semibold mb-4">Top Selling Products</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={topProducts} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(35 20% 85% / 0.5)" />
              <XAxis type="number" tick={{ fontSize: 12, fill: "hsl(25 15% 45%)" }} />
              <YAxis
                dataKey="name"
                type="category"
                tick={{ fontSize: 12, fill: "hsl(25 15% 45%)" }}
                width={100}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(35 25% 93%)",
                  border: "1px solid hsl(35 20% 85%)",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="sales" fill="hsl(85 35% 42%)" radius={[0, 6, 6, 0]} name="Units Sold" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Orders trend */}
        <div className="glass-card p-6 animate-slide-up" style={{ animationDelay: "200ms" }}>
          <h3 className="font-heading text-lg font-semibold mb-4">Orders Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={dailyRevenue}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(35 20% 85% / 0.5)" />
              <XAxis dataKey="day" tick={{ fontSize: 12, fill: "hsl(25 15% 45%)" }} />
              <YAxis tick={{ fontSize: 12, fill: "hsl(25 15% 45%)" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(35 25% 93%)",
                  border: "1px solid hsl(35 20% 85%)",
                  borderRadius: "8px",
                }}
              />
              <Line type="monotone" dataKey="orders" stroke="hsl(15 55% 50%)" strokeWidth={2.5} dot={{ r: 4, fill: "hsl(15 55% 50%)" }} name="Orders" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Category breakdown */}
        <div className="glass-card p-6 animate-slide-up" style={{ animationDelay: "300ms" }}>
          <h3 className="font-heading text-lg font-semibold mb-4">Sales by Category</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={categoryBreakdown}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                dataKey="value"
                label={({ name, value }) => `${name} ${value}%`}
              >
                {categoryBreakdown.map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </DashboardLayout>
  );
}
