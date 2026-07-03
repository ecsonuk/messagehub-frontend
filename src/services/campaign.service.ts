import api from '@/lib/api';

export async function getCampaigns() {
  const response = await api.get('/campaigns');
  return response.data;
}

export async function createCampaign(formData: FormData) {
  const response = await api.post(
    '/campaigns',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );

  return response.data;
}

export async function getCampaignRecipients(
  campaignId: string,
  filter = 'ALL',
  search = '',
) {
  const response = await api.get(
    `/campaigns/${campaignId}/recipients`,
    {
      params: {
        filter,
        search,
      },
    },
  );

  return response.data;
}

export async function getRecipientTimeline(
  recipientId: string,
) {
  const response = await api.get(
    `/campaigns/recipients/${recipientId}/timeline`,
  );

  return response.data;
}

export async function exportCampaignRecipients(
  campaignId: string,
  filter = 'ALL',
  search = '',
) {
  const response = await api.get(
    `/campaigns/${campaignId}/recipients/export`,
    {
      params: {
        filter,
        search,
      },
      responseType: 'blob',
    },
  );

  return response.data;
}

export async function downloadCampaignRecipients(
  campaignId: string,
  filter: string,
) {
  const response = await api.get(
    `/campaigns/${campaignId}/recipients/export`,
    {
      params: {
        filter,
      },
      responseType: 'blob',
    },
  );

  return response.data;
}
