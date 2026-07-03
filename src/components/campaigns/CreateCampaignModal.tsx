'use client';

import { useEffect, useState } from 'react';

import { createCampaign } from '@/services/campaign.service';
import { getTemplates } from '@/services/template.service';

interface Template {
  id: string;
  name: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function CreateCampaignModal({
  open,
  onClose,
  onSuccess,
}: Props) {
  const [templates, setTemplates] = useState<Template[]>([]);

  const [name, setName] = useState('');
  const [templateId, setTemplateId] = useState('');
  const [sendType, setSendType] = useState('NOW');
  const [scheduledAt, setScheduledAt] = useState('');
  const [sendIntervalValue, setSendIntervalValue] = useState(1);
  const [sendIntervalUnit, setSendIntervalUnit] =
    useState('SECONDS');

  const [csvFile, setCsvFile] =
    useState<File | null>(null);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!open) {
      return;
    }

    getTemplates()
      .then(setTemplates)
      .catch(() => {
        setError('Failed to load templates.');
      });
  }, [open]);

  if (!open) {
    return null;
  }

  async function save() {
    if (
      !name ||
      !templateId ||
      !csvFile
    ) {
      setError(
        'Campaign Name, Template and CSV are required.',
      );
      return;
    }

    try {
      setSaving(true);
      setError('');

      const form = new FormData();

      form.append('name', name);
      form.append('templateId', templateId);
      form.append('sendType', sendType);

	if (scheduledAt) {
	  form.append(
	    'scheduledAt',
	    new Date(scheduledAt).toISOString(),
	  );
	}

      form.append(
        'sendIntervalValue',
        String(sendIntervalValue),
      );

      form.append(
        'sendIntervalUnit',
        sendIntervalUnit,
      );

      form.append(
        'csvFile',
        csvFile,
      );

      await createCampaign(form);

      onSuccess();
      onClose();

      setName('');
      setTemplateId('');
      setCsvFile(null);

    } catch {
      setError(
        'Failed to create campaign.',
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

      <div className="w-full max-w-2xl rounded-xl bg-white p-6 shadow-xl">

        <h2 className="mb-6 text-2xl font-bold">
          Create Campaign
        </h2>

        {error && (
          <div className="mb-4 rounded border border-red-300 bg-red-50 p-3 text-red-600">
            {error}
          </div>
        )}

        <div className="space-y-4">

          <input
            className="w-full rounded border p-3"
            placeholder="Campaign Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
          />

          <select
            className="w-full rounded border p-3"
            value={templateId}
            onChange={(e) =>
              setTemplateId(e.target.value)
            }
          >
            <option value="">
              Select Template
            </option>

            {templates.map((t) => (
              <option
                key={t.id}
                value={t.id}
              >
                {t.name}
              </option>
            ))}

          </select>

          <select
            className="w-full rounded border p-3"
            value={sendType}
            onChange={(e) =>
              setSendType(e.target.value)
            }
          >
            <option value="NOW">
              Send Now
            </option>

            <option value="SCHEDULE">
              Schedule
            </option>

          </select>

          {sendType === 'SCHEDULE' && (
            <input
              type="datetime-local"
              className="w-full rounded border p-3"
              value={scheduledAt}
              onChange={(e) =>
                setScheduledAt(e.target.value)
              }
            />
          )}

          <div className="flex gap-4">

            <input
              type="number"
              className="flex-1 rounded border p-3"
              value={sendIntervalValue}
              onChange={(e) =>
                setSendIntervalValue(
                  Number(e.target.value),
                )
              }
            />

            <select
              className="flex-1 rounded border p-3"
              value={sendIntervalUnit}
              onChange={(e) =>
                setSendIntervalUnit(
                  e.target.value,
                )
              }
            >
              <option>
                SECONDS
              </option>

              <option>
                MINUTES
              </option>

            </select>

          </div>

          <input
            type="file"
            accept=".csv"
            onChange={(e) =>
              setCsvFile(
                e.target.files?.[0] || null,
              )
            }
          />

        </div>

        <div className="mt-6 flex justify-end gap-3">

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
            {saving
              ? 'Creating...'
              : 'Create Campaign'}
          </button>

        </div>

      </div>

    </div>
  );
}
