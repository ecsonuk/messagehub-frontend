type Props = {
  customerName: string;
  whatsappNumber: string;
  campaignName: string | null;
  lastMessage: string | null;
  lastMessageAt: string | null;
  selected: boolean;
  onClick: () => void;
  unread: boolean;
};

function formatConversationTime(value: string | null) {
  if (!value) return '';

  const date = new Date(value);
  const now = new Date();

  const today = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
  );

  const messageDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
  );

  const diff =
    (today.getTime() - messageDay.getTime()) /
    86400000;

  if (diff === 0) {
    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  if (diff === 1) {
    return 'Yesterday';
  }

  return date.toLocaleDateString([], {
    day: '2-digit',
    month: 'short',
  });
}

export default function ConversationItem({
  customerName,
  whatsappNumber,
  campaignName,
  lastMessage,
  lastMessageAt,
  selected,
  onClick,
  unread,
}: Props) {

  return (
    <div
      onClick={onClick}
	className={`cursor-pointer border-b px-5 py-1 transition hover:bg-gray-50 ${
	  selected
	    ? 'bg-blue-50 border-l-4 border-l-blue-600'
	    : 'bg-white'
	}`}
    >

<div className="flex items-start justify-between">

  <div className="min-w-0">

    <div className="flex items-center gap-3">

      <span className="truncate text-base font-bold text-slate-800">
        {customerName || 'Unknown Customer'}
      </span>

      <span className="text-sm text-gray-500">
        {whatsappNumber}
      </span>

    </div>

{campaignName && (
  <div className="mt-1">
    <span className="inline-flex rounded-full bg-blue-100 px-2 py-0.5 text-[11px] font-medium text-blue-700">
      {campaignName}
    </span>
  </div>
)}

  </div>

  <div className="flex flex-col items-end">

{lastMessageAt && (
  <span className="whitespace-nowrap text-xs font-medium text-slate-500">
    {formatConversationTime(lastMessageAt)}
  </span>
)}

    {unread && (
      <span className="mt-2 h-2.5 w-2.5 rounded-full bg-red-500" />
    )}

  </div>

</div>
	
	<div className="mt-2 truncate text-sm text-gray-600">
        {lastMessage || 'No messages'}
      </div>
    </div>
  );
}
