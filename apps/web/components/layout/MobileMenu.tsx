"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { X } from "lucide-react";
import { useAuth, useLogout } from "../../hooks/auth.hooks";
import toast from "react-hot-toast";
import axios from "axios";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/#about" },
  { name: "Process", path: "/#process" },
];

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { data, isError } = useAuth();
  const { mutate, isPending } = useLogout();

  const handleLogout = () => {
    mutate(undefined, {
      onSuccess: (data) => {
        toast.success(data.message);
      },
      onError: (error) => {
        if (axios.isAxiosError(error)) {
          toast.error(error.response?.data.message);
        } else {
          toast.error("Something went wrong");
        }
      },
    });
  };

  const isAuthenticated = !!data;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
          className="fixed inset-0 z-50 bg-bg-primary/95 backdrop-blur-2xl flex flex-col p-6"
        >
          <div className="flex justify-between items-center h-14 mb-12">
            <Link
              href="/"
              onClick={onClose}
              className="font-heading text-text-main text-2xl tracking-[0.2em]"
            >
              THAR
            </Link>
            <button
              onClick={onClose}
              className="text-text-main hover:text-accent transition-colors"
            >
              <X size={28} strokeWidth={1.5} />
            </button>
          </div>

          <div className="flex flex-col gap-8 items-center flex-1 justify-center">
            {navLinks.map((link, i) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <a
                  href={link.path}
                  onClick={onClose}
                  className="font-heading text-4xl sm:text-5xl text-text-main hover:text-accent transition-colors tracking-widest"
                >
                  {link.name}
                </a>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex flex-col items-center gap-6 mt-auto pb-12 w-full max-w-sm mx-auto border-t border-border pt-8"
          >
            {!isAuthenticated && (
              <Link
                href="/auth/login"
                onClick={onClose}
                className="text-text-muted hover:text-text-main font-mono text-[11px] uppercase tracking-[0.2em] transition-colors"
              >
                Login
              </Link>
            )}
            {isAuthenticated && (
              <button
                onClick={() => {
                  onClose();
                  handleLogout();
                }}
                className="text-text-muted hover:text-text-main font-mono text-[11px] uppercase tracking-[0.2em] transition-colors"
                disabled={isPending}
              >
                {isPending ? "Logging Out.." : "Logout"}
              </button>
            )}

            <Link
              href={`${isAuthenticated ? "/dashboard/participant" : "/auth/signup"}`}
              onClick={onClose}
              className="text-accent hover:text-accent-secondary font-mono text-[11px] uppercase tracking-[0.2em] transition-colors"
            >
              {isAuthenticated ? "Dashboard" : "Register Crew"}
            </Link>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
