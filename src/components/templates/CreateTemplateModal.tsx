'use client';

import { useState } from 'react';

import { createTemplate } from '@/services/template.service';

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function CreateTemplateModal({
  open,
  onClose,
  onSuccess,
}: Props) {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  if (!open) {
    return null;
  }

  async function save() {
    if (!name.trim() || !message.trim()) {
      setError('Name and Message are required.');
      return;
    }

    try {
      setSaving(true);
      setError('');

      await createTemplate({
        name,
        message,
      });

      setName('');
      setMessage('');

      onSuccess();
      onClose();
    } catch {
      setError('Failed to create template.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

      <div className="w-full max-w-xl rounded-xl bg-white p-6 shadow-xl">

        <h2 className="mb-6 text-2xl font-bold">
          Create Template
        </h2>

        {error && (
          <div className="mb-4 rounded border border-red-300 bg-red-50 p-3 text-red-600">
            {error}
          </div>
        )}

        <div className="mb-4">

          <label className="mb-2 block font-medium">
            Template Name
          </label>

          <input
            className="w-full rounded border p-3"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

        </div>

        <div className="mb-6">

          <label className="mb-2 block font-medium">
            Message
          </label>

          <textarea
            rows={6}
            className="w-full rounded border p-3"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

        </div>

        <div className="flex justify-end gap-3">

          <button
            onClick={onClose}
            className="rounded border px-5 py-2"
          >
            Cancel
          </button>

          <button
            disabled={saving}
            onClick={save}
            className="rounded bg-blue-600 px-5 py-2 text-white"
          >
            {saving ? 'Saving...' : 'Save'}
          </button>

        </div>

      </div>

    </div>
  );
}
