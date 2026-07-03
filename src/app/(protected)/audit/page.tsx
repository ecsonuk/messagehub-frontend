'use client';

import { useEffect, useState } from 'react';

import { getAuditLogs } from '@/services/audit.service';

interface AuditLog {
  id: string;
  module: string;
  action: string;
  entityName?: string;
  userId: string;
  createdAt: string;
}

export default function AuditPage() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function loadLogs() {
    try {
      setLoading(true);

      const data = await getAuditLogs();

      setLogs(data);
      setError('');
    } catch (err) {
      console.error(err);
      setError('Failed to load audit logs.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadLogs();
  }, []);

  return (
    <div>

      <div className="mb-6">

        <h1 className="text-3xl font-bold text-slate-800">
          Audit Logs
        </h1>

        <p className="text-slate-500">
          User activity and system audit history.
        </p>

      </div>

      {loading && (
        <div className="rounded-lg bg-white p-6 shadow">
          Loading audit logs...
        </div>
      )}

      {error && (
        <div className="rounded-lg border border-red-300 bg-red-50 p-4 text-red-600">
          {error}
        </div>
      )}

      {!loading && !error && (

        <div className="overflow-hidden rounded-xl bg-white shadow">

          <table className="min-w-full">

            <thead className="bg-slate-100">

              <tr>

                <th className="px-5 py-3 text-left">
                  Time
                </th>

                <th className="px-5 py-3 text-left">
                  Module
                </th>

                <th className="px-5 py-3 text-left">
                  Action
                </th>

                <th className="px-5 py-3 text-left">
                  Entity
                </th>

                <th className="px-5 py-3 text-left">
                  User
                </th>

              </tr>

            </thead>

            <tbody>

              {logs.map((log) => (

                <tr
                  key={log.id}
                  className="border-t"
                >

                  <td className="px-5 py-4">
                    {new Date(
                      log.createdAt,
                    ).toLocaleString()}
                  </td>

                  <td className="px-5 py-4">
                    {log.module}
                  </td>

                  <td className="px-5 py-4 font-medium">
                    {log.action}
                  </td>

                  <td className="px-5 py-4">
                    {log.entityName || '-'}
                  </td>

                  <td className="px-5 py-4">
                    {log.userId}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      )}

    </div>
  );
}
