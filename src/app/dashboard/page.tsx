import { createClient } from "@/lib/supabase/server";
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

  // Mock stats - will be replaced with real data
  const stats = {
    totalPatients: 127,
    appointmentsThisWeek: 24,
    averageRating: 4.8,
    profileViews: 342,
  };

  const setupSteps = [
    { label: "Create account", completed: true },
    { label: "Complete profile", completed: false, href: "/dashboard/profile" },
    { label: "Add services", completed: false, href: "/dashboard/services" },
    { label: "Set availability", completed: false, href: "/dashboard/availability" },
  ];

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
                <CardTitle>Upcoming Appointments</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  You have no upcoming appointments.
                </p>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}
