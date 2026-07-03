'use client';

import { useEffect, useState } from 'react';

import { getReportSummary } from '@/services/reports.service';

interface ReportSummary {
  totalCampaigns: number;
  runningCampaigns: number;
  completedCampaigns: number;
  templates: number;
  totalMessages: number;
}

export default function ReportsPage() {
  const [summary, setSummary] = useState<ReportSummary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSummary();
  }, []);

  async function loadSummary() {
    try {
      const data = await getReportSummary();
      setSummary(data);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <div>Loading reports...</div>;
  }

  if (!summary) {
    return <div>Failed to load reports.</div>;
  }

  const cards = [
    { label: 'Total Campaigns', value: summary.totalCampaigns },
    { label: 'Running Campaigns', value: summary.runningCampaigns },
    { label: 'Completed Campaigns', value: summary.completedCampaigns },
    { label: 'Templates', value: summary.templates },
    { label: 'Messages', value: summary.totalMessages },
  ];

  return (
    <div>

      <h1 className="text-3xl font-bold text-slate-800">
        Reports
      </h1>

      <p className="mt-2 text-slate-500">
        Overall platform summary.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-5">

        {cards.map((card) => (
          <div
            key={card.label}
            className="rounded-xl bg-white p-6 shadow"
          >
            <div className="text-sm text-slate-500">
              {card.label}
            </div>

            <div className="mt-3 text-3xl font-bold">
              {card.value}
            </div>
          </div>
        ))}

      </div>

    </div>
  );
}
