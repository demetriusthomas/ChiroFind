import { Suspense } from "react";
import { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SearchResults } from "@/components/search/SearchResults";

export const metadata: Metadata = {
  title: "Find Chiropractors Near You | ChiroFind",
  description:
    "Search for chiropractors by location, specialty, and availability. Read reviews and book appointments online.",
};

function SearchLoading() {
  return (
    <main className="bg-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl p-6 h-48"></div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

export default function SearchPage() {
  return (
    <>
      <Navbar />
      <Suspense fallback={<SearchLoading />}>
        <SearchResults />
      </Suspense>
      <Footer />
    </>
  );
}
