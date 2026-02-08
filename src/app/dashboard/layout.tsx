import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Navbar } from "@/components/layout/Navbar";
import {
  User,
  Calendar,
  Clock,
  FileText,
  Settings,
  LayoutDashboard,
} from "lucide-react";

const sidebarLinks = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/profile", label: "Profile", icon: User },
  { href: "/dashboard/services", label: "Services", icon: FileText },
  { href: "/dashboard/availability", label: "Availability", icon: Clock },
  { href: "/dashboard/appointments", label: "Appointments", icon: Calendar },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?redirect=/dashboard");
  }

  const userMeta = user.user_metadata;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-cream">
        <div className="flex">
          {/* Sidebar */}
          <aside className="w-64 bg-white border-r border-border min-h-[calc(100vh-64px)] hidden md:block">
            <div className="p-6 border-b border-border">
              <p className="font-semibold text-secondary">
                {userMeta?.first_name} {userMeta?.last_name}
              </p>
              <p className="text-sm text-muted-foreground">{user.email}</p>
              <span className="inline-block mt-2 text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                {userMeta?.role === "PROVIDER" ? "Provider" : "Patient"}
              </span>
            </div>
            <nav className="p-4">
              <ul className="space-y-1">
                {sidebarLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground hover:bg-muted hover:text-secondary transition-colors"
                    >
                      <link.icon className="w-5 h-5" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 p-6 md:p-8">{children}</main>
        </div>
      </div>
    </>
  );
}
