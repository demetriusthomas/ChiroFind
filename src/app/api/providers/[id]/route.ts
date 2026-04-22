import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const provider = await prisma.provider.findUnique({
      where: { id },
      include: {
        user: true,
        practice: {
          include: {
            hours: true,
          },
        },
        specialties: {
          include: {
            specialty: true,
          },
        },
        education: true,
        certifications: true,
        insurances: {
          include: {
            insurance: true,
          },
        },
        services: {
          where: { isActive: true },
        },
        reviews: {
          where: { isApproved: true, isHidden: false },
          include: {
            author: {
              select: {
                firstName: true,
                lastName: true,
              },
            },
          },
          orderBy: { createdAt: "desc" },
          take: 10,
        },
      },
    });

    if (!provider) {
      return NextResponse.json({ error: "Provider not found" }, { status: 404 });
    }

    const avgRating =
      provider.reviews.length > 0
        ? provider.reviews.reduce((sum, r) => sum + r.rating, 0) / provider.reviews.length
        : 0;

    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const result = {
      id: provider.id,
      name: `Dr. ${provider.user.firstName} ${provider.user.lastName}`,
      title: provider.title,
      clinic: provider.practice?.name || "Private Practice",
      address: provider.practice?.addressStreet || "",
      city: provider.practice?.addressCity || "",
      state: provider.practice?.addressState || "",
      zip: provider.practice?.addressZip || "",
      phone: provider.practice?.phone || "",
      email: provider.practice?.email || "",
      website: provider.practice?.website || "",
      rating: Math.round(avgRating * 10) / 10,
      reviewCount: provider.reviews.length,
      specialties: provider.specialties.map((s) => s.specialty.name),
      techniques: [],
      acceptingNew: provider.acceptingPatients,
      verified: !!provider.verifiedAt,
      responseTime: "within 1 hour",
      virtualAvailable: !!provider.videoUrl,
      insuranceAccepted: provider.insurances.map((i) => i.insurance.name),
      yearsExperience: provider.yearsExperience,
      bio: provider.bio || "",
      education: provider.education.map((e) => ({
        degree: e.degree,
        school: e.school,
        year: e.year?.toString() || "",
      })),
      certifications: provider.certifications.map((c) => c.name),
      services: provider.services.map((s) => ({
        id: s.id,
        name: s.name,
        duration: s.duration,
        price: s.price ? Number(s.price) : 0,
      })),
      hours: provider.practice?.hours
        ? dayNames.map((day, index) => {
            const dayHours = provider.practice!.hours.find((h) => h.dayOfWeek === index);
            return {
              day,
              hours: dayHours
                ? dayHours.isClosed
                  ? "Closed"
                  : `${dayHours.openTime} - ${dayHours.closeTime}`
                : "Closed",
            };
          })
        : dayNames.map((day) => ({ day, hours: "Call for hours" })),
      reviews: provider.reviews.map((r) => ({
        id: r.id,
        author: `${r.author.firstName} ${r.author.lastName?.charAt(0) || ""}.`,
        rating: r.rating,
        date: formatDate(r.createdAt),
        text: r.content || "",
      })),
      availableSlots: generateAvailableSlots(),
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching provider:", error);
    return NextResponse.json({ error: "Failed to fetch provider" }, { status: 500 });
  }
}

function formatDate(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return `${Math.floor(diffDays / 365)} years ago`;
}

function generateAvailableSlots() {
  const slots = [];
  const today = new Date();

  for (let i = 0; i < 5; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() + i);

    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayName = i === 0 ? "Today" : i === 1 ? "Tomorrow" : dayNames[date.getDay()];

    slots.push({
      date: dayName,
      dateLabel: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      times: ["9:00 AM", "10:30 AM", "1:00 PM", "2:30 PM", "4:00 PM"].slice(0, 3 + Math.floor(Math.random() * 3)),
    });
  }

  return slots;
}
