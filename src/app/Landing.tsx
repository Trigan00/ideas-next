"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, HeartHandshake } from "lucide-react";
import { useEffect, useState } from "react";

// If you use shadcn/ui in your project, you can swap the inline buttons with it.
// import { Button } from "@/components/ui/button";

export default function Landing() {
  // Subtle time-based accent for the gradient
  const [hue, setHue] = useState(220);
  useEffect(() => {
    const id = setInterval(() => setHue((h) => (h + 1) % 360), 60);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-neutral-950 text-white">
      {/* Animated radial gradient backdrop */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60rem 60rem at 10% 10%, rgba(99,102,241,0.18), transparent 60%)," +
            "radial-gradient(50rem 50rem at 80% 30%, rgba(236,72,153,0.18), transparent 60%)," +
            "radial-gradient(40rem 40rem at 50% 80%, rgba(34,197,94,0.12), transparent 60%)",
        }}
      />

      {/* Slowly shifting hue layer */}
      <motion.div
        aria-hidden
        className="absolute inset-0 opacity-20 mix-blend-screen"
        animate={{ filter: [`hue-rotate(${hue}deg)`] as any }}
        transition={{ duration: 4, ease: "linear", repeat: Infinity }}
        style={{
          background:
            "conic-gradient(from 180deg at 50% 50%, #60a5fa33, #a78bfa33, #34d39933, #f472b633, #60a5fa33)",
        }}
      />

      {/* Grain */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" viewBox="0 0 160 160"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(%23n)" opacity="0.55"/></svg>\')',
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-6">
        <motion.div
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mx-auto flex w-full max-w-4xl flex-col items-center text-center"
        >
          {/* Logo / Spark */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-xl"
          >
            <Sparkles className="h-4 w-4" />
            <span className="text-xs uppercase tracking-widest text-white/80">
              Idea Explorer
            </span>
          </motion.div>

          {/* Main Phrase */}
          <h1 className="font-semibold leading-[1.05] tracking-tight">
            <span className="block text-5xl md:text-7xl">
              Find the idea that will ignite
            </span>
            <span className="mt-3 block bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-emerald-300 bg-clip-text text-transparent text-4xl md:text-6xl">
              your next startup
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-balance text-sm md:text-base text-white/70">
            Pure focus. No noise. One click — and you're already in the idea
            catalog.
          </p>

          {/* CTA buttons */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/ideas"
              className="group inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-6 py-3 text-base font-medium backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/20 hover:shadow-[0_10px_30px_-10px_rgba(99,102,241,0.6)]"
            >
              Go to ideas
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
            </Link>

            <Link
              href="/donate" // замените на вашу ссылку: BuyMeACoffee/ЮMoney/CloudTips
              className="inline-flex items-center gap-2 rounded-2xl border border-emerald-400/30 bg-emerald-400/10 px-5 py-3 text-base font-medium text-emerald-200 backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-400/20 hover:text-emerald-100"
            >
              <HeartHandshake className="h-5 w-5" /> Support the project
            </Link>
          </div>

          {/* Floating card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25 }}
            className="mt-14 w-full max-w-xl rounded-3xl border border-white/10 bg-white/5 p-4 text-left backdrop-blur-xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-widest text-white/60">
                  What's inside?
                </p>
                <p className="mt-1 text-sm text-white/80">
                  Ideas with filters, ratings, sources, and concise
                  descriptions.
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                <Sparkles className="h-5 w-5" />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom subtle chrome */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/60 to-transparent" />
    </div>
  );
}
