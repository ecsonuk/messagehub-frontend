import linkify from '@/utils/linkify';

type Props = {
  direction: 'INBOUND' | 'OUTBOUND';
  message: string;
  createdAt: string;
  status?: string;
};

export default function MessageBubble({
  direction,
  message,
  createdAt,
  status,
}: Props) {
  const outgoing = direction === 'OUTBOUND';

  return (
    <div
      className={`flex ${
        outgoing
          ? 'justify-end'
          : 'justify-start'
      }`}
    >
      <div
        className={`max-w-[70%] rounded-2xl px-4 py-3 shadow-sm ${
          outgoing
            ? 'bg-green-100'
            : 'bg-white border'
        }`}
      >
        <div className="text-sm whitespace-pre-wrap break-words">
	{linkify(message)}
        </div>

<div className="mt-2 flex items-center justify-end gap-2 text-xs text-gray-500">

  <span>
    {new Date(createdAt).toLocaleString()}
  </span>

{direction === 'OUTBOUND' && (
  <span
    className={
      status === 'READ'
        ? 'text-blue-500'
        : status === 'FAILED'
        ? 'text-red-500'
        : 'text-gray-500'
    }
  >
    {status === 'READ'
      ? '✓✓'
      : status === 'DELIVERED'
      ? '✓✓'
      : status === 'FAILED'
      ? '⚠'
      : '✓'}
  </span>
)}

</div>


      </div>
    </div>
  );
}
