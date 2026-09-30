"use client";
import { useRouter } from "next/navigation";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import { useAuth } from "../../hooks/auth.hooks";
import { useEffect } from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data, isPending } = useAuth();
  const router = useRouter();
  const isAuthenticated = !!data?.user;

  useEffect(() => {
    if (!isPending && isAuthenticated) {
      router.replace("/");
    }
  }, [isPending, router, isAuthenticated]);

  if (isPending || isAuthenticated) {
    return <LoadingSpinner fullPage={true} />;
  }

  return children;
}
