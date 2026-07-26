'use client';

import { useEffect, useState } from 'react';

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

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

  mtTrend: {
    date: string;
    messages: number;
  }[];

  moTrend: {
    date: string;
    messages: number;
  }[];

messageLifecycle: {
  date: string;
  sent: number;
  delivered: number;
  read: number;
  replied: number;
}[];

failureSummary: {
  reason: string;
  count: number;
}[];

totalFailedMessages: number;

campaignSummary: {
  sent: number;
  delivered: number;
  read: number;
  replied: number;

  deliveryRate: number;
  readRate: number;
  replyRate: number;
};

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

const trafficTrend = data.mtTrend.map((mt) => {
  const mo = data.moTrend.find((m) => m.date === mt.date);

  return {
    date: mt.date,
    outbound: mt.messages,
    inbound: mo?.messages ?? 0,
  };
});

  return (
    <div>

	<div className="mt-0">

          <div className="rounded-xl bg-white p-2 shadow">

            <h2 className="mb-6 text-xl font-semibold">
              Message Traffic Trend (Last 30 Days)
            </h2>

            <div className="h-56">

              <ResponsiveContainer width="100%" height="100%">

                <LineChart data={trafficTrend}>

                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis
                    dataKey="date"
                    type="category"
                    interval={0}
                  />

                  <YAxis
                    allowDecimals={false}
                    domain={[0, 'dataMax + 10']}
                  />

                  <Legend />

                  <Tooltip />

                  <Line
                    type="monotone"
                    dataKey="outbound"
                    name="Outbound"
                    stroke="#2563eb"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                    animationDuration={800}
                  />

                  <Line
                    type="monotone"
                    dataKey="inbound"
                    name="Inbound"
                    stroke="#16a34a"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                    animationDuration={800}
                  />

                </LineChart>

              </ResponsiveContainer>

            </div>

          </div>

        </div>

<div className="mt-1">

  <div className="rounded-xl bg-white p-2 shadow">

    <h2 className="mb-6 text-xl font-semibold">
      Message Lifecycle (Last 30 Days)
    </h2>

    <div className="h-56">

      <ResponsiveContainer width="100%" height="100%">

        <LineChart data={data.messageLifecycle}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            dataKey="date"
            type="category"
            interval={0}
          />

          <YAxis
            allowDecimals={false}
            domain={[0, 'dataMax + 10']}
          />

          <Tooltip />

          <Legend />

          <Line
            type="monotone"
            dataKey="sent"
            name="Sent"
            stroke="#2563eb"
            strokeWidth={3}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />

          <Line
            type="monotone"
            dataKey="delivered"
            name="Delivered"
            stroke="#9333ea"
            strokeWidth={3}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />

          <Line
            type="monotone"
            dataKey="read"
            name="Read"
            stroke="#16a34a"
            strokeWidth={3}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />

          <Line
            type="monotone"
            dataKey="replied"
            name="Replies"
            stroke="#ea580c"
            strokeWidth={3}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>

  </div>

</div>

<div className="mt-1 grid grid-cols-2 gap-6">

  <div className="rounded-xl bg-white p-2 shadow">

<div className="mb-0.1 flex items-center justify-between">

  <h2 className="text-xl font-semibold">
    Failed Message Summary
  </h2>

  <span className="rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-700">
    Last 30 Days • Total Failed: {data.totalFailedMessages}
  </span>

</div>

    <table className="w-full">

      <thead>

        <tr className="border-b">

          <th className="py-1 text-left">
            Failure Reason
          </th>

          <th className="py-1 text-right">
            Count
          </th>

        </tr>

      </thead>

      <tbody>

        {data.failureSummary.map((item) => (

          <tr
            key={item.reason}
            className="border-b last:border-0"
          >

            <td className="py-3">
              {item.reason}
            </td>

<td className="py-3 text-right">
  <span className="inline-flex min-w-[52px] justify-center rounded-full bg-red-100 px-4 py-1.5 text-sm font-bold text-red-700">
    {item.count}
  </span>
</td>

          </tr>

        ))}

      </tbody>

    </table>

  </div>

<div className="rounded-xl bg-white p-6 shadow">

  <h2 className="mb-6 text-xl font-semibold">
    Message Performance
  </h2>

  <div className="space-y-5">

    <div className="flex justify-between">
      <span>Sent</span>
      <span className="font-bold">
        {data.campaignSummary.sent}
      </span>
    </div>

    <div className="flex justify-between">
      <span>Delivered</span>

<div className="flex items-center gap-2">

  <span className="text-xl font-bold text-green-600">
    {data.campaignSummary.delivered}
  </span>

  <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-700">
    {data.campaignSummary.deliveryRate}%
  </span>

</div>
    </div>

    <div className="flex justify-between">
      <span>Read</span>
<div className="flex items-center gap-2">

  <span className="text-xl font-bold text-blue-600">
    {data.campaignSummary.read}
  </span>

  <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-700">
    {data.campaignSummary.readRate}%
  </span>

</div>

    </div>

    <div className="flex justify-between">
      <span>Replies</span>

<div className="flex items-center gap-2">

  <span className="text-xl font-bold text-purple-600">
    {data.campaignSummary.replied}
  </span>

  <span className="rounded-full bg-purple-100 px-2 py-1 text-xs font-semibold text-purple-700">
    {data.campaignSummary.replyRate}%
  </span>

</div>

    </div>

  </div>

</div>
</div>

    </div>
  );
}
