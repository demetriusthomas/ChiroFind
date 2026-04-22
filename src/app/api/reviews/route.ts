import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import prisma from "@/lib/prisma";

// GET - Fetch reviews for a provider
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const providerId = searchParams.get("providerId");

    if (!providerId) {
      return NextResponse.json({ error: "Provider ID required" }, { status: 400 });
    }

    const reviews = await prisma.review.findMany({
      where: {
        providerId,
        isApproved: true,
        isHidden: false,
      },
      include: {
        author: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    const result = reviews.map((review) => ({
      id: review.id,
      rating: review.rating,
      title: review.title,
      content: review.content,
      author: `${review.author.firstName} ${review.author.lastName?.charAt(0) || ""}.`,
      createdAt: review.createdAt.toISOString(),
      response: review.response,
      respondedAt: review.respondedAt?.toISOString(),
    }));

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 });
  }
}

// POST - Create a new review
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { providerId, rating, title, content } = body;

    if (!providerId || !rating) {
      return NextResponse.json({ error: "Provider ID and rating are required" }, { status: 400 });
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json({ error: "Rating must be between 1 and 5" }, { status: 400 });
    }

    // Get the patient (current user)
    const patient = await prisma.user.findUnique({
      where: { email: user.email! },
    });

    if (!patient) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Check if user has had an appointment with this provider
    const hasAppointment = await prisma.appointment.findFirst({
      where: {
        patientId: patient.id,
        providerId,
        status: "COMPLETED",
      },
    });

    // Check if user already reviewed this provider
    const existingReview = await prisma.review.findFirst({
      where: {
        authorId: patient.id,
        providerId,
      },
    });

    if (existingReview) {
      return NextResponse.json({ error: "You have already reviewed this provider" }, { status: 400 });
    }

    // Create the review (auto-approve if they had an appointment)
    const review = await prisma.review.create({
      data: {
        providerId,
        authorId: patient.id,
        rating,
        title: title || null,
        content: content || null,
        isApproved: !!hasAppointment, // Auto-approve if they had an appointment
      },
    });

    return NextResponse.json({
      id: review.id,
      rating: review.rating,
      title: review.title,
      content: review.content,
      isApproved: review.isApproved,
      message: review.isApproved
        ? "Review submitted successfully!"
        : "Review submitted and pending approval.",
    });
  } catch (error) {
    console.error("Error creating review:", error);
    return NextResponse.json({ error: "Failed to submit review" }, { status: 500 });
  }
}

// PUT - Provider responds to a review
export async function PUT(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { reviewId, response } = body;

    // Get the provider
    const dbUser = await prisma.user.findUnique({
      where: { email: user.email! },
      include: { provider: true },
    });

    if (!dbUser?.provider) {
      return NextResponse.json({ error: "Not a provider" }, { status: 403 });
    }

    // Verify the review belongs to this provider
    const review = await prisma.review.findFirst({
      where: {
        id: reviewId,
        providerId: dbUser.provider.id,
      },
    });

    if (!review) {
      return NextResponse.json({ error: "Review not found" }, { status: 404 });
    }

    // Update the review with response
    const updated = await prisma.review.update({
      where: { id: reviewId },
      data: {
        response,
        respondedAt: new Date(),
      },
    });

    return NextResponse.json({
      id: updated.id,
      response: updated.response,
      respondedAt: updated.respondedAt?.toISOString(),
    });
  } catch (error) {
    console.error("Error responding to review:", error);
    return NextResponse.json({ error: "Failed to respond to review" }, { status: 500 });
  }
}
