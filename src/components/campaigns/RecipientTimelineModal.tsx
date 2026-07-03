'use client';

import { useEffect, useState } from 'react';
import { formatDateTime } from '@/lib/date';

import {
  getRecipientTimeline,
} from '@/services/campaign.service';

interface Props {
  open: boolean;
  onClose: () => void;
  recipientId: string;
}

interface TimelineData {
  recipient: {
    customerName: string;
    whatsappNumber: string;
    currentStatus: string;
  };

  campaign: {
    name: string;
  };

  timeline: {
    queuedAt?: string;
    processingAt?: string;
    sentAt?: string;
    deliveredAt?: string;
    readAt?: string;
    repliedAt?: string;
  };

  failureReason?: string;
}

export default function RecipientTimelineModal({
  open,
  onClose,
  recipientId,
}: Props) {

  const [loading, setLoading] =
    useState(false);

  const [timeline, setTimeline] =
    useState<TimelineData | null>(null);

  useEffect(() => {

    if (!open || !recipientId) {
      return;
    }

    loadTimeline();

  }, [open, recipientId]);

  async function loadTimeline() {

    setLoading(true);

    try {

      const data =
        await getRecipientTimeline(
          recipientId,
        );

      setTimeline(data);

    } finally {

      setLoading(false);

    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40">

      <div className="w-full max-w-2xl rounded-xl bg-white shadow-xl">

        <div className="flex items-center justify-between border-b p-6">

          <h2 className="text-2xl font-bold">
            Recipient Timeline
          </h2>

          <button
            onClick={onClose}
            className="rounded border px-4 py-2"
          >
            Close
          </button>

        </div>

<div className="p-6">

  {loading && (
    <div>Loading...</div>
  )}

  {!loading && timeline && (

    <div className="space-y-5">

      <div>

        <div className="font-semibold">
          Customer
        </div>

        <div>
          {timeline.recipient.customerName}
        </div>

      </div>

      <div>

        <div className="font-semibold">
          WhatsApp
        </div>

        <div>
          {timeline.recipient.whatsappNumber}
        </div>

      </div>

      <div>

        <div className="font-semibold">
          Status
        </div>

        <div>
          {timeline.recipient.currentStatus}
        </div>

      </div>

      <hr />

      <div>

        <div>Queued :</div>
	<div>{formatDateTime(timeline.timeline.queuedAt)}</div>

      </div>

      <div>

        <div>Processing :</div>
	<div>{formatDateTime(timeline.timeline.processingAt)}</div>

      </div>

      <div>

        <div>Sent :</div>
	<div>{formatDateTime(timeline.timeline.sentAt)}</div>

      </div>

      <div>

        <div>Delivered :</div>
	<div>{formatDateTime(timeline.timeline.deliveredAt)}</div>

      </div>

      <div>

        <div>Read :</div>
	<div>{formatDateTime(timeline.timeline.readAt)}</div>

      </div>

      <div>

        <div>Replied :</div>
	<div>{formatDateTime(timeline.timeline.repliedAt)}</div>

      </div>

      {timeline.failureReason && (

        <div className="rounded bg-red-100 p-3 text-red-700">

          Failure Reason:
          <br />

          {timeline.failureReason}

        </div>

      )}

    </div>

  )}

</div>

      </div>

    </div>
  );
}
