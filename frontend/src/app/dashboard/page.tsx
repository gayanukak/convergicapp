// src/app/dashboard/page.tsx
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    // Redirect to sign-in (NextAuth's sign-in page)
    redirect("/api/auth/signin");
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome back, {session.user?.name}</p>
    </div>
  );
}