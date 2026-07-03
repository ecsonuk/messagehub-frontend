'use client';

import { useEffect, useState } from 'react';
import CreateTemplateModal from '@/components/templates/CreateTemplateModal';
import { getTemplates } from '@/services/template.service';
import api from '@/lib/api';

interface Template {
  id: string;
  name: string;
  message: string;
  isActive: boolean;
  createdAt: string;
}

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [openModal, setOpenModal] = useState(false);

  async function loadTemplates() {
    try {
      setLoading(true);

      const data = await getTemplates();

      setTemplates(data);
      setError('');
    } catch (err) {
      console.error(err);
      setError('Failed to load templates.');
    } finally {
      setLoading(false);
    }
  }

async function deleteTemplate(id: string) {
  const confirmed = window.confirm(
    'Are you sure you want to delete this template?',
  );

  if (!confirmed) {
    return;
  }

  try {
    await api.delete(`/templates/${id}`);

    await loadTemplates();
  } catch (err) {
    console.error(err);
    alert('Failed to delete template.');
  }
}

  useEffect(() => {
    loadTemplates();
  }, []);

  return (
    <div>

      <div className="mb-6 flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Templates
          </h1>

          <p className="text-slate-500">
            Manage WhatsApp message templates.
          </p>
        </div>

	<button
	  onClick={() => setOpenModal(true)}
	  className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
	>
	  + New Template
	</button>

      </div>

      {loading && (
        <div className="rounded-lg bg-white p-6 shadow">
          Loading templates...
        </div>
      )}

      {error && (
        <div className="rounded-lg border border-red-300 bg-red-50 p-4 text-red-600">
          {error}
        </div>
      )}

      {!loading && !error && templates.length === 0 && (
        <div className="rounded-lg bg-white p-6 shadow">
          No templates found.
        </div>
      )}

      {!loading && !error && templates.length > 0 && (
        <div className="overflow-hidden rounded-xl bg-white shadow">

          <table className="min-w-full">

            <thead className="bg-slate-100">

              <tr>

                <th className="px-6 py-3 text-left">
                  Name
                </th>

                <th className="px-6 py-3 text-left">
                  Message
                </th>

                <th className="px-6 py-3 text-left">
                  Status
                </th>

                <th className="px-6 py-3 text-left">
                  Created
                </th>

		<th className="px-6 py-3 text-center">
		  Action
		</th>

              </tr>

            </thead>

            <tbody>

              {templates.map((template) => (

                <tr
                  key={template.id}
                  className="border-t"
                >

                  <td className="px-6 py-4 font-medium">
                    {template.name}
                  </td>

                  <td className="px-6 py-4">
                    {template.message}
                  </td>

                  <td className="px-6 py-4">

                    <span
                      className={`rounded-full px-3 py-1 text-sm text-white ${
                        template.isActive
                          ? 'bg-green-600'
                          : 'bg-red-600'
                      }`}
                    >
                      {template.isActive ? 'Active' : 'Inactive'}
                    </span>

                  </td>

<td className="px-6 py-4">
  {new Date(
    template.createdAt,
  ).toLocaleString()}
</td>

<td className="px-6 py-4 text-center">
  <button
    onClick={() => deleteTemplate(template.id)}
    className="rounded bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700"
  >
    Delete
  </button>
</td>

</tr>


              ))}

            </tbody>

          </table>

        </div>
      )}

	<CreateTemplateModal
	  open={openModal}
	  onClose={() => setOpenModal(false)}
	  onSuccess={loadTemplates}
	/>

    </div>
  );
}
