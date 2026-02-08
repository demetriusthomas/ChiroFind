import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Clock, Phone, CheckCircle } from "lucide-react";

export interface ChiropractorData {
  id: string;
  name: string;
  title: string;
  clinic: string;
  address: string;
  city: string;
  state: string;
  rating: number;
  reviewCount: number;
  specialties: string[];
  nextAvailable: string;
  acceptingNew: boolean;
  insuranceAccepted: string[];
  image: string | null;
  yearsExperience: number;
}

interface ChiropractorCardProps {
  chiropractor: ChiropractorData;
}

export function ChiropractorCard({ chiropractor }: ChiropractorCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <div className="w-24 h-24 rounded-xl bg-primary/10 flex items-center justify-center">
              <span className="text-primary font-bold text-2xl">
                {chiropractor.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </span>
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div>
                <Link
                  href={`/chiropractor/${chiropractor.id}`}
                  className="hover:underline"
                >
                  <h3 className="text-xl font-semibold text-secondary">
                    {chiropractor.name}
                  </h3>
                </Link>
                <p className="text-muted-foreground">{chiropractor.title}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {chiropractor.clinic}
                </p>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 bg-primary/10 px-3 py-1 rounded-full">
                  <Star className="w-4 h-4 fill-primary text-primary" />
                  <span className="font-semibold">{chiropractor.rating}</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  ({chiropractor.reviewCount} reviews)
                </span>
              </div>
            </div>

            {/* Details */}
            <div className="mt-4 flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-1 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>
                  {chiropractor.city}, {chiropractor.state}
                </span>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>{chiropractor.yearsExperience} years experience</span>
              </div>
              {chiropractor.acceptingNew && (
                <div className="flex items-center gap-1 text-green-600">
                  <CheckCircle className="w-4 h-4" />
                  <span>Accepting new patients</span>
                </div>
              )}
            </div>

            {/* Specialties */}
            <div className="mt-4 flex flex-wrap gap-2">
              {chiropractor.specialties.map((specialty) => (
                <Badge key={specialty} variant="secondary">
                  {specialty}
                </Badge>
              ))}
            </div>

            {/* Insurance */}
            {chiropractor.insuranceAccepted.length > 0 && (
              <p className="mt-3 text-sm text-muted-foreground">
                Insurance: {chiropractor.insuranceAccepted.slice(0, 3).join(", ")}
                {chiropractor.insuranceAccepted.length > 3 && (
                  <span> +{chiropractor.insuranceAccepted.length - 3} more</span>
                )}
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3 md:w-40">
            <div className="text-center md:text-right">
              <p className="text-sm text-muted-foreground">Next Available</p>
              <p className="font-semibold text-green-600">
                {chiropractor.nextAvailable}
              </p>
            </div>
            <Button asChild>
              <Link href={`/chiropractor/${chiropractor.id}`}>View Profile</Link>
            </Button>
            <Button variant="outline" size="sm">
              <Phone className="w-4 h-4 mr-2" />
              Call
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
