import { Suspense } from "react";
import { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Log In | ChiroFind",
  description: "Sign in to your ChiroFind account to manage appointments and access your dashboard.",
};

function LoginLoading() {
  return (
    <div className="w-full max-w-md bg-white rounded-xl p-8 animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-1/2 mx-auto mb-4"></div>
      <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto mb-8"></div>
      <div className="space-y-4">
        <div className="h-10 bg-gray-200 rounded"></div>
        <div className="h-10 bg-gray-200 rounded"></div>
        <div className="h-10 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-cream flex items-center justify-center py-12 px-4">
        <Suspense fallback={<LoginLoading />}>
          <LoginForm />
        </Suspense>
      </main>
    </>
  );
}
