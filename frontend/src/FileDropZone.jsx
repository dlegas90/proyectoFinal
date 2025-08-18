import React, { useRef, useState } from 'react';

export const FileDropZone = ({ onFile }) => {
  const [isDragActive, setIsDragActive] = useState(false);
  const inputRef = useRef();

  const handleDrop = e => {
    e.preventDefault();
    setIsDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div
      className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
        ${isDragActive ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 bg-white'}`}
      onDragOver={e => { e.preventDefault(); setIsDragActive(true); }}
      onDragLeave={() => setIsDragActive(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current.click()}
    >
      <input
        type="file"
        accept=".csv"
        ref={inputRef}
        style={{ display: 'none' }}
        onChange={e => onFile(e.target.files[0])}
      />
      <div className="flex flex-col items-center gap-2">
        <span className="text-4xl text-indigo-400">📄</span>
        <span className="font-semibold text-gray-700">
          Arrastra tu archivo CSV aquí o haz clic para seleccionar
        </span>
        <span className="text-sm text-gray-400">Solo archivos .csv</span>
      </div>
    </div>
  );
};