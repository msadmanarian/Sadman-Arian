"use client";

import React, { useState, useEffect } from "react";
import { useCursor } from "@/components/Cursor/CustomCursor";
import { portfolioData } from "@/data/portfolio";
import { MagneticElement } from "@/components/Interaction/MagneticElement";
import { Menu, X, ArrowUpRight, Command } from "lucide-react";

export function Navigation() {
  const { setCursorState } = useCursor();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "WORK", href: "#projects" },
    { label: "ABOUT", href: "#about" },
    { label: "SKILLS", href: "#skills" },
    { label: "EXPERIENCE", href: "#experience" },
    { label: "CONTACT", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled
          ? "bg-black/80 py-4 backdrop-blur-xl border-b border-white/10 shadow-2xl"
          : "bg-transparent py-6"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 md:px-12">
        {/* Brand Monogram with Magnetic effect */}
        <MagneticElement strength={0.2} radius={60}>
          <a
            href="#"
            onMouseEnter={() => setCursorState("OPEN")}
            onMouseLeave={() => setCursorState("DEFAULT")}
            className="group flex items-center gap-3 font-mono text-sm tracking-widest text-white transition-opacity hover:opacity-80"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/20 bg-white/5 font-bold text-xs group-hover:border-white/40">
              {portfolioData.personal.monogram[0]}
            </span>
            <span className="font-semibold">{portfolioData.personal.monogram}</span>
          </a>
        </MagneticElement>

        {/* Status Pill Badge (Desktop) */}
        <div className="hidden lg:flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3.5 py-1 text-xs font-mono text-emerald-400 backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          <span>AVAILABLE FOR WORK</span>
        </div>

        {/* Desktop Navigation Links with Magnetic Items */}
        <nav className="hidden md:flex items-center gap-7 font-mono text-xs tracking-editorial text-zinc-400">
          {navLinks.map((link) => (
            <MagneticElement key={link.label} strength={0.25} radius={50}>
              <a
                href={link.href}
                onMouseEnter={() => setCursorState("OPEN")}
                onMouseLeave={() => setCursorState("DEFAULT")}
                className="transition-colors hover:text-white py-1 block"
              >
                {link.label}
              </a>
            </MagneticElement>
          ))}

          {/* Quick Connect CTA */}
          <MagneticElement strength={0.3} radius={70}>
            <a
              href="#contact"
              onMouseEnter={() => setCursorState("OPEN")}
              onMouseLeave={() => setCursorState("DEFAULT")}
              className="flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-4 py-2 font-mono text-xs tracking-widest text-white transition-all hover:bg-white hover:text-black hover:border-white"
            >
              <span>CONNECT</span>
              <ArrowUpRight className="h-3 w-3" />
            </a>
          </MagneticElement>
        </nav>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Navigation Menu"
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-white md:hidden"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-x-0 top-[73px] bg-black/95 backdrop-blur-2xl border-b border-white/10 px-6 py-8 md:hidden transition-all">
          <nav className="flex flex-col gap-6 font-mono text-sm tracking-widest text-zinc-300">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between border-b border-white/5 pb-3 transition-colors hover:text-white"
              >
                <span>{link.label}</span>
                <ArrowUpRight className="h-4 w-4 text-zinc-500" />
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-white py-3 font-mono text-xs font-bold text-black"
            >
              <span>GET IN TOUCH</span>
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
