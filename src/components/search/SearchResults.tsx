"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { SearchFilters } from "@/components/search/SearchFilters";
import {
  ChiropractorCard,
  ChiropractorData,
} from "@/components/search/ChiropractorCard";

// Mock data - will be replaced with real data from database
const mockChiropractors: ChiropractorData[] = [
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
    insuranceAccepted: ["Blue Cross", "Aetna", "United Healthcare", "Cigna"],
    image: null,
    yearsExperience: 12,
  },
  {
    id: "2",
    name: "Dr. Michael Chen",
    title: "DC, DACBSP",
    clinic: "Bay Area Chiropractic & Wellness",
    address: "456 Oak Avenue",
    city: "Oakland",
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
    address: "789 Wellness Blvd",
    city: "San Jose",
    state: "CA",
    rating: 4.9,
    reviewCount: 156,
    specialties: ["Pregnancy Care", "Wellness", "Yoga Therapy"],
    nextAvailable: "Today, 4:30 PM",
    acceptingNew: true,
    insuranceAccepted: ["Aetna", "Cigna", "UnitedHealthcare"],
    image: null,
    yearsExperience: 15,
  },
  {
    id: "4",
    name: "Dr. James Wilson",
    title: "DC, CCEP",
    clinic: "Performance Chiropractic",
    address: "321 Athlete Way",
    city: "Palo Alto",
    state: "CA",
    rating: 4.7,
    reviewCount: 89,
    specialties: ["Sports Medicine", "Extremity Adjusting", "Athletes"],
    nextAvailable: "Wed, 10:00 AM",
    acceptingNew: true,
    insuranceAccepted: ["Blue Cross", "Aetna"],
    image: null,
    yearsExperience: 10,
  },
  {
    id: "5",
    name: "Dr. Lisa Park",
    title: "DC, DICCP",
    clinic: "Family First Chiropractic",
    address: "555 Family Lane",
    city: "Fremont",
    state: "CA",
    rating: 4.8,
    reviewCount: 112,
    specialties: ["Pediatric", "Prenatal", "Family Wellness"],
    nextAvailable: "Tomorrow, 11:00 AM",
    acceptingNew: false,
    insuranceAccepted: ["Blue Shield", "Aetna", "Kaiser", "Medicare"],
    image: null,
    yearsExperience: 18,
  },
];

export function SearchResults() {
  const searchParams = useSearchParams();
  const initialLocation = searchParams.get("location") || "";
  const initialCondition = searchParams.get("condition") || "";

  const [location, setLocation] = useState(initialLocation);
  const [specialty, setSpecialty] = useState(
    initialCondition ? initialCondition.toLowerCase().replace(" ", "-") : "all"
  );
  const [sortBy, setSortBy] = useState("recommended");

  const activeFilters = useMemo(() => {
    const filters: string[] = [];
    if (location) filters.push(location);
    if (specialty && specialty !== "all") {
      const specialtyLabel = specialty
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
      filters.push(specialtyLabel);
    }
    return filters;
  }, [location, specialty]);

  const handleRemoveFilter = (filter: string) => {
    if (filter === location) {
      setLocation("");
    } else {
      setSpecialty("all");
    }
  };

  const handleClearAll = () => {
    setLocation("");
    setSpecialty("all");
  };

  // Filter and sort results
  const filteredResults = useMemo(() => {
    let results = [...mockChiropractors];

    // Filter by specialty
    if (specialty && specialty !== "all") {
      const searchTerm = specialty.replace("-", " ").toLowerCase();
      results = results.filter((c) =>
        c.specialties.some((s) => s.toLowerCase().includes(searchTerm))
      );
    }

    // Sort
    switch (sortBy) {
      case "rating":
        results.sort((a, b) => b.rating - a.rating);
        break;
      case "reviews":
        results.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      default:
        // Keep default order for "recommended"
        break;
    }

    return results;
  }, [specialty, sortBy]);

  return (
    <>
      <SearchFilters
        location={location}
        onLocationChange={setLocation}
        specialty={specialty}
        onSpecialtyChange={setSpecialty}
        sortBy={sortBy}
        onSortChange={setSortBy}
        activeFilters={activeFilters}
        onRemoveFilter={handleRemoveFilter}
        onClearAll={handleClearAll}
      />

      <main className="bg-cream min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Results Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-serif font-bold text-secondary">
              {filteredResults.length} Chiropractors Found
              {location && ` near ${location}`}
            </h1>
            <p className="text-muted-foreground mt-1">
              Find the perfect chiropractor for your needs
            </p>
          </div>

          {/* Results List */}
          <div className="space-y-4">
            {filteredResults.map((chiropractor) => (
              <ChiropractorCard key={chiropractor.id} chiropractor={chiropractor} />
            ))}
          </div>

          {/* No Results */}
          {filteredResults.length === 0 && (
            <div className="text-center py-16">
              <p className="text-xl text-muted-foreground mb-4">
                No chiropractors found matching your criteria.
              </p>
              <button
                onClick={handleClearAll}
                className="text-primary hover:underline"
              >
                Clear filters and try again
              </button>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
