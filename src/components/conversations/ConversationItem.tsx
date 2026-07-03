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
      className={`cursor-pointer border-b p-4 transition hover:bg-gray-50 ${
        selected ? 'bg-blue-50' : 'bg-white'
      }`}
    >

<div className="flex items-center justify-between">
  <div className="font-semibold">
    {customerName || 'Unknown Customer'}
  </div>

  {unread && (
    <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
  )}
</div>

      <div className="text-xs text-gray-500 mt-1">
        {whatsappNumber}
      </div>

      <div className="mt-2 truncate text-sm text-gray-600">
        {lastMessage || 'No messages'}
      </div>
    </div>
  );
}
