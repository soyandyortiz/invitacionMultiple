"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, ChevronDown, Users, Heart } from "lucide-react";
import Image from "next/image";

const IGLESIA_ESPIRITU_SANTO = "Iglesia Espíritu Santo";
const IGLESIA_ESPIRITU_SANTO_MAP = "https://maps.app.goo.gl/1zYWoxepB2rgeg247";
const IGLESIA_ESPIRITU_SANTO_ADDR = "Monseñor Andrade y Edelberto Bonilla";

const events = [
  {
    emoji: "✝️",
    time: "10:00 AM",
    title: "Confirmación",
    location: "Iglesia de Santa Faz",
    mapLink: "https://maps.app.goo.gl/N1YRmzWh8MZh78Vb7",
    protagonists: ["Pablo Ariel Morocho Clavijo"],
    details: ["Madrina: Elizabeth Lluguin"],
    weddingParents: null,
    image: "/images/primera-comunion.png",
    dotColor: "bg-gold",
  },
  {
    emoji: "💍",
    time: "12:00 PM",
    title: "Matrimonio Civil y Eclesiástico",
    location: IGLESIA_ESPIRITU_SANTO,
    mapLink: IGLESIA_ESPIRITU_SANTO_MAP,
    protagonists: ["Silvana Clavijo", "Pablo Morocho"],
    details: [IGLESIA_ESPIRITU_SANTO_ADDR],
    weddingParents: {
      groom: { label: "Padres del novio", names: "Adolfo Morocho & Piedad Valdivieso" },
      bride: { label: "Padres de la novia", names: "David Clavijo & Julia González" },
    },
    image: "/images/boda.png",
    dotColor: "bg-rose-400",
  },
  {
    emoji: "🕊️",
    time: "A continuación del matrimonio",
    title: "Bautizos",
    location: IGLESIA_ESPIRITU_SANTO,
    mapLink: IGLESIA_ESPIRITU_SANTO_MAP,
    protagonists: ["Luka Josue", "Rommel Adolfito"],
    details: [IGLESIA_ESPIRITU_SANTO_ADDR],
    weddingParents: null,
    image: "/images/bautizo.png",
    dotColor: "bg-sky-400",
  },
  {
    emoji: "🏡",
    time: "Finalizado el acto religioso",
    title: "Recepción y Fiesta",
    location: "Casa de Targelia Godoy",
    mapLink: "https://maps.app.goo.gl/tWbPJ2fGYAmmMsBv9",
    protagonists: [],
    details: ["Av. Alfonso Chávez entre Rivera y Dr. Ángel Martínez"],
    weddingParents: null,
    image: null,
    dotColor: "bg-emerald-400",
  },
];

