# README FRONTEND (frontend/README.md)

# Frontend - CSV Manager

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


## Tecnologías

- React + Vite
- Tailwind CSS
- ESLint

## Funcionalidades

- **Carga de CSV:** Drag & drop o selección de archivo
- **Tabla editable:** Visualiza y edita registros
- **Agregar registro:** Formulario con validación y feedback
- **Paginación y ordenamiento:** Controles visuales para navegar y ordenar
- **Exportar CSV:** Descarga los datos editados
- **Feedback visual:** Loading states, mensajes de error y éxito

## Scripts útiles

```bash
npm install      # Instala dependencias
npm run dev      # Inicia el servidor de desarrollo
npm run build    # Compila para producción
```

## Personalización

- Estilos con Tailwind en `src/index.css`
- Componentes principales:  
  - `App.jsx`  
  - `DataControls.jsx`  
  - `FileDropZone.jsx`

## Recomendaciones

- Asegúrate que el backend esté corriendo en `localhost:3001`
- Puedes modificar los endpoints en `App.jsx` si cambias el puerto/backend

---
