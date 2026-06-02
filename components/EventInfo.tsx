"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, ChevronDown, Users } from "lucide-react";

const events = [
  {
    emoji: "⛪",
    time: "10:00 AM",
    title: "Primera Comunión",
    location: "Iglesia de Santa Faz",
    mapLink: "https://www.google.com/maps/search/Iglesia+Santa+Faz",
    protagonists: ["Pablo Ariel Morocho Clavijo"],
    details: ["Madrina: Elizabeth Lluguin"],
    accent: "gold",
    bgFrom: "from-amber-50",
    borderHover: "hover:border-amber-300",
    dotColor: "bg-gold",
  },
  {
    emoji: "💍",
    time: "2:00 PM",
    title: "Matrimonio Civil y Eclesiástico",
    location: "Iglesia de San Francisco",
    mapLink: "https://www.google.com/maps/search/Iglesia+San+Francisco+Riobamba+Ecuador",
    protagonists: ["Silvana Clavijo", "Pablo Morocho"],
    details: [],
    accent: "rose",
    bgFrom: "from-rose-50",
    borderHover: "hover:border-rose-300",
    dotColor: "bg-rose-400",
  },
  {
    emoji: "🕊️",
    time: "A continuación del matrimonio",
    title: "Bautizos",
    location: "Iglesia de San Francisco",
    mapLink: "https://www.google.com/maps/search/Iglesia+San+Francisco+Riobamba+Ecuador",
    protagonists: ["Luka Josue", "Rommel Adolfito"],
    details: ["Se realiza en la misma iglesia que la boda"],
    accent: "sky",
    bgFrom: "from-sky-50",
    borderHover: "hover:border-sky-300",
    dotColor: "bg-sky-400",
  },
  {
    emoji: "🏡",
    time: "Finalizado el acto religioso",
    title: "Recepción y Fiesta",
    location: "Casa de Targelia Godoy",
    mapLink: "https://www.google.com/maps/search/Av+Alfonso+Chavez+Rivera+Angel+Martinez",
    protagonists: [],
    details: ["Av. Alfonso Chávez entre Rivera y Dr. Ángel Martínez"],
    accent: "emerald",
    bgFrom: "from-emerald-50",
    borderHover: "hover:border-emerald-300",
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
          <h2 className="text-4xl md:text-5xl font-serif text-gold-dark mb-4">
            Agenda del Día
          </h2>
          <div className="w-24 h-px bg-gold/40 mx-auto mb-6" />
          <p className="text-foreground/60 max-w-lg mx-auto font-serif italic text-sm leading-relaxed">
            Sábado 4 de Julio de 2026 — un día lleno de celebraciones en familia
          </p>
        </motion.div>

        <div className="relative">
          {/* Vertical timeline line */}
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
                  {/* Timeline dot */}
                  <div
                    className={`absolute left-4 top-6 w-4 h-4 rounded-full border-2 border-white shadow-md hidden sm:block ${event.dotColor} transition-all duration-300 ${isActive ? "scale-125" : ""}`}
                  />

                  <div
                    className={`bg-white rounded-2xl border border-beige/60 shadow-sm cursor-pointer transition-all duration-300 overflow-hidden ${event.borderHover} ${isActive ? "shadow-lg ring-1 ring-gold/20" : ""}`}
                    onClick={() =>
                      setActiveIndex(isActive ? null : index)
                    }
                  >
                    {/* Card header — always visible */}
                    <div className="flex items-center justify-between p-5 gap-4">
                      <div className="flex items-center gap-4 min-w-0">
                        <span className="text-3xl flex-shrink-0">{event.emoji}</span>
                        <div className="min-w-0">
                          <p className="text-gold font-bold text-xs uppercase tracking-[0.15em] mb-0.5">
                            {event.time}
                          </p>
                          <h3 className="text-lg md:text-xl font-serif text-gold-dark leading-tight truncate">
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

                    {/* Expanded content */}
                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className={`px-5 pb-5 bg-gradient-to-b ${event.bgFrom} to-white`}>
                            <div className="pt-3 border-t border-beige/60 space-y-4">
                              {/* Location */}
                              <div className="flex items-start gap-3">
                                <MapPin className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                                <div>
                                  <p className="font-bold text-foreground text-sm">
                                    {event.location}
                                  </p>
                                  {event.details.map((detail, i) => (
                                    <p key={i} className="text-foreground/60 text-xs mt-0.5 leading-relaxed">
                                      {detail}
                                    </p>
                                  ))}
                                </div>
                              </div>

                              {/* Protagonists */}
                              {event.protagonists.length > 0 && (
                                <div className="flex items-start gap-3">
                                  <Users className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                                  <div>
                                    <p className="text-xs text-foreground/50 uppercase tracking-widest font-bold mb-1">
                                      {event.protagonists.length === 1
                                        ? "Protagonista"
                                        : "Protagonistas"}
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

                              {/* Map link */}
                              <motion.a
                                href={event.mapLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={(e) => e.stopPropagation()}
                                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em] font-bold text-gold border border-gold/30 px-4 py-2.5 rounded-xl hover:bg-gold hover:text-white hover:border-gold transition-all mt-1"
                              >
                                <MapPin className="w-3.5 h-3.5" />
                                Ver Ubicación
                              </motion.a>
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

        {/* Dress code note */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-14 bg-gold-dark text-white p-8 rounded-3xl shadow-xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -mr-20 -mt-20" />
          <div className="relative z-10">
            <p className="text-xs uppercase tracking-[0.3em] font-bold opacity-60 mb-2">
              Código de Vestimenta
            </p>
            <p className="text-3xl font-serif mb-3 uppercase tracking-widest">
              Formal
            </p>
            <p className="text-white/80 text-sm leading-relaxed font-sans">
              Te esperamos vestido/a con elegancia para acompañar la solemnidad
              de los actos religiosos y la celebración de la noche.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
