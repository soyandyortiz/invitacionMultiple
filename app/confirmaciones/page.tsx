"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, LogOut, Users, CheckCircle, XCircle, RefreshCw, FileDown, CreditCard, AlertCircle } from "lucide-react";

const PAGO_COMPLETADO = false;

interface RSVPData {
  fullName: string;
  origin: string;
  attending: string;
  events: string;
  guestCount: number;
  companions: { name: string; type: string }[];
  message: string;
  date: string;
}

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbz3hUH8osRa_3RtnGC2MOziEMfrk9cxkGnJsq_1d01rWY6TdGnHU5a7WpcU1ZWUtHo/exec";

// ── Login ──────────────────────────────────────────────────────────────
function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin-auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        sessionStorage.setItem("admin_auth", "true");
        onLogin();
      } else {
        setError("Contraseña incorrecta");
      }
    } catch {
      setError("Error de conexión. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-ivory flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl shadow-2xl border border-beige p-10 w-full max-w-sm text-center"
      >
        <div className="w-14 h-14 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Lock className="w-6 h-6 text-gold" />
        </div>
        <h1 className="text-2xl font-serif text-gold-dark mb-1">Panel Admin</h1>
        <p className="text-xs text-foreground/40 uppercase tracking-widest mb-8">
          Morocho · Clavijo 2026
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            placeholder="Contraseña"
            required
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError(""); }}
            className="w-full p-4 border border-beige rounded-2xl text-center font-serif text-lg focus:outline-none focus:border-gold focus:ring-4 focus:ring-gold/5 transition-all"
          />
          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="text-red-500 text-sm"
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-gold-dark text-white font-serif text-lg rounded-2xl hover:bg-gold transition-all shadow-lg disabled:opacity-60"
          >
            {loading ? (
              <span className="inline-flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Verificando...
              </span>
            ) : (
              "Ingresar"
            )}
          </button>
        </form>

        <a href="/" className="block mt-6 text-xs text-foreground/30 hover:text-gold transition-colors">
          ← Volver a la invitación
        </a>
      </motion.div>
    </div>
  );
}

// ── Payment Gate ───────────────────────────────────────────────────────
function PaymentGate({ onLogout }: { onLogout: () => void }) {
  return (
    <div className="min-h-screen bg-ivory flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl shadow-2xl border border-beige p-10 w-full max-w-md text-center"
      >
        <div className="w-16 h-16 bg-amber-50 border-2 border-amber-200 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="w-7 h-7 text-amber-500" />
        </div>

        <h1 className="text-2xl font-serif text-gold-dark mb-2">Acceso Restringido</h1>
        <p className="text-foreground/50 text-sm leading-relaxed mb-8">
          Para desbloquear el panel de estadísticas y ver la lista completa de invitados,
          completa el <span className="font-semibold text-gold-dark">pago del 50% restante</span> del servicio.
        </p>

        <div className="bg-beige/40 border border-beige rounded-2xl p-6 mb-8 text-left space-y-3">
          <div className="flex items-center gap-2 mb-4">
            <CreditCard className="w-4 h-4 text-gold" />
            <p className="text-xs uppercase tracking-widest font-bold text-gold-dark">Datos de Transferencia</p>
          </div>
          {[
            { label: "Banco", value: "Banco Pichincha" },
            { label: "Titular", value: "Andy Ortiz" },
            { label: "N° de Cuenta", value: "2207862136" },
            { label: "Tipo", value: "Cuenta de Ahorros" },
            { label: "Cédula", value: "0604511089" },
          ].map(({ label, value }) => (
            <div key={label} className="flex justify-between items-center border-b border-beige/60 pb-2 last:border-0 last:pb-0">
              <span className="text-xs text-foreground/40 uppercase tracking-wider">{label}</span>
              <span className="text-sm font-serif font-semibold text-gold-dark">{value}</span>
            </div>
          ))}
        </div>

        <p className="text-xs text-foreground/35 leading-relaxed mb-6">
          Una vez realizada la transferencia, envía el comprobante de pago para activar el acceso completo.
        </p>

        <button
          onClick={onLogout}
          className="text-xs text-foreground/30 hover:text-gold transition-colors"
        >
          ← Cerrar sesión
        </button>
      </motion.div>
    </div>
  );
}

