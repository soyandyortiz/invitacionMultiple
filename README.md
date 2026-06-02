# Invitación Familiar — Morocho · Clavijo

Sitio web de invitación múltiple para la celebración familiar del **4 de Julio de 2026**: Primera Comunión, Matrimonio, Bautizos y Recepción.

**URL producción:** https://invitacionmorochoclavijo.vercel.app

---

## Stack

- **Next.js 16** (App Router)
- **React 19** + TypeScript
- **Tailwind CSS v4** con tema personalizado (gold, beige, ivory)
- **Framer Motion** para animaciones
- **Google Apps Script + Google Sheets** para almacenamiento de RSVP

---

## Desarrollo local

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # build de producción
npm run lint       # ESLint
```

### Variable de entorno requerida

Crea un archivo `.env.local` en la raíz:

```env
ADMIN_PASSWORD=Morocho2026
```

> Esta variable protege el dashboard `/confirmaciones`. Nunca se sube a Git (está en `.gitignore`).

---

## Despliegue en Vercel

1. Importa el repositorio desde **vercel.com/new**
2. Framework: **Next.js** (se detecta automáticamente)
3. Antes de hacer Deploy, agrega la variable de entorno:
   - **Name:** `ADMIN_PASSWORD`
   - **Value:** `Morocho2026`
   - **Environment:** Production (y Preview si se desea)
4. Haz Deploy

Cada `git push origin main` dispara un nuevo deploy automáticamente.

---

## Base de datos — Google Apps Script + Google Sheets

Esta es la parte más crítica. Sigue cada paso con cuidado.

### Paso 1 — Crear el Google Spreadsheet

1. Ve a [sheets.google.com](https://sheets.google.com) con la cuenta propietaria
2. Crea un nuevo documento
3. En la pestaña inferior (donde dice "Hoja 1"), haz **doble clic** y renómbrala exactamente:

   ```
   Confirmaciones
   ```

   > ⚠️ El nombre debe ser exactamente `Confirmaciones` — con C mayúscula, sin tilde, sin espacios extras. Si el nombre no coincide, el script lanza el error: `Cannot read properties of null (reading 'getLastRow')`.

### Paso 2 — Crear el Google Apps Script

1. En el Spreadsheet abierto, ve al menú **Extensiones → Apps Script**
2. Borra el código por defecto y pega el siguiente:

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet()
                  .getSheetByName("Confirmaciones");

    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Fecha", "Nombre", "Origen", "Asistirá",
        "Eventos", "Acompañantes Extra", "Nombres Acompañantes", "Mensaje"
      ]);
      sheet.getRange(1,1,1,8).setFontWeight("bold")
           .setBackground("#D4AF37").setFontColor("#ffffff");
    }

    var data = JSON.parse(e.postData.contents);
    var companions = "";
    if (data.companions && Array.isArray(data.companions)) {
      companions = data.companions.map(function(c){ return c.name; }).filter(Boolean).join(", ");
    }

    sheet.appendRow([
      new Date().toLocaleString("es-EC"),
      data.fullName   || "",
      data.origin     || "",
      data.attending === "yes" ? "Sí" : "No",
      data.events     || "",
      data.guestCount || 0,
      companions,
      data.message    || ""
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch(err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet()
                  .getSheetByName("Confirmaciones");
    var values = sheet.getDataRange().getValues();

    if (values.length <= 1) {
      return ContentService.createTextOutput("[]")
             .setMimeType(ContentService.MimeType.JSON);
    }

    var rows = values.slice(1).map(function(row) {
      var names = row[6] ? String(row[6]).split(", ").map(function(n){
        return { name: n.trim(), type: "acompañante" };
      }) : [];
      return {
        date:       row[0],
        fullName:   row[1],
        origin:     row[2],
        attending:  row[3] === "Sí" ? "yes" : "no",
        events:     row[4],
        guestCount: parseInt(row[5]) || 0,
        companions: names,
        message:    row[7]
      };
    });

    return ContentService
      .createTextOutput(JSON.stringify(rows))
      .setMimeType(ContentService.MimeType.JSON);

  } catch(err) {
    return ContentService
      .createTextOutput(JSON.stringify({ error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

3. Guarda el script con **Ctrl+S**

### Paso 3 — Desplegar el Apps Script

1. Haz clic en **Implementar → Nueva implementación**
2. En "Tipo", selecciona **Aplicación web**
3. Configura:
   - **Descripción:** `RSVP Invitación`
   - **Ejecutar como:** `Yo (tu-cuenta@gmail.com)`
   - **Quién tiene acceso:** `Cualquier persona` ← **crítico, debe ser esto exactamente**
4. Haz clic en **Implementar**
5. Copia la **URL de implementación** que aparece. Tiene este formato:
   ```
   https://script.google.com/macros/s/XXXXXXXXXX/exec
   ```

### Paso 4 — Actualizar la URL en el código

Si la URL del script cambió, actualízala en **dos archivos**:

**`app/api/rsvp/route.ts`** — línea 3:
```typescript
const SCRIPT_URL = "https://script.google.com/macros/s/TU_URL/exec";
```

**`app/confirmaciones/page.tsx`** — busca `SCRIPT_URL` al inicio del archivo:
```typescript
const SCRIPT_URL = "https://script.google.com/macros/s/TU_URL/exec";
```

Luego haz commit y push para que Vercel tome los cambios.

### Paso 5 — Autorizar el script (primera vez)

La primera vez que alguien envíe el formulario, Google puede pedir autorización:
1. Ve al Apps Script
2. Haz clic en **Revisar permisos** → **Permitir**
3. Si aparece "Google no ha verificado esta app", haz clic en **Configuración avanzada → Ir a [nombre] (no seguro)**

---

## Arquitectura del RSVP

```
Cliente (browser)
    ↓  POST /api/rsvp  (JSON)
Next.js Route Handler  (server-side, sin CORS)
    ↓  POST con text/plain body
Google Apps Script
    ↓  JSON.parse(e.postData.contents)
Google Sheets → hoja "Confirmaciones"
```

> El proxy server-side en `/api/rsvp` existe porque los navegadores bloquean `Content-Type: application/json` con `mode: no-cors`. Al hacer el fetch desde el servidor, no hay restricciones CORS.

---

## Panel de administración

Acceso: `/confirmaciones` (enlace discreto en el footer — ícono de candado)

- **Contraseña:** definida en `ADMIN_PASSWORD` (.env.local / Vercel env vars)
- Muestra estadísticas por familia y por evento
- Tabla filtrable con todos los registros
- Botón para descargar PDF con la lista de invitados organizada por familia

---

## Estructura de rutas

| Ruta | Descripción |
|------|-------------|
| `/` | Página principal de invitación |
| `/confirmaciones` | Dashboard admin (protegido con contraseña) |
| `/api/rsvp` | Proxy POST hacia Google Apps Script |
| `/api/admin-auth` | Verificación de contraseña admin |

---

## Errores comunes

| Error | Causa | Solución |
|-------|-------|----------|
| `Cannot read properties of null (reading 'getLastRow')` | La hoja no se llama exactamente "Confirmaciones" | Renombrar la pestaña en Google Sheets |
| Formulario no guarda datos pero no hay error visible | Apps Script no desplegado como "Cualquier persona" | Reimplementar con acceso "Cualquier persona" |
| Dashboard no carga datos | URL del script incorrecta o script no autorizado | Verificar URL en `confirmaciones/page.tsx` y autorizar el script |
| Error 401 en admin | `ADMIN_PASSWORD` no configurada en Vercel | Agregar variable de entorno en Vercel Settings |
