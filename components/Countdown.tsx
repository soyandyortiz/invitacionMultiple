"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock } from "lucide-react";

export default function Countdown() {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const target = new Date("July 4, 2026 10:00:00").getTime();
    const interval = setInterval(() => {
      const distance = target - new Date().getTime();
      if (distance < 0) {
        setTime({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setTime({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const units = [
    { label: "Días", value: time.days },
    { label: "Horas", value: time.hours },
    { label: "Minutos", value: time.minutes },
    { label: "Segundos", value: time.seconds },
  ];

  return (
    <section id="countdown" className="py-24 bg-ivory border-y border-beige relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.05)_0%,transparent_70%)]" />
      </div>

      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-gold/10 text-gold-dark px-4 py-2 rounded-full text-xs uppercase tracking-[0.2em] font-bold border border-gold/20 mb-6">
            <Calendar className="w-3.5 h-3.5" />
            Sábado, 4 de Julio de 2026
          </div>
          <h2 className="text-4xl font-serif text-gold-dark mb-4">La Cuenta Regresiva</h2>
          <div className="w-16 h-px bg-gold/40 mx-auto mb-4" />
          <p className="text-foreground/50 text-sm font-serif italic flex items-center justify-center gap-2">
            <Clock className="w-3.5 h-3.5" />
            Confirmación · 10:00 AM
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-[2rem] shadow-xl border border-gold/10 p-8 md:p-14 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-48 h-48 bg-gold/5 rounded-full -mr-24 -mt-24" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gold/5 rounded-full -ml-24 -mb-24" />

          <div className="flex gap-4 md:gap-10 relative z-10 justify-center">
            {units.map((unit, i) => (
              <motion.div
                key={unit.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="flex flex-col items-center flex-1 max-w-[80px]"
              >
                <motion.span
                  key={unit.value}
                  initial={{ y: -8, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="text-4xl md:text-6xl font-serif text-gold-dark tabular-nums leading-none mb-2"
                >
                  {String(unit.value).padStart(2, "0")}
                </motion.span>
                <div className="w-8 h-px bg-gold/20 mb-2" />
                <span className="text-[10px] uppercase tracking-widest text-foreground/40 font-bold text-center">
                  {unit.label}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3"
        >
          {[
            { emoji: "✝️", time: "10:00 AM", label: "Confirmación" },
            { emoji: "💍", time: "12:00 PM", label: "Matrimonio" },
            { emoji: "🕊️", time: "Después", label: "Bautizos" },
            { emoji: "🏡", time: "Tarde", label: "Recepción" },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 + i * 0.1 }}
              className="bg-white border border-beige rounded-2xl p-4 text-center hover:border-gold/30 hover:shadow-md transition-all"
            >
              <span className="text-2xl block mb-1">{item.emoji}</span>
              <p className="text-gold font-bold text-xs">{item.time}</p>
              <p className="text-foreground/60 text-[11px] mt-0.5">{item.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
