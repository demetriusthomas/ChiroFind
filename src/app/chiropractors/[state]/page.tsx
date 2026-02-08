import { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Users } from "lucide-react";

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

// Mock cities data - will be replaced with database query
const getCitiesForState = (stateCode: string) => {
  const mockCities: Record<string, Array<{ city: string; slug: string; providerCount: number }>> = {
    ca: [
      { city: "San Francisco", slug: "san-francisco", providerCount: 156 },
      { city: "Los Angeles", slug: "los-angeles", providerCount: 342 },
      { city: "San Diego", slug: "san-diego", providerCount: 128 },
      { city: "San Jose", slug: "san-jose", providerCount: 89 },
      { city: "Oakland", slug: "oakland", providerCount: 67 },
      { city: "Sacramento", slug: "sacramento", providerCount: 78 },
      { city: "Fresno", slug: "fresno", providerCount: 45 },
      { city: "Long Beach", slug: "long-beach", providerCount: 54 },
    ],
    ny: [
      { city: "New York City", slug: "new-york-city", providerCount: 523 },
      { city: "Buffalo", slug: "buffalo", providerCount: 67 },
      { city: "Rochester", slug: "rochester", providerCount: 45 },
      { city: "Albany", slug: "albany", providerCount: 34 },
    ],
    tx: [
      { city: "Houston", slug: "houston", providerCount: 289 },
      { city: "Dallas", slug: "dallas", providerCount: 234 },
      { city: "Austin", slug: "austin", providerCount: 156 },
      { city: "San Antonio", slug: "san-antonio", providerCount: 123 },
    ],
  };
  return mockCities[stateCode.toLowerCase()] || [];
};

interface PageProps {
  params: Promise<{ state: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { state } = await params;
  const stateName = stateNames[state.toLowerCase()] || state.toUpperCase();

  return {
    title: `Chiropractors in ${stateName} | ChiroFind`,
    description: `Find top-rated chiropractors in ${stateName}. Browse by city, read reviews, and book appointments online. Discover chiropractic care near you.`,
    openGraph: {
      title: `Chiropractors in ${stateName} | ChiroFind`,
      description: `Find top-rated chiropractors in ${stateName}. Browse by city, read reviews, and book appointments online.`,
    },
  };
}

export default async function StatePage({ params }: PageProps) {
  const { state } = await params;
  const stateCode = state.toLowerCase();
  const stateName = stateNames[stateCode] || state.toUpperCase();
  const cities = getCitiesForState(stateCode);
  const totalProviders = cities.reduce((sum, city) => sum + city.providerCount, 0);

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
              <span className="text-secondary">{stateName}</span>
            </nav>

            <h1 className="text-3xl md:text-4xl font-serif font-bold text-secondary mb-4">
              Chiropractors in {stateName}
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl">
              Find trusted chiropractors across {stateName}. Browse by city to
              discover local chiropractic care, read patient reviews, and book
              your appointment online.
            </p>

            <div className="flex items-center gap-6 mt-6 text-sm">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                <span className="font-semibold">{totalProviders}</span>
                <span className="text-muted-foreground">Chiropractors</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                <span className="font-semibold">{cities.length}</span>
                <span className="text-muted-foreground">Cities</span>
              </div>
            </div>
          </div>
        </section>

        {/* Cities Grid */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-serif font-bold text-secondary mb-8">
              Browse by City
            </h2>

            {cities.length > 0 ? (
              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {cities.map((city) => (
                  <Link
                    key={city.slug}
                    href={`/chiropractors/${stateCode}/${city.slug}`}
                  >
                    <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                      <CardContent className="p-5">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-secondary">
                              {city.city}
                            </h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              {city.providerCount} chiropractors
                            </p>
                          </div>
                          <MapPin className="w-5 h-5 text-primary" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  No cities found for this state. Check back soon as we expand
                  our coverage.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* SEO Content */}
        <section className="py-12 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-serif font-bold text-secondary mb-6">
              About Chiropractic Care in {stateName}
            </h2>
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p>
                Chiropractic care is a popular healthcare choice for residents
                of {stateName}, with licensed chiropractors available in cities
                and towns throughout the state. Whether you&apos;re dealing with
                back pain, neck discomfort, sports injuries, or seeking
                preventive wellness care, {stateName}&apos;s chiropractors offer
                a range of treatments tailored to your needs.
              </p>
              <p>
                Our directory makes it easy to find and compare chiropractors
                near you. Browse by city, read verified patient reviews, and
                book your appointment online. Many chiropractors in {stateName}{" "}
                accept major insurance plans and offer flexible scheduling
                options.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
