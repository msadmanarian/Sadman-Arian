"use client";

import React, { useState } from "react";
import { portfolioData } from "@/data/portfolio";
import { useCursor } from "@/components/Cursor/CustomCursor";
import { SectionBackdrop } from "@/components/Backdrop/SectionBackdrop";
import { MagneticElement } from "@/components/Interaction/MagneticElement";
import { Copy, Check, Send, Mail, ArrowUpRight, MessageSquare } from "lucide-react";

export function Contact() {
  const { setCursorState } = useCursor();
  const [copied, setCopied] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(portfolioData.personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: "", email: "", message: "" });
    }, 4000);
  };

  return (
    <SectionBackdrop
      image="/images/backdrops/contact-backdrop.svg"
      tone="duotone"
      parallax
      className="border-t border-white/5 bg-gradient-to-b from-transparent via-zinc-950/60 to-black"
    >
      <section id="contact" className="relative py-28 px-6 md:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-16 lg:grid-cols-12 items-start">
            {/* Left Column: Editorial Headline & Quick Contacts */}
            <div className="lg:col-span-6 space-y-8">
              <div className="flex items-center gap-2 font-mono text-xs tracking-editorial text-sky-400">
                <MessageSquare className="h-3.5 w-3.5" />
                <span>START A CONVERSATION</span>
              </div>

              <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.05]">
                LET&apos;S BUILD SOMETHING INTERESTING.
              </h2>

              <p className="max-w-md text-base text-zinc-400 leading-relaxed">
                Available for full-time engineering roles, creative technical direction, and high-impact freelance collaborations.
              </p>

              {/* Email Copy Card */}
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
                <span className="font-mono text-xs uppercase tracking-widest text-zinc-400">
                  Direct Email
                </span>
                <div className="mt-3 flex items-center justify-between gap-4">
                  <a
                    href={`mailto:${portfolioData.personal.email}`}
                    onMouseEnter={() => setCursorState("OPEN")}
                    onMouseLeave={() => setCursorState("DEFAULT")}
                    className="font-mono text-base sm:text-lg font-bold text-white hover:text-sky-400 transition-colors truncate"
                  >
                    {portfolioData.personal.email}
                  </a>

                  <MagneticElement strength={0.3} radius={50}>
                    <button
                      onClick={handleCopyEmail}
                      onMouseEnter={() => setCursorState("OPEN")}
                      onMouseLeave={() => setCursorState("DEFAULT")}
                      className="flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-4 py-2 font-mono text-xs text-white transition-all hover:bg-white hover:text-black hover:border-white"
                      aria-label="Copy email address"
                    >
                      {copied ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-emerald-400" />
                          <span>COPIED</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" />
                          <span>COPY</span>
                        </>
                      )}
                    </button>
                  </MagneticElement>
                </div>
              </div>

              {/* Social Links */}
              <div className="pt-2">
                <span className="font-mono text-xs uppercase tracking-widest text-zinc-500">
                  Network & Socials
                </span>
                <div className="mt-4 flex flex-wrap gap-4">
                  {portfolioData.socialLinks.map((link) => (
                    <MagneticElement key={link.name} strength={0.25} radius={50}>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onMouseEnter={() => setCursorState("VISIT")}
                        onMouseLeave={() => setCursorState("DEFAULT")}
                        className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 font-mono text-xs text-zinc-300 transition-all hover:border-white/30 hover:bg-white/10 hover:text-white"
                      >
                        <span>{link.name}</span>
                        <ArrowUpRight className="h-3 w-3 text-zinc-500" />
                      </a>
                    </MagneticElement>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Direct Message Form */}
            <div className="lg:col-span-6">
              <div className="rounded-3xl border border-white/10 bg-zinc-950/70 p-8 sm:p-10 backdrop-blur-xl">
                <h3 className="text-xl font-bold text-white mb-2">Send a Message</h3>
                <p className="text-xs text-zinc-400 mb-8 font-mono">
                  Expect a response within 24 hours.
                </p>

                {formSubmitted ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 mb-4">
                      <Check className="h-6 w-6" />
                    </div>
                    <h4 className="text-lg font-bold text-white">Message Received</h4>
                    <p className="mt-2 text-sm text-zinc-400">
                      Thank you for reaching out. I will get back to you shortly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className="block font-mono text-xs uppercase tracking-wider text-zinc-400 mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Alexandra Vance"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-zinc-600 focus:border-white/40 focus:outline-none focus:ring-1 focus:ring-white/40 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-xs uppercase tracking-wider text-zinc-400 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="alexandra@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-zinc-600 focus:border-white/40 focus:outline-none focus:ring-1 focus:ring-white/40 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-xs uppercase tracking-wider text-zinc-400 mb-2">
                        Project Details / Message
                      </label>
                      <textarea
                        rows={4}
                        required
                        placeholder="Tell me about your project, timeline, and goals..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-zinc-600 focus:border-white/40 focus:outline-none focus:ring-1 focus:ring-white/40 transition-colors resize-none"
                      />
                    </div>

                    <MagneticElement strength={0.2} radius={60}>
                      <button
                        type="submit"
                        onMouseEnter={() => setCursorState("OPEN")}
                        onMouseLeave={() => setCursorState("DEFAULT")}
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-white py-4 font-mono text-xs font-bold text-black transition-all duration-300 hover:bg-zinc-200"
                      >
                        <span>TRANSMIT MESSAGE</span>
                        <Send className="h-3.5 w-3.5" />
                      </button>
                    </MagneticElement>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </SectionBackdrop>
  );
}
