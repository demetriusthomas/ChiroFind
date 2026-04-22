import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import prisma from "@/lib/prisma";

// GET - Fetch provider availability
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
            availability: {
              orderBy: [{ dayOfWeek: "asc" }, { startTime: "asc" }],
            },
          },
        },
      },
    });

    if (!dbUser?.provider) {
      return NextResponse.json({ error: "Provider not found" }, { status: 404 });
    }

    const availability = dbUser.provider.availability.map((a) => ({
      id: a.id,
      dayOfWeek: a.dayOfWeek,
      startTime: a.startTime,
      endTime: a.endTime,
      slotDuration: a.slotDuration,
    }));

    return NextResponse.json(availability);
  } catch (error) {
    console.error("Error fetching availability:", error);
    return NextResponse.json({ error: "Failed to fetch availability" }, { status: 500 });
  }
}

// PUT - Update all availability (replace existing)
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

    const providerId = dbUser.provider.id;

    // Delete existing availability
    await prisma.availability.deleteMany({
      where: { providerId },
    });

    // Create new availability entries
    if (body.availability && Array.isArray(body.availability)) {
      for (const slot of body.availability) {
        await prisma.availability.create({
          data: {
            providerId,
            dayOfWeek: slot.dayOfWeek,
            startTime: slot.startTime,
            endTime: slot.endTime,
            slotDuration: slot.slotDuration || 30,
          },
        });
      }
    }

    // Also update practice hours if provider has a practice
    const practice = await prisma.practice.findUnique({
      where: { providerId },
    });

    if (practice && body.availability) {
      // Delete existing hours
      await prisma.practiceHours.deleteMany({
        where: { practiceId: practice.id },
      });

      // Group availability by day
      const hoursByDay: Record<number, { open: string; close: string }> = {};
      for (const slot of body.availability) {
        if (!hoursByDay[slot.dayOfWeek]) {
          hoursByDay[slot.dayOfWeek] = {
            open: slot.startTime,
            close: slot.endTime,
          };
        } else {
          if (slot.startTime < hoursByDay[slot.dayOfWeek].open) {
            hoursByDay[slot.dayOfWeek].open = slot.startTime;
          }
          if (slot.endTime > hoursByDay[slot.dayOfWeek].close) {
            hoursByDay[slot.dayOfWeek].close = slot.endTime;
          }
        }
      }

      // Create practice hours
      for (let day = 0; day < 7; day++) {
        await prisma.practiceHours.create({
          data: {
            practiceId: practice.id,
            dayOfWeek: day,
            openTime: hoursByDay[day]?.open || "09:00",
            closeTime: hoursByDay[day]?.close || "17:00",
            isClosed: !hoursByDay[day],
          },
        });
      }
    }

    // Update provider to accepting patients
    await prisma.provider.update({
      where: { id: providerId },
      data: { acceptingPatients: true },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating availability:", error);
    return NextResponse.json({ error: "Failed to update availability" }, { status: 500 });
  }
}
