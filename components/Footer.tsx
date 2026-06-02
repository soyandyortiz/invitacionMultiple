import { Lock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-16 bg-[#2D2D2D] text-white text-center relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <h2 className="font-serif text-4xl mb-1 text-gold tracking-wider">
          Morocho · Clavijo
        </h2>
        <p className="text-white/40 text-[10px] tracking-[0.5em] uppercase mb-8 font-light">
          Celebración Familiar · 4 de Julio 2026
        </p>

        <div className="flex justify-center items-center gap-4 mb-10">
          <div className="h-px w-12 bg-gold/30" />
          <p className="font-serif italic text-gold/80 text-lg">
            "La familia es donde la vida comienza y el amor nunca termina."
          </p>
          <div className="h-px w-12 bg-gold/30" />
        </div>

        <div className="flex justify-center gap-6 mb-10 flex-wrap">
          {["⛪ Primera Comunión", "💍 Matrimonio", "🕊️ Bautizos", "🏡 Recepción"].map((item) => (
            <span key={item} className="text-white/30 text-xs tracking-widest">{item}</span>
          ))}
        </div>

        <div className="pt-10 border-t border-white/5">
          <div className="inline-block group">
            <p className="text-white/30 text-[9px] tracking-[0.3em] uppercase mb-2 group-hover:text-gold/50 transition-colors">
              Diseño y Tecnología
            </p>
            <a
              href="https://guambraweb.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-block px-8 py-3 border border-gold/20 rounded-full hover:border-gold hover:bg-gold/5 transition-all duration-500"
            >
              <span className="relative z-10 text-gold font-bold tracking-[0.2em] text-xs uppercase">
                Desarrollado por{" "}
                <span className="text-white group-hover:text-gold transition-colors">
                  GuambraWeb
                </span>
              </span>
            </a>
          </div>
          <p className="mt-8 text-white/20 text-[10px]">
            © {new Date().getFullYear()} Todos los derechos reservados
          </p>
        </div>
      </div>

      {/* Acceso admin */}
      <a
        href="/confirmaciones"
        title="Panel de administración"
        className="absolute bottom-4 right-5 flex items-center gap-1.5 text-white/25 hover:text-white/60 transition-colors duration-300 group"
      >
        <Lock className="w-3 h-3" />
        <span className="text-[9px] uppercase tracking-widest font-bold">Admin</span>
      </a>
    </footer>
  );
}
