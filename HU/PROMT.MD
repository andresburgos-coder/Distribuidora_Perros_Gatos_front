

##  Prompt Refinado para Implementación de Administración de Usuarios y Roles

**Contexto del Proyecto:**

  - **Carpeta Raíz:** `ia_native/`
  - **Front-end:** `ia_native/Distribuidora_Perros_Gatos_front/` (React)
  - **Back-end:** `ia_native/Distribuidora_Perros_Gatos_back/` (contiene `backend/api/` y `backend/worker/` con FastAPI + Worker Node.js)
  - **Base de datos y SQL:** `ia_native/Distribuidora_Perros_Gatos_back/sql/` (scripts como `schema.sql`, `migrations/`, `seeders/`).
  - **Archivos relevantes:** el API principal está en `Distribuidora_Perros_Gatos_back/backend/api/` (por ejemplo `main.py`), y el worker Node.js está bajo `Distribuidora_Perros_Gatos_back/backend/worker/`.
  - **Roles existentes:** `cliente` y `admin` (desde los requisitos actuales).

-----

**Objetivo del Prompt:**

Implementar la funcionalidad completa de "Administración de Usuarios y Roles" con estas características principales:

1. Solo usuarios con rol `admin` pueden usar el panel de administración.
2. Crear nuevos usuarios (CREATE) desde el panel.
3. Editar usuarios existentes (UPDATE), incluyendo su rol.
4. La edición se limita a los campos del registro existente + el campo `rol`.

-----

###  Prompt Detallado (copiar y usar)

```
Eres un desarrollador Full-Stack experto en React (frontend), FastAPI (backend), Node.js (worker), RabbitMQ y SQL Server.

Mi proyecto se llama 'ia_native' y la estructura relevante es:

- Frontend: `ia_native/Distribuidora_Perros_Gatos_front/` (React app)
- Backend: `ia_native/Distribuidora_Perros_Gatos_back/`
  - API FastAPI en `Distribuidora_Perros_Gatos_back/backend/api/` (por ejemplo `main.py`).
  - Worker Node.js en `Distribuidora_Perros_Gatos_back/backend/worker/`.
  - SQL scripts y migraciones en `Distribuidora_Perros_Gatos_back/sql/`.

Requisitos: implementa una **Administración de Usuarios y Roles** (CRUD básico: crear y editar usuarios; listar puede ser lectura normal). Asegúrate que solo `admin` pueda acceder.

Entregar lo siguiente con ejemplos de código y rutas concretas:

I) Back-end (FastAPI + SQL Server)

1) Script SQL: entrega un `ALTER TABLE` o `CREATE TABLE` para asegurarnos de que la tabla `users` (o la tabla equivalente) tenga un campo `rol VARCHAR(50)` y una restricción CHECK que permita únicamente 'admin' o 'cliente'. Menciona si debes actualizar `sql/schema.sql` o crear una migración.

2) FastAPI:
   - Añade endpoints protegidos bajo `/api/admin/usuarios` (GET list, POST create, PUT update).
   - Usa la dependencia de autenticación existente (menciona cómo inyectar la verificación de rol  por ejemplo, `current_user` con `role`) y explícitamente rechaza peticiones de no-admin.
   - Define Pydantic schemas: `UsuarioCreate`, `UsuarioUpdate` (solo campos de registro + `rol`).
   - En la creación, reutiliza la lógica de hashing de contraseñas ya presente en el proyecto (indica el módulo/función si existe; si no, muestra una implementación consistente con la app).
   - Devuelve respuestas claras (201 para creado, 200 para actualizado, 403 para no autorizado).

3) Worker (Node.js / RabbitMQ):
   - Si la creación/edición debe disparar tareas asíncronas (ej. envío de email de bienvenida), define el formato del mensaje que FastAPI enviaría a RabbitMQ y un ejemplo de handler en el worker. Si no es necesario, indica que este paso puede omitirse.

II) Front-end (React)

1) Acceso y navegación:
   - Muestra un pequeño fragmento de código que verifica el `role` del usuario en el cliente (p. ej. desde `redux` o `auth` context). Si `role === 'admin'`, renderiza un enlace o botón hacia `/admin/usuarios`.

2) Componente Admin (`AdminUsuarios.js`):
   - Tabla que lista usuarios (usa fetch/axios a `/api/admin/usuarios`).
   - Botón "Crear Nuevo Usuario" y botón "Editar" por fila.

3) Formulario (`FormularioUsuario.js`):
   - Componente reutilizable para crear/editar.
   - Incluye todos los campos de registro existentes y un `<select>` para `rol` con opciones `admin` y `cliente`.

4) Servicio API (fetch/axios):
   - Proveer funciones `getUsuarios()`, `crearUsuario(data)`, `actualizarUsuario(id, data)` que llamen a los endpoints FastAPI.

Entrega final:

- Código de ejemplo para cada cambio (Back y Front), con rutas y archivos sugeridos concretos dentro de la estructura del repo (p. ej. `Distribuidora_Perros_Gatos_back/backend/api/admin_usuarios.py`, `Distribuidora_Perros_Gatos_front/src/pages/AdminUsuarios.js`).
- Indica dónde ubicar scripts SQL (`Distribuidora_Perros_Gatos_back/sql/schema.sql` o `migrations/`).
- Si generas nuevos archivos, sugiere nombres y ubicaciones exactas.

Notas:

- Si alguna parte del código existente (hashing, autenticación, modelos) tiene funciones o módulos reutilizables, menciona dónde integrarlos (ej. `Distribuidora_Perros_Gatos_back/backend/api/main.py` o el módulo de autenticación actual).
- Prioriza compatibilidad con la estructura actual del repo y con patrones ya usados (p. ej. respuesta JSON, manejo de errores).

```

-----

Si quieres, puedo:

- Generar los snippets concretos (SQL, FastAPI, worker Node.js, React components y servicios) listos para pegar en los archivos sugeridos.
- O bien crear automáticamente los archivos base en el repo (dime si quieres eso ahora).

Indica si prefieres que genere el código completo para integrar directamente en el proyecto o si solo quieres el prompt pulido (como está ahora).
