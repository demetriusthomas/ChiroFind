"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Menu, X, User, LogOut } from "lucide-react";
import type { User as SupabaseUser } from "@supabase/supabase-js";

export function Navbar() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    // Get initial session
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <nav className="bg-white border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">CF</span>
            </div>
            <span className="font-serif text-xl font-semibold text-secondary">
              ChiroFind
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/search"
              className="text-muted-foreground hover:text-secondary transition-colors"
            >
              Find a Chiropractor
            </Link>
            <Link
              href="/chiropractors"
              className="text-muted-foreground hover:text-secondary transition-colors"
            >
              Browse by Location
            </Link>
            <Link
              href="/about"
              className="text-muted-foreground hover:text-secondary transition-colors"
            >
              About
            </Link>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {loading ? (
              <div className="w-24 h-10 bg-muted animate-pulse rounded" />
            ) : user ? (
              <>
                <Button variant="ghost" asChild>
                  <Link href="/dashboard">
                    <User className="w-4 h-4 mr-2" />
                    Dashboard
                  </Link>
                </Button>
                <Button variant="outline" onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Log Out
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link href="/login">Log In</Link>
                </Button>
                <Button asChild>
                  <Link href="/signup">Get Started</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-white">
          <div className="px-4 py-4 space-y-4">
            <Link
              href="/search"
              className="block text-muted-foreground hover:text-secondary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Find a Chiropractor
            </Link>
            <Link
              href="/chiropractors"
              className="block text-muted-foreground hover:text-secondary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Browse by Location
            </Link>
            <Link
              href="/about"
              className="block text-muted-foreground hover:text-secondary"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <hr className="border-border" />
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className="block text-muted-foreground hover:text-secondary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                >
                  Log Out
                </Button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="block text-muted-foreground hover:text-secondary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Log In
                </Link>
                <Button className="w-full" asChild>
                  <Link href="/signup">Get Started</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
