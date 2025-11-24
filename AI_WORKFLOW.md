---

## 📄 2. `AI_WORKFLOW.md`

```markdown
# 🤖 AI_WORKFLOW.md

Documento vivo que define cómo el **Equipo 3 – Gatos y Perros** integra inteligencia artificial en su flujo de trabajo para el desarrollo del MVP de sistema de pedidos.

> **Propósito**: Usar IA como **asistente técnico**, no como reemplazo del pensamiento crítico del equipo.

---

## 🧩 Metodología

- Trabajamos con **Kanban** en GitHub Projects.
- Reuniones diarias a las 8:00 am l
- Tareas pequeñas (<1 día) para facilitar integración continua.
- Todo el código pasa por **pull request con al menos una revisión**.

---

## 💬 Interacciones clave

| Canal          | Uso |
|----------------|-----|
| **chat gogle**    | Comunicación diaria, resolución rápida de dudas |
| **GitHub**     | Discusión técnica, pull requests, issues |
| **Reuniones**  | Toma de decisiones arquitectónicas, priorización |

---

## 📚 Documentos clave

| Documento             | Propósito |
|-----------------------|---------|
| `README.md`           | Cómo levantar el sistema localmente |
| `ARCHITECTURE.md`     | Diagrama y explicación del sistema (API → RabbitMQ → Worker) |
| `AI_WORKFLOW.md`      | Este documento: normas para uso de IA |
| `docker-compose.yml`  | Infraestructura local del MVP |
| `/docs/prompts/`      | Archivos con prompts útiles y reutilizables |

---

## 🤖 Dinámicas de interacción con IA

### ✅ Uso permitido
- Generar **esqueletos de código**: componentes React, Dockerfiles, workers en Python.
- Explicar conceptos técnicos: patrón Saga, colas de mensajes, accesibilidad WCAG.
- Redactar o mejorar **documentación técnica** (README, guías).
- Simular conversaciones de equipo para alinear ideas.

### 🚫 Uso prohibido
- Entregar código generado 100% por IA sin comprensión del equipo.
- Usar IA para resolver exámenes, tareas individuales o entregas académicas sin autoría clara.

### 🔁 Validación obligatoria
1. Todo output de IA se **revisa en pareja** antes de commitear.
2. El código generado debe:
   - Pasar pruebas locales.
   - Seguir las convenciones del equipo.
   - Ser entendido por al menos dos miembros.
3. Si la IA sugiere una solución arquitectónica, se **discute en reunión** antes de implementar.

### 📁 Gestión de prompts
- Los prompts útiles se guardan en `/docs/prompts/` con nombre descriptivo:  
  - `explain_rabbitmq_flow.md`  
  - `react_product_card_accessible.md`  
  - `docker_compose_frontend_backend.md`

### 🌍 Ética y responsabilidad
- La IA es una **herramienta de productividad**, no un actor autónomo.
- El equipo asume **responsabilidad total** sobre el código y decisiones técnicas.
- Priorizamos **transparencia**: si algo se generó con IA, se menciona en el PR o commit (ej: `feat: card de producto (asistido por IA)`).

### 🔧 Cómo interactuar con la IA (guía práctica)

Esta subsección explica el flujo recomendado para pedir ayuda a la IA y obtener resultados útiles y verificables.

- Preparación del contexto
  - Indicar siempre el archivo activo o la ruta relevante (por ejemplo: src/pages/Admin/usuarios/index.js).
  - Incluir snippets mínimos (5–30 líneas) si pides cambios en código. Si son múltiples archivos, listar rutas.
  - Señalar el objetivo claro y el entorno (Node/React, versión de librerías si es relevante).

- Estructura del prompt (plantilla)
  1. Objetivo: "Qué quiero lograr" (1 frase).
  2. Restricciones: "lenguaje, versiones, no tocar X".
  3. Entradas: archivos/rutas y snippets.
  4. Salida esperada: "patch de archivo", "código + pruebas", "comandos para terminal".
  5. Nivel de detalle: "rápido", "detallado", "paso a paso".

- Flujo iterativo (recomendado)
  1. Pedir la solución inicial (incluyendo formato de entrega).
  2. Revisar la propuesta localmente (tests, lint, ejecución).
  3. Solicitar refinamientos concretos (corrige esto, explica elección X).
  4. Antes de commitear: revisión por pareja y pruebas.

- Comandos/requests frecuentes
  - "Explica este archivo" + ruta.
  - "Genera patch" → devuelve bloque con archivos modificados.
  - "Añade pruebas unitarias" → indica framework y ruta de tests.
  - "Corrige error X en consola" → pega stack trace y archivos relevantes.
  - "Crear script de diagnóstico" → especificar parámetros de entrada y salida.

- Ejemplos de prompts útiles
  - "Refactoriza src/components/Button.js para usar styled-components y mantén tests."
  - "Genera unit tests con Jest para src/services/auth-service.js cubriendo login y logout."
  - "Explica por qué /api/auth/me devuelve 401: te pego la respuesta del servidor."

- Seguridad y privacidad
  - No pegar credenciales, tokens ni secretos. Si es necesario depurar, redáctalos.
  - No enviar datos personales de usuarios reales en prompts públicos.

- Señalización de asistencia por IA
  - Al crear PR/commit, marcar: "(asistido por IA)" y listar prompts usados en la descripción del PR.

- Tips finales
  - Prefiere prompts concretos y acotados; la IA responde mejor con restricciones claras.
  - Usar la IA para bocetos y sugerencias; el equipo valida y adapta antes de integrar.
  - Guardar prompts reutilizables en /docs/prompts/ y documentar resultados dentro del PR.

### 🆕 Crear desde cero (qué pedirle a la IA)

Si quieres que la IA cree algo "de 0" (componente, página, servicio, script), sigue este flujo y usa la plantilla de prompt para obtener resultados reproducibles y seguros.

- Resumen rápido del flujo
  1. Define el alcance y los criterios de aceptación (qué debe hacer y cómo medirás que funciona).
  2. Proporciona el contexto mínimo necesario (stack, rutas del repo, estilo de código, dependencias).
  3. Pide la salida exacta que quieres (archivos con ruta, tests, comandos para levantar).
  4. Revisa localmente, prueba y solicita refinamientos.
  5. Antes de commitear: revisión por pareja + ejecutar pruebas.

- Plantilla de prompt para "crear desde 0"
  1. Objetivo (1 línea): qué quieres crear.
  2. Entorno (1–2 líneas): React version, CSS/SCSS, testing (Jest/RTL), linters.
  3. Entradas (archivos o rutas relevantes): lista de archivos del repo que se relacionan.
  4. Requisitos funcionales (bullet points): props, comportamiento, validaciones, accesibilidad.
  5. Requisitos no funcionales: tests unitarios, mensajes de consola mínimos, tamaño del bundle (si aplica).
  6. Salida esperada: "Devuélveme parches para los archivos: path/to/FileA, path/to/FileB y tests" y formato (patch markdown o bloques de código).
  7. Restricciones: "no tocar X", "no usar dependencias nuevas" o "permiso para añadir Y".
  8. Nivel de detalle: "rápido" | "detallado" | "paso a paso".
  9. Ejemplo de prompt final (copia/pega):
     - "Objetivo: Crear un componente React ProductCard desde 0. Entorno: React 18, CSS módulos, Jest+RTL. Entradas: /src/components/, /src/styles/. Requisitos: mostrar imagen, nombre, precio; accesible; prop 'onAddToCart' callback; fallback para imagen ausente. Tests: snapshot + interacción del botón. Salida: parches para los archivos: src/components/ProductCard/index.jsx, src/components/ProductCard/ProductCard.module.css, src/components/ProductCard/ProductCard.test.jsx. No agregar dependencias nuevas. Nivel: detallado."

- ¿Qué incluir en la PR cuando algo fue "creado por la IA"?
  - Descripción breve del feature.
  - Lista de archivos añadidos/modificados.
  - Prompts usados (copiar texto del prompt).
  - Pruebas ejecutadas y resultados (comandos y salida).
  - Señalización: "(asistido por IA)".

- Checklist mínimo antes de merge 
  - [ ] Código compila y la app corre localmente.
  - [ ] Tests unitarios pasan (o se añadieron con cobertura razonable).
  - [ ] Al menos una revisión de compañero aprobó la lógica.
  - [ ] No se incluyeron secretos en los cambios.
  - [ ] PR documenta prompts usados si aplica.

- Buenas prácticas y límites
  - Divide requerimientos grandes en tareas pequeñas (cada una < 1 día).
  - Evita pedir "todo el módulo" en una sola petición; mejor iterar.
  - Valida manualmente la accesibilidad y comportamiento crítico.

- Ejemplo rápido de petición para crear un endpoint frontend + tests
  - "Crea desde 0 la página Admin/UserDetails (ruta /admin/usuarios/:id) que: 1) usa apiClient para GET /admin/usuarios/:id, 2) muestra nombre, email y rol, 3) maneja loading/error, 4) incluye tests con mock de axios. Salida: parches para src/pages/Admin/usuarios/UserDetails.jsx y src/pages/Admin/usuarios/UserDetails.test.jsx. No cambiar rutas existentes."

---

> 🐾 *"La IA no piensa, pero nos ayuda a pensar mejor."*  
> — Equipo 3, Gatos y Perros
````