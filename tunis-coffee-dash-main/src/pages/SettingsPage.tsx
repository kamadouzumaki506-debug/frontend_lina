import { DashboardLayout } from "@/components/DashboardLayout";
import { 
  PiStorefrontDuotone, 
  PiUsersDuotone, 
  PiReceiptDuotone,
  PiPaletteDuotone
} from "react-icons/pi";

export default function SettingsPage() {
  return (
    <DashboardLayout title="Settings & Configuration">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-10">
        
        {/* Store Profile */}
        <div className="glass-card p-6 animate-slide-up">
          <div className="flex items-center gap-3 mb-6 border-b border-border/50 pb-4">
            <div className="p-3 bg-primary/10 rounded-xl text-primary">
              <PiStorefrontDuotone className="w-6 h-6" />
            </div>
            <h3 className="font-heading text-xl font-semibold">Store Profile</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">Store Name</label>
              <input 
                type="text" 
                defaultValue="Café Medina" 
                className="w-full bg-muted/40 border border-border/50 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">Phone Number</label>
              <input 
                type="text" 
                defaultValue="+216 71 123 456" 
                className="w-full bg-muted/40 border border-border/50 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">Address</label>
              <textarea 
                defaultValue="Rue Sidi Bou Said, Tunis" 
                rows={3}
                className="w-full bg-muted/40 border border-border/50 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary/50 transition-shadow resize-none"
              />
            </div>
            <button className="px-5 py-2.5 bg-primary text-white rounded-xl font-semibold hover:shadow-glow-primary transition-all duration-300">
              Save Changes
            </button>
          </div>
        </div>

        {/* Financials & Tax */}
        <div className="glass-card p-6 animate-slide-up" style={{ animationDelay: "100ms" }}>
          <div className="flex items-center gap-3 mb-6 border-b border-border/50 pb-4">
            <div className="p-3 bg-olive/10 rounded-xl text-olive">
              <PiReceiptDuotone className="w-6 h-6" />
            </div>
            <h3 className="font-heading text-xl font-semibold">Financials</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">Currency</label>
              <select className="w-full bg-muted/40 border border-border/50 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary/50">
                <option value="TND">TND - Tunisian Dinar</option>
                <option value="USD">USD - US Dollar</option>
                <option value="EUR">EUR - Euro</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">Default Tax Rate (%)</label>
              <input 
                type="number" 
                defaultValue="19" 
                className="w-full bg-muted/40 border border-border/50 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
              />
            </div>
            <div className="flex items-center gap-3 pt-2">
              <input type="checkbox" id="tax_inclusive" defaultChecked className="w-4 h-4 rounded text-primary focus:ring-primary" />
              <label htmlFor="tax_inclusive" className="text-sm font-medium">Prices include tax</label>
            </div>
            <button className="px-5 py-2.5 bg-olive text-white rounded-xl font-semibold hover:bg-olive/90 transition-all duration-300 mt-2">
              Update Finances
            </button>
          </div>
        </div>

        {/* Staff Management */}
        <div className="glass-card p-6 animate-slide-up" style={{ animationDelay: "200ms" }}>
          <div className="flex items-center gap-3 mb-6 border-b border-border/50 pb-4">
            <div className="p-3 bg-gold/10 rounded-xl text-gold">
              <PiUsersDuotone className="w-6 h-6" />
            </div>
            <h3 className="font-heading text-xl font-semibold">Staff Management</h3>
          </div>
          
          <div className="space-y-3">
            {[
              { name: "Ahmed", role: "Manager", active: true },
              { name: "Sami", role: "Barista", active: true },
              { name: "Fatma", role: "Waiter", active: false }
            ].map((staff) => (
              <div key={staff.name} className="flex items-center justify-between p-3 bg-muted/30 rounded-xl border border-border/50">
                <div>
                  <p className="font-semibold text-sm">{staff.name}</p>
                  <p className="text-xs text-muted-foreground">{staff.role}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${staff.active ? 'bg-olive shadow-[0_0_8px_hsl(var(--olive))]' : 'bg-muted-foreground'}`}></span>
                  <span className="text-xs text-muted-foreground">{staff.active ? 'Active' : 'Offline'}</span>
                </div>
              </div>
            ))}
            <button className="w-full py-2.5 border border-dashed border-border rounded-xl text-sm font-semibold text-muted-foreground hover:bg-muted/30 hover:text-foreground transition-colors mt-2">
              + Invite Team Member
            </button>
          </div>
        </div>

        {/* Appearance */}
        <div className="glass-card p-6 animate-slide-up" style={{ animationDelay: "300ms" }}>
          <div className="flex items-center gap-3 mb-6 border-b border-border/50 pb-4">
            <div className="p-3 bg-terracotta/10 rounded-xl text-terracotta">
              <PiPaletteDuotone className="w-6 h-6" />
            </div>
            <h3 className="font-heading text-xl font-semibold">Appearance</h3>
          </div>
          
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">Select your preferred dashboard theme.</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 border-2 border-primary rounded-xl cursor-pointer relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-white to-muted opacity-20 group-hover:opacity-40 transition-opacity"></div>
                <div className="flex items-center justify-between relative z-10">
                  <span className="font-semibold">Light Mode</span>
                  <div className="w-4 h-4 rounded-full bg-primary border-4 border-white shadow-sm"></div>
                </div>
              </div>
              <div className="p-4 border border-border/50 rounded-xl cursor-pointer bg-slate-900 text-white hover:border-border transition-colors">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-white">Dark Mode</span>
                  <div className="w-4 h-4 rounded-full border border-slate-600"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
