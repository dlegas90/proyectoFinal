# README PRINCIPAL (proyecto raíz)

# CSV Manager

Aplicación web para cargar, editar y exportar registros desde archivos CSV.  
Incluye frontend en React + Vite y backend en Express.

## Características principales

- Carga de archivos CSV por drag & drop o selección tradicional
- Visualización y edición de registros en tabla
- Validación de campos requeridos y prevención de duplicados
- Paginación y ordenamiento por columnas
- Exportación de registros a CSV
- Feedback visual: loading states, mensajes de error y éxito
- Logs de actividad
- Agregado darkMode

## Estructura

- `/frontend`: React + Vite + Tailwind CSS
- `/backend`: Express + Multer + CSV Parse/Stringify

## Instalación rápida

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

## Ejecución

```bash
# Inicia el backend
cd backend
npm start

# Inicia el frontend
cd ../frontend
npm run dev
```

## Autor

- [dlegas90](https://github.com/dlegas90)

---
