import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import prisma from "@/lib/prisma";

// GET - Fetch provider profile
export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Find user and provider in database
    const dbUser = await prisma.user.findUnique({
      where: { email: user.email! },
      include: {
        provider: {
          include: {
            practice: true,
            specialties: {
              include: { specialty: true },
            },
          },
        },
      },
    });

    if (!dbUser?.provider) {
      return NextResponse.json({ error: "Provider not found" }, { status: 404 });
    }

    const provider = dbUser.provider;

    return NextResponse.json({
      title: provider.title,
      bio: provider.bio || "",
      yearsExperience: provider.yearsExperience || 0,
      licenseNumber: provider.licenseNumber || "",
      licenseState: provider.licenseState || "",
      practiceName: provider.practice?.name || "",
      phone: provider.practice?.phone || "",
      website: provider.practice?.website || "",
      addressStreet: provider.practice?.addressStreet || "",
      addressCity: provider.practice?.addressCity || "",
      addressState: provider.practice?.addressState || "",
      addressZip: provider.practice?.addressZip || "",
      specialties: provider.specialties.map((s) => s.specialty.name),
    });
  } catch (error) {
    console.error("Error fetching profile:", error);
    return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 });
  }
}

// PUT - Update provider profile
export async function PUT(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    // Find user in database
    const dbUser = await prisma.user.findUnique({
      where: { email: user.email! },
      include: { provider: { include: { practice: true } } },
    });

    if (!dbUser?.provider) {
      return NextResponse.json({ error: "Provider not found" }, { status: 404 });
    }

    const providerId = dbUser.provider.id;

    // Update provider
    await prisma.provider.update({
      where: { id: providerId },
      data: {
        title: body.title,
        bio: body.bio,
        yearsExperience: parseInt(body.yearsExperience) || 0,
        licenseNumber: body.licenseNumber,
        licenseState: body.licenseState,
        isActive: true, // Activate profile once saved
      },
    });

    // Create slug from practice name
    const slug = body.practiceName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    // Update or create practice
    if (dbUser.provider.practice) {
      await prisma.practice.update({
        where: { id: dbUser.provider.practice.id },
        data: {
          name: body.practiceName,
          phone: body.phone,
          website: body.website,
          addressStreet: body.addressStreet,
          addressCity: body.addressCity,
          addressState: body.addressState,
          addressZip: body.addressZip,
          slug: slug + "-" + providerId.slice(-6),
        },
      });
    } else if (body.practiceName && body.addressStreet) {
      await prisma.practice.create({
        data: {
          providerId,
          name: body.practiceName,
          phone: body.phone,
          website: body.website,
          addressStreet: body.addressStreet,
          addressCity: body.addressCity,
          addressState: body.addressState,
          addressZip: body.addressZip,
          slug: slug + "-" + providerId.slice(-6),
        },
      });
    }

    // Update specialties
    if (body.specialties && Array.isArray(body.specialties)) {
      // Remove existing specialties
      await prisma.providerSpecialty.deleteMany({
        where: { providerId },
      });

      // Add new specialties
      for (const specialtyName of body.specialties) {
        const specialty = await prisma.specialty.findFirst({
          where: { name: specialtyName },
        });

        if (specialty) {
          await prisma.providerSpecialty.create({
            data: {
              providerId,
              specialtyId: specialty.id,
              isPrimary: body.specialties.indexOf(specialtyName) === 0,
            },
          });
        }
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
  }
}
