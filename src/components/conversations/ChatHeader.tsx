type Props = {
  customerName: string;
  whatsappNumber: string;
};

export default function ChatHeader({
  customerName,
  whatsappNumber,
}: Props) {
  return (
    <div className="border-b bg-white px-6 py-4">

      <div className="text-lg font-semibold">
        {customerName || 'Unknown Customer'}
      </div>

      <div className="mt-1 text-sm text-gray-500">
        {whatsappNumber}
      </div>

    </div>
  );
}
