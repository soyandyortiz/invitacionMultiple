"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

const eventBadges = [
  { emoji: "⛪", label: "Primera Comunión" },
  { emoji: "💍", label: "Matrimonio" },
  { emoji: "🕊️", label: "Bautizos" },
  { emoji: "🏡", label: "Recepción" },
];

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{
          duration: 10,
          ease: "linear",
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="absolute inset-0 z-0"
      >
        <Image
          src="/images/foto-novios.png"
          alt="Celebración Familiar"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />
      </motion.div>

      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-6 inline-block"
        >
          <p className="uppercase tracking-[0.4em] text-xs md:text-sm mb-4 font-sans font-bold bg-white/10 backdrop-blur-md px-5 py-2 rounded-full border border-white/20">
            Una Celebración en Familia · Sábado 4 de Julio, 2026
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="mb-6"
        >
          <p className="text-sm md:text-lg font-serif italic text-white/90 max-w-2xl mx-auto leading-relaxed drop-shadow-md px-4">
            La familia Morocho Clavijo tiene el honor de invitarles a compartir
            este día tan especial lleno de bendiciones y amor
          </p>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
          className="text-6xl md:text-8xl font-serif mb-4 drop-shadow-2xl"
        >
          Silvana <span className="text-gold">&</span> Pablo
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="text-base md:text-lg font-serif italic text-white/70 mb-6 drop-shadow-md"
        >
          junto a Pablo Ariel · Luka Josue · Rommel Adolfito
        </motion.p>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "80px" }}
          transition={{ duration: 1, delay: 1 }}
          className="h-[2px] bg-gold mx-auto mb-8 shadow-inner"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="flex flex-wrap justify-center gap-2 mb-10 px-4"
        >
          {eventBadges.map((badge, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.4 + i * 0.12 }}
              className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs md:text-sm font-sans px-3 py-1.5 rounded-full"
            >
              <span>{badge.emoji}</span>
              <span>{badge.label}</span>
            </motion.span>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.9 }}
        >
          <motion.a
            href="#rsvp"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(184, 134, 11, 0.4)",
            }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-10 py-5 bg-gold text-white font-serif text-xl rounded-full shadow-2xl hover:bg-gold-dark transition-all duration-300"
          >
            Confirmar Asistencia
          </motion.a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 20 }}
        transition={{
          delay: 2.8,
          duration: 1.5,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 cursor-pointer group"
        onClick={() => {
          document
            .getElementById("countdown")
            ?.scrollIntoView({ behavior: "smooth" });
        }}
      >
        <span className="text-white/80 text-[10px] uppercase tracking-[0.3em] font-bold group-hover:text-gold transition-colors">
          Ver Agenda
        </span>
        <div className="p-2 border border-white/20 rounded-full group-hover:border-gold/50 transition-colors">
          <ChevronDown className="w-5 h-5 text-white/60 group-hover:text-gold transition-colors" />
        </div>
      </motion.div>
    </section>
  );
}
