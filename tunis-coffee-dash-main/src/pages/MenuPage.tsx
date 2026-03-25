import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { PiPlusBold, PiPencilDuotone, PiTrashDuotone } from "react-icons/pi";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  isActive: boolean;
  isTrending: boolean;
}

const initialProducts: Product[] = [
  { id: 1, name: "Espresso", category: "Hot Drinks", price: 4.5, isActive: true, isTrending: true },
  { id: 2, name: "Café Latte", category: "Hot Drinks", price: 7.0, isActive: true, isTrending: true },
  { id: 3, name: "Turkish Coffee", category: "Hot Drinks", price: 5.0, isActive: true, isTrending: false },
  { id: 4, name: "Mint Tea", category: "Hot Drinks", price: 4.0, isActive: true, isTrending: true },
  { id: 5, name: "Iced Americano", category: "Cold Drinks", price: 6.5, isActive: true, isTrending: false },
  { id: 6, name: "Frappé", category: "Cold Drinks", price: 8.0, isActive: true, isTrending: true },
  { id: 7, name: "Croissant", category: "Pastries", price: 3.5, isActive: true, isTrending: false },
  { id: 8, name: "Baklava", category: "Pastries", price: 5.5, isActive: true, isTrending: true },
  { id: 9, name: "Makroudh", category: "Pastries", price: 4.0, isActive: true, isTrending: false },
  { id: 10, name: "Bambalouni", category: "Pastries", price: 3.0, isActive: false, isTrending: false },
];

export default function MenuPage() {
  const [products, setProducts] = useState(initialProducts);
  const [filter, setFilter] = useState("All");

  const categories = ["All", ...Array.from(new Set(products.map((p) => p.category)))];
  const filtered = filter === "All" ? products : products.filter((p) => p.category === filter);

  const toggleField = (id: number, field: "isActive" | "isTrending") => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: !p[field] } : p))
    );
  };

  const deleteProduct = (id: number) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <DashboardLayout title="Menu Management">
      <div className="glass-card animate-slide-up">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 border-b border-border/50 gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-sm font-medium transition-colors",
                  filter === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted/60 text-muted-foreground hover:bg-muted"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:shadow-glow-primary hover:scale-105 transition-all duration-300">
            <PiPlusBold className="w-4 h-4" />
            Add Product
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50">
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Name</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Category</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Price</th>
                <th className="text-center px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Active</th>
                <th className="text-center px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Trending</th>
                <th className="text-right px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p, i) => (
                <tr
                  key={p.id}
                  className="border-b border-border/30 hover:bg-muted/30 transition-colors animate-slide-up"
                  style={{ animationDelay: `${i * 40}ms` }}
                >
                  <td className="px-5 py-4 font-medium text-sm">{p.name}</td>
                  <td className="px-5 py-4 text-sm text-muted-foreground">
                    <span className="bg-muted/60 px-2.5 py-1 rounded-md text-xs">{p.category}</span>
                  </td>
                  <td className="px-5 py-4 text-sm font-semibold">{p.price.toFixed(2)} TND</td>
                  <td className="px-5 py-4 text-center">
                    <Switch checked={p.isActive} onCheckedChange={() => toggleField(p.id, "isActive")} />
                  </td>
                  <td className="px-5 py-4 text-center">
                    <Switch checked={p.isTrending} onCheckedChange={() => toggleField(p.id, "isTrending")} />
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 rounded-lg hover:bg-muted/80 transition-colors text-muted-foreground hover:text-primary active:scale-95">
                        <PiPencilDuotone className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => deleteProduct(p.id)}
                        className="p-2 rounded-lg hover:bg-destructive/10 transition-colors text-muted-foreground hover:text-destructive active:scale-95"
                      >
                        <PiTrashDuotone className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
