import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Clock, ArrowRight } from "lucide-react";

// Mock data - will be replaced with real data from database
const featuredProviders = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    title: "DC, CCSP",
    clinic: "Elite Spine & Wellness",
    location: "San Francisco, CA",
    rating: 4.9,
    reviewCount: 127,
    specialties: ["Sports Injury", "Back Pain"],
    nextAvailable: "Today",
    image: null,
  },
  {
    id: "2",
    name: "Dr. Michael Chen",
    title: "DC, DACBSP",
    clinic: "Bay Area Chiropractic",
    location: "Oakland, CA",
    rating: 4.8,
    reviewCount: 98,
    specialties: ["Pediatric", "Family Care"],
    nextAvailable: "Tomorrow",
    image: null,
  },
  {
    id: "3",
    name: "Dr. Emily Rodriguez",
    title: "DC, RYT",
    clinic: "Holistic Spine Center",
    location: "San Jose, CA",
    rating: 4.9,
    reviewCount: 156,
    specialties: ["Pregnancy", "Wellness"],
    nextAvailable: "Today",
    image: null,
  },
];

export function FeaturedChiropractors() {
  return (
    <section className="py-16 lg:py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-secondary mb-4">
              Top-Rated Chiropractors
            </h2>
            <p className="text-lg text-muted-foreground">
              Trusted by thousands of patients for exceptional care.
            </p>
          </div>
          <Button variant="outline" asChild className="hidden md:flex">
            <Link href="/search">
              View All
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProviders.map((provider) => (
            <Card key={provider.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex gap-4 mb-4">
                  {/* Avatar placeholder */}
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-bold text-lg">
                      {provider.name.split(" ").map((n) => n[0]).join("")}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-secondary truncate">
                      {provider.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{provider.title}</p>
                    <p className="text-sm text-muted-foreground truncate">
                      {provider.clinic}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-primary text-primary" />
                    <span className="font-medium">{provider.rating}</span>
                    <span className="text-muted-foreground">
                      ({provider.reviewCount})
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{provider.location}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {provider.specialties.map((specialty) => (
                    <Badge key={specialty} variant="secondary">
                      {specialty}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-sm text-green-600">
                    <Clock className="w-4 h-4" />
                    <span>Available {provider.nextAvailable}</span>
                  </div>
                  <Button size="sm" asChild>
                    <Link href={`/chiropractor/${provider.id}`}>Book Now</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Button variant="outline" asChild>
            <Link href="/search">
              View All Chiropractors
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
