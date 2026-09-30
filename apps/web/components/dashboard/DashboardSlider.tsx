"use client";

import Link from "next/link";
import { LogOut } from "lucide-react";
import { motion } from "framer-motion";
import { useLogout } from "../../hooks/auth.hooks";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";

interface SidebarItem {
  label: string;
  icon: React.ElementType;
  href: string;
  active: boolean;
}

interface DashboardSidebarProps {
  items: SidebarItem[];
  role: "participant" | "admin";
}

export default function DashboardSidebar({
  items,
  role,
}: DashboardSidebarProps) {
  const { mutate, isPending } = useLogout();
  const router = useRouter();

  const handleLogout = () => {
    mutate(undefined, {
      onSuccess: (data) => {
        toast.success(data.message);
        router.replace("/");
      },
      onError: (error) => {
        if (axios.isAxiosError(error)) {
          toast.error(error.response?.data.message || "Something went wrong");
        } else {
          toast.error("Something went wrong");
        }
      },
    });
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-bg-secondary border-r border-border hidden lg:flex flex-col">
      <div className="p-6 border-b border-border">
        <Link href="/" className="inline-block">
          <h1 className="font-heading text-2xl text-accent tracking-wider">
            THAR
          </h1>
        </Link>
        <div className="mt-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-text-muted bg-bg-elevated px-2 py-1 rounded-md">
            {role}
          </span>
        </div>
      </div>

      <nav className="flex-1 py-6 flex flex-col gap-2 px-4 overflow-y-auto">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-lg transition-colors relative",
                ${
                  item.active
                    ? "bg-accent/10 text-accent border-l-2 border-accent"
                    : "text-text-main hover:bg-bg-elevated hover:text-white"
                }
              `}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
              {item.active && (
                <motion.div
                  layoutId="active-nav-item"
                  className="absolute inset-0 bg-accent/5 rounded-lg -z-10"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <button
          onClick={() => handleLogout()}
          className={`flex w-full items-center gap-3 px-4 py-3 rounded-lg text-error hover:bg-error/10 transition-colors ${isPending && `opacity-50 cursor-not-allowed`}`}
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">
            {isPending ? "Loging Out.." : "Logout"}
          </span>
        </button>
      </div>
    </aside>
  );
}
