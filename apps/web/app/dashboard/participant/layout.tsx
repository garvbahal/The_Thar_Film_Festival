"use client";

import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Users, Upload, Bell } from "lucide-react";
import DashboardLayout from "../../../components/dashboard/DashboardLayout";
import { ReactNode, useEffect } from "react";
import { useAuth } from "../../../hooks/auth.hooks";

export default function ParticipantLayout({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { isPending, data } = useAuth();
  const isAuthenticated = !!data?.user;
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

  useEffect(() => {
    if (isPending) {
      return;
    }
    if (!data?.user) {
      router.replace("/login");
      return;
    }

    if (!["leader", "member"].includes(data.user.role)) {
      router.replace("/dashboard/admin");
    }
  }, [isAuthenticated, isPending, router]);

  return (
    <DashboardLayout sidebarItems={sidebarItems} role="participant">
      {children}
    </DashboardLayout>
  );
}
