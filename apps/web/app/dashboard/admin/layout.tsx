"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Users, FileVideo, Bell } from "lucide-react";
import DashboardLayout from "../../../components/dashboard/DashboardLayout";
import { FullPageLoader } from "../../../components/ui/LoadingSpinner";
import { useAuth } from "@/context/AuthContext";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user, isLoading } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (!isLoading && (!user || user.role !== "admin")) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  if (isLoading || !user || user.role !== "admin") {
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
