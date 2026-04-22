"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { MapPin, Search, Star, ArrowRight, Check } from "lucide-react";

const conditions = [
  "Lower Back Pain",
  "Neck Pain",
  "Sports Injury",
  "Headaches",
  "Sciatica",
  "Pregnancy",
  "Poor Posture",
  "General Wellness",
];

const pressLogos = [
  "Forbes Health",
  "Healthline",
  "WebMD",
  "Men's Health",
  "WSJ",
];

export function Hero() {
  const router = useRouter();
  const [location, setLocation] = useState("");
  const [specialty, setSpecialty] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (location) params.set("location", location);
    if (specialty) params.set("condition", specialty);
    router.push(`/search?${params.toString()}`);
  };

  const handleConditionClick = (condition: string) => {
    const params = new URLSearchParams();
    if (location) params.set("location", location);
    params.set("condition", condition);
    router.push(`/search?${params.toString()}`);
  };

  return (
    <section className="relative bg-[#0f1a24] min-h-[90vh] py-16 lg:py-20 overflow-hidden">
      {/* Background gradient overlay - subtle teal undertone */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f1a24] via-[#0f1a24] to-[#142028]" />

      {/* Subtle gradient glow at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-[#1a2830]/50 to-transparent" />

      {/* Decorative orbs - more subtle */}
      <div className="absolute top-20 right-1/4 w-96 h-96 rounded-full bg-[#1a3040]/30 blur-3xl" />
      <div className="absolute bottom-20 left-1/4 w-64 h-64 rounded-full bg-[#1a3040]/20 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Badge */}
        <div className="flex justify-center lg:justify-start mb-8">
          <div className="inline-flex items-center bg-[#1a2a35] text-[#8a9aa5] border border-[#2a3a45] px-4 py-2 rounded-full text-sm font-medium tracking-wide">
            <span className="w-2 h-2 rounded-full bg-emerald-500 mr-3 inline-block animate-pulse" />
            12,000+ VERIFIED CHIROPRACTORS NATIONWIDE
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Text & Search */}
          <div>
            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6">
              <span className="text-white">Find Your</span>
              <br />
              <span className="text-primary italic">Perfect</span>
              <br />
              <span className="text-[#E8DCC8]">Chiropractor</span>
            </h1>

            <p className="text-lg text-gray-400 mb-8 max-w-lg">
              Book top-rated chiropractors instantly. Read verified reviews.
              Compare treatments. Your journey to better alignment starts here.
            </p>

            {/* Search Form */}
            <form onSubmit={handleSearch} className="mb-8">
              <div className="flex flex-col sm:flex-row gap-2 bg-[#1a2832] rounded-2xl p-2 border border-[#2a3a45]">
                <div className="flex-1 relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#5a6a75]" />
                  <Input
                    type="text"
                    placeholder="Austin, TX"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="pl-12 h-12 bg-[#0f1a24] border-[#2a3a45] text-white placeholder:text-[#5a6a75] focus-visible:ring-primary focus-visible:ring-offset-0"
                  />
                </div>
                <div className="flex-1">
                  <Select value={specialty} onValueChange={setSpecialty}>
                    <SelectTrigger className="h-12 bg-[#0f1a24] border-[#2a3a45] text-white focus:ring-primary focus:ring-offset-0">
                      <Search className="w-5 h-5 text-[#5a6a75] mr-2" />
                      <SelectValue placeholder="All Specialties" className="text-[#5a6a75]" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Specialties</SelectItem>
                      <SelectItem value="back-pain">Back Pain</SelectItem>
                      <SelectItem value="neck-pain">Neck Pain</SelectItem>
                      <SelectItem value="sports-injury">Sports Injury</SelectItem>
                      <SelectItem value="sciatica">Sciatica</SelectItem>
                      <SelectItem value="prenatal">Prenatal Care</SelectItem>
                      <SelectItem value="pediatric">Pediatric</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  type="submit"
                  className="h-12 px-8 bg-primary hover:bg-primary/90 text-[#1a1a2e] font-semibold rounded-xl shadow-lg shadow-primary/20"
                >
                  Search
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </form>

            {/* Condition Pills */}
            <div className="mb-10">
              <p className="text-xs text-[#5a6a75] uppercase tracking-widest mb-4">
                What brings you in today?
              </p>
              <div className="flex flex-wrap gap-2">
                {conditions.map((condition) => (
                  <button
                    key={condition}
                    onClick={() => handleConditionClick(condition)}
                    className="px-4 py-2.5 rounded-full border border-[#2a3a45] text-sm text-[#8a9aa5] hover:bg-[#1a2832] hover:border-[#3a4a55] hover:text-white transition-all"
                  >
                    {condition}
                  </button>
                ))}
              </div>
            </div>

            {/* Social Proof */}
            <div className="flex items-center gap-3">
              {/* Stacked Avatars - deep jewel tones */}
              <div className="flex -space-x-2.5">
                {["SM", "JC", "MR", "KP"].map((initials, i) => (
                  <div
                    key={initials}
                    className="w-8 h-8 rounded-full ring-[2.5px] ring-[#151f27] flex items-center justify-center text-[11px] font-medium shadow-md"
                    style={{
                      background: [
                        "linear-gradient(145deg, #5b21b6 0%, #3b0d7a 100%)",
                        "linear-gradient(145deg, #0e7490 0%, #0c4a5e 100%)",
                        "linear-gradient(145deg, #9d174d 0%, #6b1035 100%)",
                        "linear-gradient(145deg, #047857 0%, #034e3a 100%)"
                      ][i],
                      color: ["#c4b5fd", "#a5f3fc", "#fbcfe8", "#a7f3d0"][i],
                    }}
                  >
                    {initials}
                  </div>
                ))}
              </div>
              <div>
                <p className="text-[#c5d0d8] font-semibold">4.9 out of 5</p>
                <p className="text-sm text-[#4a5a65]">from 28,000+ patient reviews</p>
              </div>
            </div>
          </div>

          {/* Right Column - Provider Preview Card */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* Main Card */}
              <div className="bg-gradient-to-b from-[#1a2832] to-[#162228] rounded-3xl border border-[#2a3a45] p-6 shadow-2xl">
                {/* Top Rated Badge */}
                <div className="flex justify-end mb-4">
                  <div className="inline-flex items-center bg-primary text-[#1a1a2e] font-semibold px-3 py-1.5 rounded-full text-sm">
                    <Star className="w-3.5 h-3.5 mr-1.5 fill-[#1a1a2e]" />
                    TOP RATED
                  </div>
                </div>

                {/* Provider Info */}
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-[#2a3a45] ring-2 ring-[#3a4a55] flex items-center justify-center">
                    <span className="text-xl font-bold text-primary">SM</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">Dr. Sarah Mitchell</h3>
                    <p className="text-[#7a8a95]">Align Wellness Center</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                        ))}
                      </div>
                      <span className="text-[#7a8a95] text-sm">4.9 (247)</span>
                    </div>
                  </div>
                </div>

                {/* Specialty Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {["Sports Injury", "Prenatal", "12 yrs"].map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-2 rounded-full bg-[#222f38] text-sm text-[#9aabb8] border border-[#2a3a45]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Time Slots */}
                <div className="flex gap-3 mb-6">
                  {["2:30 PM", "3:00 PM", "4:30 PM"].map((time, i) => (
                    <button
                      key={time}
                      className={`flex-1 py-3.5 rounded-xl text-sm font-medium transition-all ${
                        i === 0
                          ? "bg-primary/15 text-primary border-2 border-primary"
                          : "bg-[#1a2832] text-[#8a9aa5] border border-[#2a3a45] hover:bg-[#222f38] hover:border-[#3a4a55]"
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>

                {/* Book Button */}
                <Button className="w-full h-14 bg-primary hover:bg-primary/90 text-[#1a1a2e] font-semibold text-lg rounded-2xl shadow-lg shadow-primary/20">
                  Book Instantly
                </Button>

                {/* Trust Indicators */}
                <div className="flex items-center justify-center gap-1 mt-5 text-sm text-[#5a6a75]">
                  <Check className="w-4 h-4 text-emerald-500/70" />
                  <span>Free cancellation</span>
                  <span className="mx-2">·</span>
                  <span>No booking fees</span>
                </div>
              </div>

              {/* Decorative elements - more subtle */}
              <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full bg-primary/10 blur-3xl" />
              <div className="absolute -bottom-6 -left-6 w-40 h-40 rounded-full bg-[#1a3040]/30 blur-3xl" />
            </div>
          </div>
        </div>

        {/* Press Logos */}
        <div className="mt-10 pt-6 border-t border-[#1a2530]">
          <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-14">
            {pressLogos.map((logo) => (
              <span
                key={logo}
                className="text-[#3a4550] font-serif text-sm italic hover:text-[#4a5560] transition-colors cursor-default"
              >
                {logo}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
