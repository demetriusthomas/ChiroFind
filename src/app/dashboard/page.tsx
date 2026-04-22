import { createClient } from "@/lib/supabase/server";
import prisma from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Users,
  Calendar,
  Star,
  TrendingUp,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const userMeta = user?.user_metadata;
  const isProvider = userMeta?.role === "PROVIDER";

  // Fetch provider data and stats from database
  let stats = {
    totalPatients: 0,
    appointmentsThisWeek: 0,
    averageRating: 0,
    profileViews: 0,
  };

  let setupSteps = [
    { label: "Create account", completed: true },
    { label: "Complete profile", completed: false, href: "/dashboard/profile" },
    { label: "Add services", completed: false, href: "/dashboard/services" },
    { label: "Set availability", completed: false, href: "/dashboard/availability" },
  ];

  // For patient appointments
  let patientAppointments: {
    id: string;
    dateTime: Date;
    status: string;
    providerName: string;
    practiceName: string;
    serviceName: string | null;
  }[] = [];

  // For provider appointments
  let providerAppointments: {
    id: string;
    dateTime: Date;
    status: string;
    patientName: string;
    patientEmail: string;
    serviceName: string | null;
  }[] = [];

  if (isProvider && user?.email) {
    try {
      const dbUser = await prisma.user.findUnique({
        where: { email: user.email },
        include: {
          provider: {
            include: {
              practice: true,
              services: true,
              availability: true,
              appointments: true,
              reviews: { where: { isApproved: true } },
            },
          },
        },
      });

      if (dbUser?.provider) {
        const provider = dbUser.provider;

        // Calculate stats
        const uniquePatients = new Set(provider.appointments.map((a) => a.patientId));
        const now = new Date();
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        const appointmentsThisWeek = provider.appointments.filter(
          (a) => new Date(a.dateTime) >= weekAgo && new Date(a.dateTime) <= now
        ).length;

        const avgRating =
          provider.reviews.length > 0
            ? provider.reviews.reduce((sum, r) => sum + r.rating, 0) / provider.reviews.length
            : 0;

        stats = {
          totalPatients: uniquePatients.size,
          appointmentsThisWeek,
          averageRating: Math.round(avgRating * 10) / 10,
          profileViews: 0, // Would need analytics tracking
        };

        // Fetch upcoming appointments for provider
        const upcomingAppointments = await prisma.appointment.findMany({
          where: {
            providerId: provider.id,
            dateTime: { gte: new Date() },
            status: { in: ["PENDING", "CONFIRMED"] },
          },
          include: {
            patient: true,
            service: true,
          },
          orderBy: { dateTime: "asc" },
          take: 5,
        });

        providerAppointments = upcomingAppointments.map((apt) => ({
          id: apt.id,
          dateTime: apt.dateTime,
          status: apt.status,
          patientName: `${apt.patient.firstName} ${apt.patient.lastName}`,
          patientEmail: apt.patient.email,
          serviceName: apt.service?.name || null,
        }));

        // Update setup steps based on actual data
        setupSteps = [
          { label: "Create account", completed: true },
          {
            label: "Complete profile",
            completed: !!provider.bio && !!provider.practice,
            href: "/dashboard/profile",
          },
          {
            label: "Add services",
            completed: provider.services.length > 0,
            href: "/dashboard/services",
          },
          {
            label: "Set availability",
            completed: provider.availability.length > 0,
            href: "/dashboard/availability",
          },
        ];
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  }

  // Fetch patient appointments
  if (!isProvider && user?.email) {
    try {
      const dbUser = await prisma.user.findUnique({
        where: { email: user.email },
        include: {
          appointments: {
            where: {
              dateTime: { gte: new Date() },
              status: { in: ["PENDING", "CONFIRMED"] },
            },
            include: {
              provider: {
                include: {
                  user: true,
                  practice: true,
                },
              },
              service: true,
            },
            orderBy: { dateTime: "asc" },
            take: 5,
          },
        },
      });

      if (dbUser) {
        patientAppointments = dbUser.appointments.map((apt) => ({
          id: apt.id,
          dateTime: apt.dateTime,
          status: apt.status,
          providerName: `Dr. ${apt.provider.user.firstName} ${apt.provider.user.lastName}`,
          practiceName: apt.provider.practice?.name || "Private Practice",
          serviceName: apt.service?.name || null,
        }));
      }
    } catch (error) {
      console.error("Error fetching patient appointments:", error);
    }
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold text-secondary">
          Welcome back, {userMeta?.first_name}!
        </h1>
        <p className="text-muted-foreground mt-1">
          {isProvider
            ? "Manage your practice and connect with patients."
            : "Find and book appointments with chiropractors."}
        </p>
      </div>

      {isProvider ? (
        <>
          {/* Provider Dashboard */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Patients</p>
                    <p className="text-3xl font-bold">{stats.totalPatients}</p>
                  </div>
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">This Week</p>
                    <p className="text-3xl font-bold">{stats.appointmentsThisWeek}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Avg. Rating</p>
                    <p className="text-3xl font-bold">{stats.averageRating}</p>
                  </div>
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                    <Star className="w-6 h-6 text-yellow-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Profile Views</p>
                    <p className="text-3xl font-bold">{stats.profileViews}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Upcoming Appointments for Provider */}
          {providerAppointments.length > 0 && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Upcoming Appointments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {providerAppointments.map((apt) => (
                    <div
                      key={apt.id}
                      className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                    >
                      <div>
                        <p className="font-medium">{apt.patientName}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(apt.dateTime).toLocaleDateString("en-US", {
                            weekday: "short",
                            month: "short",
                            day: "numeric",
                            hour: "numeric",
                            minute: "2-digit",
                          })}
                          {apt.serviceName && ` • ${apt.serviceName}`}
                        </p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        apt.status === "CONFIRMED"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}>
                        {apt.status}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Setup Checklist */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Complete Your Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Complete these steps to make your profile visible to patients.
              </p>
              <div className="space-y-3">
                {setupSteps.map((step, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      {step.completed ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <div className="w-5 h-5 rounded-full border-2 border-muted-foreground" />
                      )}
                      <span
                        className={
                          step.completed ? "text-muted-foreground line-through" : ""
                        }
                      >
                        {step.label}
                      </span>
                    </div>
                    {!step.completed && step.href && (
                      <Button size="sm" variant="ghost" asChild>
                        <Link href={step.href}>
                          Start
                          <ArrowRight className="w-4 h-4 ml-1" />
                        </Link>
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      ) : (
        <>
          {/* Patient Dashboard */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Find a Chiropractor</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Search for chiropractors near you and book an appointment.
                </p>
                <Button asChild>
                  <Link href="/search">
                    Search Now
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Upcoming Appointments
                </CardTitle>
              </CardHeader>
              <CardContent>
                {patientAppointments.length === 0 ? (
                  <p className="text-muted-foreground">
                    You have no upcoming appointments.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {patientAppointments.map((apt) => (
                      <div
                        key={apt.id}
                        className="p-3 bg-muted/50 rounded-lg"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-sm">
                            {apt.providerName}
                          </span>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            apt.status === "CONFIRMED"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}>
                            {apt.status}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {apt.practiceName}
                        </p>
                        <p className="text-sm mt-1">
                          {new Date(apt.dateTime).toLocaleDateString("en-US", {
                            weekday: "short",
                            month: "short",
                            day: "numeric",
                            hour: "numeric",
                            minute: "2-digit",
                          })}
                        </p>
                        {apt.serviceName && (
                          <p className="text-xs text-muted-foreground mt-1">
                            {apt.serviceName}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}
