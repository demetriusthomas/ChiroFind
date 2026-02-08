import { Search, Calendar, Heart } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Search",
    description:
      "Enter your location and symptoms to find chiropractors who specialize in your needs.",
  },
  {
    icon: Calendar,
    title: "Book",
    description:
      "Compare profiles, read reviews, and book your appointment online in just a few clicks.",
  },
  {
    icon: Heart,
    title: "Feel Better",
    description:
      "Get personalized care from a qualified chiropractor and start your journey to wellness.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-secondary mb-4">
            How ChiroFind Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Finding the right chiropractor has never been easier. Get started in
            three simple steps.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div key={step.title} className="text-center">
              <div className="relative mb-6">
                <div className="w-20 h-20 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                  <step.icon className="w-8 h-8 text-primary" />
                </div>
                <div className="absolute -top-2 -right-2 md:right-1/4 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {index + 1}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-secondary mb-3">
                {step.title}
              </h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
