"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { FullPageLoader } from "../../components/ui/LoadingSpinner";
import { useAuth } from "../../hooks/auth.hooks";

export default function DashboardPage() {
  const { data, isPending } = useAuth();
  const router = useRouter();
  const isAuthenticated = !!data?.user;

  useEffect(() => {
    if (!isPending && !isAuthenticated) {
      router.replace("/");
    }
  }, [router, isPending, isAuthenticated]);

  if (isPending || !isAuthenticated) {
    return <FullPageLoader />;
  }

  return null;
}
