"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
              href="/conditions"
              className="text-muted-foreground hover:text-secondary transition-colors"
            >
              Conditions
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
            <Button variant="ghost" asChild>
              <Link href="/login">Log In</Link>
            </Button>
            <Button asChild>
              <Link href="/providers/join">List Your Practice</Link>
            </Button>
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
              href="/conditions"
              className="block text-muted-foreground hover:text-secondary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Conditions
            </Link>
            <Link
              href="/about"
              className="block text-muted-foreground hover:text-secondary"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <hr className="border-border" />
            <Link
              href="/login"
              className="block text-muted-foreground hover:text-secondary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Log In
            </Link>
            <Button className="w-full" asChild>
              <Link href="/providers/join">List Your Practice</Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
