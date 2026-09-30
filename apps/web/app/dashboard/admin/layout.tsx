"use client";

import React, { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Users, FileVideo, Bell } from "lucide-react";
import DashboardLayout from "../../../components/dashboard/DashboardLayout";
import { FullPageLoader } from "../../../components/ui/LoadingSpinner";
import { useAuth } from "../../../hooks/auth.hooks";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { data, isPending } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isPending) {
      return;
    }

    if (!data?.user) {
      router.replace("/login");
      return;
    }

    if (!["admin"].includes(data.user.role)) {
      router.replace("/dashboard/participant");
    }
  }, [isPending, router]);

  if (isPending) {
    return <FullPageLoader />;
  }

  const sidebarItems = [
    {
      label: "Overview",
      icon: LayoutDashboard,
      href: "/dashboard/admin",
      active: pathname === "/dashboard/admin",
    },
    {
      label: "Participants",
      icon: Users,
      href: "/dashboard/admin/participants",
      active: pathname === "/dashboard/admin/participants",
    },
    {
      label: "Submissions",
      icon: FileVideo,
      href: "/dashboard/admin/submissions",
      active: pathname === "/dashboard/admin/submissions",
    },
    {
      label: "Notifications",
      icon: Bell,
      href: "/dashboard/admin/notifications",
      active: pathname === "/dashboard/admin/notifications",
    },
  ];

  return (
    <DashboardLayout sidebarItems={sidebarItems} role="admin">
      {children}
    </DashboardLayout>
  );
}
