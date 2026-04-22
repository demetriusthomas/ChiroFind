"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Check,
  Spine,
  CircleDot,
  Brain,
  Zap,
  Dumbbell,
  PersonStanding,
  Heart,
  Baby,
  type LucideIcon
} from "lucide-react";

interface Symptom {
  id: string;
  label: string;
  icon: LucideIcon;
}

const symptoms: Symptom[] = [
  { id: "back-pain", label: "Back Pain", icon: Spine },
  { id: "neck-pain", label: "Neck Pain", icon: CircleDot },
  { id: "headaches", label: "Headaches", icon: Brain },
  { id: "sciatica", label: "Sciatica", icon: Zap },
  { id: "sports-injury", label: "Sports Injury", icon: Dumbbell },
  { id: "posture", label: "Poor Posture", icon: PersonStanding },
  { id: "pregnancy", label: "Pregnancy Care", icon: Heart },
  { id: "pediatric", label: "Pediatric Care", icon: Baby },
];

export function SymptomMatcher() {
  const router = useRouter();
  const [selected, setSelected] = useState<string[]>([]);

  const toggleSymptom = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const handleFindMatch = () => {
    if (selected.length > 0) {
      const conditions = selected.join(",");
      router.push(`/search?conditions=${conditions}`);
    }
  };

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-secondary mb-4">
            What brings you in today?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Select your symptoms and we&apos;ll match you with chiropractors who
            specialize in treating your specific condition.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-8">
          {symptoms.map((symptom) => (
            <Card
              key={symptom.id}
              className={`cursor-pointer transition-all hover:shadow-md ${
                selected.includes(symptom.id)
                  ? "ring-2 ring-primary bg-primary/5"
                  : "hover:border-primary/50"
              }`}
              onClick={() => toggleSymptom(symptom.id)}
            >
              <CardContent className="p-6 text-center relative">
                {selected.includes(symptom.id) && (
                  <div className="absolute top-2 right-2">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                )}
                <div className="mb-3 flex justify-center">
                  <symptom.icon className="w-8 h-8 text-primary" strokeWidth={1.5} />
                </div>
                <p className="font-medium text-secondary">{symptom.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {selected.length > 0 && (
          <div className="text-center">
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              {selected.map((id) => {
                const symptom = symptoms.find((s) => s.id === id);
                return (
                  <Badge key={id} variant="secondary" className="px-3 py-1">
                    {symptom?.label}
                  </Badge>
                );
              })}
            </div>
            <Button size="lg" onClick={handleFindMatch}>
              Find Matching Chiropractors
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
