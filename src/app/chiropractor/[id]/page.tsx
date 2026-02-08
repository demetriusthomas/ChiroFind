import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Star,
  MapPin,
  Phone,
  Clock,
  CheckCircle,
  Calendar,
  Award,
  GraduationCap,
} from "lucide-react";

// Mock data - will be replaced with database query
const chiropractor = {
  id: "1",
  name: "Dr. Sarah Johnson",
  title: "DC, CCSP",
  clinic: "Elite Spine & Wellness Center",
  address: "123 Main Street",
  city: "San Francisco",
  state: "CA",
  zip: "94102",
  phone: "(415) 555-1234",
  email: "info@elitespinewellness.com",
  website: "www.elitespinewellness.com",
  rating: 4.9,
  reviewCount: 127,
  specialties: ["Sports Injury", "Back Pain", "Rehabilitation", "Sciatica"],
  acceptingNew: true,
  insuranceAccepted: [
    "Blue Cross",
    "Aetna",
    "United Healthcare",
    "Cigna",
    "Medicare",
  ],
  yearsExperience: 12,
  bio: "Dr. Sarah Johnson is a board-certified chiropractor with over 12 years of experience treating athletes and active individuals. She specializes in sports injuries and rehabilitation, helping patients return to their active lifestyles. Her holistic approach combines traditional chiropractic techniques with modern rehabilitation methods.",
  education: [
    { degree: "Doctor of Chiropractic", school: "Palmer College of Chiropractic", year: "2012" },
    { degree: "BS in Kinesiology", school: "UCLA", year: "2008" },
  ],
  certifications: [
    "Certified Chiropractic Sports Physician (CCSP)",
    "Active Release Techniques (ART)",
    "Graston Technique",
  ],
  hours: [
    { day: "Monday", hours: "8:00 AM - 6:00 PM" },
    { day: "Tuesday", hours: "8:00 AM - 6:00 PM" },
    { day: "Wednesday", hours: "8:00 AM - 6:00 PM" },
    { day: "Thursday", hours: "8:00 AM - 6:00 PM" },
    { day: "Friday", hours: "8:00 AM - 4:00 PM" },
    { day: "Saturday", hours: "9:00 AM - 1:00 PM" },
    { day: "Sunday", hours: "Closed" },
  ],
  reviews: [
    {
      id: "1",
      author: "John M.",
      rating: 5,
      date: "2 weeks ago",
      text: "Dr. Johnson is amazing! She helped me recover from a back injury that had been bothering me for months. Highly recommend!",
    },
    {
      id: "2",
      author: "Emily R.",
      rating: 5,
      date: "1 month ago",
      text: "Very professional and knowledgeable. The office is clean and the staff is friendly. My back pain improved significantly after just a few visits.",
    },
    {
      id: "3",
      author: "Michael T.",
      rating: 4,
      date: "2 months ago",
      text: "Great experience overall. Dr. Johnson took the time to explain everything and created a treatment plan that worked for my schedule.",
    },
  ],
  availableSlots: [
    { date: "Today", times: ["2:00 PM", "3:30 PM", "5:00 PM"] },
    { date: "Tomorrow", times: ["9:00 AM", "10:30 AM", "1:00 PM", "2:30 PM"] },
    { date: "Wed, Feb 12", times: ["8:00 AM", "11:00 AM", "3:00 PM"] },
  ],
};

