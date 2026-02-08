"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Loader2, Plus, X } from "lucide-react";

const availableSpecialties = [
  "Back Pain",
  "Neck Pain",
  "Sciatica",
  "Sports Injury",
  "Headaches",
  "Pregnancy Care",
  "Pediatric",
  "Wellness",
  "Rehabilitation",
  "Posture Correction",
];

export default function ProfilePage() {
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    title: "DC",
    bio: "",
    yearsExperience: "",
    licenseNumber: "",
    licenseState: "",
    practiceName: "",
    phone: "",
    website: "",
    addressStreet: "",
    addressCity: "",
    addressState: "",
    addressZip: "",
  });

  const [specialties, setSpecialties] = useState<string[]>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleSpecialty = (specialty: string) => {
    setSpecialties((prev) =>
      prev.includes(specialty)
        ? prev.filter((s) => s !== specialty)
        : [...prev, specialty]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSaved(false);

    // TODO: Save to database via Supabase
    const supabase = createClient();

    // Simulate save
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setLoading(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold text-secondary">
          Edit Profile
        </h1>
        <p className="text-muted-foreground mt-1">
          Update your professional information and practice details.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Professional Information */}
        <Card>
          <CardHeader>
            <CardTitle>Professional Information</CardTitle>
            <CardDescription>
              Your credentials and professional background.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Professional Title
                </label>
                <Input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="DC, CCSP"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Years of Experience
                </label>
                <Input
                  name="yearsExperience"
                  type="number"
                  value={formData.yearsExperience}
                  onChange={handleChange}
                  placeholder="10"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  License Number
                </label>
                <Input
                  name="licenseNumber"
                  value={formData.licenseNumber}
                  onChange={handleChange}
                  placeholder="DC12345"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  License State
                </label>
                <Input
                  name="licenseState"
                  value={formData.licenseState}
                  onChange={handleChange}
                  placeholder="CA"
                  maxLength={2}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Bio</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="Tell patients about your experience, approach to care, and what makes your practice unique..."
              />
            </div>
          </CardContent>
        </Card>

        {/* Specialties */}
        <Card>
          <CardHeader>
            <CardTitle>Specialties</CardTitle>
            <CardDescription>
              Select the conditions and treatments you specialize in.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {availableSpecialties.map((specialty) => (
                <Badge
                  key={specialty}
                  variant={specialties.includes(specialty) ? "default" : "outline"}
                  className="cursor-pointer px-3 py-1"
                  onClick={() => toggleSpecialty(specialty)}
                >
                  {specialties.includes(specialty) ? (
                    <X className="w-3 h-3 mr-1" />
                  ) : (
                    <Plus className="w-3 h-3 mr-1" />
                  )}
                  {specialty}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Practice Information */}
        <Card>
          <CardHeader>
            <CardTitle>Practice Information</CardTitle>
            <CardDescription>
              Your clinic name and contact details.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Practice Name
              </label>
              <Input
                name="practiceName"
                value={formData.practiceName}
                onChange={handleChange}
                placeholder="Elite Spine & Wellness Center"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Phone Number
                </label>
                <Input
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="(415) 555-1234"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Website
                </label>
                <Input
                  name="website"
                  type="url"
                  value={formData.website}
                  onChange={handleChange}
                  placeholder="https://www.example.com"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Address */}
        <Card>
          <CardHeader>
            <CardTitle>Location</CardTitle>
            <CardDescription>
              Your practice address for patients to find you.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Street Address
              </label>
              <Input
                name="addressStreet"
                value={formData.addressStreet}
                onChange={handleChange}
                placeholder="123 Main Street"
              />
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">City</label>
                <Input
                  name="addressCity"
                  value={formData.addressCity}
                  onChange={handleChange}
                  placeholder="San Francisco"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">State</label>
                <Input
                  name="addressState"
                  value={formData.addressState}
                  onChange={handleChange}
                  placeholder="CA"
                  maxLength={2}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  ZIP Code
                </label>
                <Input
                  name="addressZip"
                  value={formData.addressZip}
                  onChange={handleChange}
                  placeholder="94102"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Submit */}
        <div className="flex items-center gap-4">
          <Button type="submit" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
          {saved && (
            <span className="text-green-600 text-sm">
              Profile saved successfully!
            </span>
          )}
        </div>
      </form>
    </div>
  );
}
