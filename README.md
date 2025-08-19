# README PRINCIPAL (proyecto raíz)

# 📊 CSV Manager

Aplicación web para cargar, editar y exportar registros desde archivos CSV.  
Incluye frontend en **React + Vite + Tailwind CSS** y backend en **Express**.

---

## 🚀 Características

- 🗂️ **Carga de archivos CSV** por drag & drop o selección tradicional
- 📝 **Visualización y edición** de registros en tabla
- ✅ **Validación de campos requeridos** y prevención de duplicados
- 📑 **Paginación y ordenamiento** por columnas
- 📤 **Exportación de registros** a CSV
- 🔄 **Feedback visual:** loading states, mensajes de error y éxito
- 🌗 **Tema claro/oscuro** con toggle
- 📋 **Logs de actividad**: historial de acciones en tiempo real

---

## 🏗️ Estructura del Proyecto

```
base-proyecto-999199990/
│
├── backend/         # API Express, manejo de CSV y logs
│   └── index.js
│
├── frontend/        # React + Vite + Tailwind
│   ├── src/
│   │   ├── App.jsx
│   │   ├── DataControls.jsx
│   │   ├── FileDropZone.jsx
│   │   ├── ActivityLogs.jsx
│   │   └── index.css
│   └── tailwind.config.js
│
├── export.csv       # Ejemplo de archivo exportado
└── README.md        # Este archivo
```

---

## ⚡ Instalación Rápida

```bash
# Clona el repositorio
git clone https://github.com/dlegas90/proyectoFinal.git
cd proyectoFinal

# Instala dependencias del backend
cd backend
npm install

# Instala dependencias del frontend
cd ../frontend
npm install
```

---

## ▶️ Ejecución

```bash
# Inicia el backend
cd backend
npm start

# Inicia el frontend
cd ../frontend
npm run dev
```

---

## 🖥️ Frontend

- **Carga y edición de CSV**
- **Drag & drop** para subir archivos
- **Tabla editable** con paginación y ordenamiento
- **Tema claro/oscuro**
- **Logs de actividad** en tiempo real

---

## 🛠️ Backend

- **Express API** con endpoints para CRUD y exportación
- **Validación** y prevención de duplicados
- **Logs de actividad** accesibles por `/logs`
- **Rate limiting** y CORS

---

## 📋 Logs de Actividad

- Visualiza el historial de acciones (subida, creación, edición, eliminación, exportación) en la sección "Logs de actividad".
- Los logs se obtienen desde el backend y se muestran en tiempo real.

---

## 👤 Autor

- [dlegas90](https://github.com/dlegas90)

---

## 📝 Licencia

MIT
