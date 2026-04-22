"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Star,
  MapPin,
  Phone,
  Clock,
  CheckCircle,
  Calendar,
  Award,
  GraduationCap,
  Shield,
  Video,
  ChevronLeft,
  ChevronRight,
  User,
  Loader2,
  MessageSquare,
} from "lucide-react";
import { ReviewForm } from "@/components/reviews/ReviewForm";

type ChiropractorData = {
  id: string;
  name: string;
  title: string;
  clinic: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  email: string;
  website: string;
  rating: number;
  reviewCount: number;
  specialties: string[];
  techniques: string[];
  acceptingNew: boolean;
  verified: boolean;
  responseTime: string;
  virtualAvailable: boolean;
  insuranceAccepted: string[];
  yearsExperience: number;
  bio: string;
  education: { degree: string; school: string; year: string }[];
  certifications: string[];
  services: { id: string; name: string; duration: number; price: number }[];
  hours: { day: string; hours: string }[];
  reviews: { id: string; author: string; rating: number; date: string; text: string }[];
  availableSlots: { date: string; dateLabel: string; times: string[] }[];
};

type Review = {
  id: string;
  rating: number;
  title: string | null;
  content: string | null;
  author: string;
  createdAt: string;
  response: string | null;
  respondedAt: string | null;
};

