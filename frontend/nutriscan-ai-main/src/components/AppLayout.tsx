import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logoutUser } from "../Auth/logoutUser";
import { supabase } from "../Auth/SupaBaseClient";

import {
  LayoutDashboard,
  ScanBarcode,
  UtensilsCrossed,
  BarChart3,
  History,
  GitCompareArrows,
  Target,
  Camera,
  UserCircle,
  Menu,
  X,
  Apple,
} from "lucide-react";

const navItems = [
  { path: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { path: "/scan", icon: ScanBarcode, label: "Scan" },
  { path: "/log", icon: UtensilsCrossed, label: "Food Log" },
  { path: "/insights", icon: BarChart3, label: "Insights" },
  { path: "/compare", icon: GitCompareArrows, label: "Compare" },
  { path: "/goals", icon: Target, label: "Goals" },
];

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // 🔒 Auth Guard
  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();

      if (!data.user) {
        navigate("/login");
      }
    };

    checkUser();
  }, [navigate]);

  // 🚪 Logout
  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate("/login");
    } catch (err: any) {
      alert(err);
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 border-r border-border bg-card/50 fixed h-full z-30">
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
            <Apple className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground">NutriScan</h1>
            <p className="text-xs text-muted-foreground">Smart Nutrition</p>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? "bg-primary/10 text-primary glow-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* ✅ Logout at bottom */}
        <div className="p-4 mt-auto">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-4 py-2 rounded-lg 
                       text-gray-400 hover:text-white 
                       bg-white/5 hover:bg-white/10 
                       border border-white/10 hover:border-white/20
                       transition-all duration-200 text-sm"
          >
            <svg
              className="w-4 h-4 opacity-70"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h4" />
            </svg>
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
          <aside className="relative w-72 h-full bg-card border-r border-border flex flex-col">
            <div className="p-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                  <Apple className="w-5 h-5 text-primary-foreground" />
                </div>
                <h1 className="text-lg font-bold text-foreground">
                  NutriScan
                </h1>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="text-muted-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex-1 px-3 py-4 space-y-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Mobile logout */}
            <div className="p-4">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-4 py-2 rounded-lg 
                           text-gray-400 hover:text-white 
                           bg-white/5 hover:bg-white/10 
                           border border-white/10 hover:border-white/20
                           transition-all duration-200 text-sm"
              >
                <svg
                  className="w-4 h-4 opacity-70"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h4" />
                </svg>
                Logout
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* Main content */}
      <main className="flex-1 lg:ml-64">
        {/* Mobile header */}
        <header className="lg:hidden sticky top-0 z-20 bg-background/80 backdrop-blur-xl border-b border-border px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-muted-foreground"
          >
            <Menu className="w-6 h-6" />
          </button>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
              <Apple className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-foreground">NutriScan</span>
          </div>

          {/* Mobile logout */}
          <button
            onClick={handleLogout}
            className="text-gray-400 hover:text-white transition"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h4" />
            </svg>
          </button>
        </header>

        <div className="p-4 lg:p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>

      {/* Mobile bottom nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-card/90 backdrop-blur-xl border-t border-border z-20 px-2 py-2 flex justify-around">
        {navItems.slice(0, 5).map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center gap-1 px-3 py-1 rounded-lg text-xs transition-all ${
                isActive ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default AppLayout;