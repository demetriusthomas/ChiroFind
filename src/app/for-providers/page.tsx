import Link from "next/link";
import { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Check,
  ArrowRight,
  Users,
  TrendingUp,
  Calendar,
  Star,
  Shield,
  BarChart3,
  Clock,
  DollarSign,
} from "lucide-react";

export const metadata: Metadata = {
  title: "For Providers | List Your Practice on ChiroFind",
  description:
    "Grow your chiropractic practice with ChiroFind. Get discovered by patients, manage bookings, and track your ROI.",
};

const benefits = [
  {
    icon: Users,
    title: "Get Discovered",
    description:
      "Reach thousands of patients actively searching for chiropractic care in your area.",
  },
  {
    icon: Calendar,
    title: "Easy Booking",
    description:
      "Let patients book appointments directly from your profile. No phone tag required.",
  },
  {
    icon: Star,
    title: "Build Reputation",
    description:
      "Collect and showcase verified patient reviews to build trust and credibility.",
  },
  {
    icon: BarChart3,
    title: "Track Performance",
    description:
      "See exactly how many views, inquiries, and bookings your profile generates.",
  },
  {
    icon: Shield,
    title: "Verified Badge",
    description:
      "Stand out with a verified provider badge that patients trust.",
  },
  {
    icon: Clock,
    title: "Save Time",
    description:
      "Spend less time on marketing and more time treating patients.",
  },
];

const stats = [
  { value: "12,000+", label: "Chiropractors" },
  { value: "500K+", label: "Monthly Searches" },
  { value: "34", label: "Avg. New Patients/Mo" },
  { value: "4.8", label: "Provider Rating" },
];

const testimonials = [
  {
    quote:
      "ChiroFind has been a game-changer for my practice. I've seen a 40% increase in new patient bookings since joining.",
    author: "Dr. Sarah Mitchell",
    practice: "Align Wellness Center",
    location: "Austin, TX",
  },
  {
    quote:
      "The analytics dashboard alone is worth the subscription. I can see exactly where my patients are coming from.",
    author: "Dr. Michael Chen",
    practice: "Bay Area Chiropractic",
    location: "Oakland, CA",
  },
  {
    quote:
      "I was skeptical at first, but the ROI speaks for itself. Best marketing investment I've made.",
    author: "Dr. Emily Rodriguez",
    practice: "Holistic Spine Center",
    location: "San Jose, CA",
  },
];

export default function ForProvidersPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-secondary py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">
                  For Chiropractors
                </Badge>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6">
                  Grow Your Practice with{" "}
                  <span className="text-primary">ChiroFind</span>
                </h1>
                <p className="text-xl text-gray-400 mb-8 max-w-lg">
                  Join 12,000+ chiropractors who use ChiroFind to attract new
                  patients, manage bookings, and grow their practice.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-secondary font-semibold"
                    asChild
                  >
                    <Link href="/signup?type=provider">
                      List Your Practice
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Link>
                  </Button>
                  <Button
                    size="lg"
                    className="bg-white text-secondary font-semibold hover:bg-white/90"
                    asChild
                  >
                    <Link href="/pricing">View Pricing</Link>
                  </Button>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6 text-center"
                  >
                    <p className="text-4xl font-serif font-bold text-primary mb-2">
                      {stat.value}
                    </p>
                    <p className="text-gray-400">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-20 bg-cream">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-secondary mb-4">
                Everything You Need to{" "}
                <span className="text-primary italic">Succeed</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                ChiroFind gives you the tools to attract new patients, manage
                your online presence, and track your growth.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit) => {
                const Icon = benefit.icon;
                return (
                  <Card key={benefit.title} className="border-0 shadow-md">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold text-secondary mb-2">
                        {benefit.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {benefit.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-secondary mb-4">
                How It Works
              </h2>
              <p className="text-lg text-muted-foreground">
                Get started in minutes, not days
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: "1",
                  title: "Create Your Profile",
                  description:
                    "Sign up and build your professional profile with your services, specialties, and availability.",
                },
                {
                  step: "2",
                  title: "Get Discovered",
                  description:
                    "Patients find you through search, specialty pages, and location-based results.",
                },
                {
                  step: "3",
                  title: "Grow Your Practice",
                  description:
                    "Receive booking requests, collect reviews, and track your performance.",
                },
              ].map((item) => (
                <div key={item.step} className="text-center">
                  <div className="w-16 h-16 bg-primary text-secondary rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold text-secondary mb-3">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-cream">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-secondary mb-4">
                Trusted by Top Chiropractors
              </h2>
              <p className="text-lg text-muted-foreground">
                See what providers are saying about ChiroFind
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, i) => (
                <Card key={i} className="border-0 shadow-md">
                  <CardContent className="p-6">
                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 fill-primary text-primary"
                        />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-6 italic">
                      "{testimonial.quote}"
                    </p>
                    <div>
                      <p className="font-semibold text-secondary">
                        {testimonial.author}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.practice}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.location}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* ROI Section */}
        <section className="py-20 bg-secondary">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">
              The ROI Speaks for Itself
            </h2>
            <p className="text-xl text-gray-400 mb-12">
              Our average provider earns $28,000 in new patient revenue per
              month through ChiroFind.
            </p>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <DollarSign className="w-8 h-8 text-primary mx-auto mb-3" />
                <p className="text-3xl font-bold text-white mb-1">$199</p>
                <p className="text-gray-400">Monthly Investment</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <TrendingUp className="w-8 h-8 text-primary mx-auto mb-3" />
                <p className="text-3xl font-bold text-white mb-1">$28,000</p>
                <p className="text-gray-400">Avg. Monthly Revenue</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <BarChart3 className="w-8 h-8 text-primary mx-auto mb-3" />
                <p className="text-3xl font-bold text-primary mb-1">140x</p>
                <p className="text-gray-400">Return on Investment</p>
              </div>
            </div>

            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-secondary font-semibold"
              asChild
            >
              <Link href="/signup?type=provider">
                Start Your Free Trial
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <p className="text-gray-500 mt-4 text-sm">
              14-day free trial. No credit card required.
            </p>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 bg-cream">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-secondary mb-6">
              Ready to Grow Your Practice?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of chiropractors who trust ChiroFind to connect
              them with new patients.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-secondary font-semibold"
                asChild
              >
                <Link href="/signup?type=provider">
                  List Your Practice
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/pricing">Compare Plans</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
