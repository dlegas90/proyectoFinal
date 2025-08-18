import express from 'express';
import multer from 'multer';
import cors from 'cors';
import fs from 'fs';
import { parse } from 'csv-parse/sync';
import { stringify } from 'csv-stringify/sync';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import rateLimit from 'express-rate-limit';
import { body, validationResult } from 'express-validator';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3001;

// --- Rate Limiter ---
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: 'Demasiadas peticiones, intenta de nuevo más tarde.'
  }
});

// Aplica limitador globalmente (o cámbialo a rutas concretas)
app.use(apiLimiter);

// --- Middleware estándar ---
app.use(cors());
app.use(express.json());

const upload = multer({ storage: multer.memoryStorage() });
let data = []; // Simula una base de datos en memoria
let logs = []; // Array para logs de actividad

function addLog(action, detail) {
  logs.push({
    timestamp: new Date().toISOString(),
    action,
    detail
  });
}

// Cargar CSV
app.post('/upload', upload.single('file'), (req, res) => {
  try {
    const content = req.file.buffer.toString();
    let parsed = parse(content, { columns: true, skip_empty_lines: true });

    // Normaliza los nombres de columna y elimina 'ID'/'id'
    let nextId = 1;
    parsed = parsed.map(row => {
      const normalized = {};
      Object.entries(row).forEach(([key, value]) => {
        const k = key.trim().toLowerCase();
        if (k !== 'id') normalized[k] = value;
      });
      return {
        ...normalized,
        id: nextId++,
      };
    });

    data = parsed;
    addLog('upload', `Archivo subido: ${req.file?.originalname || 'sin nombre'}`);
    res.json({ message: 'Datos cargados', data });
  } catch (err) {
    addLog('upload_error', `Error al subir archivo: ${err.message}`);
    res.status(400).json({ error: 'Error al procesar el archivo CSV' });
  }
});

// Obtener datos
app.get('/data', (req, res) => {
  let { page = 1, limit = 10, sortBy = 'id', order = 'asc' } = req.query;
  page = Number(page);
  limit = Number(limit);

  // Ordenamiento
  let sorted = [...data];
  if (sortBy && sorted.length > 0 && sorted[0][sortBy] !== undefined) {
    sorted.sort((a, b) => {
      if (order === 'desc') {
        return a[sortBy] < b[sortBy] ? 1 : a[sortBy] > b[sortBy] ? -1 : 0;
      }
      return a[sortBy] > b[sortBy] ? 1 : a[sortBy] < b[sortBy] ? -1 : 0;
    });
  }

  // Paginación
  const start = (page - 1) * limit;
  const paginated = sorted.slice(start, start + limit);

  res.json({
    data: paginated,
    total: sorted.length,
    page,
    limit,
    sortBy,
    order
  });
});

// Crear nuevo registro
app.post(
  '/data',
  [
    body('nombre').notEmpty().withMessage('El nombre es requerido'),
    body('precio').notEmpty().withMessage('El precio es requerido'),
    body('stock').notEmpty().withMessage('El stock es requerido'),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Devuelve todos los mensajes de error
      addLog('create_error', `Error al crear registro: ${JSON.stringify(errors.array())}`);
      return res.status(400).json({ errors: errors.array() });
    }

    // Prevención de duplicados por nombre
    const existe = data.some(row => row.nombre === req.body.nombre);
    if (existe) {
      addLog('create_error', `Intento de duplicado: ${req.body.nombre}`);
      return res.status(409).json({
        errors: [{ msg: 'Ya existe un registro con ese nombre.' }]
      });
    }

    // Asigna un id incremental
    const newId = data.length > 0 ? Math.max(...data.map(r => Number(r.id) || 0)) + 1 : 1;
    const nuevoRegistro = { id: newId, ...req.body };

    data.push(nuevoRegistro);
    addLog('create', `Registro creado: ${JSON.stringify(nuevoRegistro)}`);
    res.json({ message: 'Registro agregado', data }); // <-- data es el array completo
  }
);

// Actualizar registro
app.put('/data/:index', (req, res) => {
  const index = parseInt(req.params.index);
  if (index >= 0 && index < data.length) {
    data[index] = req.body;
    addLog('update', `Registro actualizado: id=${req.params.id}`);
    res.json({ message: 'Registro actualizado', data });
  } else {
    res.status(404).json({ error: 'Índice no encontrado' });
  }
});

// Eliminar registro
app.delete('/data/:index', (req, res) => {
  const index = parseInt(req.params.index);
  if (index >= 0 && index < data.length) {
    data.splice(index, 1);
    addLog('delete', `Registro eliminado: id=${req.params.id}`);
    res.json({ message: 'Registro eliminado', data });
  } else {
    res.status(404).json({ error: 'Índice no encontrado' });
  }
});

// Descargar CSV
app.get('/export', (req, res) => {
  addLog('export', 'Exportación de CSV');
  const csv = stringify(data, { header: true });
  const filePath = join(__dirname, 'export.csv');
  fs.writeFileSync(filePath, csv);
  res.download(filePath);
});

// --- Endpoint para consultar logs ---
app.get('/logs', (req, res) => {
  res.json(logs);
});

app.listen(PORT, () => console.log(`Servidor backend en http://localhost:${PORT}`));
