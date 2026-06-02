import { NextRequest, NextResponse } from "next/server";

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbz3hUH8osRa_3RtnGC2MOziEMfrk9cxkGnJsq_1d01rWY6TdGnHU5a7WpcU1ZWUtHo/exec";

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();

    const response = await fetch(SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      return NextResponse.json(
        { success: false, error: `Error del servidor: ${response.status}` },
        { status: 502 }
      );
    }

    const result = await response.json();

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error || "Google Sheets rechazó los datos" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Error desconocido";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
