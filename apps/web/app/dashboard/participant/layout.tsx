"use client";

import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Upload, Bell } from "lucide-react";
import DashboardLayout from "../../../components/dashboard/DashboardLayout";
import { useAuth } from "@/context/AuthContext";
import { FullPageLoader } from "../../../components/ui/LoadingSpinner";
import { ReactNode } from "react";

export default function ParticipantLayout({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  const { isLoading, user } = useAuth();

  const sidebarItems = [
    {
      label: "Overview",
      icon: LayoutDashboard,
      href: "/dashboard/participant",
      active: pathname === "/dashboard/participant",
    },
    {
      label: "My Team",
      icon: Users,
      href: "/dashboard/participant/team",
      active: pathname === "/dashboard/participant/team",
    },
    {
      label: "My Submission",
      icon: Upload,
      href: "/dashboard/participant/submission",
      active: pathname === "/dashboard/participant/submission",
    },
    {
      label: "Notifications",
      icon: Bell,
      href: "/dashboard/participant/notifications",
      active: pathname === "/dashboard/participant/notifications",
    },
  ];

  if (isLoading || !user) {
    return <FullPageLoader />;
  }

  return (
    <DashboardLayout sidebarItems={sidebarItems} role="participant">
      {children}
    </DashboardLayout>
  );
}
