"use client";

import { ReactNode } from "react";
import DashboardSidebar from "./DashboardSlider";
import DashboardHeader from "./DashboardHeader";

interface SidebarItem {
  label: string;
  icon: React.ElementType;
  href: string;
  active: boolean;
}

interface DashboardLayoutProps {
  children: ReactNode;
  sidebarItems: SidebarItem[];
  role: "participant" | "admin";
}

export default function DashboardLayout({
  children,
  sidebarItems,
  role,
}: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-bg-primary text-text-main flex flex-col lg:flex-row">
      <DashboardHeader items={sidebarItems} role={role} />
      <DashboardSidebar items={sidebarItems} role={role} />

      <main className="flex-1 lg:ml-64 w-full">
        <div className="p-6 md:p-8 max-w-6xl mx-auto w-full">{children}</div>
      </main>
    </div>
  );
}
