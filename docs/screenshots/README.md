# Capturas de StockFlow

Esta carpeta queda preparada para capturas reales del entorno integrado. No se incluyen imágenes simuladas.

Antes de capturarlas, levante `compose.full-stack.yml`, ejecute `stockflow-api/docs/demo-data.ps1` y abra `http://localhost:3000`. Use una ventana de escritorio de 1440 × 900, oculte DevTools y no muestre credenciales ni el token.

Guardar exactamente:

1. `01-login.png`: login sin credenciales escritas.
2. `02-dashboard.png`: dashboard ADMIN con métricas reales.
3. `03-products.png`: listado con los productos `DEMO-`.
4. `04-inventory.png`: inventario mostrando stock final 15.
5. `05-stock-entry.png`: detalle de la entrada confirmada de 20.
6. `06-sales.png`: listado de ventas.
7. `07-sale-detail.png`: venta completada por 3 unidades.
8. `08-reports.png`: reportes cargados desde la API.
9. `09-dark-mode.png`: una vista operativa en tema oscuro.

Compruebe en Network que las solicitudes XHR salen hacia `http://localhost:8080`, que el preflight no falla y que no aparece `blocked by CORS policy`. Las imágenes solo deben añadirse después de observar datos reales.
