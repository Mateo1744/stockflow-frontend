# StockFlow Frontend

Aplicación SaaS administrativa para operar StockFlow de extremo a extremo: autenticación por roles, catálogos, inventario trazable, entradas, salidas, ventas, dashboard y reportes. Este repositorio contiene el cliente web; la API Spring Boot es la autoridad de seguridad y negocio.

## Backend

El backend oficial es [Mateo1744/stockflow-api](https://github.com/Mateo1744/stockflow-api). Su URL se configura en build time mediante `VITE_API_URL`.

## Capturas

La guía para capturas reales está en [`docs/screenshots`](docs/screenshots/README.md). No se incluyen mockups presentados como datos reales.

## Stack

- React 19, TypeScript 7 y Vite 8
- React Router, TanStack Query y Axios
- React Hook Form y Zod
- Tailwind CSS 4 y primitivas estilo shadcn/ui
- Lucide React, Recharts y Sonner
- Vitest, Testing Library y jsdom

## Funcionalidades

- Login JWT, sesión persistida, logout, guards y autorización por rol.
- Perfil seguro derivado de la sesión, sin exponer token ni credenciales.
- CRUD de productos, categorías, proveedores, clientes y usuarios.
- Inventario de solo lectura y trazabilidad de movimientos.
- Entradas y salidas con borrador, confirmación y cancelación.
- Ventas pendientes, completadas o canceladas; la API determina precios y stock.
- Dashboard y reportes reales por rol, incluido filtro temporal soportado por ventas.
- Filtros, paginación, estados de carga/error/vacío, tema oscuro y diseño responsive.

## Roles

- `ADMIN`: operación y reportes completos.
- `INVENTORY_MANAGER`: catálogos de inventario, proveedores, existencias, movimientos, entradas/salidas y lectura de ventas.
- `SELLER`: productos/categorías, clientes, ventas y reporte de ventas.

La interfaz aplica permisos en rutas y acciones, pero cada petición sigue siendo validada por la API.

## Instalación

Requiere Node.js 22+ y una instancia de StockFlow API.

```bash
npm ci
cp .env.example .env
npm run dev
```

En PowerShell: `Copy-Item .env.example .env`.

## Variables

```env
VITE_API_URL=http://localhost:8080
```

No se incluyen JWT, contraseñas ni secretos en variables del frontend. Para desarrollo desde `http://localhost:5173`, el backend debe permitir exactamente ese origen mediante CORS. Para la imagen Docker expuesta en el ejemplo, debe permitir `http://localhost:3000`.

## Scripts y calidad

```bash
npm run dev
npx tsc -b
npm run lint
npm run test
npx vite build --configLoader native
```

El loader nativo se recomienda en Windows cuando Vite devuelve `spawn EPERM`. GitHub Actions ejecuta instalación reproducible, TypeScript, lint, tests y build.

## Arquitectura

```text
src/
  app/                    providers y rutas lazy
  components/
    layout/               shell administrativo responsive
    shared/               estados, tablas, diálogos y pickers
    ui/                   primitivas visuales
  features/
    auth/ dashboard/ profile/ reports/
    products/ categories/ suppliers/ customers/ users/
    inventory/ inventory-movements/
    stock-entries/ stock-exits/ sales/
  lib/
    api/                  cliente Axios y errores normalizados
    auth/                 sesión y roles encapsulados
    utils/                formatos y utilidades
  types/                  contratos de la API
```

Cada dominio conserva sus API y query keys. TanStack Query invalida únicamente inventario, movimientos, documentos y reportes relacionados después de una operación. Los importes de formularios son ayudas visuales; el backend calcula el valor definitivo.

## Docker

La imagen multi-stage compila con Node 22 y sirve `dist` desde Nginx con fallback SPA y caché inmutable para assets:

```bash
docker build --build-arg VITE_API_URL=http://localhost:8080 -t stockflow-frontend .
docker run --rm -p 3000:80 stockflow-frontend
```

`compose.full-stack.yml` supone que el backend está en `../stockflow-api`. `VITE_API_URL` debe ser una URL accesible por el navegador, no el hostname interno de Docker. Define los secretos y el bootstrap solo en el entorno local:

```powershell
$env:POSTGRES_PASSWORD = '<local-only>'
$env:JWT_SECRET = '<base64-secret-of-at-least-32-bytes>'
$env:STOCKFLOW_BOOTSTRAP_ADMIN_ENABLED = 'true'
$env:STOCKFLOW_BOOTSTRAP_ADMIN_EMAIL = 'admin@example.com'
$env:STOCKFLOW_BOOTSTRAP_ADMIN_PASSWORD = '<local-only>'
$env:STOCKFLOW_BOOTSTRAP_ADMIN_FIRST_NAME = 'Admin'
$env:STOCKFLOW_BOOTSTRAP_ADMIN_LAST_NAME = 'StockFlow'
docker compose -f compose.full-stack.yml config
docker compose -f compose.full-stack.yml up --build -d
docker compose -f compose.full-stack.yml ps
```

Servicios: PostgreSQL con healthcheck, StockFlow API en `:8080` con healthcheck y frontend en `:3000`. El build usa por defecto `VITE_API_URL=http://localhost:8080` y CORS permite `http://localhost:3000`.

## Conexión y decisiones

Axios central usa `VITE_API_URL`, adjunta el token desde storage encapsulado y convierte 401/403/404/409/500/503 en mensajes seguros. Un 401 limpia la sesión. `/profile` usa el usuario de `LoginResponse`; no inventa `/me`.

- Lazy loading por módulo, sin fragmentar componentes pequeños.
- Sin refresh token, proxy permanente ni reglas de negocio duplicadas.
- Los E2E de escritura requieren el entorno full-stack efímero y datos aislados; no se ejecutan contra una base compartida.
- Futuro: refresh token cuando exista contrato, devoluciones/reversiones y despliegue automatizado.
