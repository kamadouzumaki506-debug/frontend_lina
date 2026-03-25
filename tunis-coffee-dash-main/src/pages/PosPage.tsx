import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { 
  PiShoppingCartDuotone, 
  PiPlusBold, 
  PiMinusBold, 
  PiTrashDuotone,
  PiCreditCardDuotone,
  PiMoneyDuotone
} from "react-icons/pi";
import { cn } from "@/lib/utils";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
}

interface CartItem extends Product {
  quantity: number;
}

const posProducts: Product[] = [
  { id: 1, name: "Espresso", category: "Hot Drinks", price: 4.5, image: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&q=80&w=400" },
  { id: 2, name: "Café Latte", category: "Hot Drinks", price: 7.0, image: "https://images.unsplash.com/photo-1534040385115-33dcb3acba5b?auto=format&fit=crop&q=80&w=400" },
  { id: 3, name: "Turkish Coffee", category: "Hot Drinks", price: 5.0, image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=400" },
  { id: 4, name: "Mint Tea", category: "Hot Drinks", price: 4.0, image: "https://images.unsplash.com/photo-1576092762791-dd9e2220abd4?auto=format&fit=crop&q=80&w=400" },
  { id: 5, name: "Croissant", category: "Pastries", price: 3.5, image: "https://images.unsplash.com/photo-1555507036-ab1f40ce88cb?auto=format&fit=crop&q=80&w=400" },
  { id: 6, name: "Frappé", category: "Cold Drinks", price: 8.0, image: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&q=80&w=400" },
];

export default function PosPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [filter, setFilter] = useState("All");

  const categories = ["All", ...Array.from(new Set(posProducts.map((p) => p.category)))];
  const filtered = filter === "All" ? posProducts : posProducts.filter((p) => p.category === filter);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQ = item.quantity + delta;
          return newQ > 0 ? { ...item, quantity: newQ } : item;
        }
        return item;
      })
    );
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.19; // 19% VAT
  const total = subtotal + tax;

  return (
    <DashboardLayout title="Point of Sale">
      <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-140px)]">
        
        {/* Products Grid */}
        <div className="flex-1 flex flex-col min-h-0">
          {/* Categories */}
          <div className="flex items-center gap-3 overflow-x-auto pb-4 mb-2 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={cn(
                  "px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 whitespace-nowrap shadow-soft",
                  filter === cat
                    ? "bg-primary text-primary-foreground shadow-glow-primary scale-105"
                    : "bg-card text-muted-foreground hover:bg-muted"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto pr-2 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 pb-10">
            {filtered.map((product, i) => (
              <div
                key={product.id}
                onClick={() => addToCart(product)}
                className="group cursor-pointer glass-card overflow-hidden animate-scale-in"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <div className="h-36 overflow-hidden relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
                  <span className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm text-primary font-bold px-2.5 py-1 rounded-lg text-sm shadow-lg">
                    {product.price.toFixed(2)} TND
                  </span>
                </div>
                <div className="p-4">
                  <h4 className="font-heading font-semibold text-lg leading-tight mb-1">{product.name}</h4>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">{product.category}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cart Sidebar */}
        <div className="w-full lg:w-[380px] flex flex-col glass-card overflow-hidden">
          <div className="p-5 border-b border-border/50 bg-card/50 flex items-center justify-between">
            <h3 className="font-heading text-xl font-bold flex items-center gap-2 text-primary">
              <PiShoppingCartDuotone className="w-6 h-6" />
              Current Order
            </h3>
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-bold">
              {cart.reduce((s, i) => s + i.quantity, 0)} items
            </span>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-muted/20">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center opacity-50">
                <PiShoppingCartDuotone className="w-16 h-16 mb-4 text-muted-foreground" />
                <p className="text-muted-foreground font-medium">Cart is empty</p>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="flex flex-col gap-3 bg-card p-4 rounded-xl shadow-soft animate-slide-up">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-sm">{item.name}</h4>
                      <p className="text-xs text-muted-foreground">{item.price.toFixed(2)} TND / ea</p>
                    </div>
                    <span className="font-semibold text-sm">{(item.price * item.quantity).toFixed(2)} TND</span>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <div className="flex items-center gap-1 bg-muted/50 rounded-lg p-1">
                      <button 
                        onClick={() => updateQuantity(item.id, -1)}
                        className="p-1.5 hover:bg-card rounded-md transition-colors"
                      >
                        <PiMinusBold className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, 1)}
                        className="p-1.5 hover:bg-card rounded-md transition-colors text-primary"
                      >
                        <PiPlusBold className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-destructive/70 hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                    >
                      <PiTrashDuotone className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="p-5 border-t border-border/50 bg-card">
            <div className="space-y-2 mb-4 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>{subtotal.toFixed(2)} TND</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Tax (19%)</span>
                <span>{tax.toFixed(2)} TND</span>
              </div>
              <div className="flex justify-between font-bold text-xl pt-2 border-t border-border/50">
                <span>Total</span>
                <span className="text-primary">{total.toFixed(2)} TND</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button 
                disabled={cart.length === 0}
                className="flex flex-col items-center justify-center gap-2 bg-olive/10 text-olive hover:bg-olive hover:text-white p-3 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:hover:bg-olive/10 disabled:hover:text-olive font-semibold shadow-soft"
              >
                <PiMoneyDuotone className="w-6 h-6" />
                Cash
              </button>
              <button 
                disabled={cart.length === 0}
                className="flex flex-col items-center justify-center gap-2 bg-primary text-white hover:bg-primary/90 p-3 rounded-xl transition-all duration-300 disabled:opacity-50 font-semibold shadow-glow-primary hover:-translate-y-1"
              >
                <PiCreditCardDuotone className="w-6 h-6" />
                Card
              </button>
            </div>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