// ── Stat card ──────────────────────────────────────────────────────────
function StatCard({
  label,
  value,
  sub,
  color = "gold",
}: {
  label: string;
  value: number | string;
  sub?: string;
  color?: "gold" | "green" | "red" | "blue";
}) {
  const colors = {
    gold: "bg-gold-dark text-white",
    green: "bg-green-600 text-white",
    red: "bg-red-500 text-white",
    blue: "bg-sky-600 text-white",
  };
  return (
    <div className={`${colors[color]} p-5 rounded-2xl shadow-md text-center`}>
      <span className="block text-3xl font-serif mb-0.5">{value}</span>
      <span className="text-xs uppercase tracking-widest opacity-80 block">{label}</span>
      {sub && <span className="text-[10px] opacity-60 mt-0.5 block">{sub}</span>}
    </div>
  );
}

// ── Dashboard ──────────────────────────────────────────────────────────
function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [data, setData] = useState<RSVPData[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [filterOrigin, setFilterOrigin] = useState("all");
  const [filterAttending, setFilterAttending] = useState("all");

  const load = async (showRefresh = false) => {
    if (showRefresh) setRefreshing(true);
    else setLoading(true);
    try {
      const res = await fetch(SCRIPT_URL);
      const json = await res.json();
      setData(Array.isArray(json) ? json : []);
    } catch {
      console.error("Error cargando datos");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => { load(); }, []);

  const attending = data.filter((d) => d.attending === "yes");
  const notAttending = data.filter((d) => d.attending === "no");
  const totalPersons = attending.reduce((acc, d) => acc + 1 + (d.guestCount || 0), 0);

  const byOrigin = (origin: string) =>
    attending.filter((d) => d.origin === origin).reduce((acc, d) => acc + 1 + (d.guestCount || 0), 0);

  const byEvent = (keyword: string) =>
    attending.filter((d) => d.events?.toLowerCase().includes(keyword)).reduce((acc, d) => acc + 1 + (d.guestCount || 0), 0);

  const filtered = data.filter((d) => {
    const matchOrigin = filterOrigin === "all" || d.origin === filterOrigin;
    const matchAtt = filterAttending === "all" || d.attending === filterAttending;
    return matchOrigin && matchAtt;
  });

  const downloadPDF = async () => {
    setDownloading(true);
    try {
      const { default: jsPDF } = await import("jspdf");
      const { default: autoTable } = await import("jspdf-autotable");

      const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
      const GOLD = [180, 140, 40] as [number, number, number];
      const GOLD_DARK = [120, 80, 15] as [number, number, number];
      const BEIGE = [245, 240, 225] as [number, number, number];
      const W = doc.internal.pageSize.getWidth();

      // ── Encabezado ──
      doc.setFillColor(...GOLD_DARK);
      doc.rect(0, 0, W, 22, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.text("CONFIRMACIONES DE ASISTENCIA", W / 2, 10, { align: "center" });
      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      doc.text("Morocho · Clavijo  —  Sábado 4 de Julio 2026", W / 2, 17, { align: "center" });

      // Generado el…
      doc.setTextColor(120, 100, 60);
      doc.setFontSize(7);
      doc.text(`Generado: ${new Date().toLocaleString("es-EC")}`, W - 10, 26, { align: "right" });

      // ── Resumen ──
      const attending = data.filter((d) => d.attending === "yes");
      const totalPersons = attending.reduce((a, d) => a + 1 + (d.guestCount || 0), 0);
      const summary = [
        ["Total respuestas", String(data.length)],
        ["Asistirán", String(attending.length)],
        ["No asistirán", String(data.filter((d) => d.attending === "no").length)],
        ["Total personas confirmadas", String(totalPersons)],
      ];
      let y = 30;
      doc.setFontSize(8);
      doc.setTextColor(...GOLD_DARK);
      doc.setFont("helvetica", "bold");
      doc.text("RESUMEN", 10, y);
      y += 4;
      summary.forEach(([label, val]) => {
        doc.setFont("helvetica", "normal");
        doc.setTextColor(80, 60, 20);
        doc.text(`${label}:`, 12, y);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(...GOLD_DARK);
        doc.text(val, 65, y);
        y += 4.5;
      });

      // ── Grupos ──
      const groups = [
        { label: "FAMILIA CLAVIJO", rows: data.filter((d) => d.origin === "Familia Clavijo") },
        { label: "FAMILIA MOROCHO", rows: data.filter((d) => d.origin === "Familia Morocho") },
        { label: "AMISTADES",        rows: data.filter((d) => d.origin === "Amistades") },
      ];

      const COLS = ["N°", "Nombre Completo", "Asistirá", "Eventos", "+Pers.", "Acompañantes", "Mensaje", "Fecha Registro"];
      const WIDTHS = [8, 45, 14, 60, 12, 50, 55, 30];

      groups.forEach((group) => {
        if (group.rows.length === 0) return;

        // Título de sección
        const currentY: number = (doc as any).lastAutoTable?.finalY
          ? (doc as any).lastAutoTable.finalY + 8
          : y + 4;

        doc.setFillColor(...GOLD);
        doc.roundedRect(10, currentY - 4, W - 20, 7, 1, 1, "F");
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(9);
        doc.setFont("helvetica", "bold");
        doc.text(`${group.label}  (${group.rows.length} respuestas)`, 14, currentY);

        autoTable(doc, {
          startY: currentY + 5,
          head: [COLS],
          body: group.rows.map((row, i) => [
            String(i + 1),
            row.fullName || "",
            row.attending === "yes" ? "Sí ✓" : "No ✗",
            (row.events || "").replace(/,\s*/g, "\n"),
            row.guestCount > 0 ? `+${row.guestCount}` : "—",
            row.companions?.map((c) => c.name).filter(Boolean).join("\n") || "—",
            row.message || "—",
            row.date ? String(row.date).substring(0, 16) : "—",
          ]),
          columnStyles: WIDTHS.reduce<Record<number, { cellWidth: number }>>((acc, w, i) => {
            acc[i] = { cellWidth: w };
            return acc;
          }, {}),
          headStyles: {
            fillColor: GOLD_DARK,
            textColor: [255, 255, 255],
            fontStyle: "bold",
            fontSize: 7,
            cellPadding: 2,
          },
          bodyStyles: { fontSize: 7, cellPadding: 2, textColor: [50, 40, 10] },
          alternateRowStyles: { fillColor: BEIGE },
          didParseCell: (hookData) => {
            if (hookData.column.index === 2 && hookData.section === "body") {
              const val = String(hookData.cell.text);
              hookData.cell.styles.textColor = val.startsWith("Sí")
                ? [22, 100, 50]
                : [180, 30, 30];
              hookData.cell.styles.fontStyle = "bold";
            }
          },
          margin: { left: 10, right: 10 },
          tableWidth: W - 20,
          showHead: "everyPage",
          didDrawPage: () => {
            // Pie de página en cada página
            const pageCount = (doc as any).internal.getNumberOfPages();
            doc.setFontSize(7);
            doc.setTextColor(180, 160, 120);
            doc.text(
              `Pág. ${pageCount}  —  Morocho · Clavijo 2026`,
              W / 2,
              doc.internal.pageSize.getHeight() - 5,
              { align: "center" }
            );
          },
        });
      });

      // Pie final
      const finalY: number = (doc as any).lastAutoTable?.finalY ?? 200;
      doc.setFontSize(7);
      doc.setTextColor(160, 140, 100);
      doc.text(
        `Total personas confirmadas: ${totalPersons}  |  Respuestas: ${data.length}`,
        W / 2,
        finalY + 8,
        { align: "center" }
      );

      doc.save("confirmaciones-morocho-clavijo-2026.pdf");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-ivory font-sans">
      {/* Header */}
      <div className="bg-white border-b border-beige sticky top-0 z-10 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-serif text-gold-dark leading-none">Panel de Confirmaciones</h1>
            <p className="text-xs text-foreground/40 mt-0.5">Morocho · Clavijo · 4 de Julio 2026</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => load(true)}
              disabled={refreshing}
              className="p-2.5 border border-beige rounded-xl hover:border-gold/40 transition-all group"
              title="Actualizar datos"
            >
              <RefreshCw className={`w-4 h-4 text-foreground/40 group-hover:text-gold transition-colors ${refreshing ? "animate-spin" : ""}`} />
            </button>
            <button
              onClick={downloadPDF}
              disabled={downloading || loading || data.length === 0}
              className="flex items-center gap-2 px-4 py-2 bg-gold-dark text-white text-xs font-bold rounded-xl hover:bg-gold transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
              title="Descargar PDF"
            >
              {downloading ? (
                <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <FileDown className="w-3.5 h-3.5" />
              )}
              {downloading ? "Generando..." : "Descargar PDF"}
            </button>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 border border-beige rounded-xl text-xs text-foreground/50 hover:border-red-300 hover:text-red-400 transition-all"
            >
              <LogOut className="w-3.5 h-3.5" />
              Salir
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">

        {/* Resumen general */}
        <div>
          <p className="text-xs uppercase tracking-widest text-foreground/40 font-bold mb-4">Resumen General</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <StatCard label="Total personas" value={totalPersons} color="gold" />
            <StatCard label="Confirmaron" value={attending.length} sub="respuestas" color="green" />
            <StatCard label="No asistirán" value={notAttending.length} sub="respuestas" color="red" />
            <StatCard label="Respuestas" value={data.length} sub="en total" color="blue" />
          </div>
        </div>

        {/* Por familia */}
        <div>
          <p className="text-xs uppercase tracking-widest text-foreground/40 font-bold mb-4">Por Familia</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { label: "Familia Clavijo", key: "Familia Clavijo" },
              { label: "Familia Morocho", key: "Familia Morocho" },
              { label: "Amistades", key: "Amistades" },
            ].map((f) => (
              <div key={f.key} className="bg-white border border-beige rounded-2xl p-5 flex items-center justify-between shadow-sm hover:border-gold/30 transition-all">
                <span className="font-serif text-gold-dark">{f.label}</span>
                <span className="text-3xl font-serif text-gold">{byOrigin(f.key)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Por evento */}
        <div>
          <p className="text-xs uppercase tracking-widest text-foreground/40 font-bold mb-4">Por Evento</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { emoji: "✝️", label: "Confirmación", key: "primera" },
              { emoji: "💍", label: "Matrimonio", key: "matrimonio" },
              { emoji: "🕊️", label: "Bautizos", key: "bautizo" },
              { emoji: "🏡", label: "Recepción", key: "recepci" },
            ].map((ev) => (
              <div key={ev.key} className="bg-white border border-beige rounded-2xl p-4 text-center shadow-sm hover:border-gold/30 transition-all">
                <span className="text-2xl block mb-1">{ev.emoji}</span>
                <span className="text-2xl font-serif text-gold-dark block">{byEvent(ev.key)}</span>
                <span className="text-[10px] uppercase tracking-widest text-foreground/40">{ev.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Filtros + Tabla */}
        <div>
          <p className="text-xs uppercase tracking-widest text-foreground/40 font-bold mb-4">Lista de Respuestas</p>

          <div className="flex flex-wrap gap-3 mb-4">
            <select
              value={filterOrigin}
              onChange={(e) => setFilterOrigin(e.target.value)}
              className="flex-1 min-w-[160px] p-3 rounded-xl border border-beige bg-white text-sm focus:outline-none focus:border-gold transition-all"
            >
              <option value="all">Todas las familias</option>
              <option value="Familia Clavijo">Familia Clavijo</option>
              <option value="Familia Morocho">Familia Morocho</option>
              <option value="Amistades">Amistades</option>
            </select>
            <select
              value={filterAttending}
              onChange={(e) => setFilterAttending(e.target.value)}
              className="flex-1 min-w-[140px] p-3 rounded-xl border border-beige bg-white text-sm focus:outline-none focus:border-gold transition-all"
            >
              <option value="all">Todos</option>
              <option value="yes">Solo asisten</option>
              <option value="no">No asisten</option>
            </select>
          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-beige overflow-hidden">
            {loading ? (
              <div className="p-20 text-center">
                <div className="w-8 h-8 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-foreground/40 italic font-serif text-sm">Cargando datos...</p>
              </div>
            ) : filtered.length === 0 ? (
              <div className="p-20 text-center text-foreground/30 font-serif italic">
                No se encontraron registros.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-beige/30 border-b border-beige">
                    <tr>
                      {["Nombre", "Origen", "Asiste", "Eventos", "Acompañantes", "Mensaje"].map((h) => (
                        <th key={h} className="px-5 py-4 font-serif text-gold-dark text-sm whitespace-nowrap">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-beige/40">
                    {filtered.map((row, i) => (
                      <motion.tr
                        key={i}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.03 }}
                        className="hover:bg-ivory/50 transition-colors"
                      >
                        <td className="px-5 py-4 font-bold text-foreground whitespace-nowrap">{row.fullName}</td>
                        <td className="px-5 py-4 text-foreground/60 whitespace-nowrap">{row.origin}</td>
                        <td className="px-5 py-4">
                          {row.attending === "yes" ? (
                            <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 text-xs font-bold px-2.5 py-1 rounded-full border border-green-200">
                              <CheckCircle className="w-3 h-3" /> Sí
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 bg-red-50 text-red-600 text-xs font-bold px-2.5 py-1 rounded-full border border-red-200">
                              <XCircle className="w-3 h-3" /> No
                            </span>
                          )}
                        </td>
                        <td className="px-5 py-4 text-foreground/60 max-w-[180px]">
                          <span className="text-xs leading-relaxed">{row.events || "—"}</span>
                        </td>
                        <td className="px-5 py-4">
                          {row.guestCount > 0 ? (
                            <div className="flex flex-col gap-1">
                              <span className="inline-flex items-center gap-1 text-xs text-gold-dark font-bold">
                                <Users className="w-3 h-3" /> +{row.guestCount}
                              </span>
                              {row.companions?.map((c, ci) => (
                                <span key={ci} className="text-[11px] bg-gold/8 text-gold-dark px-2 py-0.5 rounded-full border border-gold/15">
                                  {c.name}
                                </span>
                              ))}
                            </div>
                          ) : (
                            <span className="text-foreground/25 text-xs">Solo</span>
                          )}
                        </td>
                        <td className="px-5 py-4 text-foreground/50 italic max-w-[200px] truncate text-xs">
                          {row.message || "—"}
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          <p className="text-right text-xs text-foreground/30 mt-2">{filtered.length} registros mostrados</p>
        </div>

      </div>
    </div>
  );
}

// ── Página principal ───────────────────────────────────────────────────
export default function ConfirmacionesPage() {
  const [isAuth, setIsAuth] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const auth = sessionStorage.getItem("admin_auth");
    setIsAuth(auth === "true");
    setChecking(false);
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("admin_auth");
    setIsAuth(false);
  };

  if (checking) return null;
  if (!isAuth) return <LoginScreen onLogin={() => setIsAuth(true)} />;
  if (!PAGO_COMPLETADO) return <PaymentGate onLogout={handleLogout} />;
  return <Dashboard onLogout={handleLogout} />;
}
