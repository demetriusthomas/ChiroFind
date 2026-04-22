"use client";

import { useState, useMemo, useEffect } from "react";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { SearchFilters } from "@/components/search/SearchFilters";
import {
  ChiropractorCard,
  ChiropractorData,
} from "@/components/search/ChiropractorCard";
import { Button } from "@/components/ui/button";
import { List, Map, X, Loader2 } from "lucide-react";

// Dynamically import map to avoid SSR issues with Leaflet
const SearchMap = dynamic(
  () => import("@/components/search/SearchMap").then((mod) => mod.SearchMap),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full min-h-[400px] bg-muted rounded-xl flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading map...</div>
      </div>
    ),
  }
);

// Extended type with coordinates
type ChiropractorWithCoords = ChiropractorData & { lat: number; lng: number };

export function SearchResults() {
  const searchParams = useSearchParams();
  const initialLocation = searchParams.get("location") || "";
  const initialCondition = searchParams.get("condition") || "";

  const [location, setLocation] = useState(initialLocation);
  const [specialty, setSpecialty] = useState(
    initialCondition ? initialCondition.toLowerCase().replace(" ", "-") : "all"
  );
  const [sortBy, setSortBy] = useState("recommended");
  const [viewMode, setViewMode] = useState<"list" | "map" | "split">("split");
  const [selectedChiroId, setSelectedChiroId] = useState<string | null>(null);
  const [hoveredChiroId, setHoveredChiroId] = useState<string | null>(null);
  const [chiropractors, setChiropractors] = useState<ChiropractorWithCoords[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch providers from API
  useEffect(() => {
    async function fetchProviders() {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (specialty && specialty !== "all") params.set("specialty", specialty);
        if (sortBy) params.set("sortBy", sortBy);

        const response = await fetch(`/api/providers?${params.toString()}`);
        const data = await response.json();
        setChiropractors(data);
      } catch (error) {
        console.error("Error fetching providers:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProviders();
  }, [specialty, sortBy]);

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

  const filteredResults = chiropractors;

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
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Results Header with View Toggle */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-serif font-bold text-secondary">
                {loading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Searching...
                  </span>
                ) : (
                  <>
                    {filteredResults.length} Chiropractors Found
                    {location && ` near ${location}`}
                  </>
                )}
              </h1>
              <p className="text-muted-foreground mt-1">
                Find the perfect chiropractor for your needs
              </p>
            </div>

            {/* View Toggle */}
            <div className="flex items-center gap-1 bg-white rounded-lg p-1 border shadow-sm">
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="gap-2"
              >
                <List className="w-4 h-4" />
                <span className="hidden sm:inline">List</span>
              </Button>
              <Button
                variant={viewMode === "split" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("split")}
                className="gap-2"
              >
                <div className="flex gap-0.5">
                  <div className="w-2 h-4 bg-current rounded-sm" />
                  <div className="w-2 h-4 bg-current rounded-sm opacity-50" />
                </div>
                <span className="hidden sm:inline">Split</span>
              </Button>
              <Button
                variant={viewMode === "map" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("map")}
                className="gap-2"
              >
                <Map className="w-4 h-4" />
                <span className="hidden sm:inline">Map</span>
              </Button>
            </div>
          </div>

          {/* Content Area */}
          <div className={`flex gap-6 ${viewMode === "split" ? "flex-col lg:flex-row" : ""}`}>
            {/* Results List */}
            {(viewMode === "list" || viewMode === "split") && (
              <div className={`${viewMode === "split" ? "lg:w-1/2 xl:w-3/5" : "w-full"} space-y-4`}>
                {filteredResults.length > 0 ? (
                  filteredResults.map((chiropractor) => (
                    <div
                      key={chiropractor.id}
                      onMouseEnter={() => setHoveredChiroId(chiropractor.id)}
                      onMouseLeave={() => setHoveredChiroId(null)}
                      onClick={() => setSelectedChiroId(chiropractor.id)}
                      className={`cursor-pointer transition-all ${
                        selectedChiroId === chiropractor.id ? "ring-2 ring-primary rounded-xl" : ""
                      } ${hoveredChiroId === chiropractor.id ? "scale-[1.01]" : ""}`}
                    >
                      <ChiropractorCard chiropractor={chiropractor} />
                    </div>
                  ))
                ) : (
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
            )}

            {/* Map */}
            {(viewMode === "map" || viewMode === "split") && (
              <div
                className={`${
                  viewMode === "split"
                    ? "lg:w-1/2 xl:w-2/5 h-[500px] lg:h-[calc(100vh-220px)] lg:sticky lg:top-6"
                    : "w-full h-[600px]"
                }`}
              >
                <div className="relative h-full">
                  <SearchMap
                    chiropractors={filteredResults}
                    selectedId={selectedChiroId || hoveredChiroId}
                    onMarkerClick={(id) => {
                      setSelectedChiroId(id);
                      // Scroll to card in list view
                      if (viewMode === "split") {
                        const element = document.getElementById(`chiro-${id}`);
                        element?.scrollIntoView({ behavior: "smooth", block: "center" });
                      }
                    }}
                  />

                  {/* Close button for mobile map view */}
                  {viewMode === "map" && (
                    <Button
                      variant="secondary"
                      size="sm"
                      className="absolute top-4 right-4 shadow-lg"
                      onClick={() => setViewMode("list")}
                    >
                      <X className="w-4 h-4 mr-1" />
                      Close Map
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
