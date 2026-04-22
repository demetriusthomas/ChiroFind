import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import prisma from "@/lib/prisma";

// GET - Fetch user's appointments
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
        provider: true,
      },
    });

    if (!dbUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    let appointments;

    if (dbUser.provider) {
      // Provider: fetch appointments where they are the provider
      appointments = await prisma.appointment.findMany({
        where: { providerId: dbUser.provider.id },
        include: {
          patient: {
            select: {
              firstName: true,
              lastName: true,
              email: true,
              phone: true,
            },
          },
          service: true,
        },
        orderBy: { dateTime: "asc" },
      });
    } else {
      // Patient: fetch their appointments
      appointments = await prisma.appointment.findMany({
        where: { patientId: dbUser.id },
        include: {
          provider: {
            include: {
              user: {
                select: {
                  firstName: true,
                  lastName: true,
                },
              },
              practice: true,
            },
          },
          service: true,
        },
        orderBy: { dateTime: "asc" },
      });
    }

    const result = appointments.map((apt) => ({
      id: apt.id,
      dateTime: apt.dateTime.toISOString(),
      duration: apt.duration,
      status: apt.status,
      notes: apt.notes,
      service: apt.service ? {
        name: apt.service.name,
        price: apt.service.price ? Number(apt.service.price) : 0,
      } : null,
      // Include provider info for patients
      provider: "provider" in apt && apt.provider ? {
        name: `Dr. ${apt.provider.user.firstName} ${apt.provider.user.lastName}`,
        practice: apt.provider.practice?.name,
        address: apt.provider.practice ?
          `${apt.provider.practice.addressStreet}, ${apt.provider.practice.addressCity}` : "",
      } : undefined,
      // Include patient info for providers
      patient: "patient" in apt ? {
        name: `${apt.patient.firstName} ${apt.patient.lastName}`,
        email: apt.patient.email,
        phone: apt.patient.phone,
      } : undefined,
    }));

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return NextResponse.json({ error: "Failed to fetch appointments" }, { status: 500 });
  }
}

// POST - Create a new appointment
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { providerId, serviceId, dateTime, duration, notes, consultationType } = body;

    // Get the patient (current user)
    const patient = await prisma.user.findUnique({
      where: { email: user.email! },
    });

    if (!patient) {
      return NextResponse.json({ error: "Patient not found" }, { status: 404 });
    }

    // Verify provider exists
    const provider = await prisma.provider.findUnique({
      where: { id: providerId },
      include: { user: true, practice: true },
    });

    if (!provider) {
      return NextResponse.json({ error: "Provider not found" }, { status: 404 });
    }

    // Get service details if provided
    let service = null;
    if (serviceId) {
      service = await prisma.service.findUnique({
        where: { id: serviceId },
      });
    }

    // Create the appointment
    const appointment = await prisma.appointment.create({
      data: {
        providerId,
        patientId: patient.id,
        serviceId: serviceId || null,
        dateTime: new Date(dateTime),
        duration: duration || service?.duration || 30,
        status: "PENDING",
        notes: notes ? `${consultationType === "virtual" ? "[Virtual] " : ""}${notes}` :
               consultationType === "virtual" ? "[Virtual Consultation]" : null,
      },
      include: {
        service: true,
        provider: {
          include: {
            user: true,
            practice: true,
          },
        },
      },
    });

    return NextResponse.json({
      id: appointment.id,
      dateTime: appointment.dateTime.toISOString(),
      duration: appointment.duration,
      status: appointment.status,
      provider: {
        name: `Dr. ${appointment.provider.user.firstName} ${appointment.provider.user.lastName}`,
        practice: appointment.provider.practice?.name,
      },
      service: appointment.service ? {
        name: appointment.service.name,
        price: Number(appointment.service.price),
      } : null,
    });
  } catch (error) {
    console.error("Error creating appointment:", error);
    return NextResponse.json({ error: "Failed to create appointment" }, { status: 500 });
  }
}

// PUT - Update appointment status
export async function PUT(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { appointmentId, status, cancelReason } = body;

    const dbUser = await prisma.user.findUnique({
      where: { email: user.email! },
      include: { provider: true },
    });

    if (!dbUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Verify user has access to this appointment
    const appointment = await prisma.appointment.findUnique({
      where: { id: appointmentId },
    });

    if (!appointment) {
      return NextResponse.json({ error: "Appointment not found" }, { status: 404 });
    }

    const isProvider = dbUser.provider?.id === appointment.providerId;
    const isPatient = dbUser.id === appointment.patientId;

    if (!isProvider && !isPatient) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // Update the appointment
    const updated = await prisma.appointment.update({
      where: { id: appointmentId },
      data: {
        status,
        cancelReason: status === "CANCELLED" ? cancelReason : undefined,
      },
    });

    return NextResponse.json({
      id: updated.id,
      status: updated.status,
    });
  } catch (error) {
    console.error("Error updating appointment:", error);
    return NextResponse.json({ error: "Failed to update appointment" }, { status: 500 });
  }
}
