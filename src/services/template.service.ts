import api from '@/lib/api';

export async function getTemplates() {
  const response = await api.get('/templates');
  return response.data;
}

export async function createTemplate(data: {
  name: string;
  message: string;
}) {
  const response = await api.post(
    '/templates',
    data,
  );

  return response.data;
}
