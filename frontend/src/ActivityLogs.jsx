import { useEffect, useState } from 'react';

export const ActivityLogs = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/logs')
      .then(res => res.json())
      .then(setLogs);
  }, []);

  return (
    <section className="p-6 bg-white rounded-lg shadow mt-8">
      <h2 className="mb-4 text-2xl font-semibold text-gray-700">Logs de actividad</h2>
      <ul className="space-y-2">
        {logs.map((log, i) => (
          <li key={i} className="text-sm text-gray-600">
            <span className="font-bold text-indigo-600">{log.action}</span> — {log.detail} <span className="text-gray-400">({log.timestamp})</span>
          </li>
        ))}
      </ul>
    </section>
  );
};