import { useState, useEffect } from 'react';
import './index.css';
import { DataControls } from './DataControls';
import { FileDropZone } from './FileDropZone';
import { ActivityLogs } from './ActivityLogs';

export const App = () => {
  const [file, setFile] = useState(null);
  const [rows, setRows] = useState([]);
  const [newRow, setNewRow] = useState({});
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [sortBy, setSortBy] = useState('id');
  const [order, setOrder] = useState('asc');
  const [total, setTotal] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);


  const fetchData = async () => {
    const res = await fetch(
      `http://localhost:3001/data?page=${page}&limit=${limit}&sortBy=${sortBy}&order=${order}`
    );
    const json = await res.json();
    setRows(json.data);
    setTotal(json.total);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [page, limit, sortBy, order]);

  const handleUpload = async () => {
    if (!file) return;
    setIsUploading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('http://localhost:3001/upload', { method: 'POST', body: formData });
      let errorMsg = 'Error al subir archivo';
      if (!res.ok) {
        try {
          const json = await res.json();
          errorMsg = json.error || errorMsg;
        } catch {
          // Si no es JSON, usa mensaje genérico
        }
        setError(errorMsg);
        setIsUploading(false);
        return;
      }
      fetchData();
      setIsUploading(false);
    }  catch {
      setError('Error de red al subir archivo');
      setIsUploading(false);
    }
  };

  const handleAdd = async () => {
    setIsSubmitting(true);
    setError(null);

    // Validación frontend opcional (puedes dejar solo la del backend si prefieres)
    if (!newRow.nombre || !newRow.precio || !newRow.stock) {
      setError('Completa todos los campos antes de añadir el registro.');
      setIsSubmitting(false);
      return;
    }

    const res = await fetch('http://localhost:3001/data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newRow),
    });
    if (!res.ok) {
      const json = await res.json();
      setError(json.errors?.map(e => e.msg).join(', ') || 'Error al agregar registro');
      setIsSubmitting(false);
      return;
    }
    setNewRow({});
    fetchData();
    setIsSubmitting(false);
  };

  const handleUpdate = async (i, row) => {
    await fetch(`http://localhost:3001/data/${i}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(row),
    });
    fetchData();
  };

  const handleDelete = async (i) => {
    await fetch(`http://localhost:3001/data/${i}`, { method: 'DELETE' });
    fetchData();
  };

  const downloadCSV = () => {
    window.location.href = 'http://localhost:3001/export';
  };

  return (
    <div className="min-h-screen py-8 bg-gray-50">
      <div className="max-w-5xl px-4 mx-auto space-y-8">

        {/* Header */}
        <header className="text-center">
          <h1 className="text-5xl font-extrabold text-indigo-600">CSV Manager</h1>
          <p className="mt-2 text-gray-600">Carga, edita y exporta tus registros de manera fácil</p>
        </header>

        {/* Upload Section */}
        <section className="flex flex-col items-center justify-between gap-4 p-6 bg-white rounded-lg shadow md:flex-row">
          <div className="flex-1 w-full">
            <FileDropZone onFile={setFile} />
            {file && (
              <span className="block mt-2 text-sm text-gray-500">
                {file.name}
              </span>
            )}
          </div>
          <button
            onClick={handleUpload}
            className="px-6 py-2 font-semibold text-white transition-transform transform bg-indigo-600 rounded-lg shadow hover:bg-indigo-700 hover:scale-105"
            disabled={isUploading}
          >
            {isUploading ? 'Subiendo...' : 'Subir archivo'}
          </button>
        </section>

        {/* New Record Section */}
        <section className="p-6 bg-white rounded-lg shadow">
          <h2 className="mb-4 text-2xl font-semibold text-gray-700">Agregar nuevo registro</h2>
          {error && (
            <div className="p-2 mb-4 font-semibold text-red-600 bg-red-100 rounded">
              {error}
            </div>
          )}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {['nombre', 'precio', 'stock'].map(key => (
              <input
                key={key}
                type="text"
                placeholder={key}
                value={newRow[key] || ''}
                onChange={e => setNewRow({ ...newRow, [key]: e.target.value })}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
              />
            ))}
          </div>
          <div className="mt-6 text-right">
            <button
              className="px-6 py-2 font-bold text-white bg-green-600 rounded"
              onClick={handleAdd}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Añadiendo...' : 'Añadir registro'}
            </button>
          </div>
        </section>

        {/* Data Table Section */}
        <section className="p-6 bg-white rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-gray-700">Registros</h2>
            <button
              onClick={downloadCSV}
              className="px-4 py-1 font-medium text-white transition-transform transform bg-indigo-500 rounded-lg shadow-sm hover:bg-indigo-600 hover:scale-105"
            >
              Exportar CSV
            </button>
          </div>
          <DataControls
            page={page}
            setPage={setPage}
            limit={limit}
            setLimit={setLimit}
            sortBy={sortBy}
            setSortBy={setSortBy}
            order={order}
            setOrder={setOrder}
            total={total}
          />
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 divide-y divide-gray-200">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>NOMBRE</th>
                  <th>PRECIO</th>
                  <th>STOCK</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {rows.map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-4 py-2">
                      <input
                        value={row.id}
                        onChange={e => {
                          const updated = [...rows];
                          updated[i].id = e.target.value;
                          setRows(updated);
                        }}
                        className="w-full px-2 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200"
                      />
                    </td>
                    <td className="px-4 py-2">
                      <input
                        value={row.nombre}
                        onChange={e => {
                          const updated = [...rows];
                          updated[i].nombre = e.target.value;
                          setRows(updated);
                        }}
                        className="w-full px-2 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200"
                      />
                    </td>
                    <td className="px-4 py-2">
                      <input
                        value={row.precio}
                        onChange={e => {
                          const updated = [...rows];
                          updated[i].precio = e.target.value;
                          setRows(updated);
                        }}
                        className="w-full px-2 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200"
                      />
                    </td>
                    <td className="px-4 py-2">
                      <input
                        value={row.stock}
                        onChange={e => {
                          const updated = [...rows];
                          updated[i].stock = e.target.value;
                          setRows(updated);
                        }}
                        className="w-full px-2 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200"
                      />
                    </td>
                    <td className="px-4 py-2 space-x-2 whitespace-nowrap">
                      <button
                        onClick={() => handleUpdate(i, row)}
                        className="px-3 py-1 text-sm text-white transition-colors bg-yellow-400 rounded-lg hover:bg-yellow-500"
                      >
                        Guardar
                      </button>
                      <button
                        onClick={() => handleDelete(i)}
                        className="px-3 py-1 text-sm text-white transition-colors bg-red-500 rounded-lg hover:bg-red-600"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <ActivityLogs />

      </div>
    </div>
  );
};
