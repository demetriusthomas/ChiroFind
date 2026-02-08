import { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import {
  ChiropractorCard,
  ChiropractorData,
} from "@/components/search/ChiropractorCard";
import { Button } from "@/components/ui/button";
import { MapPin, Filter } from "lucide-react";

// State name mapping
const stateNames: Record<string, string> = {
  al: "Alabama",
  ak: "Alaska",
  az: "Arizona",
  ar: "Arkansas",
  ca: "California",
  co: "Colorado",
  ct: "Connecticut",
  de: "Delaware",
  fl: "Florida",
  ga: "Georgia",
  hi: "Hawaii",
  id: "Idaho",
  il: "Illinois",
  in: "Indiana",
  ia: "Iowa",
  ks: "Kansas",
  ky: "Kentucky",
  la: "Louisiana",
  me: "Maine",
  md: "Maryland",
  ma: "Massachusetts",
  mi: "Michigan",
  mn: "Minnesota",
  ms: "Mississippi",
  mo: "Missouri",
  mt: "Montana",
  ne: "Nebraska",
  nv: "Nevada",
  nh: "New Hampshire",
  nj: "New Jersey",
  nm: "New Mexico",
  ny: "New York",
  nc: "North Carolina",
  nd: "North Dakota",
  oh: "Ohio",
  ok: "Oklahoma",
  or: "Oregon",
  pa: "Pennsylvania",
  ri: "Rhode Island",
  sc: "South Carolina",
  sd: "South Dakota",
  tn: "Tennessee",
  tx: "Texas",
  ut: "Utah",
  vt: "Vermont",
  va: "Virginia",
  wa: "Washington",
  wv: "West Virginia",
  wi: "Wisconsin",
  wy: "Wyoming",
};

// Convert slug to title case
const slugToTitle = (slug: string): string => {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

// Mock data - will be replaced with database query
const getChiropractorsForCity = (
  stateCode: string,
  citySlug: string
): ChiropractorData[] => {
  // Return mock data for San Francisco
  if (stateCode === "ca" && citySlug === "san-francisco") {
    return [
      {
        id: "1",
        name: "Dr. Sarah Johnson",
        title: "DC, CCSP",
        clinic: "Elite Spine & Wellness Center",
        address: "123 Main Street",
        city: "San Francisco",
        state: "CA",
        rating: 4.9,
        reviewCount: 127,
        specialties: ["Sports Injury", "Back Pain", "Rehabilitation"],
        nextAvailable: "Today, 2:00 PM",
        acceptingNew: true,
        insuranceAccepted: ["Blue Cross", "Aetna", "United Healthcare"],
        image: null,
        yearsExperience: 12,
      },
      {
        id: "2",
        name: "Dr. Michael Chen",
        title: "DC, DACBSP",
        clinic: "Bay Area Chiropractic",
        address: "456 Market Street",
        city: "San Francisco",
        state: "CA",
        rating: 4.8,
        reviewCount: 98,
        specialties: ["Pediatric", "Family Care", "Wellness"],
        nextAvailable: "Tomorrow, 9:00 AM",
        acceptingNew: true,
        insuranceAccepted: ["Kaiser", "Blue Shield", "Medicare"],
        image: null,
        yearsExperience: 8,
      },
      {
        id: "3",
        name: "Dr. Emily Rodriguez",
        title: "DC, RYT",
        clinic: "Holistic Spine Center",
        address: "789 Valencia Street",
        city: "San Francisco",
        state: "CA",
        rating: 4.9,
        reviewCount: 156,
        specialties: ["Pregnancy Care", "Wellness", "Yoga Therapy"],
        nextAvailable: "Today, 4:30 PM",
        acceptingNew: true,
        insuranceAccepted: ["Aetna", "Cigna"],
        image: null,
        yearsExperience: 15,
      },
    ];
  }
  return [];
};

interface PageProps {
  params: Promise<{ state: string; city: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { state, city } = await params;
  const stateName = stateNames[state.toLowerCase()] || state.toUpperCase();
  const cityName = slugToTitle(city);

  return {
    title: `Chiropractors in ${cityName}, ${stateName} | ChiroFind`,
    description: `Find and book top-rated chiropractors in ${cityName}, ${stateName}. Read patient reviews, compare specialties, and schedule appointments online.`,
    openGraph: {
      title: `Chiropractors in ${cityName}, ${stateName} | ChiroFind`,
      description: `Find and book top-rated chiropractors in ${cityName}, ${stateName}. Read reviews and schedule appointments online.`,
    },
  };
}

export default async function CityPage({ params }: PageProps) {
  const { state, city } = await params;
  const stateCode = state.toLowerCase();
  const stateName = stateNames[stateCode] || state.toUpperCase();
  const cityName = slugToTitle(city);
  const chiropractors = getChiropractorsForCity(stateCode, city);

  return (
    <>
      <Navbar />
      <main className="bg-cream min-h-screen">
        {/* Hero */}
        <section className="bg-white border-b py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="text-sm text-muted-foreground mb-4">
              <Link href="/" className="hover:text-primary">
                Home
              </Link>
              <span className="mx-2">/</span>
              <Link href="/chiropractors" className="hover:text-primary">
                Chiropractors
              </Link>
              <span className="mx-2">/</span>
              <Link
                href={`/chiropractors/${stateCode}`}
                className="hover:text-primary"
              >
                {stateName}
              </Link>
              <span className="mx-2">/</span>
              <span className="text-secondary">{cityName}</span>
            </nav>

            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-serif font-bold text-secondary mb-2">
                  Chiropractors in {cityName}, {stateName}
                </h1>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>
                    {chiropractors.length} chiropractors available
                  </span>
                </div>
              </div>

              <Button variant="outline" asChild>
                <Link href={`/search?location=${cityName}, ${stateName}`}>
                  <Filter className="w-4 h-4 mr-2" />
                  Filter Results
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Results */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {chiropractors.length > 0 ? (
              <div className="space-y-4">
                {chiropractors.map((chiropractor) => (
                  <ChiropractorCard
                    key={chiropractor.id}
                    chiropractor={chiropractor}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <h2 className="text-xl font-semibold text-secondary mb-2">
                  No chiropractors found
                </h2>
                <p className="text-muted-foreground mb-6">
                  We&apos;re still growing our network in {cityName}. Check back
                  soon or browse nearby cities.
                </p>
                <Button asChild>
                  <Link href={`/chiropractors/${stateCode}`}>
                    View All Cities in {stateName}
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* SEO Content */}
        <section className="py-12 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-serif font-bold text-secondary mb-6">
              Finding a Chiropractor in {cityName}
            </h2>
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p>
                Looking for quality chiropractic care in {cityName},{" "}
                {stateName}? ChiroFind makes it easy to discover and connect
                with licensed chiropractors in your area. Our comprehensive
                directory features verified profiles, patient reviews, and
                online booking capabilities.
              </p>
              <p>
                Chiropractors in {cityName} treat a wide range of conditions
                including back pain, neck pain, headaches, sciatica, and sports
                injuries. Many also offer wellness care, pediatric treatments,
                and specialized techniques like Active Release Therapy and
                Graston Technique.
              </p>
              <h3>What to Look for in a Chiropractor</h3>
              <ul>
                <li>Valid state license and credentials (DC, CCSP, etc.)</li>
                <li>Positive patient reviews and ratings</li>
                <li>Experience with your specific condition</li>
                <li>Convenient location and office hours</li>
                <li>Acceptance of your insurance plan</li>
              </ul>
              <p>
                Browse our listings above to find the right chiropractor for
                your needs. Each profile includes detailed information about
                their specialties, education, and availability. You can also
                read reviews from other patients to help make your decision.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
