"use client";

import React, { useState, useEffect, useCallback } from "react";
import { portfolioData } from "@/data/portfolio";
import { useCursor } from "@/components/Cursor/CustomCursor";
import {
  Search,
  ArrowRight,
  Code2,
  Sparkles,
  Wrench,
  Briefcase,
  Mail,
  Copy,
  Check,
  Github,
  Linkedin,
  X,
  Command,
} from "lucide-react";

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [copied, setCopied] = useState(false);
  const { setCursorState } = useCursor();

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault();
      setIsOpen((prev) => !prev);
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const actions = [
    {
      id: "projects",
      title: "View Selected Works & ML Systems",
      category: "Navigation",
      icon: Code2,
      action: () => {
        window.location.hash = "projects";
        setIsOpen(false);
      },
    },
    {
      id: "about",
      title: "About & Engineering Philosophy",
      category: "Navigation",
      icon: Sparkles,
      action: () => {
        window.location.hash = "about";
        setIsOpen(false);
      },
    },
    {
      id: "skills",
      title: "Technical Stack & Capabilities",
      category: "Navigation",
      icon: Wrench,
      action: () => {
        window.location.hash = "skills";
        setIsOpen(false);
      },
    },
    {
      id: "experience",
      title: "Experience & Chronology",
      category: "Navigation",
      icon: Briefcase,
      action: () => {
        window.location.hash = "experience";
        setIsOpen(false);
      },
    },
    {
      id: "contact",
      title: "Start a Conversation / Contact",
      category: "Navigation",
      icon: Mail,
      action: () => {
        window.location.hash = "contact";
        setIsOpen(false);
      },
    },
    {
      id: "copy-email",
      title: `Copy Email (${portfolioData.personal.email})`,
      category: "Quick Action",
      icon: copied ? Check : Copy,
      action: () => {
        navigator.clipboard.writeText(portfolioData.personal.email);
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
          setIsOpen(false);
        }, 1200);
      },
    },
    {
      id: "github",
      title: "Open GitHub Profile",
      category: "External Link",
      icon: Github,
      action: () => {
        window.open(portfolioData.socialLinks[0].url, "_blank");
        setIsOpen(false);
      },
    },
    {
      id: "linkedin",
      title: "Connect on LinkedIn",
      category: "External Link",
      icon: Linkedin,
      action: () => {
        window.open(portfolioData.socialLinks[1].url, "_blank");
        setIsOpen(false);
      },
    },
  ];

  const filteredActions = actions.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase()) ||
    item.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {/* Floating Trigger Button (Bottom Right) */}
      <button
        onClick={() => setIsOpen(true)}
        onMouseEnter={() => setCursorState("OPEN")}
        onMouseLeave={() => setCursorState("DEFAULT")}
        aria-label="Open Command Palette (Ctrl+K / ⌘K)"
        className="fixed bottom-6 right-6 z-40 hidden sm:flex items-center gap-2 rounded-full border border-white/15 bg-black/80 px-3.5 py-2 backdrop-blur-xl text-zinc-300 transition-all hover:border-white/40 hover:bg-zinc-900 hover:text-white shadow-2xl"
      >
        <Command className="h-3.5 w-3.5 text-sky-400" />
        <span className="font-mono text-xs tracking-wider">COMMAND</span>
        <kbd className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[10px] text-zinc-400">
          ⌘K
        </kbd>
      </button>

      {/* Modal Dialog */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
          {/* Backdrop Blur Overlay */}
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
            onClick={() => setIsOpen(false)}
          />

          {/* Palette Dialog Content */}
          <div className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-white/20 bg-zinc-950 p-2 shadow-2xl backdrop-blur-2xl">
            {/* Search Input Bar */}
            <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
              <Search className="h-4 w-4 text-zinc-400" />
              <input
                type="text"
                autoFocus
                placeholder="Type a command or jump to section..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-transparent font-mono text-sm text-white placeholder-zinc-500 focus:outline-none"
              />
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-lg p-1 text-zinc-400 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Results List */}
            <div className="max-h-[360px] overflow-y-auto p-2 space-y-1">
              {filteredActions.length === 0 ? (
                <div className="py-8 text-center font-mono text-xs text-zinc-500">
                  No matching commands found.
                </div>
              ) : (
                filteredActions.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={item.action}
                      className="group flex w-full items-center justify-between rounded-xl px-3.5 py-3 text-left transition-colors hover:bg-white/10"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-zinc-300 group-hover:text-white group-hover:border-white/30">
                          <Icon className="h-4 w-4 text-sky-400" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">{item.title}</p>
                          <p className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">
                            {item.category}
                          </p>
                        </div>
                      </div>
                      <ArrowRight className="h-3.5 w-3.5 text-zinc-500 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-1 text-white" />
                    </button>
                  );
                })
              )}
            </div>

            {/* Palette Footer */}
            <div className="border-t border-white/10 px-4 py-2.5 flex items-center justify-between font-mono text-[10px] text-zinc-500">
              <span>USE ↑↓ TO NAVIGATE</span>
              <span>ESC TO CLOSE</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
