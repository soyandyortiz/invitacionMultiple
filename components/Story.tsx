"use client";

import { motion } from "framer-motion";

const protagonists = [
  {
    emoji: "⛪",
    event: "Primera Comunión",
    names: ["Pablo Ariel Morocho Clavijo"],
    note: "Madrina: Elizabeth Lluguin",
    highlight: true,
  },
  {
    emoji: "💍",
    event: "Matrimonio Civil y Eclesiástico",
    names: ["Silvana Clavijo", "Pablo Morocho"],
    note: "Unidos ante Dios y la familia",
    highlight: false,
  },
  {
    emoji: "🕊️",
    event: "Bautizos",
    names: ["Luka Josue", "Rommel Adolfito"],
    note: "Reciben las aguas del bautismo",
    highlight: false,
  },
];

export default function Story() {
  return (
    <section
      id="protagonistas"
      className="py-24 px-6 md:px-12 bg-ivory relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl -mr-48 -mt-48 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl -ml-48 -mb-48 pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block px-5 py-2 bg-gold/10 text-gold-dark rounded-full text-xs font-bold tracking-[0.2em] uppercase border border-gold/20 mb-6">
            4 de Julio, 2026
          </div>
          <h2 className="text-5xl md:text-6xl font-serif text-gold-dark mb-4">
            Los Protagonistas
          </h2>
          <div className="w-24 h-px bg-gold/40 mx-auto mb-6" />
          <p className="text-foreground/60 font-serif italic text-lg max-w-lg mx-auto leading-relaxed">
            Tres sacramentos, una familia, un mismo día de bendiciones
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {protagonists.map((group, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -6 }}
              className={`relative rounded-3xl overflow-hidden shadow-lg border transition-all duration-300 ${
                group.highlight
                  ? "bg-gold-dark border-gold-dark text-white"
                  : "bg-white border-beige hover:border-gold/30 hover:shadow-xl"
              }`}
            >
              {group.highlight && (
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -mr-20 -mt-20" />
                  <div className="absolute bottom-0 left-0 w-40 h-40 bg-gold/20 rounded-full -ml-20 -mb-20" />
                </div>
              )}

              <div className="p-8 relative z-10">
                <motion.span
                  animate={{ rotate: [0, 8, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: index * 1.2 }}
                  className="text-5xl block mb-5"
                >
                  {group.emoji}
                </motion.span>

                <p
                  className={`text-xs uppercase tracking-[0.2em] font-bold mb-3 ${
                    group.highlight ? "text-white/60" : "text-gold"
                  }`}
                >
                  {group.event}
                </p>

                <div className="space-y-2 mb-5">
                  {group.names.map((name, i) => (
                    <h3
                      key={i}
                      className={`font-serif leading-tight ${
                        group.highlight ? "text-white text-2xl" : "text-gold-dark text-xl"
                      }`}
                    >
                      {name}
                    </h3>
                  ))}
                </div>

                <div
                  className={`w-10 h-px mb-4 ${
                    group.highlight ? "bg-white/30" : "bg-gold/30"
                  }`}
                />

                <p
                  className={`text-sm font-serif italic leading-relaxed ${
                    group.highlight ? "text-white/80" : "text-foreground/60"
                  }`}
                >
                  {group.note}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-14 text-center"
        >
          <div className="inline-block bg-white border border-beige rounded-3xl px-10 py-8 shadow-sm max-w-2xl">
            <p className="text-3xl mb-3">🏡</p>
            <p className="text-xs uppercase tracking-[0.2em] font-bold text-gold mb-2">
              Recepción y Fiesta
            </p>
            <p className="font-serif text-gold-dark text-xl mb-3">
              Casa de Targelia Godoy
            </p>
            <p className="text-foreground/60 text-sm leading-relaxed">
              Una vez finalizados los actos religiosos, nos reuniremos para
              celebrar en familia con música, alegría y mucho amor.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
