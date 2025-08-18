import { useEffect, useState } from 'react';

export const ActivityLogs = ({ darkMode }) => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/logs')
      .then(res => res.json())
      .then(setLogs);
  }, []);

  return (
    <section className={`p-6 rounded-lg shadow mt-8
      ${darkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'}`}>
      <h2 className={`mb-4 text-2xl font-semibold ${darkMode ? 'text-yellow-300' : 'text-gray-700'}`}>Logs de actividad</h2>
      <ul className="space-y-2">
        {logs.map((log, i) => (
          <li key={i} className={`text-sm ${darkMode ? 'text-gray-200' : 'text-gray-600'}`}>
            <span className={`font-bold ${darkMode ? 'text-yellow-300' : 'text-indigo-600'}`}>{log.action}</span>
            {' — '}
            {log.detail}
            <span className={`ml-2 ${darkMode ? 'text-gray-400' : 'text-gray-400'}`}>({log.timestamp})</span>
          </li>
        ))}
      </ul>
    </section>
  );
};