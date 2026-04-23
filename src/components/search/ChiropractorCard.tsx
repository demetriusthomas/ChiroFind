import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Clock, Phone, CheckCircle, Shield, Zap, Award, MessageCircle } from "lucide-react";

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
  techniques?: string[];
  nextAvailable: string;
  acceptingNew: boolean;
  insuranceAccepted: string[];
  image: string | null;
  yearsExperience: number;
  verified?: boolean;
  featured?: boolean;
  responseTime?: string;
  consultationType?: ("in-person" | "virtual")[];
}

interface ChiropractorCardProps {
  chiropractor: ChiropractorData;
}

export function ChiropractorCard({ chiropractor }: ChiropractorCardProps) {
  return (
    <Card className={`hover:shadow-lg transition-shadow relative ${chiropractor.featured ? 'ring-2 ring-primary/50' : ''}`}>
      {/* Featured Badge */}
      {chiropractor.featured && (
        <div className="absolute -top-3 left-6">
          <Badge className="bg-gradient-to-r from-primary to-[#a8863c] text-white border-0 shadow-md">
            <Award className="w-3 h-3 mr-1" />
            Featured
          </Badge>
        </div>
      )}

      <CardContent className={`p-6 ${chiropractor.featured ? 'pt-8' : ''}`}>
        <div className="flex flex-col md:flex-row gap-6">
          {/* Avatar */}
          <div className="flex-shrink-0 relative">
            <div className="w-24 h-24 rounded-xl bg-primary/10 flex items-center justify-center">
              <span className="text-primary font-bold text-2xl">
                {chiropractor.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </span>
            </div>
            {/* Verified Badge */}
            {chiropractor.verified && (
              <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1" title="Verified Provider">
                <Shield className="w-4 h-4 text-white" />
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <Link
                    href={`/chiropractor/${chiropractor.id}`}
                    className="hover:underline"
                  >
                    <h3 className="text-xl font-semibold text-secondary">
                      {chiropractor.name}
                    </h3>
                  </Link>
                  {chiropractor.verified && (
                    <span className="text-xs text-blue-600 font-medium">Verified</span>
                  )}
                </div>
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
              {chiropractor.responseTime && (
                <div className="flex items-center gap-1 text-blue-600">
                  <MessageCircle className="w-4 h-4" />
                  <span>Responds {chiropractor.responseTime}</span>
                </div>
              )}
              {chiropractor.acceptingNew && (
                <div className="flex items-center gap-1 text-green-600">
                  <CheckCircle className="w-4 h-4" />
                  <span>Accepting new patients</span>
                </div>
              )}
            </div>

            {/* Consultation Types */}
            {chiropractor.consultationType && chiropractor.consultationType.length > 0 && (
              <div className="mt-3 flex items-center gap-2">
                {chiropractor.consultationType.includes("in-person") && (
                  <Badge variant="outline" className="text-xs">
                    In-Person
                  </Badge>
                )}
                {chiropractor.consultationType.includes("virtual") && (
                  <Badge variant="outline" className="text-xs border-purple-300 text-purple-600">
                    <Zap className="w-3 h-3 mr-1" />
                    Virtual Available
                  </Badge>
                )}
              </div>
            )}

            {/* Specialties */}
            <div className="mt-3 flex flex-wrap gap-2">
              {chiropractor.specialties.map((specialty) => (
                <Badge key={specialty} variant="secondary">
                  {specialty}
                </Badge>
              ))}
            </div>

            {/* Techniques */}
            {chiropractor.techniques && chiropractor.techniques.length > 0 && (
              <p className="mt-3 text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Techniques:</span>{" "}
                {chiropractor.techniques.slice(0, 3).join(", ")}
                {chiropractor.techniques.length > 3 && (
                  <span className="text-primary"> +{chiropractor.techniques.length - 3} more</span>
                )}
              </p>
            )}

            {/* Insurance */}
            {chiropractor.insuranceAccepted.length > 0 && (
              <p className="mt-2 text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Insurance:</span>{" "}
                {chiropractor.insuranceAccepted.slice(0, 3).join(", ")}
                {chiropractor.insuranceAccepted.length > 3 && (
                  <span> +{chiropractor.insuranceAccepted.length - 3} more</span>
                )}
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-row md:flex-col gap-3 md:w-44 mt-4 md:mt-0 pt-4 md:pt-0 border-t md:border-t-0 border-border">
            <div className="hidden md:block text-right">
              <p className="text-sm text-muted-foreground">Next Available</p>
              <p className="font-semibold text-green-600">
                {chiropractor.nextAvailable}
              </p>
            </div>
            {/* Mobile: Next Available inline */}
            <div className="md:hidden flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">Next:</span>
              <span className="font-semibold text-green-600">{chiropractor.nextAvailable}</span>
            </div>
            <div className="flex flex-row md:flex-col gap-2 flex-1 md:flex-none">
              <Button asChild className={`flex-1 md:flex-none h-11 ${chiropractor.featured ? "bg-gradient-to-r from-primary to-[#a8863c]" : ""}`}>
                <Link href={`/chiropractor/${chiropractor.id}`}>View Profile</Link>
              </Button>
              <Button variant="outline" className="h-11 px-4 md:w-full">
                <Phone className="w-4 h-4 md:mr-2" />
                <span className="hidden md:inline">Call</span>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
