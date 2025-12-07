import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Map,
  Users,
  BarChart3,
  Settings,
  FileText,
  History,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: Map, label: "Map View", href: "/dashboard/map" },
  { icon: Users, label: "Population", href: "/dashboard/population" },
  { icon: BarChart3, label: "Analytics", href: "/dashboard/analytics" },
  { icon: FileText, label: "Reports", href: "/dashboard/reports" },
  { icon: History, label: "History", href: "/dashboard/history" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
];

function DashboardSidebar() {
  const { pathname } = useLocation();

  return (
    <aside className="flex w-64 flex-col border-r border-white/10 bg-[oklch(0.12_0_0)]/50 backdrop-blur-sm">
      <div className="flex h-16 items-center gap-2 border-b border-white/10 px-6">
        <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[oklch(0.75_0.18_165)]/30 bg-[oklch(0.75_0.18_165)]/10">
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4 text-[oklch(0.75_0.18_165)]"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <circle cx="12" cy="12" r="3" />
            <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
            <path d="M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
          </svg>
        </div>
        <span className="text-sm font-medium tracking-[0.2em] uppercase text-white">
          CIVORA
        </span>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <li key={item.label}>
                <Link
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all",
                    isActive
                      ? "bg-[oklch(0.75_0.18_165)]/20 text-[oklch(0.75_0.18_165)] border border-[oklch(0.75_0.18_165)]/30 shadow-lg shadow-[oklch(0.75_0.18_165)]/10"
                      : "text-white/70 hover:bg-white/10 hover:text-white"
                  )}
                >
                  <item.icon className={cn("h-4 w-4", isActive && "text-[oklch(0.75_0.18_165)]")} />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-white/10 p-4">
        <Link
          to="/"
          className="text-xs text-white/50 hover:text-white transition-colors"
        >
          ← Back to Home
        </Link>
      </div>
    </aside>
  );
}

export default DashboardSidebar;