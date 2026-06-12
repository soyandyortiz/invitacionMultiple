"use client";

const SHOW_BANNER = false;

export default function MaintenanceBanner() {
  if (!SHOW_BANNER) return null;

  return (
    <div className="w-full bg-amber-50 border-b border-amber-300 text-amber-800 text-center text-sm py-2 px-4">
      <span className="font-semibold">Sitio en desarrollo</span>
      {" "}— Algunos detalles del diseño pueden cambiar. Gracias por su paciencia.
    </div>
  );
}