export default function EventInfo() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <section id="evento" className="py-24 bg-beige/10 overflow-hidden">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif text-gold-dark mb-4">Agenda del Día</h2>
          <div className="w-24 h-px bg-gold/40 mx-auto mb-6" />
          <p className="text-foreground/60 max-w-lg mx-auto font-serif italic text-sm leading-relaxed">
            Sábado 4 de Julio de 2026 — un día lleno de celebraciones en familia
          </p>
        </motion.div>

        <div className="relative">
          {/* Línea de tiempo */}
          <div className="absolute left-6 top-4 bottom-4 w-px bg-gradient-to-b from-gold/30 via-gold/20 to-transparent hidden sm:block" />

          <div className="space-y-4">
            {events.map((event, index) => {
              const isActive = activeIndex === index;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative sm:pl-16"
                >
                  {/* Dot timeline */}
                  <div
                    className={`absolute left-4 top-6 w-4 h-4 rounded-full border-2 border-white shadow-md hidden sm:block transition-all duration-300 ${event.dotColor} ${isActive ? "scale-125" : ""}`}
                  />

                  <div
                    className={`bg-white rounded-2xl border overflow-hidden shadow-sm cursor-pointer transition-all duration-300 ${
                      isActive
                        ? "border-gold/30 shadow-lg ring-1 ring-gold/15"
                        : "border-beige/60 hover:border-gold/20 hover:shadow-md"
                    }`}
                    onClick={() => setActiveIndex(isActive ? null : index)}
                  >
                    {/* Header — siempre visible */}
                    <div className="flex items-center justify-between p-5 gap-4">
                      <div className="flex items-center gap-4 min-w-0">
                        <span className="text-3xl flex-shrink-0">{event.emoji}</span>
                        <div className="min-w-0">
                          <p className="text-gold font-bold text-xs uppercase tracking-[0.15em] mb-0.5">
                            {event.time}
                          </p>
                          <h3 className="text-lg md:text-xl font-serif text-gold-dark leading-tight">
                            {event.title}
                          </h3>
                        </div>
                      </div>
                      <motion.div
                        animate={{ rotate: isActive ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex-shrink-0"
                      >
                        <ChevronDown className="w-5 h-5 text-gold/60" />
                      </motion.div>
                    </div>

                    {/* Contenido expandido */}
                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="border-t border-beige/50">
                            <div className="flex gap-0 md:gap-0">

                              {/* Foto del evento */}
                              {event.image && (
                                <div className="relative w-28 md:w-36 flex-shrink-0 self-stretch min-h-[140px]">
                                  <Image
                                    src={event.image}
                                    alt={event.title}
                                    fill
                                    className="object-cover"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20" />
                                </div>
                              )}

                              {/* Información */}
                              <div className="flex-1 px-5 py-4 space-y-4">
                                {/* Ubicación */}
                                <div className="flex items-start gap-3">
                                  <MapPin className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                                  <div>
                                    <p className="font-bold text-foreground text-sm">{event.location}</p>
                                    {event.details.map((d, i) => (
                                      <p key={i} className="text-foreground/55 text-xs mt-0.5 leading-relaxed">{d}</p>
                                    ))}
                                  </div>
                                </div>

                                {/* Protagonistas */}
                                {event.protagonists.length > 0 && (
                                  <div className="flex items-start gap-3">
                                    <Users className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                                    <div>
                                      <p className="text-xs text-foreground/45 uppercase tracking-widest font-bold mb-1.5">
                                        {event.protagonists.length === 1 ? "Protagonista" : "Protagonistas"}
                                      </p>
                                      <div className="flex flex-wrap gap-2">
                                        {event.protagonists.map((name, i) => (
                                          <span
                                            key={i}
                                            className="bg-gold/10 text-gold-dark text-sm font-serif px-3 py-1 rounded-full border border-gold/20"
                                          >
                                            {name}
                                          </span>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                )}

                                {/* Padres de los novios */}
                                {event.weddingParents && (
                                  <div className="flex items-start gap-3">
                                    <Heart className="w-4 h-4 text-rose-400 mt-0.5 flex-shrink-0" />
                                    <div className="space-y-2">
                                      <p className="text-xs text-foreground/45 uppercase tracking-widest font-bold mb-1.5">
                                        Con la bendición de sus padres
                                      </p>
                                      <div className="space-y-1.5">
                                        <div>
                                          <p className="text-xs text-foreground/45 uppercase tracking-wider">{event.weddingParents.groom.label}</p>
                                          <p className="text-sm font-serif text-gold-dark">{event.weddingParents.groom.names}</p>
                                        </div>
                                        <div>
                                          <p className="text-xs text-foreground/45 uppercase tracking-wider">{event.weddingParents.bride.label}</p>
                                          <p className="text-sm font-serif text-gold-dark">{event.weddingParents.bride.names}</p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )}

                                {/* Mapa */}
                                <motion.a
                                  href={event.mapLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.97 }}
                                  onClick={(e) => e.stopPropagation()}
                                  className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em] font-bold text-gold border border-gold/30 px-4 py-2.5 rounded-xl hover:bg-gold hover:text-white hover:border-gold transition-all"
                                >
                                  <MapPin className="w-3.5 h-3.5" />
                                  Ver Ubicación
                                </motion.a>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Código de vestimenta */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-14 bg-gold-dark text-white p-8 rounded-3xl shadow-xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -mr-20 -mt-20 pointer-events-none" />
          <div className="relative z-10">
            <p className="text-xs uppercase tracking-[0.3em] font-bold opacity-60 mb-2">Código de Vestimenta</p>
            <p className="text-3xl font-serif mb-3 uppercase tracking-widest">Formal</p>
            <p className="text-white/80 text-sm leading-relaxed">
              Te esperamos vestido/a con elegancia para acompañar la solemnidad
              de los actos religiosos y la celebración de la noche.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
