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
  total,
  darkMode
}) => (
  <div className={`flex flex-wrap items-center gap-4 mb-6 p-4 rounded-lg shadow-sm
    ${darkMode ? 'bg-gray-800 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
    <div className="flex items-center gap-2">
      <label className={`font-medium ${darkMode ? 'text-yellow-300' : 'text-gray-700'}`}>Ordenar por:</label>
      <select
        value={sortBy}
        onChange={e => setSortBy(e.target.value)}
        className={`px-2 py-1 border rounded focus:outline-none focus:ring-2
          ${darkMode ? 'bg-gray-900 text-gray-100 border-gray-700 focus:ring-yellow-300' : 'bg-white text-gray-900 border-gray-300 focus:ring-indigo-300'}`}
      >
        <option value="id">ID</option>
        <option value="nombre">Nombre</option>
        <option value="precio">Precio</option>
        <option value="stock">Stock</option>
      </select>
      <select
        value={order}
        onChange={e => setOrder(e.target.value)}
        className={`px-2 py-1 border rounded focus:outline-none focus:ring-2
          ${darkMode ? 'bg-gray-900 text-gray-100 border-gray-700 focus:ring-yellow-300' : 'bg-white text-gray-900 border-gray-300 focus:ring-indigo-300'}`}
      >
        <option value="asc">Ascendente</option>
        <option value="desc">Descendente</option>
      </select>
    </div>
    <div className="flex items-center gap-2">
      <label className={`font-medium ${darkMode ? 'text-yellow-300' : 'text-gray-700'}`}>Mostrar:</label>
      <select
        value={limit}
        onChange={e => setLimit(Number(e.target.value))}
        className={`px-2 py-1 border rounded focus:outline-none focus:ring-2
          ${darkMode ? 'bg-gray-900 text-gray-100 border-gray-700 focus:ring-yellow-300' : 'bg-white text-gray-900 border-gray-300 focus:ring-indigo-300'}`}
      >
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={20}>20</option>
      </select>
      <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>por página</span>
    </div>
    <div className="flex items-center gap-2 ml-auto">
      <button
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
        className={`px-3 py-1 rounded font-bold transition-colors ${
          page === 1
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
            : darkMode
              ? 'bg-yellow-300 text-gray-900 hover:bg-yellow-400'
              : 'bg-indigo-500 text-white hover:bg-indigo-600'
        }`}
        title="Anterior"
      >
        &larr;
      </button>
      <span className={`font-semibold ${darkMode ? 'text-yellow-300' : 'text-gray-700'}`}>
        Página {page} / {Math.max(1, Math.ceil(total / limit))}
      </span>
      <button
        disabled={page * limit >= total}
        onClick={() => setPage(page + 1)}
        className={`px-3 py-1 rounded font-bold transition-colors ${
          page * limit >= total
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
            : darkMode
              ? 'bg-yellow-300 text-gray-900 hover:bg-yellow-400'
              : 'bg-indigo-500 text-white hover:bg-indigo-600'
        }`}
        title="Siguiente"
      >
        &rarr;
      </button>
    </div>
  </div>
);