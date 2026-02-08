import { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Find Chiropractors by State | ChiroFind",
  description:
    "Browse chiropractors across the United States. Select your state to find local chiropractic care, read reviews, and book appointments online.",
};

const states = [
  { code: "al", name: "Alabama", providerCount: 234 },
  { code: "ak", name: "Alaska", providerCount: 45 },
  { code: "az", name: "Arizona", providerCount: 312 },
  { code: "ar", name: "Arkansas", providerCount: 156 },
  { code: "ca", name: "California", providerCount: 1245 },
  { code: "co", name: "Colorado", providerCount: 345 },
  { code: "ct", name: "Connecticut", providerCount: 189 },
  { code: "de", name: "Delaware", providerCount: 67 },
  { code: "fl", name: "Florida", providerCount: 876 },
  { code: "ga", name: "Georgia", providerCount: 423 },
  { code: "hi", name: "Hawaii", providerCount: 89 },
  { code: "id", name: "Idaho", providerCount: 112 },
  { code: "il", name: "Illinois", providerCount: 567 },
  { code: "in", name: "Indiana", providerCount: 298 },
  { code: "ia", name: "Iowa", providerCount: 187 },
  { code: "ks", name: "Kansas", providerCount: 156 },
  { code: "ky", name: "Kentucky", providerCount: 213 },
  { code: "la", name: "Louisiana", providerCount: 198 },
  { code: "me", name: "Maine", providerCount: 78 },
  { code: "md", name: "Maryland", providerCount: 289 },
  { code: "ma", name: "Massachusetts", providerCount: 345 },
  { code: "mi", name: "Michigan", providerCount: 456 },
  { code: "mn", name: "Minnesota", providerCount: 312 },
  { code: "ms", name: "Mississippi", providerCount: 134 },
  { code: "mo", name: "Missouri", providerCount: 278 },
  { code: "mt", name: "Montana", providerCount: 67 },
  { code: "ne", name: "Nebraska", providerCount: 98 },
  { code: "nv", name: "Nevada", providerCount: 156 },
  { code: "nh", name: "New Hampshire", providerCount: 78 },
  { code: "nj", name: "New Jersey", providerCount: 412 },
  { code: "nm", name: "New Mexico", providerCount: 112 },
  { code: "ny", name: "New York", providerCount: 789 },
  { code: "nc", name: "North Carolina", providerCount: 456 },
  { code: "nd", name: "North Dakota", providerCount: 45 },
  { code: "oh", name: "Ohio", providerCount: 534 },
  { code: "ok", name: "Oklahoma", providerCount: 189 },
  { code: "or", name: "Oregon", providerCount: 234 },
  { code: "pa", name: "Pennsylvania", providerCount: 567 },
  { code: "ri", name: "Rhode Island", providerCount: 56 },
  { code: "sc", name: "South Carolina", providerCount: 234 },
  { code: "sd", name: "South Dakota", providerCount: 45 },
  { code: "tn", name: "Tennessee", providerCount: 312 },
  { code: "tx", name: "Texas", providerCount: 978 },
  { code: "ut", name: "Utah", providerCount: 167 },
  { code: "vt", name: "Vermont", providerCount: 45 },
  { code: "va", name: "Virginia", providerCount: 378 },
  { code: "wa", name: "Washington", providerCount: 345 },
  { code: "wv", name: "West Virginia", providerCount: 89 },
  { code: "wi", name: "Wisconsin", providerCount: 289 },
  { code: "wy", name: "Wyoming", providerCount: 34 },
];

export default function ChiropractorsPage() {
  const totalProviders = states.reduce((sum, s) => sum + s.providerCount, 0);

  return (
    <>
      <Navbar />
      <main className="bg-cream min-h-screen">
        {/* Hero */}
        <section className="bg-white border-b py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-secondary mb-4">
              Find Chiropractors by State
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl">
              Browse our directory of {totalProviders.toLocaleString()}{" "}
              chiropractors across the United States. Select your state to find
              local chiropractic care.
            </p>
          </div>
        </section>

        {/* States Grid */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {states.map((state) => (
                <Link key={state.code} href={`/chiropractors/${state.code}`}>
                  <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between">
                        <div>
                          <h2 className="font-semibold text-secondary">
                            {state.name}
                          </h2>
                          <p className="text-sm text-muted-foreground mt-1">
                            {state.providerCount.toLocaleString()} chiropractors
                          </p>
                        </div>
                        <MapPin className="w-5 h-5 text-primary" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
