# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Dev server (Turbopack, http://localhost:3000)
npm run build     # Production build
npm run start     # Run production server
npm run lint      # ESLint
```

## Architecture

Wedding invitation website for Eric & Evelin with RSVP and guest management.

**Stack:** Next.js 16 App Router · React 19 · TypeScript · Tailwind CSS v4 · Framer Motion

**Routes:**
- `/` — Main invitation page (`app/page.tsx`) — assembles all sections in order
- `/confirmaciones` — Admin dashboard to view RSVP submissions (`app/confirmaciones/page.tsx`)

**Component sections (rendered in order on `/`):**
`Navbar` → `Hero` → `Countdown` → `EventInfo` → `Story (Protagonistas)` → `RSVP` → `Footer`

**Event: Sábado 4 de Julio, 2026 — Familia Morocho · Clavijo**
1. ✝️ Confirmación (10:00 AM) — Pablo Ariel Morocho Clavijo — Iglesia de Santa Faz
2. 💍 Matrimonio (12:00 PM) — Silvana Clavijo & Pablo Morocho — Iglesia Espíritu Santo (Monseñor Andrade y Edelberto Bonilla)
3. 🕊️ Bautizos (después del matrimonio) — Luka Josue & Rommel Adolfito — Iglesia Espíritu Santo
4. 🏡 Recepción — Casa de Targelia Godoy — Av. Alfonso Chávez entre Rivera y Dr. Ángel Martínez

**Data flow:** RSVP form (`components/RSVP.tsx`) POSTs to a Google Apps Script Web App URL which writes to Google Sheets. The form sends: `origin`, `fullName`, `attending`, `events` (comma-separated list of selected events), `guestCount`, `companions[]`, `message`. The confirmations dashboard fetches from the same endpoint (GET) and filters by family origin (Familia Clavijo, Familia Morocho, Amistades).

**Styling conventions:**
- Custom Tailwind theme in `app/globals.css` — uses CSS custom properties: `ivory` (#FFFFF0), `beige` (#F5F5DC), `gold` (#D4AF37), `gold-dark` (#996515)
- Fonts: Playfair Display (headings), Inter (body)

**Key date hardcoded:**
- `components/Countdown.tsx` — `July 4, 2026 10:00:00`

**Interactive EventInfo timeline:** `components/EventInfo.tsx` uses local `activeIndex` state to expand/collapse event cards. First event is open by default (`useState(0)`).

**External integrations:**
- Google Apps Script endpoint in `components/RSVP.tsx` — handles POST (submit) and GET (fetch)
- Google Maps search links in `components/EventInfo.tsx` — update with exact URLs when available
