# StockFlow Frontend

Aplicación administrativa para operar StockFlow: inventario, ventas, productos, categorías, proveedores, clientes, movimientos, reportes y usuarios. Esta primera fase entrega la base de autenticación, autorización, navegación y dashboard; los CRUD se incorporarán posteriormente.

## Stack

- React 19, TypeScript 7 y Vite 8
- React Router
- TanStack Query y Axios
- React Hook Form y Zod
- Tailwind CSS 4 y componentes locales con patrón shadcn/ui
- Lucide React, Recharts y Sonner
- Vitest, Testing Library y jsdom

## Requisitos

- Node.js 24 o compatible con Vite 8
- npm 11+
- StockFlow API disponible

## Instalación

```bash
npm install
cp .env.example .env
npm run dev
```

En PowerShell puedes crear el archivo local con `Copy-Item .env.example .env`.

## Variables de entorno

```env
VITE_API_URL=http://localhost:8080
```

El JWT no se configura como variable. Se recibe desde `POST /api/auth/login` y la sesión se administra de forma encapsulada en el frontend.

## Scripts

```bash
npm run dev
npm run lint
npm run test
npm run build
npm run preview
```

En entornos Windows con restricciones de procesos, valida con `npx vite build --configLoader native`.

## Estructura

```text
src/
  app/                 composición, providers y router
  components/
    layout/            shell administrativo
    shared/            componentes transversales
    ui/                primitivas de interfaz
  features/
    auth/              sesión, login y guards
    dashboard/         resumen por permisos
    reports/           acceso a reportes
  hooks/               hooks compartidos
  lib/
    api/               cliente HTTP y errores
    auth/              storage y roles
    utils/             utilidades
  test/                configuración de pruebas
  types/               contratos TypeScript
```

## Conexión con el backend

El cliente Axios usa `VITE_API_URL` y agrega `Authorization: Bearer <token>` cuando existe una sesión. Los errores HTTP comunes se convierten a mensajes seguros para el usuario. Los endpoints implementados en esta fase son:

- `POST /api/auth/login`
- `GET /api/reports/low-stock`
- `GET /api/reports/sales-summary`
- `GET /api/reports/inventory-summary`

El dashboard consulta únicamente endpoints permitidos por el rol. La autorización del frontend mejora la experiencia, pero la API sigue siendo la autoridad de seguridad.

## Roles

- `ADMIN`: acceso a todos los módulos preparados.
- `INVENTORY_MANAGER`: productos, categorías, proveedores, inventario, movimientos, entradas, salidas, lectura de ventas y reportes de inventario.
- `SELLER`: productos, categorías, clientes, ventas y reportes.

La matriz está alineada con `SecurityConfig` del backend. Ocultar módulos mejora la experiencia; cada petición continúa validándose en la API.
