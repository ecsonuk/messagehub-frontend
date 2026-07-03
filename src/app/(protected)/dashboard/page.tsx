'use client';

import { useEffect, useState } from 'react';

import { getDashboard } from '@/services/dashboard.service';

interface DashboardData {
  runningCampaigns: number;
  completedCampaigns: number;
  templates: number;
  messages: number;
  recentCampaigns: {
    id: string;
    name: string;
    status: string;
  }[];
  recentActivity: {
    id: string;
    action: string;
    createdAt: string;
  }[];
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  async function loadDashboard() {
    try {
      const response = await getDashboard();
      setData(response);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadDashboard();
  }, []);

  if (loading) {
    return <div>Loading dashboard...</div>;
  }

  if (!data) {
    return <div>Failed to load dashboard.</div>;
  }

  return (
    <div>

      <h1 className="text-3xl font-bold text-slate-800">
        Dashboard
      </h1>

      <p className="mt-2 text-slate-500">
        Welcome to Luxury Ride WhatsApp Campaign Platform.
      </p>

      <div className="mt-8 grid grid-cols-4 gap-6">

        <div className="rounded-xl bg-white p-6 shadow">
          <h3 className="text-slate-500">
            Running Campaigns
          </h3>

          <p className="mt-4 text-4xl font-bold">
            {data.runningCampaigns}
          </p>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <h3 className="text-slate-500">
            Completed Campaigns
          </h3>

          <p className="mt-4 text-4xl font-bold">
            {data.completedCampaigns}
          </p>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <h3 className="text-slate-500">
            Templates
          </h3>

          <p className="mt-4 text-4xl font-bold">
            {data.templates}
          </p>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <h3 className="text-slate-500">
            Messages
          </h3>

          <p className="mt-4 text-4xl font-bold">
            {data.messages}
          </p>
        </div>

      </div>

      <div className="mt-10 grid grid-cols-2 gap-6">

        <div className="rounded-xl bg-white p-6 shadow">

          <h2 className="mb-4 text-xl font-semibold">
            Recent Campaigns
          </h2>

          <ul className="space-y-3">

            {data.recentCampaigns.map((campaign) => (
              <li
                key={campaign.id}
                className="flex justify-between border-b pb-2"
              >
                <span>{campaign.name}</span>
                <span>{campaign.status}</span>
              </li>
            ))}

          </ul>

        </div>

        <div className="rounded-xl bg-white p-6 shadow">

          <h2 className="mb-4 text-xl font-semibold">
            Recent Activity
          </h2>

          <ul className="space-y-3">

            {data.recentActivity.map((activity) => (
              <li
                key={activity.id}
                className="border-b pb-2"
              >
                <div>{activity.action}</div>

                <div className="text-sm text-gray-500">
                  {new Date(activity.createdAt).toLocaleString()}
                </div>
              </li>
            ))}

          </ul>

        </div>

      </div>

    </div>
  );
}
