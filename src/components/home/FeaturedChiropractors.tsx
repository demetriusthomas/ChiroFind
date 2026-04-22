import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Clock, ArrowRight, Shield, Video } from "lucide-react";
import prisma from "@/lib/prisma";

async function getFeaturedProviders() {
  const providers = await prisma.provider.findMany({
    where: {
      isActive: true,
      subscriptionTier: "PREMIUM",
    },
    include: {
      user: true,
      practice: true,
      specialties: {
        include: {
          specialty: true,
        },
      },
      reviews: {
        where: { isApproved: true },
        select: { rating: true },
      },
    },
    take: 3,
  });

  return providers.map((provider) => {
    const avgRating =
      provider.reviews.length > 0
        ? provider.reviews.reduce((sum, r) => sum + r.rating, 0) / provider.reviews.length
        : 0;

    return {
      id: provider.id,
      name: `Dr. ${provider.user.firstName} ${provider.user.lastName}`,
      title: provider.title,
      clinic: provider.practice?.name || "Private Practice",
      location: provider.practice
        ? `${provider.practice.addressCity}, ${provider.practice.addressState}`
        : "",
      rating: Math.round(avgRating * 10) / 10,
      reviewCount: provider.reviews.length,
      specialties: provider.specialties.map((s) => s.specialty.name),
      nextAvailable: "Today",
      image: provider.profileImage,
      verified: !!provider.verifiedAt,
      virtualAvailable: !!provider.videoUrl,
    };
  });
}

export async function FeaturedChiropractors() {
  const featuredProviders = await getFeaturedProviders();
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
            <Card key={provider.id} className="hover:shadow-lg transition-shadow group">
              <CardContent className="p-6">
                <div className="flex gap-4 mb-4">
                  {/* Avatar placeholder */}
                  <div className="relative w-16 h-16 flex-shrink-0">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-bold text-lg">
                        {provider.name.split(" ").map((n) => n[0]).join("")}
                      </span>
                    </div>
                    {provider.verified && (
                      <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1" title="Verified">
                        <Shield className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1">
                      <h3 className="font-semibold text-secondary truncate">
                        {provider.name}
                      </h3>
                    </div>
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
                  {provider.virtualAvailable && (
                    <Badge variant="outline" className="border-purple-300 text-purple-600 text-xs">
                      <Video className="w-3 h-3 mr-1" />
                      Virtual
                    </Badge>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-sm text-green-600">
                    <Clock className="w-4 h-4" />
                    <span>Available {provider.nextAvailable}</span>
                  </div>
                  <Button size="sm" asChild className="group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-[#a8863c]">
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
