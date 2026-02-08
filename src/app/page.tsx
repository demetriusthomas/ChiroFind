import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { SymptomMatcher } from "@/components/home/SymptomMatcher";
import { FeaturedChiropractors } from "@/components/home/FeaturedChiropractors";
import { HowItWorks } from "@/components/home/HowItWorks";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <SymptomMatcher />
        <FeaturedChiropractors />
        <HowItWorks />
      </main>
      <Footer />
    </>
  );
}
