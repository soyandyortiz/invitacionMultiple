"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    image: "/images/primera-comunion.png",
    event: "Primera Comunión",
    emoji: "⛪",
    time: "10:00 AM",
    names: "Pablo Ariel Morocho Clavijo",
    extra: "Madrina: Elizabeth Lluguin",
  },
  {
    image: "/images/boda.png",
    event: "Matrimonio",
    emoji: "💍",
    time: "2:00 PM",
    names: "Silvana Clavijo & Pablo Morocho",
    extra: "Iglesia de San Francisco",
  },
  {
    image: "/images/bautizo.png",
    event: "Bautizos",
    emoji: "🕊️",
    time: "Después del Matrimonio",
    names: "Luka Josue & Rommel Adolfito",
    extra: "Iglesia de San Francisco",
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setCurrent((p) => (p + 1) % slides.length), []);
  const prev = useCallback(() => setCurrent((p) => (p - 1 + slides.length) % slides.length), []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [paused, next]);

  const slide = slides[current];

  return (
    <section
      id="inicio"
      className="relative h-screen flex items-center justify-center overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Sliding backgrounds */}
      <AnimatePresence initial={false}>
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0 z-0"
        >
          <Image
            src={slide.image}
            alt={slide.event}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </motion.div>
      </AnimatePresence>

      {/* Main content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto w-full">
        <motion.p
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="uppercase tracking-[0.4em] text-xs md:text-sm mb-6 font-sans font-bold bg-white/10 backdrop-blur-md px-5 py-2 rounded-full border border-white/20 inline-block"
        >
          Una Celebración en Familia · Sábado 4 de Julio, 2026
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
          className="text-6xl md:text-9xl font-serif mb-3 drop-shadow-2xl"
        >
          Silvana <span className="text-gold">&</span> Pablo
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="text-sm md:text-lg font-serif italic text-white/70 mb-6"
        >
          junto a Pablo Ariel · Luka Josue · Rommel Adolfito
        </motion.p>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "80px" }}
          transition={{ duration: 1, delay: 1 }}
          className="h-[2px] bg-gold mx-auto mb-8"
        />

        {/* Dynamic slide badge */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.45 }}
            className="mb-10"
          >
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md border border-white/25 px-5 py-2.5 rounded-full text-sm md:text-base font-serif mb-2">
              <span className="text-xl">{slide.emoji}</span>
              <span className="font-bold">{slide.event}</span>
              <span className="text-white/50 hidden sm:inline">·</span>
              <span className="text-white/75 hidden sm:inline">{slide.time}</span>
            </div>
            <p className="text-white/60 text-xs md:text-sm font-serif italic">
              {slide.names}
            </p>
          </motion.div>
        </AnimatePresence>

        <motion.a
          href="#rsvp"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(184,134,11,0.4)" }}
          whileTap={{ scale: 0.95 }}
          className="inline-block px-10 py-5 bg-gold text-white font-serif text-xl rounded-full shadow-2xl hover:bg-gold-dark transition-all duration-300"
        >
          Confirmar Asistencia
        </motion.a>
      </div>

      {/* Left arrow */}
      <button
        onClick={prev}
        aria-label="Anterior"
        className="absolute left-3 md:left-7 top-1/2 -translate-y-1/2 z-20 p-2.5 md:p-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white hover:bg-white/25 hover:border-gold/40 transition-all group"
      >
        <ChevronLeft className="w-5 h-5 group-hover:text-gold transition-colors" />
      </button>

      {/* Right arrow */}
      <button
        onClick={next}
        aria-label="Siguiente"
        className="absolute right-3 md:right-7 top-1/2 -translate-y-1/2 z-20 p-2.5 md:p-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white hover:bg-white/25 hover:border-gold/40 transition-all group"
      >
        <ChevronRight className="w-5 h-5 group-hover:text-gold transition-colors" />
      </button>

      {/* Dots with event labels */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-20 flex items-end gap-5 md:gap-8">
        {slides.map((s, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={s.event}
            className="flex flex-col items-center gap-2 group"
          >
            <span
              className={`text-[9px] md:text-[10px] uppercase tracking-[0.15em] font-bold transition-colors duration-300 ${
                i === current ? "text-gold" : "text-white/35 group-hover:text-white/60"
              }`}
            >
              {s.event}
            </span>
            <motion.div
              animate={{
                width: i === current ? 32 : 8,
                backgroundColor:
                  i === current ? "#D4AF37" : "rgba(255,255,255,0.35)",
              }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="h-[3px] rounded-full"
            />
          </button>
        ))}
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
        className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 cursor-pointer group"
        onClick={() =>
          document.getElementById("countdown")?.scrollIntoView({ behavior: "smooth" })
        }
      >
        <span className="text-white/40 text-[9px] uppercase tracking-[0.3em] font-bold group-hover:text-gold/70 transition-colors">
          Ver Agenda
        </span>
        <ChevronDown className="w-4 h-4 text-white/30 group-hover:text-gold/70 transition-colors" />
      </motion.div>
    </section>
  );
}
