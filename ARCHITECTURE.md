# 🏗️ Arquitectura del Proyecto — Frontend Distribuidora Perros y Gatos

Este repositorio contiene la aplicación frontend (Single Page Application) construida con React que consume una API externa (normalmente en `http://localhost:8000/api`). El objetivo de este documento es describir la arquitectura real observada en el código, cómo se gestionan la autenticación/autorización, el cliente HTTP, la estructura de carpetas y las convenciones usadas.

---

## Tecnologías principales

- Frontend: React 18
- Enrutado: `react-router-dom` v6
- Estado: Redux (+ `redux-thunk`)
- HTTP client: `axios` (encapsulado en `src/services/api-client.js`)
- Bundler/runner: `react-scripts` (Create React App)
- Estilos: CSS organizados por página/componentes

---

## Estructura del frontend (resumen)

- `src/` — código fuente
  - `pages/` — páginas por ruta (home, login, admin/*)
  - `components/` — componentes reutilizables y layouts (header, footer, protected-route)
  - `services/` — capas de acceso a API (productos-service, usuarios-service, auth-service, etc.)
  - `redux/` — store, acciones y reducers (auth, categorias, carrito...)
  - `hooks/` — hooks personalizados (`use-auth`, `use-cart`, `use-toast`)
  - `utils/` — utilidades (validaciones, helpers)
  - `styles/` — variables y estilos globales

Rutas administrativas y de usuario usan layouts separados: `AdminLayout` envuelve vistas `admin/*`.

---

## Cliente HTTP y autenticación

- `src/services/api-client.js` crea una instancia de `axios` con:
  - `baseURL` desde `REACT_APP_API_URL || 'http://localhost:8000/api'`
  - `withCredentials: true` para soportar cookies HTTP-only si el backend las utiliza.

- Interceptores:
  - Request interceptor lee `localStorage.access_token` y, si existe, adjunta `Authorization: Bearer <token>` a las peticiones.
  - Response interceptor procesa errores y muestra mensajes (toasts). Si recibe 401 y hay token presente, despacha `logout` para limpiar el estado.

- `apiClient2` es una segunda instancia usada para peticiones públicas donde explícitamente no se quiere enviar Authorization.

- `src/services/auth-service.js` maneja login/register/logout y `getCurrentUser`. El `login` guarda el token en `localStorage` buscando en campos comunes (`access_token`, `token`, `accessToken`, y rutas anidadas). `getCurrentUser()` llama a `/auth/me` para obtener el objeto `user` canónico.

Notas de seguridad/operación:
- El cliente soporta tanto token-based auth (Bearer token en `localStorage`) como cookie-based sessions (`withCredentials`). El backend debe:
  - Si usa cookies: enviar `Set-Cookie` con atributos correctos (Domain, SameSite, Secure si aplica) y permitir CORS con credenciales (Access-Control-Allow-Credentials: true y origen no `*`).
  - Si usa tokens: devolver el token en la respuesta de login y el frontend lo guardará en `localStorage`.

---

## Autorización y roles

- `src/components/layout/protected-route/index.js` implementa `ProtectedRoute({ requireAdmin })` que evita el acceso si `state.auth.isAuthenticated` es falso, o si el usuario no es admin cuando `requireAdmin` es true.
- Para detectar admin el proyecto incluye `src/utils/auth.js` con `isAdminUser(user)` que acepta múltiples formas de payload ( `rol`, `role`, `roles`, `roleName` ) y normaliza valores como `admin`, `ROLE_ADMIN`, etc.

---

## Patrón de servicios y llamadas a la API

- Cada recurso tiene un servicio en `src/services/*-service.js` que exporta funciones: `getAll`, `getById`, `create`, `update`, `delete`. Ejemplo: `usuarios-service.getUserById(id)` usa `apiClient.get(`/admin/usuarios/${id}`)`.
- Los componentes/páginas consumen esos servicios y manejan la normalización de respuesta (el backend puede devolver `{status,data}` o el objeto directamente).

---

## Redux

- Store central en `src/redux/store.js`.
- Reducers por dominio: `auth-reducer.js`, `categorias-reducer.js`, `carrito-reducer.js`, `pedidos-reducer.js`, etc.
- Acciones en `src/redux/actions/*` siguen la convención `*_REQUEST`, `*_SUCCESS`, `*_FAILURE`. También existen acciones simples `login`, `logout` que actualizan `state.auth`.

---

## Estructura de la UI y patrones comunes

- Layouts: `MainLayout` para vistas públicas, `AdminLayout` para vistas protegidas.
- Componentes UI en `src/components/ui` (Input, Button, Modal, Toast, ProductCard).
- Hooks: `use-auth` centraliza flujo de login/logout/register y navegación tras login; `use-toast` para mensajes, `use-cart` para carrito.
- Páginas admin (productos, usuarios, pedidos, categorías, inventario, carrusel) usan `ProtectedRoute requireAdmin`.

---

## Scripts de diagnóstico y utilidades de desarrollo

- `scripts/debug-auth.js` (agregado): script Node para reproducer login, extraer token, llamar `/auth/me` y endpoints admin; útil para debug fuera del navegador.
- `npm start` ejecuta la app en modo desarrollo.

---

## Consideraciones y recomendaciones

- CORS & Credenciales: si el backend usa cookies asegúrate de que `Access-Control-Allow-Credentials: true` y que `Access-Control-Allow-Origin` sea el origen exacto (no `*`).
- Evitar almacenar tokens sensibles en `localStorage` en producción si es posible; usar cookies httpOnly reduce exposición a XSS.
- Manejo de errores: el interceptor centraliza toasts y logout en 401 para mantener estado consistente.
- Consistencia de modelos: los servicios ya normalizan diferentes formas de respuesta; mantener esa convención al evolucionar el backend ayuda a evitar bugs.

---

## Dónde buscar código relevante

- Cliente HTTP: `src/services/api-client.js`
- Auth flow: `src/hooks/use-auth.js`, `src/services/auth-service.js`, `src/redux/actions/auth-actions.js`, `src/redux/reducers/auth-reducer.js`
- Protected routes: `src/components/layout/protected-route/index.js`
- Detección admin: `src/utils/auth.js`
- Debug script: `scripts/debug-auth.js`

---

Si quieres, puedo:
- Incluir diagramas (archivo SVG/PNG) que muestren el flujo de autenticación y autorización.
- Generar una versión reducida del documento en inglés.
- Añadir reglas concretas de CORS/headers para el backend recomendado (ej. ejemplo `fastapi` o `express`).
