'use client';

import { useEffect, useState } from 'react';

import {
  getCampaignRecipients,
  downloadCampaignRecipients,
} from '@/services/campaign.service';

import RecipientTimelineModal from './RecipientTimelineModal';

interface Props {
  open: boolean;
  campaignId: string;
  campaignName: string;
  onClose: () => void;
}

interface Recipient {
  id: string;
  customerName: string;
  whatsappNumber: string;
  status: string;
  sentAt?: string;
  deliveredAt?: string;
  readAt?: string;
  repliedAt?: string;
}

interface Summary {
  total: number;
  valid: number;
  invalid: number;
  duplicate: number;
  queued: number;
  processing: number;
  sent: number;
  delivered: number;
  read: number;
  replied: number;
  failed: number;
}

export default function CampaignRecipientsModal({
  open,
  campaignId,
  campaignName,
  onClose,
}: Props) {

const [loading, setLoading] =
  useState(false);

const [search, setSearch] =
  useState('');

const [debouncedSearch, setDebouncedSearch] =
  useState('');

useEffect(() => {
  const timer = setTimeout(() => {
    setDebouncedSearch(search);
  }, 1000);

  return () => clearTimeout(timer);
}, [search]);

const [filter, setFilter] =
  useState('ALL');

const [summary, setSummary] =
  useState<Summary>({
    total: 0,
    valid: 0,
    invalid: 0,
    duplicate: 0,
    queued: 0,
    processing: 0,
    sent: 0,
    delivered: 0,
    read: 0,
    replied: 0,
    failed: 0,
  });

const [recipients, setRecipients] =
  useState<Recipient[]>([]);

const [timelineOpen, setTimelineOpen] =
  useState(false);

const [selectedRecipientId, setSelectedRecipientId] =
  useState('');

useEffect(() => {
  if (!open || !campaignId) {
    return;
  }

  loadRecipients();
}, [open, campaignId, filter, debouncedSearch]);

async function loadRecipients() {
console.log('Loading recipients...', {
  campaignId,
  filter,
  search: debouncedSearch,
});
  try {
    setLoading(true);

    const data =
      await getCampaignRecipients(
        campaignId,
        filter,
        debouncedSearch,
      );

    setSummary(data.summary);

    setRecipients(data.recipients);
    console.log(data);
  } finally {
    setLoading(false);
  }
}

async function downloadCsv() {
  const blob =
    await downloadCampaignRecipients(
      campaignId,
      filter,
    );

  const url =
    window.URL.createObjectURL(blob);

  const link =
    document.createElement('a');

  link.href = url;

  link.download =
    `${campaignName}.csv`;

  document.body.appendChild(link);

  link.click();

  link.remove();

  window.URL.revokeObjectURL(url);
}

if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

      <div className="max-h-[90vh] w-full max-w-7xl overflow-auto rounded-xl bg-white shadow-xl">

        <div className="flex items-center justify-between border-b p-6">

          <div>

            <h2 className="text-2xl font-bold">
              {campaignName}
            </h2>

            <p className="text-sm text-slate-500">
              Campaign Recipient Tracking
            </p>

          </div>

          <button
            onClick={onClose}
            className="rounded border px-4 py-2"
          >
            Close
          </button>

        </div>

        <div className="p-6">

          <div className="mb-6 grid grid-cols-5 gap-4">

              {[
                {
                  label: 'Total',
                  value: summary.total,
                  filter: 'ALL',
                },
                {
                  label: 'Valid',
                  value: summary.valid,
                  filter: 'VALID',
                },
                {
                  label: 'Invalid',
                  value: summary.invalid,
                  filter: 'INVALID',
                },
                {
                  label: 'Duplicate',
                  value: summary.duplicate,
                  filter: 'DUPLICATE',
                },
                {
                  label: 'Queued',
                  value: summary.queued,
                  filter: 'QUEUED',
                },
                {
                  label: 'Processing',
                  value: summary.processing,
                  filter: 'PROCESSING',
                },
                {
                  label: 'Sent',
                  value: summary.sent,
                  filter: 'SENT',
                },
                {
                  label: 'Delivered',
                  value: summary.delivered,
                  filter: 'DELIVERED',
                },
                {
                  label: 'Read',
                  value: summary.read,
                  filter: 'READ',
                },
                {
                  label: 'Replied',
                  value: summary.replied,
                  filter: 'REPLIED',
                },
                {
                  label: 'Failed',
                  value: summary.failed,
                  filter: 'FAILED',
                },
              ].map((item) => (

                <button
                  key={item.filter}
                  onClick={() => setFilter(item.filter)}
                  className="rounded-lg border bg-slate-50 p-4 text-center hover:bg-blue-50"
                >

                <div className="text-sm text-slate-500">
                  {item.label}
                </div>

                <div className="mt-2 text-2xl font-bold">
                  {item.value}
                </div>

              </button>

            ))}

          </div>

	<input
	  placeholder="Search customer or WhatsApp number..."
	  className="mb-6 w-full rounded border p-3"
	  value={search}
	  onChange={(e) =>
	    setSearch(e.target.value)
	  }
	/>

          <div className="rounded-lg border">

            <table className="min-w-full">

              <thead className="bg-slate-100">

                <tr>

                  <th className="px-4 py-3 text-left">
                    Customer
                  </th>

                  <th className="px-4 py-3">
                    WhatsApp
                  </th>

                  <th className="px-4 py-3">
                    Status
                  </th>

                  <th className="px-4 py-3">
                    Action
                  </th>

                </tr>

              </thead>

<tbody>

  {loading ? (

    <tr>

      <td
        colSpan={4}
        className="p-8 text-center"
      >
        Loading...
      </td>

    </tr>

  ) : recipients.length === 0 ? (

    <tr>

      <td
        colSpan={4}
        className="p-8 text-center"
      >
        No recipients found.
      </td>

    </tr>

  ) : (

    recipients.map((recipient) => (

      <tr
        key={recipient.id}
        className="border-t"
      >

        <td className="px-4 py-3">
          {recipient.customerName}
        </td>

        <td className="px-4 py-3">
          {recipient.whatsappNumber}
        </td>

        <td className="px-4 py-3">
          {recipient.status}
        </td>

        <td className="px-4 py-3">

	<button
	  onClick={() => {
	    setSelectedRecipientId(recipient.id);
	    setTimelineOpen(true);
	  }}
	  className="rounded bg-blue-600 px-3 py-1 text-white hover:bg-blue-700"
	>
	  View
	</button>

        </td>

      </tr>

    ))

  )}

</tbody>

            </table>

          </div>

          <div className="mt-6 flex justify-end">
		<button
		  onClick={downloadCsv}
		  className="rounded bg-green-600 px-5 py-2 text-white"
		>
              Download CSV
            </button>

          </div>

        </div>

      </div>

<RecipientTimelineModal
  open={timelineOpen}
  recipientId={selectedRecipientId}
  onClose={() => {
    setTimelineOpen(false);
    setSelectedRecipientId('');
  }}
/>

    </div>
  );
}