export default function ChiropractorProfile() {
  return (
    <>
      <Navbar />
      <main className="bg-cream min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 mb-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Avatar */}
              <div className="flex-shrink-0">
                <div className="w-32 h-32 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-bold text-4xl">
                    {chiropractor.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div>
                    <h1 className="text-3xl font-serif font-bold text-secondary">
                      {chiropractor.name}
                    </h1>
                    <p className="text-lg text-muted-foreground">
                      {chiropractor.title}
                    </p>
                    <p className="text-muted-foreground mt-1">
                      {chiropractor.clinic}
                    </p>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 bg-primary/10 px-4 py-2 rounded-full">
                      <Star className="w-5 h-5 fill-primary text-primary" />
                      <span className="text-xl font-bold">{chiropractor.rating}</span>
                    </div>
                    <span className="text-muted-foreground">
                      ({chiropractor.reviewCount} reviews)
                    </span>
                  </div>
                </div>

                {/* Quick Info */}
                <div className="mt-4 flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>
                      {chiropractor.city}, {chiropractor.state}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>{chiropractor.yearsExperience} years experience</span>
                  </div>
                  {chiropractor.acceptingNew && (
                    <div className="flex items-center gap-1 text-green-600">
                      <CheckCircle className="w-4 h-4" />
                      <span>Accepting new patients</span>
                    </div>
                  )}
                </div>

                {/* Specialties */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {chiropractor.specialties.map((specialty) => (
                    <Badge key={specialty} variant="secondary">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <Tabs defaultValue="about" className="bg-white rounded-2xl shadow-sm">
                <TabsList className="w-full justify-start border-b rounded-none p-0 h-auto">
                  <TabsTrigger
                    value="about"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
                  >
                    About
                  </TabsTrigger>
                  <TabsTrigger
                    value="reviews"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
                  >
                    Reviews ({chiropractor.reviewCount})
                  </TabsTrigger>
                  <TabsTrigger
                    value="insurance"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
                  >
                    Insurance
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="about" className="p-6 space-y-6">
                  <div>
                    <h3 className="font-semibold text-lg mb-3">About</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {chiropractor.bio}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                      <GraduationCap className="w-5 h-5" />
                      Education
                    </h3>
                    <ul className="space-y-2">
                      {chiropractor.education.map((edu, i) => (
                        <li key={i} className="text-muted-foreground">
                          <span className="font-medium text-foreground">
                            {edu.degree}
                          </span>{" "}
                          - {edu.school}, {edu.year}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                      <Award className="w-5 h-5" />
                      Certifications
                    </h3>
                    <ul className="space-y-1">
                      {chiropractor.certifications.map((cert, i) => (
                        <li key={i} className="text-muted-foreground flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          {cert}
                        </li>
                      ))}
                    </ul>
                  </div>
                </TabsContent>

                <TabsContent value="reviews" className="p-6">
                  <div className="space-y-6">
                    {chiropractor.reviews.map((review) => (
                      <div key={review.id} className="border-b last:border-0 pb-6 last:pb-0">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating
                                    ? "fill-primary text-primary"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="font-medium">{review.author}</span>
                          <span className="text-muted-foreground text-sm">
                            {review.date}
                          </span>
                        </div>
                        <p className="text-muted-foreground">{review.text}</p>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="insurance" className="p-6">
                  <h3 className="font-semibold text-lg mb-4">Accepted Insurance</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {chiropractor.insuranceAccepted.map((insurance) => (
                      <div
                        key={insurance}
                        className="flex items-center gap-2 p-3 bg-muted rounded-lg"
                      >
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span>{insurance}</span>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Book Appointment */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Book Appointment
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {chiropractor.availableSlots.map((slot) => (
                    <div key={slot.date}>
                      <p className="font-medium mb-2">{slot.date}</p>
                      <div className="flex flex-wrap gap-2">
                        {slot.times.map((time) => (
                          <Button key={time} variant="outline" size="sm">
                            {time}
                          </Button>
                        ))}
                      </div>
                    </div>
                  ))}
                  <Button className="w-full mt-4">View All Times</Button>
                </CardContent>
              </Card>

              {/* Contact */}
              <Card>
                <CardHeader>
                  <CardTitle>Contact</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span>{chiropractor.phone}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p>{chiropractor.address}</p>
                      <p>
                        {chiropractor.city}, {chiropractor.state}{" "}
                        {chiropractor.zip}
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    Get Directions
                  </Button>
                </CardContent>
              </Card>

              {/* Office Hours */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Office Hours
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {chiropractor.hours.map((schedule) => (
                      <li
                        key={schedule.day}
                        className="flex justify-between text-sm"
                      >
                        <span className="font-medium">{schedule.day}</span>
                        <span className="text-muted-foreground">
                          {schedule.hours}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
