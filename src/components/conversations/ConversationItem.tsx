type Props = {
  customerName: string;
  whatsappNumber: string;
  lastMessage: string | null;
  selected: boolean;
  onClick: () => void;
  unread: boolean;
};

export default function ConversationItem({
  customerName,
  whatsappNumber,
  lastMessage,
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


<div className="flex items-center justify-between">
  <div className="flex items-center gap-3 min-w-0">

    <span className="text-base font-bold text-slate-800 truncate">
      {customerName || 'Unknown Customer'}
    </span>

    <span className="text-sm text-gray-500 whitespace-nowrap">
      {whatsappNumber}
    </span>

  </div>

  {unread && (
    <span className="ml-2 h-2.5 w-2.5 rounded-full bg-red-500" />
  )}
</div>
	
	<div className="mt-2 truncate text-sm text-gray-600">
        {lastMessage || 'No messages'}
      </div>
    </div>
  );
}
