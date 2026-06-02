"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

const images = [
  { src: "/images/galeria-0.jpg", alt: "Celebración familiar" },
  { src: "/images/galeria-1.jpg", alt: "Momento especial" },
  { src: "/images/galeria-2.jpg", alt: "Familia unida" },
];

export default function Gallery() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  const prev = useCallback(() => {
    setLightbox((i) => (i === null ? null : (i - 1 + images.length) % images.length));
  }, []);

  const next = useCallback(() => {
    setLightbox((i) => (i === null ? null : (i + 1) % images.length));
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (lightbox === null) return;
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, prev, next]);

  return (
    <section id="galeria" className="py-20 bg-beige/10">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-serif text-gold-dark mb-4">Galería</h2>
          <div className="w-16 h-px bg-gold/40 mx-auto mb-4" />
          <p className="text-foreground/50 font-serif italic text-sm">
            Momentos para recordar siempre
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              whileHover={{ scale: 1.02, y: -4 }}
              onClick={() => setLightbox(i)}
              className="relative aspect-[4/3] overflow-hidden rounded-2xl cursor-pointer shadow-md border border-beige/40 hover:shadow-xl hover:border-gold/20 transition-all duration-300 group"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-white text-xs uppercase tracking-widest font-bold bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
                  Ver
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center px-4"
            onClick={() => setLightbox(null)}
          >
            {/* Prev */}
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-gold/40 rounded-full text-white transition-all group"
            >
              <ChevronLeft className="w-6 h-6 group-hover:text-gold transition-colors" />
            </button>

            {/* Image */}
            <AnimatePresence mode="wait">
              <motion.div
                key={lightbox}
                initial={{ opacity: 0, scale: 0.93 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.93 }}
                transition={{ duration: 0.35 }}
                className="relative w-full max-w-3xl aspect-[4/3]"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={images[lightbox].src}
                  alt={images[lightbox].alt}
                  fill
                  className="object-contain rounded-xl"
                />
              </motion.div>
            </AnimatePresence>

            {/* Next */}
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-gold/40 rounded-full text-white transition-all group"
            >
              <ChevronRight className="w-6 h-6 group-hover:text-gold transition-colors" />
            </button>

            {/* Close */}
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-5 right-5 p-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-white/70 hover:text-white transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="absolute bottom-7 left-1/2 -translate-x-1/2 flex items-center gap-3">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setLightbox(i); }}
                  aria-label={`Imagen ${i + 1}`}
                >
                  <motion.div
                    animate={{
                      width: i === lightbox ? 28 : 8,
                      backgroundColor:
                        i === lightbox ? "#D4AF37" : "rgba(255,255,255,0.35)",
                    }}
                    transition={{ duration: 0.35 }}
                    className="h-[3px] rounded-full"
                  />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
