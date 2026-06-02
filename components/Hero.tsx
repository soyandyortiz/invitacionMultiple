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
    extra: "Madrina: Elizabeth Lluguin · Iglesia de Santa Faz",
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

// Corner ornament SVG — rota en cada esquina
function Corner({ className }: { className: string }) {
  return (
    <svg
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`absolute w-9 h-9 text-gold z-20 ${className}`}
    >
      <path d="M4 40 L4 4 L40 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="4" cy="4" r="3" fill="currentColor" />
      <circle cx="4" cy="40" r="1.5" fill="currentColor" opacity="0.5" />
      <circle cx="40" cy="4" r="1.5" fill="currentColor" opacity="0.5" />
    </svg>
  );
}

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
      {/* ── Fondo animado (siempre visible) ── */}
      <AnimatePresence initial={false}>
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0 z-0"
        >
          <Image src={slide.image} alt={slide.event} fill className="object-cover" priority />
          {/* Overlay más oscuro en mobile, menos en desktop para que el marco destaque */}
          <div className="absolute inset-0 bg-black/60 md:bg-black/70 md:backdrop-blur-[3px]" />
        </motion.div>
      </AnimatePresence>

      {/* ══ DESKTOP: split layout ══ */}
      <div className="hidden md:flex relative z-10 flex-1 items-center justify-center px-8 lg:px-16 pt-16">
        <div className="grid grid-cols-[1fr_1.25fr] gap-10 lg:gap-16 max-w-5xl w-full items-center">

          {/* ── Columna izquierda: marco ornamental ── */}
          <div className="relative flex justify-center">
            {/* Borde exterior sutil */}
            <div className="absolute -inset-5 border border-gold/20 rounded-3xl pointer-events-none" />

            {/* Esquinas ornamentales */}
            <Corner className="top-0 left-0" />
            <Corner className="top-0 right-0 rotate-90" />
            <Corner className="bottom-0 right-0 rotate-180" />
            <Corner className="bottom-0 left-0 -rotate-90" />

            {/* Imagen */}
            <div className="relative w-full max-w-[360px] aspect-[3/4] overflow-hidden rounded-2xl ring-1 ring-gold/25 shadow-2xl">
              <AnimatePresence initial={false}>
                <motion.div
                  key={current}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.2 }}
                  className="absolute inset-0"
                >
                  <Image src={slide.image} alt={slide.event} fill className="object-cover" priority />
                </motion.div>
              </AnimatePresence>

              {/* Badge evento sobre la imagen */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent px-5 py-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="flex items-center gap-2"
                  >
                    <span className="text-2xl">{slide.emoji}</span>
                    <div>
                      <p className="text-white font-serif font-bold text-base leading-tight">{slide.event}</p>
                      <p className="text-white/70 text-xs">{slide.time}</p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* ── Columna derecha: texto ── */}
          <div className="text-white">
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="uppercase tracking-[0.3em] text-[10px] lg:text-xs mb-5 font-bold bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 inline-block"
              style={{ textShadow: "0 1px 4px rgba(0,0,0,0.8)" }}
            >
              Una Celebración en Familia · 4 de Julio, 2026
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.2, ease: "easeOut" }}
              className="text-5xl lg:text-6xl xl:text-7xl font-serif leading-tight mb-3"
              style={{ textShadow: "0 4px 16px rgba(0,0,0,0.9)" }}
            >
              Silvana <span className="text-gold">&</span> Pablo
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-sm lg:text-base font-serif italic text-white/90 mb-5"
              style={{ textShadow: "0 2px 8px rgba(0,0,0,0.9)" }}
            >
              junto a Pablo Ariel · Luka Josue · Rommel Adolfito
            </motion.p>

            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "56px" }}
              transition={{ duration: 0.9, delay: 0.8 }}
              className="h-px bg-gold mb-5"
            />

            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4 }}
                className="mb-7"
              >
                <p
                  className="text-white/95 font-serif text-lg lg:text-xl font-bold mb-1"
                  style={{ textShadow: "0 2px 8px rgba(0,0,0,0.9)" }}
                >
                  {slide.names}
                </p>
                <p
                  className="text-white/70 text-xs lg:text-sm"
                  style={{ textShadow: "0 1px 6px rgba(0,0,0,0.9)" }}
                >
                  {slide.extra}
                </p>
              </motion.div>
            </AnimatePresence>

            <motion.a
              href="#rsvp"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
              whileHover={{ scale: 1.05, boxShadow: "0 16px 40px rgba(184,134,11,0.5)" }}
              whileTap={{ scale: 0.97 }}
              className="inline-block px-9 py-4 bg-gold text-white font-serif text-xl rounded-full shadow-xl hover:bg-gold-dark transition-all duration-300"
            >
              Confirmar Asistencia
            </motion.a>
          </div>
        </div>
      </div>

      {/* ══ MOBILE: centrado ══ */}
      <div className="md:hidden relative z-10 flex-1 flex items-center justify-center px-6 pt-16">
        <div className="text-center text-white w-full max-w-sm">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="uppercase tracking-[0.2em] text-[9px] mb-4 font-bold bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 inline-block"
          >
            <span className="sm:hidden">4 de Julio · 2026</span>
            <span className="hidden sm:inline">Una Celebración en Familia · 4 de Julio, 2026</span>
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.2 }}
            className="text-5xl font-serif leading-tight mb-2 whitespace-nowrap"
            style={{ textShadow: "0 4px 20px rgba(0,0,0,1)" }}
          >
            Silvana <span className="text-gold">&</span> Pablo
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-sm font-serif italic text-white/90 mb-4"
            style={{ textShadow: "0 2px 10px rgba(0,0,0,1)" }}
          >
            junto a Pablo Ariel · Luka Josue · Rommel Adolfito
          </motion.p>

          <div className="w-12 h-px bg-gold mx-auto mb-4" />

          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4 }}
              className="mb-6"
            >
              <div
                className="inline-flex items-center gap-2 bg-black/40 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full text-sm font-serif mb-1.5"
                style={{ textShadow: "0 1px 6px rgba(0,0,0,0.8)" }}
              >
                <span className="text-base">{slide.emoji}</span>
                <span className="font-bold text-white">{slide.event}</span>
                <span className="text-white/50">·</span>
                <span className="text-white/85 text-xs">{slide.time}</span>
              </div>
              <p
                className="text-white/85 text-xs font-serif italic"
                style={{ textShadow: "0 1px 8px rgba(0,0,0,1)" }}
              >
                {slide.names}
              </p>
            </motion.div>
          </AnimatePresence>

          <motion.a
            href="#rsvp"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="inline-block px-6 py-3 bg-gold text-white font-serif text-base rounded-full shadow-xl hover:bg-gold-dark transition-all"
          >
            Confirmar Asistencia
          </motion.a>
        </div>
      </div>

      {/* ── Barra inferior: flechas + dots + scroll ── */}
      <div className="relative z-20 flex items-center justify-between px-4 md:px-8 py-3 md:py-4">
        <button
          onClick={prev}
          aria-label="Anterior"
          className="p-2 md:p-2.5 bg-black/30 backdrop-blur-sm border border-white/20 rounded-full text-white hover:bg-black/50 hover:border-gold/50 transition-all group focus:outline-none"
        >
          <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 group-hover:text-gold transition-colors" />
        </button>

        <div className="flex items-end gap-4 md:gap-8">
          {slides.map((s, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={s.event}
              className="flex flex-col items-center gap-1.5 group focus:outline-none"
            >
              <span
                className="hidden md:block text-[10px] uppercase tracking-[0.12em] font-bold transition-colors duration-300"
                style={{
                  color: i === current ? "#D4AF37" : "rgba(255,255,255,0.55)",
                  textShadow: "0 1px 4px rgba(0,0,0,0.9)",
                }}
              >
                {s.event}
              </span>
              <motion.div
                animate={{
                  width: i === current ? 28 : 8,
                  backgroundColor: i === current ? "#D4AF37" : "rgba(255,255,255,0.4)",
                }}
                transition={{ duration: 0.4 }}
                className="h-[3px] rounded-full"
              />
            </button>
          ))}
        </div>

        <motion.button
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          onClick={() => document.getElementById("countdown")?.scrollIntoView({ behavior: "smooth" })}
          className="flex flex-col items-center gap-1 group focus:outline-none"
        >
          <span
            className="text-[9px] uppercase tracking-widest font-bold group-hover:text-gold transition-colors"
            style={{ color: "rgba(255,255,255,0.5)", textShadow: "0 1px 4px rgba(0,0,0,0.9)" }}
          >
            Agenda
          </span>
          <ChevronDown className="w-4 h-4 text-white/40 group-hover:text-gold transition-colors" />
        </motion.button>
      </div>
    </section>
  );
}
