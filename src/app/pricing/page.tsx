"use client";

import { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

const tiers = [
  {
    name: "Starter",
    price: "Free",
    description: "Get discovered",
    highlight: false,
    features: [
      "Basic profile listing",
      "City & state search visibility",
      "Up to 5 patient reviews shown",
      "Standard search placement",
      "Basic contact info display",
    ],
    cta: "Claim Your Listing",
    ctaVariant: "outline" as const,
  },
  {
    name: "Professional",
    price: "$199",
    period: "/month",
    description: "Grow your practice",
    highlight: true,
    badge: "MOST POPULAR",
    features: [
      "Everything in Starter",
      "Featured search placement",
      "Unlimited patient reviews",
      "Online booking integration",
      "Reputation management tools",
      "Monthly performance reports",
      "Insurance verification badge",
      "Priority support",
    ],
    cta: "Start Growing",
    ctaVariant: "default" as const,
  },
  {
    name: "Enterprise",
    price: "$399",
    period: "/month",
    description: "Dominate your market",
    highlight: false,
    features: [
      "Everything in Professional",
      "#1 placement in your area",
      "AI-powered patient matching",
      "Automated follow-up campaigns",
      "Advanced analytics dashboard",
      "Multi-location management",
      "Dedicated account manager",
      "Custom landing pages",
      "Social media integration",
    ],
    cta: "Contact Sales",
    ctaVariant: "outline" as const,
  },
];

const roiStats = [
  {
    value: "34",
    label: "Avg. new patients per month",
    sublabel: "via ChiroFind",
  },
  {
    value: "$2,400",
    label: "Avg. lifetime patient value",
    sublabel: "industry average",
  },
  {
    value: "$28,000+",
    label: "Monthly revenue generated",
    sublabel: "from ChiroFind patients",
  },
];

export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annual">("monthly");

  return (
    <>
      <Navbar />
      <main className="bg-cream min-h-screen">
        {/* Hero */}
        <section className="text-center py-20 px-4">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
            Pricing Plans
          </Badge>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-secondary mb-4">
            Invest in Your <span className="text-primary italic">Growth</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Every plan pays for itself. Our average provider earns $28K in new
            patient revenue per month through ChiroFind.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <span
              className={`text-sm font-medium cursor-pointer ${
                billingPeriod === "monthly" ? "text-secondary" : "text-muted-foreground"
              }`}
              onClick={() => setBillingPeriod("monthly")}
            >
              Monthly
            </span>
            <button
              onClick={() =>
                setBillingPeriod(billingPeriod === "monthly" ? "annual" : "monthly")
              }
              className={`relative w-14 h-7 rounded-full transition-colors ${
                billingPeriod === "annual" ? "bg-primary" : "bg-gray-300"
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-6 h-6 rounded-full bg-white shadow-md transition-transform duration-200 ${
                  billingPeriod === "annual" ? "translate-x-7" : "translate-x-0"
                }`}
              />
            </button>
            <span
              className={`text-sm font-medium cursor-pointer ${
                billingPeriod === "annual" ? "text-secondary" : "text-muted-foreground"
              }`}
              onClick={() => setBillingPeriod("annual")}
            >
              Annual <span className="text-primary font-semibold">(Save 20%)</span>
            </span>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="max-w-6xl mx-auto px-4 pb-24">
          <div className="grid md:grid-cols-3 gap-6">
            {tiers.map((tier) => {
              const displayPrice =
                tier.price === "Free"
                  ? "Free"
                  : billingPeriod === "annual"
                  ? `$${Math.round(parseInt(tier.price.replace("$", "")) * 0.8)}`
                  : tier.price;

              return (
                <Card
                  key={tier.name}
                  className={`relative flex flex-col transition-all hover:-translate-y-1 ${
                    tier.highlight
                      ? "border-2 border-primary scale-[1.02] shadow-xl"
                      : "border-border shadow-md hover:shadow-xl"
                  }`}
                >
                  {tier.badge && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge className="bg-gradient-to-r from-primary to-[#a8863c] text-white border-0 px-4 shadow-lg">
                        {tier.badge}
                      </Badge>
                    </div>
                  )}
                  <CardContent className="p-8 pt-10 flex flex-col flex-1">
                    <div className="mb-8">
                      <h3 className="text-2xl font-serif font-bold text-secondary mb-2">
                        {tier.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {tier.description}
                      </p>
                      <div className="mt-5">
                        <span className="text-5xl font-serif font-bold text-secondary">
                          {displayPrice}
                        </span>
                        {tier.period && (
                          <span className="text-muted-foreground">
                            {billingPeriod === "annual" ? "/month" : tier.period}
                          </span>
                        )}
                      </div>
                      {billingPeriod === "annual" && tier.price !== "Free" && (
                        <p className="text-xs text-muted-foreground mt-1">
                          Billed annually (
                          ${Math.round(parseInt(tier.price.replace("$", "")) * 0.8 * 12)}
                          /year)
                        </p>
                      )}
                    </div>

                    <div className="space-y-3 flex-1">
                      {tier.features.map((feature) => (
                        <div key={feature} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-muted-foreground">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-8">
                      <Button
                        className={`w-full shadow-md hover:shadow-lg transition-shadow ${
                          tier.highlight
                            ? "bg-gradient-to-r from-primary to-[#a8863c] hover:opacity-90 shadow-primary/25"
                            : ""
                        }`}
                        variant={tier.ctaVariant}
                        size="lg"
                        asChild
                      >
                        <Link href="/signup">{tier.cta}</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* ROI Calculator - "The Math is Simple" */}
        <section className="max-w-4xl mx-auto px-4 pb-24">
          <div className="bg-secondary rounded-3xl p-12 md:p-16 text-center relative overflow-hidden">
            {/* Decorative orb */}
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-primary/10 blur-3xl" />

            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4 relative">
              The Math is <span className="text-primary italic">Simple</span>
            </h2>
            <p className="text-gray-400 mb-12 max-w-md mx-auto relative">
              See why 12,000+ chiropractors choose ChiroFind to grow their
              practices.
            </p>

            <div className="grid md:grid-cols-3 gap-8 mb-12 relative">
              {roiStats.map((stat) => (
                <div key={stat.label} className="p-6">
                  <div className="text-4xl md:text-5xl font-serif font-bold text-primary mb-3">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-300 mb-1">{stat.label}</div>
                  <div className="text-xs text-gray-500">{stat.sublabel}</div>
                </div>
              ))}
            </div>

            <div className="inline-block bg-primary/10 border border-primary/20 rounded-2xl px-8 py-4 relative">
              <span className="text-gray-300">
                That's a{" "}
                <span className="text-primary font-bold text-xl">140x return</span>{" "}
                on your $199/mo Professional plan
              </span>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-3xl mx-auto px-4 pb-24">
          <h2 className="text-3xl font-serif font-bold text-secondary text-center mb-12">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {[
              {
                q: "Can I try the Professional features before committing?",
                a: "Yes! We offer a 14-day free trial of Professional with no credit card required. Experience the full power of ChiroFind risk-free.",
              },
              {
                q: "How quickly will I see results?",
                a: "Most providers see their first booking requests within the first week. On average, Professional members receive 8-15 new patient inquiries per month.",
              },
              {
                q: "Can I cancel anytime?",
                a: "Absolutely. There are no long-term contracts. You can upgrade, downgrade, or cancel your subscription at any time.",
              },
              {
                q: "What payment methods do you accept?",
                a: "We accept all major credit cards (Visa, Mastercard, American Express), ACH bank transfers, and can invoice for Enterprise accounts.",
              },
              {
                q: "Is there a setup fee?",
                a: "No setup fees, ever. You only pay your monthly or annual subscription. We'll even help you set up your profile for free.",
              },
            ].map((faq, i) => (
              <Card key={i} className="p-6">
                <h3 className="font-semibold text-secondary mb-2">{faq.q}</h3>
                <p className="text-sm text-muted-foreground">{faq.a}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-secondary py-20">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">
              Ready to Grow Your Practice?
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Join 12,000+ chiropractors who trust ChiroFind to connect them with
              new patients.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-[#a8863c]"
                asChild
              >
                <Link href="/signup">Start Free Trial</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-secondary"
                asChild
              >
                <Link href="/contact">Talk to Sales</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
