"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, LogOut } from "lucide-react";
// import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useLogout } from "../../hooks/auth.hooks";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";

interface SidebarItem {
  label: string;
  icon: React.ElementType;
  href: string;
  active: boolean;
}

interface DashboardHeaderProps {
  items: SidebarItem[];
  role: "participant" | "admin";
}

export default function DashboardHeader({ items, role }: DashboardHeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
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
    <header className="lg:hidden relative">
      <div className="flex justify-between items-center px-4 py-3 bg-bg-secondary border-b border-border">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 -ml-2 text-text-muted hover:text-white transition-colors"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        <Link href="/" className="inline-block">
          <h1 className="font-heading text-2xl text-accent tracking-wider">
            THAR
          </h1>
        </Link>

        <div className="text-xs font-semibold uppercase tracking-wider text-text-muted bg-bg-elevated px-2 py-1 rounded-md">
          {role}
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 top-[60px] bg-black/60 z-40"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 top-[60px] w-64 bg-bg-secondary border-r border-border z-50 flex flex-col"
            >
              <nav className="flex-1 py-6 flex flex-col gap-2 px-4 overflow-y-auto">
                {items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`
                        flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                        ${
                          item.active
                            ? "bg-accent/10 text-accent border-l-2 border-accent"
                            : "text-text-main hover:bg-bg-elevated hover:text-white"
                        }
                      `}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  );
                })}
              </nav>

              <div className="p-4 border-t border-border mt-auto">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    handleLogout();
                  }}
                  className={`flex w-full items-center gap-3 px-4 py-3 rounded-lg text-error hover:bg-error/10 transition-colors ${isPending ? `opacity-50 cursor-not-allowed` : ``}`}
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">
                    {isPending ? "Loging Out.." : "Logout"}
                  </span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
