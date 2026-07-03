import ConversationItem from './ConversationItem';

type Conversation = {
  whatsappNumber: string;
  customerName: string;
  lastInboundMessage: string | null;
};

type Props = {
  conversations: Conversation[];
  selectedCustomer: string | null;
  unread: Record<string, boolean>;
  onSelect: (
    whatsappNumber: string,
    customerName: string,
  ) => void;
};

export default function ConversationList({
  conversations,
  selectedCustomer,
  unread,
  onSelect,
}: Props) {
  return (
    <div className="h-full overflow-y-auto">

      {conversations.length === 0 && (
        <div className="p-6 text-gray-500">
          No conversations found.
        </div>
      )}

      {conversations.map((item) => (
<ConversationItem
  key={item.whatsappNumber}
  customerName={item.customerName}
  whatsappNumber={item.whatsappNumber}
  lastMessage={item.lastInboundMessage}
  unread={unread[item.whatsappNumber] ?? false}
  selected={
    selectedCustomer ===
    item.whatsappNumber
  }
  onClick={() =>
    onSelect(
      item.whatsappNumber,
      item.customerName,
    )
  }
/>
      ))}

    </div>
  );
}
