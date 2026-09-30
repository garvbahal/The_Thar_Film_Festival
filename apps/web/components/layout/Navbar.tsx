"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Menu } from "lucide-react";
import MobileMenu from "./MobileMenu";
import { useAuth } from "../../hooks/auth.hooks";
import toast from "react-hot-toast";
import axios from "axios";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/#about" },
  { name: "Process", path: "/#process" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { data, error } = useAuth();

  const isAuthenticated = !!data;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
        className={`fixed top-0 w-full z-40 transition-colors duration-500 ${
          isScrolled
            ? "bg-bg-primary/80 backdrop-blur-xl border-b border-white/5"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
          <Link
            href="/"
            className="font-heading text-text-main hover:text-accent transition-colors duration-300 text-2xl tracking-[0.2em] relative z-50"
          >
            THAR
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-12">
            <div className="flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.path}
                  className="text-text-muted hover:text-text-main font-mono text-[11px] uppercase tracking-[0.2em] transition-colors relative group"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-6 pl-8 border-l border-border">
              <Link
                href="/login"
                className="text-text-muted hover:text-text-main font-mono text-[11px] uppercase tracking-[0.2em] transition-colors"
              >
                {isAuthenticated ? "Logout" : "Login"}
              </Link>
              <Link
                href="/signup"
                className="text-accent hover:text-accent-secondary font-mono text-[11px] uppercase tracking-[0.2em] transition-colors"
              >
                {isAuthenticated ? "Dashboard" : "Signup"}
              </Link>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-text-main hover:text-accent transition-colors relative z-50"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu size={24} strokeWidth={1.5} />
          </button>
        </div>
      </motion.nav>

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
}
