'use client';

import { useEffect, useState } from 'react';

import {
  getSettings,
  saveSettings,
} from '@/services/settings.service';

export default function SettingsPage() {
  const [form, setForm] = useState<any>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

async function loadSettings() {
  const data = await getSettings();

  setForm({
    companyName: data.companyName ?? '',
    timezone: data.timezone ?? '',

    defaultSendInterval:
      data.defaultSendInterval ?? 1,

    defaultSendIntervalUnit:
      data.defaultSendIntervalUnit ?? 'SECONDS',

    metaAppId:
      data.metaAppId ?? '',

    whatsappBusinessAccountId:
      data.whatsappBusinessAccountId ?? '',

    phoneNumberId:
      data.phoneNumberId ?? '',

    accessToken:
      data.accessToken ?? '',

    verifyToken:
      data.verifyToken ?? '',
  });
}


  async function handleSave() {
    setSaving(true);

    await saveSettings(form);

    alert('Settings saved successfully.');

    setSaving(false);
  }

  if (!form) {
    return <div>Loading...</div>;
  }

  return (
    <div>

      <h1 className="text-3xl font-bold">
        Settings
      </h1>

      <div className="mt-8 space-y-6 max-w-3xl">

        <div>

          <label className="block mb-2 font-medium">
            Company Name
          </label>

          <input
            className="w-full rounded border p-3"
            value={form.companyName}
            onChange={(e) =>
              setForm({
                ...form,
                companyName: e.target.value,
              })
            }
          />

        </div>

        <div>

          <label className="block mb-2 font-medium">
            Time Zone
          </label>

          <input
            className="w-full rounded border p-3"
            value={form.timezone}
            onChange={(e) =>
              setForm({
                ...form,
                timezone: e.target.value,
              })
            }
          />

        </div>

        <div className="grid grid-cols-2 gap-6">

          <div>

            <label className="block mb-2 font-medium">
              Default Interval
            </label>

            <input
              type="number"
              className="w-full rounded border p-3"
              value={form.defaultSendInterval}
              onChange={(e) =>
                setForm({
                  ...form,
                  defaultSendInterval: Number(e.target.value),
                })
              }
            />

          </div>

          <div>

            <label className="block mb-2 font-medium">
              Unit
            </label>

            <select
              className="w-full rounded border p-3"
              value={form.defaultSendIntervalUnit}
              onChange={(e) =>
                setForm({
                  ...form,
                  defaultSendIntervalUnit: e.target.value,
                })
              }
            >
              <option>SECONDS</option>
              <option>MINUTES</option>
            </select>

          </div>

        </div>

        <div>

          <label className="block mb-2 font-medium">
            Meta App ID
          </label>

          <input
            className="w-full rounded border p-3"
            value={form.metaAppId}
            onChange={(e) =>
              setForm({
                ...form,
                metaAppId: e.target.value,
              })
            }
          />

        </div>

        <div>

          <label className="block mb-2 font-medium">
            WhatsApp Business Account ID
          </label>

          <input
            className="w-full rounded border p-3"
            value={form.whatsappBusinessAccountId}
            onChange={(e) =>
              setForm({
                ...form,
                whatsappBusinessAccountId: e.target.value,
              })
            }
          />

        </div>

        <div>

          <label className="block mb-2 font-medium">
            Phone Number ID
          </label>

          <input
            className="w-full rounded border p-3"
            value={form.phoneNumberId}
            onChange={(e) =>
              setForm({
                ...form,
                phoneNumberId: e.target.value,
              })
            }
          />

        </div>

          <div>

            <label className="block mb-2 font-medium">
              Access Token
            </label>

            <textarea
              rows={6}
              className="w-full rounded border p-3"
              value={form.accessToken}
              onChange={(e) =>
                setForm({
                  ...form,
                  accessToken: e.target.value,
                })
              }
            />

          </div>

          <div>

            <label className="block mb-2 font-medium">
              Verify Token
            </label>

            <input
              className="w-full rounded border p-3"
              value={form.verifyToken}
              onChange={(e) =>
                setForm({
                  ...form,
                  verifyToken: e.target.value,
                })
              }
            />

          </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="rounded bg-blue-600 px-6 py-3 text-white"
        >
          {saving ? 'Saving...' : 'Save Settings'}
        </button>

      </div>

    </div>
  );
}
