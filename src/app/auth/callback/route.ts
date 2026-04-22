import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const redirect = searchParams.get("redirect") || "/dashboard";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // Get the user from Supabase
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        // Sync user to Prisma database
        const metadata = user.user_metadata || {};
        const role = metadata.role === "PROVIDER" ? "PROVIDER" : "PATIENT";

        try {
          // Check if user already exists in Prisma
          const existingUser = await prisma.user.findUnique({
            where: { email: user.email! },
          });

          if (!existingUser) {
            // Create user in Prisma
            const newUser = await prisma.user.create({
              data: {
                email: user.email!,
                firstName: metadata.first_name || "User",
                lastName: metadata.last_name || "",
                role: role as "PATIENT" | "PROVIDER" | "ADMIN",
                emailVerified: true,
              },
            });

            // If provider, create provider profile
            if (role === "PROVIDER") {
              await prisma.provider.create({
                data: {
                  userId: newUser.id,
                  title: "DC",
                  isActive: false, // Needs to complete profile
                  acceptingPatients: false,
                },
              });
            }
          }
        } catch (dbError) {
          console.error("Error syncing user to database:", dbError);
          // Continue anyway - user can still access the app
        }
      }

      return NextResponse.redirect(`${origin}${redirect}`);
    }
  }

  // Return to login page if auth failed
  return NextResponse.redirect(`${origin}/login?error=auth_failed`);
}
