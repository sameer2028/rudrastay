"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2, LayoutDashboard, CalendarCheck, CalendarDays, DoorOpen, Package, Star, Image, Map, Mail, LogOut, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

const ADMIN_NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/bookings", label: "Bookings", icon: CalendarCheck },
  { href: "/admin/calendar", label: "Calendar", icon: CalendarDays },
  { href: "/admin/rooms", label: "Rooms", icon: DoorOpen },
  { href: "/admin/packages", label: "Packages", icon: Package },
  { href: "/admin/budget-trips", label: "Budget Trips", icon: Map },
  { href: "/admin/gallery", label: "Gallery", icon: Image },
  { href: "/admin/reviews", label: "Reviews", icon: Star },
  { href: "/admin/messages", label: "Messages", icon: Mail },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { admin, isLoading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (!isLoading && !admin && !isLoginPage) {
      router.push("/admin/login");
    }
  }, [admin, isLoading, isLoginPage, router]);

  // If loading auth state, show spinner
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-sand">
        <Loader2 className="w-8 h-8 animate-spin text-gold" />
      </div>
    );
  }

  // If on login page (and not logged in), just render the login page without sidebar
  if (isLoginPage) {
    return <>{children}</>;
  }

  // If not logged in and not on login page, we are redirecting, so show nothing to prevent flash
  if (!admin) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-sand/30">
      {/* Sidebar */}
      <aside className="w-64 bg-charcoal text-white flex flex-col fixed inset-y-0 left-0 z-40">
        <div className="h-20 flex items-center px-6 border-b border-white/10">
          <Link href="/admin" className="font-display text-xl font-bold tracking-wider">
            Rudra Admin
          </Link>
        </div>
        
        <div className="flex-1 overflow-y-auto py-6">
          <nav className="space-y-1 px-4">
            {ADMIN_NAV.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors",
                    isActive 
                      ? "bg-gold text-white" 
                      : "text-white/60 hover:text-white hover:bg-white/5"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-white/10 space-y-2">
          <Link 
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/5 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Website
          </Link>
          <button
            onClick={() => {
              logout();
              router.push("/admin/login");
            }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-red-400 hover:text-red-300 hover:bg-red-400/10 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 min-h-screen">
        <div className="h-20 bg-white/50 backdrop-blur-sm border-b border-gold-light/20 flex items-center px-8 sticky top-0 z-30">
          <p className="text-sm font-medium text-warm-brown">
            Welcome back, <span className="font-bold text-gold">{admin.name}</span>
          </p>
        </div>
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
