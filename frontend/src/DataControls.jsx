import React from 'react';

export const DataControls = ({
  page,
  setPage,
  limit,
  setLimit,
  sortBy,
  setSortBy,
  order,
  setOrder,
  total
}) => (
  <div className="flex flex-wrap items-center gap-4 p-4 mb-6 rounded-lg shadow-sm bg-gray-50">
    <div className="flex items-center gap-2">
      <label className="font-medium text-gray-700">Ordenar por:</label>
      <select
        value={sortBy}
        onChange={e => setSortBy(e.target.value)}
        className="px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-300"
      >
        <option value="id">ID</option>
        <option value="nombre">Nombre</option>
        <option value="precio">Precio</option>
        <option value="stock">Stock</option>
      </select>
      <select
        value={order}
        onChange={e => setOrder(e.target.value)}
        className="px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-300"
      >
        <option value="asc">Ascendente</option>
        <option value="desc">Descendente</option>
      </select>
    </div>
    <div className="flex items-center gap-2">
      <label className="font-medium text-gray-700">Mostrar:</label>
      <select
        value={limit}
        onChange={e => setLimit(Number(e.target.value))}
        className="px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-300"
      >
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={20}>20</option>
      </select>
      <span className="text-gray-500">por página</span>
    </div>
    <div className="flex items-center gap-2 ml-auto">
      <button
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
        className={`px-3 py-1 rounded font-bold transition-colors ${
          page === 1
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
            : 'bg-indigo-500 text-white hover:bg-indigo-600'
        }`}
        title="Anterior"
      >
        &larr;
      </button>
      <span className="font-semibold text-gray-700">
        Página {page} / {Math.max(1, Math.ceil(total / limit))}
      </span>
      <button
        disabled={page * limit >= total}
        onClick={() => setPage(page + 1)}
        className={`px-3 py-1 rounded font-bold transition-colors ${
          page * limit >= total
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
            : 'bg-indigo-500 text-white hover:bg-indigo-600'
        }`}
        title="Siguiente"
      >
        &rarr;
      </button>
    </div>
  </div>
);