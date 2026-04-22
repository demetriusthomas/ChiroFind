"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Eye,
  MousePointer,
  MessageSquare,
  Calendar,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Users,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

// Mock analytics data - will be replaced with real data
const mockAnalytics = {
  funnel: {
    impressions: 12450,
    profileViews: 3420,
    inquiries: 456,
    bookings: 178,
  },
  revenue: {
    total: 28560,
    fromChiroFind: 22400,
    avgPatientValue: 126,
  },
  performance: {
    conversionRate: 5.2,
    responseTime: "1.2 hrs",
    bookingRate: 39,
    costPerLead: 4.12,
  },
  trends: {
    impressions: 12,
    profileViews: 8,
    inquiries: -3,
    bookings: 15,
  },
  weeklyData: [
    { week: "Week 1", views: 780, inquiries: 98, bookings: 38 },
    { week: "Week 2", views: 850, inquiries: 112, bookings: 42 },
    { week: "Week 3", views: 920, inquiries: 125, bookings: 48 },
    { week: "Week 4", views: 870, inquiries: 121, bookings: 50 },
  ],
  leadSources: [
    { source: "Search Results", count: 245, percentage: 54 },
    { source: "Direct Profile", count: 98, percentage: 21 },
    { source: "Specialty Pages", count: 68, percentage: 15 },
    { source: "Location Pages", count: 45, percentage: 10 },
  ],
  recentLeads: [
    { name: "John D.", type: "Booking Request", time: "2 hours ago", status: "pending" },
    { name: "Sarah M.", type: "Phone Inquiry", time: "5 hours ago", status: "contacted" },
    { name: "Mike R.", type: "Message", time: "1 day ago", status: "booked" },
    { name: "Emily T.", type: "Booking Request", time: "1 day ago", status: "booked" },
    { name: "Chris P.", type: "Phone Inquiry", time: "2 days ago", status: "no-show" },
  ],
};

