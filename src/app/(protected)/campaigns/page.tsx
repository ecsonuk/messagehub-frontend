'use client';

import { useEffect, useState } from 'react';

import CreateCampaignModal from '@/components/campaigns/CreateCampaignModal';
import CampaignRecipientsModal from '@/components/campaigns/CampaignRecipientsModal';

import { getCampaigns } from '@/services/campaign.service';
import { formatDateTime } from '@/lib/date';

interface Campaign {
  id: string;
  name: string;
  status: string;
  totalRecords: number;
  validRecords: number;
  invalidRecords: number;
  duplicateRecords: number;

  scheduledAt?: string;
  createdAt: string;
}

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [openModal, setOpenModal] = useState(false);

  const [recipientModalOpen, setRecipientModalOpen] =
  useState(false);

  const [selectedCampaign, setSelectedCampaign] =
  useState<Campaign | null>(null);

  async function loadCampaigns() {
    try {
      setLoading(true);

      const data = await getCampaigns();

      setCampaigns(data);
      setError('');
    } catch (err) {
      console.error(err);
      setError('Failed to load campaigns.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCampaigns();
  }, []);

  function statusBadge(status: string) {
    switch (status) {
      case 'READY':
        return 'bg-blue-600';

      case 'RUNNING':
        return 'bg-green-600';

      case 'COMPLETED':
        return 'bg-slate-700';

      case 'FAILED':
        return 'bg-red-600';

      case 'PAUSED':
        return 'bg-yellow-500';

      default:
        return 'bg-gray-500';
    }
  }

function formatDateTime(date: string) {
  return new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Riyadh',
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(new Date(date));
}

  return (
    <div>

      <div className="mb-6 flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold text-slate-800">
            Campaigns
          </h1>

          <p className="text-slate-500">
            Manage WhatsApp campaigns.
          </p>

        </div>

	<button
	  onClick={() => setOpenModal(true)}
	  className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
	>
	  + New Campaign
	</button>

      </div>

      {loading && (
        <div className="rounded-lg bg-white p-6 shadow">
          Loading campaigns...
        </div>
      )}

      {error && (
        <div className="rounded-lg border border-red-300 bg-red-50 p-4 text-red-600">
          {error}
        </div>
      )}

      {!loading && !error && campaigns.length === 0 && (
        <div className="rounded-lg bg-white p-6 shadow">
          No campaigns found.
        </div>
      )}

      {!loading && !error && campaigns.length > 0 && (

        <div className="overflow-hidden rounded-xl bg-white shadow">

          <table className="min-w-full">

            <thead className="bg-slate-100">

              <tr>

                <th className="px-5 py-3 text-left">
                  Campaign
                </th>

                <th className="px-5 py-3 text-center">
                  Status
                </th>

                <th className="px-5 py-3 text-center">
                  Total
                </th>

                <th className="px-5 py-3 text-center">
                  Valid
                </th>

                <th className="px-5 py-3 text-center">
                  Invalid
                </th>

                <th className="px-5 py-3 text-center">
                  Duplicate
                </th>

		<th className="px-5 py-3">
		  Scheduled
		</th>

		<th className="px-5 py-3">
		  Created
		</th>

		<th className="px-5 py-3 text-center">
		  Action
		</th>

              </tr>

            </thead>

            <tbody>

              {campaigns.map((campaign) => (

                <tr
                  key={campaign.id}
                  className="border-t"
                >

                  <td className="px-5 py-4 font-medium">
                    {campaign.name}
                  </td>

                  <td className="px-5 py-4 text-center">

                    <span
                      className={`rounded-full px-3 py-1 text-sm text-white ${statusBadge(
                        campaign.status,
                      )}`}
                    >
                      {campaign.status}
                    </span>

                  </td>

                  <td className="px-5 py-4 text-center">
                    {campaign.totalRecords}
                  </td>

                  <td className="px-5 py-4 text-center">
                    {campaign.validRecords}
                  </td>

                  <td className="px-5 py-4 text-center">
                    {campaign.invalidRecords}
                  </td>

                  <td className="px-5 py-4 text-center">
                    {campaign.duplicateRecords}
                  </td>

		<td className="px-5 py-4">
		  {campaign.scheduledAt
		    ? formatDateTime(campaign.scheduledAt)
		    : '-'}
		</td>

		<td className="px-5 py-4">
		  {formatDateTime(campaign.createdAt)}
		</td>

		<td className="px-5 py-4 text-center">
		
		  <button
		    onClick={() => {
		      setSelectedCampaign(campaign);
		      setRecipientModalOpen(true);
		    }}
		    className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
		  >
		    View
		  </button>
		
		</td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      )}
	<CreateCampaignModal
	  open={openModal}
	  onClose={() => setOpenModal(false)}
	  onSuccess={loadCampaigns}
	/>

	<CampaignRecipientsModal
	  open={recipientModalOpen}
	  campaignId={selectedCampaign?.id || ''}
	  campaignName={selectedCampaign?.name || ''}
	  onClose={() => setRecipientModalOpen(false)}
	/>

    </div>
  );
}
