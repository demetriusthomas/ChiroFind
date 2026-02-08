"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin, SlidersHorizontal, X } from "lucide-react";

interface SearchFiltersProps {
  location: string;
  onLocationChange: (value: string) => void;
  specialty: string;
  onSpecialtyChange: (value: string) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
  activeFilters: string[];
  onRemoveFilter: (filter: string) => void;
  onClearAll: () => void;
}

const specialties = [
  { value: "all", label: "All Specialties" },
  { value: "back-pain", label: "Back Pain" },
  { value: "neck-pain", label: "Neck Pain" },
  { value: "sports-injury", label: "Sports Injury" },
  { value: "pediatric", label: "Pediatric" },
  { value: "pregnancy", label: "Pregnancy Care" },
  { value: "sciatica", label: "Sciatica" },
  { value: "headaches", label: "Headaches" },
];

const sortOptions = [
  { value: "recommended", label: "Recommended" },
  { value: "rating", label: "Highest Rated" },
  { value: "reviews", label: "Most Reviews" },
  { value: "distance", label: "Nearest" },
  { value: "availability", label: "Soonest Available" },
];

export function SearchFilters({
  location,
  onLocationChange,
  specialty,
  onSpecialtyChange,
  sortBy,
  onSortChange,
  activeFilters,
  onRemoveFilter,
  onClearAll,
}: SearchFiltersProps) {
  return (
    <div className="bg-white border-b border-border sticky top-16 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Filter Controls */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* Location */}
          <div className="flex-1 relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="City, state, or zip"
              value={location}
              onChange={(e) => onLocationChange(e.target.value)}
              className="pl-9"
            />
          </div>

          {/* Specialty */}
          <Select value={specialty} onValueChange={onSpecialtyChange}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Specialty" />
            </SelectTrigger>
            <SelectContent>
              {specialties.map((s) => (
                <SelectItem key={s.value} value={s.value}>
                  {s.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Sort */}
          <Select value={sortBy} onValueChange={onSortChange}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button variant="outline" className="md:hidden">
            More Filters
          </Button>
        </div>

        {/* Active Filters */}
        {activeFilters.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mt-4">
            <span className="text-sm text-muted-foreground">Filters:</span>
            {activeFilters.map((filter) => (
              <Badge
                key={filter}
                variant="secondary"
                className="pl-2 pr-1 py-1 flex items-center gap-1"
              >
                {filter}
                <button
                  onClick={() => onRemoveFilter(filter)}
                  className="hover:bg-muted rounded p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
            <button
              onClick={onClearAll}
              className="text-sm text-primary hover:underline"
            >
              Clear all
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