export default function ChiropractorProfile() {
  const params = useParams();
  const [chiropractor, setChiropractor] = useState<ChiropractorData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);

  useEffect(() => {
    async function fetchProvider() {
      try {
        const response = await fetch(`/api/providers/${params.id}`);
        if (!response.ok) {
          throw new Error("Provider not found");
        }
        const data = await response.json();
        setChiropractor(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load provider");
      } finally {
        setLoading(false);
      }
    }
    if (params.id) {
      fetchProvider();
    }
  }, [params.id]);

  const fetchReviews = async () => {
    if (!params.id) return;
    setReviewsLoading(true);
    try {
      const response = await fetch(`/api/reviews?providerId=${params.id}`);
      if (response.ok) {
        const data = await response.json();
        setReviews(data);
      }
    } catch (err) {
      console.error("Failed to fetch reviews:", err);
    } finally {
      setReviewsLoading(false);
    }
  };

  useEffect(() => {
    if (params.id) {
      fetchReviews();
    }
  }, [params.id]);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [bookingStep, setBookingStep] = useState<"service" | "time" | "confirm">("service");
  const [showBookingDialog, setShowBookingDialog] = useState(false);
  const [consultationType, setConsultationType] = useState<"in-person" | "virtual">("in-person");

  const selectedServiceData = chiropractor?.services.find(s => s.id === selectedService);
  const selectedDateData = chiropractor?.availableSlots.find(s => s.date === selectedDate);

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="bg-cream min-h-screen flex items-center justify-center">
          <div className="flex items-center gap-2">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
            <span className="text-lg">Loading provider...</span>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (error || !chiropractor) {
    return (
      <>
        <Navbar />
        <main className="bg-cream min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-secondary mb-2">Provider Not Found</h1>
            <p className="text-muted-foreground">{error || "The provider you're looking for doesn't exist."}</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const handleSelectTime = (date: string, time: string) => {
    setSelectedDate(date);
    setSelectedTime(time);
    if (selectedService) {
      setBookingStep("confirm");
      setShowBookingDialog(true);
    }
  };

  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingError, setBookingError] = useState<string | null>(null);

  const handleConfirmBooking = async () => {
    setBookingLoading(true);
    setBookingError(null);

    try {
      // Parse the date and time to create a proper datetime
      const selectedSlot = chiropractor.availableSlots.find(s => s.date === selectedDate);
      if (!selectedSlot) throw new Error("Invalid date selected");

      // Create datetime from the slot
      const today = new Date();
      let targetDate = new Date(today);

      if (selectedDate === "Today") {
        // Use today
      } else if (selectedDate === "Tomorrow") {
        targetDate.setDate(today.getDate() + 1);
      } else {
        // Find the next occurrence of this day
        const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const targetDayIndex = dayNames.indexOf(selectedDate!);
        const currentDayIndex = today.getDay();
        let daysToAdd = targetDayIndex - currentDayIndex;
        if (daysToAdd <= 0) daysToAdd += 7;
        targetDate.setDate(today.getDate() + daysToAdd);
      }

      // Parse time (e.g., "2:00 PM")
      const timeParts = selectedTime?.match(/(\d+):(\d+)\s*(AM|PM)/i);
      if (timeParts) {
        let hours = parseInt(timeParts[1]);
        const minutes = parseInt(timeParts[2]);
        const period = timeParts[3].toUpperCase();

        if (period === "PM" && hours !== 12) hours += 12;
        if (period === "AM" && hours === 12) hours = 0;

        targetDate.setHours(hours, minutes, 0, 0);
      }

      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          providerId: chiropractor.id,
          serviceId: selectedService,
          dateTime: targetDate.toISOString(),
          duration: selectedServiceData?.duration || 30,
          consultationType,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to book appointment");
      }

      setBookingSuccess(true);
      setTimeout(() => {
        setShowBookingDialog(false);
        setBookingSuccess(false);
        // Reset state
        setSelectedService(null);
        setSelectedDate(null);
        setSelectedTime(null);
        setBookingStep("service");
      }, 2000);
    } catch (err) {
      setBookingError(err instanceof Error ? err.message : "Failed to book appointment");
    } finally {
      setBookingLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="bg-cream min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 mb-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Avatar */}
              <div className="flex-shrink-0 relative">
                <div className="w-32 h-32 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-bold text-4xl">
                    {chiropractor.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
                {chiropractor.verified && (
                  <div className="absolute -bottom-2 -right-2 bg-blue-500 rounded-full p-1.5" title="Verified Provider">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h1 className="text-3xl font-serif font-bold text-secondary">
                        {chiropractor.name}
                      </h1>
                      {chiropractor.verified && (
                        <Badge className="bg-blue-100 text-blue-700 border-blue-200">
                          <Shield className="w-3 h-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                    </div>
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
                  {chiropractor.responseTime && (
                    <div className="flex items-center gap-1 text-blue-600">
                      <CheckCircle className="w-4 h-4" />
                      <span>Responds {chiropractor.responseTime}</span>
                    </div>
                  )}
                  {chiropractor.acceptingNew && (
                    <div className="flex items-center gap-1 text-green-600">
                      <CheckCircle className="w-4 h-4" />
                      <span>Accepting new patients</span>
                    </div>
                  )}
                  {chiropractor.virtualAvailable && (
                    <div className="flex items-center gap-1 text-purple-600">
                      <Video className="w-4 h-4" />
                      <span>Virtual visits available</span>
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

                {/* Techniques */}
                {chiropractor.techniques && (
                  <p className="mt-3 text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">Techniques:</span>{" "}
                    {chiropractor.techniques.join(", ")}
                  </p>
                )}
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
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="font-semibold text-lg">Patient Reviews</h3>
                      <p className="text-sm text-muted-foreground">
                        {reviews.length} {reviews.length === 1 ? "review" : "reviews"}
                      </p>
                    </div>
                    <ReviewForm
                      providerId={chiropractor.id}
                      providerName={chiropractor.name}
                      onReviewSubmitted={fetchReviews}
                    />
                  </div>

                  {reviewsLoading ? (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="w-6 h-6 animate-spin text-primary" />
                    </div>
                  ) : reviews.length === 0 ? (
                    <div className="text-center py-8">
                      <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                      <p className="text-muted-foreground">No reviews yet.</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Be the first to share your experience!
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {reviews.map((review) => (
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
                              {new Date(review.createdAt).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </span>
                          </div>
                          {review.title && (
                            <p className="font-medium mb-1">{review.title}</p>
                          )}
                          {review.content && (
                            <p className="text-muted-foreground">{review.content}</p>
                          )}

                          {/* Provider Response */}
                          {review.response && (
                            <div className="mt-4 ml-4 pl-4 border-l-2 border-primary/20">
                              <p className="text-sm font-medium text-primary mb-1">
                                Response from {chiropractor.name}
                              </p>
                              <p className="text-sm text-muted-foreground">{review.response}</p>
                              {review.respondedAt && (
                                <p className="text-xs text-muted-foreground mt-1">
                                  {new Date(review.respondedAt).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                  })}
                                </p>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
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

            {/* Sticky Sidebar */}
            <div className="lg:sticky lg:top-6 space-y-6">
              {/* Book Appointment - Enhanced */}
              <Card className="border-2 border-primary/20 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-t-lg">
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    Book Appointment
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Select a service and time
                  </p>
                </CardHeader>
                <CardContent className="p-4 space-y-4">
                  {/* Step 1: Select Service */}
                  <div>
                    <p className="text-sm font-medium mb-2 flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-primary text-white text-xs flex items-center justify-center">1</span>
                      Select Service
                    </p>
                    <div className="space-y-2">
                      {chiropractor.services.map((service) => (
                        <button
                          key={service.id}
                          onClick={() => {
                            setSelectedService(service.id);
                            setBookingStep("time");
                          }}
                          className={`w-full p-3 rounded-lg border text-left transition-all ${
                            selectedService === service.id
                              ? "border-primary bg-primary/5 ring-1 ring-primary"
                              : "border-border hover:border-primary/50"
                          }`}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium text-sm">{service.name}</p>
                              <p className="text-xs text-muted-foreground">{service.duration} min</p>
                            </div>
                            <p className="font-semibold text-primary">${service.price}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Step 2: Select Time */}
                  {selectedService && (
                    <div className="pt-2 border-t">
                      <p className="text-sm font-medium mb-3 flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-primary text-white text-xs flex items-center justify-center">2</span>
                        Select Time
                      </p>

                      {/* Date Navigation */}
                      <div className="flex items-center gap-2 mb-3 overflow-x-auto pb-2">
                        {chiropractor.availableSlots.map((slot) => (
                          <button
                            key={slot.date}
                            onClick={() => setSelectedDate(slot.date)}
                            className={`flex-shrink-0 px-3 py-2 rounded-lg text-center transition-all ${
                              selectedDate === slot.date
                                ? "bg-primary text-white"
                                : "bg-muted hover:bg-primary/10"
                            }`}
                          >
                            <p className="text-xs font-medium">{slot.date}</p>
                            <p className="text-xs opacity-80">{slot.dateLabel}</p>
                          </button>
                        ))}
                      </div>

                      {/* Time Slots */}
                      {selectedDate && selectedDateData && (
                        <div className="flex flex-wrap gap-2">
                          {selectedDateData.times.map((time) => (
                            <Button
                              key={time}
                              variant={selectedTime === time ? "default" : "outline"}
                              size="sm"
                              onClick={() => handleSelectTime(selectedDate, time)}
                              className={selectedTime === time ? "bg-primary" : ""}
                            >
                              {time}
                            </Button>
                          ))}
                        </div>
                      )}

                      {!selectedDate && (
                        <p className="text-sm text-muted-foreground text-center py-2">
                          Select a date above
                        </p>
                      )}
                    </div>
                  )}

                  {/* Consultation Type Toggle */}
                  {chiropractor.virtualAvailable && selectedService && (
                    <div className="pt-2 border-t">
                      <p className="text-sm font-medium mb-2">Consultation Type</p>
                      <div className="flex gap-2">
                        <Button
                          variant={consultationType === "in-person" ? "default" : "outline"}
                          size="sm"
                          className="flex-1"
                          onClick={() => setConsultationType("in-person")}
                        >
                          <User className="w-4 h-4 mr-1" />
                          In-Person
                        </Button>
                        <Button
                          variant={consultationType === "virtual" ? "default" : "outline"}
                          size="sm"
                          className="flex-1"
                          onClick={() => setConsultationType("virtual")}
                        >
                          <Video className="w-4 h-4 mr-1" />
                          Virtual
                        </Button>
                      </div>
                    </div>
                  )}
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

      {/* Booking Confirmation Dialog */}
      <Dialog open={showBookingDialog} onOpenChange={setShowBookingDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Your Booking</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="bg-muted/50 rounded-lg p-4 space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Provider</span>
                <span className="font-medium">{chiropractor.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Service</span>
                <span className="font-medium">{selectedServiceData?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Date & Time</span>
                <span className="font-medium">{selectedDate}, {selectedTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Type</span>
                <span className="font-medium capitalize">{consultationType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Duration</span>
                <span className="font-medium">{selectedServiceData?.duration} min</span>
              </div>
              <div className="flex justify-between border-t pt-3">
                <span className="font-medium">Total</span>
                <span className="font-bold text-lg text-primary">${selectedServiceData?.price}</span>
              </div>
            </div>

            <p className="text-sm text-muted-foreground">
              By confirming, you agree to our cancellation policy. A confirmation email will be sent to your registered email address.
            </p>

            {bookingError && (
              <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg">
                {bookingError}
              </div>
            )}

            {bookingSuccess ? (
              <div className="bg-green-50 text-green-600 text-center p-4 rounded-lg">
                <CheckCircle className="w-8 h-8 mx-auto mb-2" />
                <p className="font-medium">Booking Confirmed!</p>
                <p className="text-sm">You will receive a confirmation email shortly.</p>
              </div>
            ) : (
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowBookingDialog(false)}
                  disabled={bookingLoading}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1 bg-gradient-to-r from-primary to-[#a8863c]"
                  onClick={handleConfirmBooking}
                  disabled={bookingLoading}
                >
                  {bookingLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Booking...
                    </>
                  ) : (
                    "Confirm Booking"
                  )}
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </>
  );
}
