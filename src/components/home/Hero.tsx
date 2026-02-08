"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin } from "lucide-react";

export function Hero() {
  const router = useRouter();
  const [location, setLocation] = useState("");
  const [condition, setCondition] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (location) params.set("location", location);
    if (condition) params.set("condition", condition);
    router.push(`/search?${params.toString()}`);
  };

  return (
    <section className="relative bg-secondary py-20 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6">
            <span className="text-white">Find Your</span>
            <br />
            <span className="text-primary italic">Perfect</span>
            <br />
            <span className="bg-gradient-to-r from-[#E8DCC8] via-[#D4B978] to-primary bg-clip-text text-transparent">
              Chiropractor
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            Discover top-rated chiropractors in your area. Read reviews, compare
            specialties, and book your appointment online.
          </p>

          {/* Search Form */}
          <form
            onSubmit={handleSearch}
            className="bg-white rounded-2xl shadow-lg p-4 md:p-6"
          >
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="City, state, or zip code"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="pl-10 h-12 text-base"
                />
              </div>
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Condition or specialty (optional)"
                  value={condition}
                  onChange={(e) => setCondition(e.target.value)}
                  className="pl-10 h-12 text-base"
                />
              </div>
              <Button type="submit" size="lg" className="h-12 px-8">
                Search
              </Button>
            </div>
          </form>

          {/* Quick Links */}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <span className="text-sm text-gray-500">Popular:</span>
            {["Back Pain", "Neck Pain", "Sciatica", "Sports Injury"].map(
              (term) => (
                <button
                  key={term}
                  onClick={() => {
                    setCondition(term);
                  }}
                  className="text-sm text-primary hover:underline"
                >
                  {term}
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