const funnelSteps = [
  { key: "impressions", label: "Search Impressions", icon: Eye, color: "bg-blue-500" },
  { key: "profileViews", label: "Profile Views", icon: MousePointer, color: "bg-purple-500" },
  { key: "inquiries", label: "Inquiries", icon: MessageSquare, color: "bg-orange-500" },
  { key: "bookings", label: "Bookings", icon: Calendar, color: "bg-green-500" },
];

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("30d");

  const { funnel, revenue, performance, trends, leadSources, recentLeads, weeklyData } = mockAnalytics;

  // Calculate conversion rates between funnel steps
  const conversionRates = {
    viewRate: ((funnel.profileViews / funnel.impressions) * 100).toFixed(1),
    inquiryRate: ((funnel.inquiries / funnel.profileViews) * 100).toFixed(1),
    bookingRate: ((funnel.bookings / funnel.inquiries) * 100).toFixed(1),
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-secondary">Analytics</h1>
          <p className="text-muted-foreground mt-1">
            Track your patient acquisition and practice performance.
          </p>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[140px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 90 days</SelectItem>
            <SelectItem value="12m">Last 12 months</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Revenue Overview */}
      <div className="grid sm:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Revenue from ChiroFind</p>
                <p className="text-3xl font-bold text-primary">${revenue.fromChiroFind.toLocaleString()}</p>
                <p className="text-sm text-green-600 flex items-center gap-1 mt-1">
                  <TrendingUp className="w-4 h-4" />
                  +18% vs last period
                </p>
              </div>
              <div className="w-14 h-14 bg-primary/20 rounded-full flex items-center justify-center">
                <DollarSign className="w-7 h-7 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg. Patient Value</p>
                <p className="text-3xl font-bold">${revenue.avgPatientValue}</p>
                <p className="text-sm text-muted-foreground mt-1">per booking</p>
              </div>
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center">
                <Users className="w-7 h-7 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Cost Per Lead</p>
                <p className="text-3xl font-bold">${performance.costPerLead}</p>
                <p className="text-sm text-green-600 flex items-center gap-1 mt-1">
                  <TrendingDown className="w-4 h-4" />
                  -8% vs last period
                </p>
              </div>
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-7 h-7 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Patient Acquisition Funnel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Patient Acquisition Funnel
            <Badge variant="secondary" className="font-normal">
              {timeRange === "7d" ? "7 days" : timeRange === "30d" ? "30 days" : timeRange === "90d" ? "90 days" : "12 months"}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col lg:flex-row items-stretch gap-4">
            {funnelSteps.map((step, index) => {
              const value = funnel[step.key as keyof typeof funnel];
              const trend = trends[step.key as keyof typeof trends];
              const isLast = index === funnelSteps.length - 1;
              const Icon = step.icon;

              return (
                <div key={step.key} className="flex-1 flex items-center">
                  <div className="flex-1 relative">
                    <div className={`${step.color} rounded-xl p-5 text-white`}>
                      <div className="flex items-center gap-3 mb-2">
                        <Icon className="w-5 h-5" />
                        <span className="text-sm font-medium opacity-90">{step.label}</span>
                      </div>
                      <p className="text-3xl font-bold">{value.toLocaleString()}</p>
                      <p className={`text-sm mt-1 ${trend >= 0 ? "text-green-200" : "text-red-200"}`}>
                        {trend >= 0 ? "+" : ""}{trend}% vs last period
                      </p>
                    </div>
                    {!isLast && (
                      <div className="hidden lg:flex absolute -right-6 top-1/2 -translate-y-1/2 z-10">
                        <div className="bg-white rounded-full p-1 shadow-md">
                          <ArrowRight className="w-4 h-4 text-muted-foreground" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Conversion Rates */}
          <div className="mt-6 grid grid-cols-3 gap-4 pt-6 border-t">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">{conversionRates.viewRate}%</p>
              <p className="text-sm text-muted-foreground">Impression → View</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">{conversionRates.inquiryRate}%</p>
              <p className="text-sm text-muted-foreground">View → Inquiry</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{conversionRates.bookingRate}%</p>
              <p className="text-sm text-muted-foreground">Inquiry → Booking</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Weekly Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {weeklyData.map((week, index) => (
                <div key={week.week} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{week.week}</span>
                    <span className="text-muted-foreground">
                      {week.bookings} bookings
                    </span>
                  </div>
                  <div className="flex gap-1 h-8">
                    <div
                      className="bg-blue-500 rounded-l-md transition-all"
                      style={{ width: `${(week.views / 1000) * 100}%` }}
                      title={`${week.views} views`}
                    />
                    <div
                      className="bg-orange-500 transition-all"
                      style={{ width: `${(week.inquiries / 150) * 100}%` }}
                      title={`${week.inquiries} inquiries`}
                    />
                    <div
                      className="bg-green-500 rounded-r-md transition-all"
                      style={{ width: `${(week.bookings / 60) * 100}%` }}
                      title={`${week.bookings} bookings`}
                    />
                  </div>
                </div>
              ))}
              <div className="flex items-center gap-6 pt-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-sm bg-blue-500" />
                  <span className="text-muted-foreground">Views</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-sm bg-orange-500" />
                  <span className="text-muted-foreground">Inquiries</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-sm bg-green-500" />
                  <span className="text-muted-foreground">Bookings</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Lead Sources */}
        <Card>
          <CardHeader>
            <CardTitle>Lead Sources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {leadSources.map((source) => (
                <div key={source.source} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{source.source}</span>
                    <span className="text-muted-foreground">
                      {source.count} leads ({source.percentage}%)
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all"
                      style={{ width: `${source.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Leads */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Leads</CardTitle>
          <Button variant="outline" size="sm">View All</Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentLeads.map((lead, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-muted/50 rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    {lead.type === "Phone Inquiry" ? (
                      <Phone className="w-5 h-5 text-primary" />
                    ) : lead.type === "Message" ? (
                      <Mail className="w-5 h-5 text-primary" />
                    ) : (
                      <Calendar className="w-5 h-5 text-primary" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{lead.name}</p>
                    <p className="text-sm text-muted-foreground">{lead.type}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground">{lead.time}</span>
                  <Badge
                    variant={
                      lead.status === "booked"
                        ? "default"
                        : lead.status === "contacted"
                        ? "secondary"
                        : lead.status === "pending"
                        ? "outline"
                        : "destructive"
                    }
                    className={lead.status === "booked" ? "bg-green-600" : ""}
                  >
                    {lead.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* ROI Calculator */}
      <Card className="bg-secondary text-white">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-serif font-bold mb-2">Your ChiroFind ROI</h3>
              <p className="text-gray-400 max-w-md">
                Based on your current performance, here's what ChiroFind is delivering for your practice.
              </p>
            </div>
            <div className="flex items-center gap-8">
              <div className="text-center">
                <p className="text-4xl font-bold text-primary">
                  {Math.round(revenue.fromChiroFind / 199)}x
                </p>
                <p className="text-sm text-gray-400">Return on Investment</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-green-400">
                  ${(revenue.fromChiroFind - 199).toLocaleString()}
                </p>
                <p className="text-sm text-gray-400">Net Revenue</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
