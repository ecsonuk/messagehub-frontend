import api from '@/lib/api';

export async function getReportSummary() {
  const response = await api.get('/reports/summary');
  return response.data;
}
