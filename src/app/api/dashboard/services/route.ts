import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import prisma from "@/lib/prisma";

// GET - Fetch provider services
export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const dbUser = await prisma.user.findUnique({
      where: { email: user.email! },
      include: {
        provider: {
          include: {
            services: {
              orderBy: { name: "asc" },
            },
          },
        },
      },
    });

    if (!dbUser?.provider) {
      return NextResponse.json({ error: "Provider not found" }, { status: 404 });
    }

    const services = dbUser.provider.services.map((s) => ({
      id: s.id,
      name: s.name,
      description: s.description || "",
      duration: s.duration,
      price: s.price ? Number(s.price) : 0,
      isActive: s.isActive,
    }));

    return NextResponse.json(services);
  } catch (error) {
    console.error("Error fetching services:", error);
    return NextResponse.json({ error: "Failed to fetch services" }, { status: 500 });
  }
}

// POST - Create a new service
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    const dbUser = await prisma.user.findUnique({
      where: { email: user.email! },
      include: { provider: true },
    });

    if (!dbUser?.provider) {
      return NextResponse.json({ error: "Provider not found" }, { status: 404 });
    }

    const service = await prisma.service.create({
      data: {
        providerId: dbUser.provider.id,
        name: body.name,
        description: body.description,
        duration: parseInt(body.duration) || 30,
        price: parseFloat(body.price) || 0,
        isActive: true,
      },
    });

    return NextResponse.json({
      id: service.id,
      name: service.name,
      description: service.description,
      duration: service.duration,
      price: Number(service.price),
      isActive: service.isActive,
    });
  } catch (error) {
    console.error("Error creating service:", error);
    return NextResponse.json({ error: "Failed to create service" }, { status: 500 });
  }
}

// PUT - Update a service
export async function PUT(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    const dbUser = await prisma.user.findUnique({
      where: { email: user.email! },
      include: { provider: true },
    });

    if (!dbUser?.provider) {
      return NextResponse.json({ error: "Provider not found" }, { status: 404 });
    }

    // Verify service belongs to this provider
    const existingService = await prisma.service.findFirst({
      where: {
        id: body.id,
        providerId: dbUser.provider.id,
      },
    });

    if (!existingService) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    const service = await prisma.service.update({
      where: { id: body.id },
      data: {
        name: body.name,
        description: body.description,
        duration: parseInt(body.duration) || 30,
        price: parseFloat(body.price) || 0,
        isActive: body.isActive ?? true,
      },
    });

    return NextResponse.json({
      id: service.id,
      name: service.name,
      description: service.description,
      duration: service.duration,
      price: Number(service.price),
      isActive: service.isActive,
    });
  } catch (error) {
    console.error("Error updating service:", error);
    return NextResponse.json({ error: "Failed to update service" }, { status: 500 });
  }
}

// DELETE - Delete a service
export async function DELETE(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const serviceId = searchParams.get("id");

    if (!serviceId) {
      return NextResponse.json({ error: "Service ID required" }, { status: 400 });
    }

    const dbUser = await prisma.user.findUnique({
      where: { email: user.email! },
      include: { provider: true },
    });

    if (!dbUser?.provider) {
      return NextResponse.json({ error: "Provider not found" }, { status: 404 });
    }

    // Verify service belongs to this provider
    const existingService = await prisma.service.findFirst({
      where: {
        id: serviceId,
        providerId: dbUser.provider.id,
      },
    });

    if (!existingService) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    await prisma.service.delete({
      where: { id: serviceId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting service:", error);
    return NextResponse.json({ error: "Failed to delete service" }, { status: 500 });
  }
}
