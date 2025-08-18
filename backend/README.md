# README BACKEND (backend/README.md)

# BACKEND - CSV Manager

## Tecnologías

- Express
- Multer (carga de archivos)
- csv-parse / csv-stringify
- express-validator
- CORS
- express-rate-limit

## Endpoints principales

- `POST /upload`  
  Sube y procesa archivos CSV

- `GET /data`  
  Devuelve registros con paginación y ordenamiento  
  Parámetros: `page`, `limit`, `sortBy`, `order`

- `POST /data`  
  Agrega un nuevo registro (valida campos y duplicados)

- `PUT /data/:id`  
  Edita un registro

- `DELETE /data/:id`  
  Elimina un registro

- `GET /export`  
  Descarga los registros como CSV

- `GET /logs`  
  Devuelve un array con el historial de acciones.

## Instalación y ejecución

```bash
npm install
npm start
```

## Notas

- Los datos se almacenan en memoria (no persistentes)
- El backend valida campos requeridos y previene duplicados por nombre
- El rate limiter protege contra abuso de peticiones
- El backend registra cada acción importante (subida de archivo, creación, edición, eliminación, exportación) en memoria.
- Los logs incluyen: fecha/hora, tipo de acción y detalle.

**Ejemplo de log:**
```json
{
  "timestamp": "2025-08-18T18:00:00.000Z",
  "action": "create",
  "detail": "Registro creado: {\"id\":1,\"nombre\":\"Camiseta\",\"precio\":\"25000\",\"stock\":\"10\"}"
}
```

---
