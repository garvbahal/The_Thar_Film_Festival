"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { FullPageLoader } from "../../components/ui/LoadingSpinner";

export default function DashboardPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;
    if (!user) {
      router.replace("/login");
      return;
    }
    if (user.role === "admin") router.replace("/dashboard/admin");
    else router.replace("/dashboard/participant");
  }, [user, isLoading, router]);

  return <FullPageLoader />;
}
