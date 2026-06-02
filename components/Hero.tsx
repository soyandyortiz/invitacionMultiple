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
      className="relative h-screen flex flex-col overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* ── Backgrounds (absoluto, detrás de todo) ── */}
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
          <div className="absolute inset-0 bg-black/55" />
        </motion.div>
      </AnimatePresence>

      {/* ── Contenido central (ocupa el espacio disponible) ── */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-14 md:px-24 pt-16">
        <div className="text-center text-white w-full max-w-2xl">

          <motion.p
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="uppercase tracking-[0.35em] text-[10px] md:text-[11px] mb-4 font-sans font-bold bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 inline-block"
          >
            Una Celebración en Familia · 4 de Julio, 2026
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.25, ease: "easeOut" }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif leading-tight mb-2 drop-shadow-2xl whitespace-nowrap"
          >
            Silvana <span className="text-gold">&</span> Pablo
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-xs md:text-sm font-serif italic text-white/60 mb-4"
          >
            junto a Pablo Ariel · Luka Josue · Rommel Adolfito
          </motion.p>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "56px" }}
            transition={{ duration: 0.9, delay: 0.9 }}
            className="h-px bg-gold mx-auto mb-5"
          />

          {/* Badge dinámico del slide */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4 }}
              className="mb-6"
            >
              <div className="inline-flex items-center gap-2 bg-white/12 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full text-sm font-serif mb-1.5 flex-wrap justify-center">
                <span className="text-base">{slide.emoji}</span>
                <span className="font-bold">{slide.event}</span>
                <span className="text-white/45 hidden sm:inline">·</span>
                <span className="text-white/70 text-xs hidden sm:inline">{slide.time}</span>
              </div>
              <p className="text-white/50 text-[11px] font-serif italic">{slide.names}</p>
            </motion.div>
          </AnimatePresence>

          <motion.a
            href="#rsvp"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
            whileHover={{ scale: 1.05, boxShadow: "0 16px 36px rgba(184,134,11,0.45)" }}
            whileTap={{ scale: 0.97 }}
            className="inline-block px-8 py-3.5 bg-gold text-white font-serif text-lg rounded-full shadow-xl hover:bg-gold-dark transition-all duration-300"
          >
            Confirmar Asistencia
          </motion.a>

        </div>
      </div>

      {/* ── Barra inferior: flechas + dots + scroll ── */}
      <div className="relative z-20 flex items-center justify-between px-4 md:px-8 py-4">

        {/* Flecha izquierda */}
        <button
          onClick={prev}
          aria-label="Anterior"
          className="p-2.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white hover:bg-white/25 hover:border-gold/50 transition-all group flex-shrink-0"
        >
          <ChevronLeft className="w-5 h-5 group-hover:text-gold transition-colors" />
        </button>

        {/* Dots con etiquetas */}
        <div className="flex items-end gap-4 md:gap-8">
          {slides.map((s, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={s.event}
              className="flex flex-col items-center gap-1.5 group"
            >
              <span
                className={`text-[8px] md:text-[10px] uppercase tracking-[0.1em] font-bold transition-colors duration-300 ${
                  i === current ? "text-gold" : "text-white/30 group-hover:text-white/55"
                }`}
              >
                {s.event}
              </span>
              <motion.div
                animate={{
                  width: i === current ? 28 : 8,
                  backgroundColor:
                    i === current ? "#D4AF37" : "rgba(255,255,255,0.3)",
                }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="h-[3px] rounded-full"
              />
            </button>
          ))}
        </div>

        {/* Scroll / Ver Agenda */}
        <motion.button
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          onClick={() =>
            document.getElementById("countdown")?.scrollIntoView({ behavior: "smooth" })
          }
          aria-label="Ver agenda"
          className="flex flex-col items-center gap-1 group flex-shrink-0"
        >
          <span className="text-white/30 text-[8px] md:text-[9px] uppercase tracking-widest font-bold group-hover:text-gold/60 transition-colors">
            Agenda
          </span>
          <ChevronDown className="w-4 h-4 text-white/30 group-hover:text-gold/60 transition-colors" />
        </motion.button>

      </div>
    </section>
  );
}
