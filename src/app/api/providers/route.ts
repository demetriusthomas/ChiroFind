import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const specialty = searchParams.get("specialty");
  const city = searchParams.get("city");
  const state = searchParams.get("state");
  const sortBy = searchParams.get("sortBy") || "recommended";

  try {
    const providers = await prisma.provider.findMany({
      where: {
        isActive: true,
        ...(specialty && specialty !== "all"
          ? {
              specialties: {
                some: {
                  specialty: {
                    slug: specialty,
                  },
                },
              },
            }
          : {}),
        ...(city || state
          ? {
              practice: {
                ...(city ? { addressCity: { contains: city, mode: "insensitive" as const } } : {}),
                ...(state ? { addressState: { contains: state, mode: "insensitive" as const } } : {}),
              },
            }
          : {}),
      },
      include: {
        user: true,
        practice: true,
        specialties: {
          include: {
            specialty: true,
          },
        },
        insurances: {
          include: {
            insurance: true,
          },
        },
        reviews: {
          where: { isApproved: true },
          select: { rating: true },
        },
      },
    });

    const results = providers.map((provider) => {
      const avgRating =
        provider.reviews.length > 0
          ? provider.reviews.reduce((sum, r) => sum + r.rating, 0) / provider.reviews.length
          : 0;

      return {
        id: provider.id,
        name: `Dr. ${provider.user.firstName} ${provider.user.lastName}`,
        title: provider.title,
        clinic: provider.practice?.name || "Private Practice",
        address: provider.practice?.addressStreet || "",
        city: provider.practice?.addressCity || "",
        state: provider.practice?.addressState || "",
        rating: Math.round(avgRating * 10) / 10,
        reviewCount: provider.reviews.length,
        specialties: provider.specialties.map((s) => s.specialty.name),
        techniques: [],
        nextAvailable: "Today",
        acceptingNew: provider.acceptingPatients,
        insuranceAccepted: provider.insurances.map((i) => i.insurance.name),
        image: provider.profileImage,
        yearsExperience: provider.yearsExperience,
        verified: !!provider.verifiedAt,
        featured: provider.subscriptionTier === "PREMIUM" || provider.subscriptionTier === "ENTERPRISE",
        responseTime: "within 1 hour",
        consultationType: provider.videoUrl ? ["in-person", "virtual"] : ["in-person"],
        lat: provider.practice?.latitude || 0,
        lng: provider.practice?.longitude || 0,
      };
    });

    // Sort results
    if (sortBy === "rating") {
      results.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "reviews") {
      results.sort((a, b) => b.reviewCount - a.reviewCount);
    } else {
      // "recommended" - featured first, then by rating
      results.sort((a, b) => {
        if (a.featured !== b.featured) return a.featured ? -1 : 1;
        return b.rating - a.rating;
      });
    }

    return NextResponse.json(results);
  } catch (error) {
    console.error("Error fetching providers:", error);
    return NextResponse.json({ error: "Failed to fetch providers" }, { status: 500 });
  }
}
